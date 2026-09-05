async page => {
  await page.bringToFront()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const origin = await page.evaluate(() => window.location.origin)
  const results = []
  const errors = []
  const onError = error => errors.push(error.message)
  page.on('pageerror', onError)

  function check(condition, message) {
    if (!condition) throw new Error(message)
  }

  async function selected(name) {
    await page.waitForFunction(
      name =>
        [...document.querySelectorAll('[role="tab"]')].some(
          tab => tab.textContent.trim() === name && tab.getAttribute('aria-selected') === 'true',
        ),
      name,
    )
  }

  try {
    for (const locale of ['', '/en']) {
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.goto(`${origin}${locale}/docs/agents/codex`)
      await page.getByRole('tab', { name: 'Codex CLI', exact: true }).click()
      check(page.url().endsWith('#tab-app-cli'), 'Tab selection must update the URL')
      await page.reload()
      await selected('Codex CLI')
      await page.getByRole('tab', { name: 'Codex CLI', exact: true }).press('Home')
      await selected('Codex App')
      await page.getByRole('tab', { name: 'Codex App', exact: true }).press('ArrowRight')
      await selected('Codex CLI')
      await page.getByRole('tab', { name: 'Codex CLI', exact: true }).press('End')
      await page.keyboard.press('ArrowRight')
      await selected('Codex App')
      await page.keyboard.press('ArrowLeft')
      const rovingFocus = await page.evaluate(() =>
        [...document.querySelectorAll('[role="tablist"]')].every(
          list => list.querySelectorAll('[tabindex="0"]').length === 1,
        ),
      )
      check(rovingFocus, 'Each tablist must have one keyboard entry point')

      // Resolve the second group by position because labels differ between locales.
      const manualTab = page.getByRole('tablist').nth(1).getByRole('tab').nth(1)
      const manualName = (await manualTab.textContent()).trim()
      await manualTab.click()
      await selected(manualName)
      const sharedUrl = page.url()
      await page.goto(`${origin}${locale}/docs/quickstart`)
      await page.goto(sharedUrl)
      await selected(manualName)
      check(
        await page.locator('#tab-cc-switch-setup-manual-setup').isVisible(),
        'Shared panel must be visible',
      )

      await page.goto(`${origin}${locale}/docs/agents/codex`)
      await page.getByRole('tab', { name: 'Codex CLI', exact: true }).click()
      await page.goBack()
      await selected('Codex App')
      await page.goForward()
      await selected('Codex CLI')

      await page.goto(`${origin}${locale}/docs/agents/codex`)
      await page.evaluate(() => {
        const panel = document.getElementById('tab-cc-switch-setup-manual-setup')
        panel.querySelector('pre').id = 'test-hidden-config'
        window.location.hash = 'test-hidden-config'
      })
      await selected(manualName)
      check(
        await page.locator('#test-hidden-config').isVisible(),
        'Hidden descendant anchor must reveal its panel',
      )

      const relationships = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(element => element.id)
        return (
          new Set(ids).size === ids.length &&
          [...document.querySelectorAll('[role="tab"]')].every(tab => {
            const panel = document.getElementById(tab.getAttribute('aria-controls'))
            return panel?.getAttribute('aria-labelledby') === tab.id
          })
        )
      })
      check(relationships, 'Tab IDs and ARIA relationships must be unique and valid')
      await page.locator('#tab-cc-switch-setup-manual-setup-label').scrollIntoViewIfNeeded()
      await page.screenshot({ path: `/tmp/tokendocs-tabs-${locale ? 'en' : 'zh'}-desktop.png` })

      for (const width of [390, 320]) {
        await page.setViewportSize({ width, height: 844 })
        for (const path of [
          '/docs/quickstart',
          '/docs/troubleshooting',
          '/docs/agents/codex',
          '/docs/tokenflux/billing',
        ]) {
          await page.goto(`${origin}${locale}${path}`)
          check(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
            `Page overflow at ${width}: ${locale}${path}`,
          )
          if (path.endsWith('/quickstart')) {
            check(
              await page
                .locator('.vp-doc table')
                .evaluateAll(tables =>
                  tables.every(table => table.scrollWidth <= table.clientWidth),
                ),
              'Quickstart tables must fit the viewport',
            )
            await page.getByRole('tab', { name: 'ChatBot', exact: true }).click()
            check(await page.locator('#tab-agent-chatbot').isVisible(), 'Chat tab should render')
            await page.screenshot({
              path: `/tmp/tokendocs-quickstart-${locale ? 'en' : 'zh'}-${width}.png`,
            })
          }
        }
      }
      results.push(
        `${locale || 'zh'}: links, reload, history, keyboard, hidden anchor, ARIA, desktop/mobile`,
      )
    }
    check(errors.length === 0, `Browser errors: ${errors.join('; ')}`)
    return { results, errors }
  } finally {
    page.off('pageerror', onError)
  }
}
