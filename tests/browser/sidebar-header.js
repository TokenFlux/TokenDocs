async page => {
  await page.bringToFront()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  // 覆盖侧栏滚动到顶栏背后的场景，遮挡层必须完整覆盖标题高度。
  const origin = new URL(page.url()).origin
  const results = []
  for (const width of [960, 1280, 1600]) {
    await page.setViewportSize({ width, height: 720 })
    for (const locale of ['', '/en']) {
      await page.goto(`${origin}${locale}/docs/agents/deepseek-harness`)
      await page.locator('.VPSidebar').waitFor()
      for (const dark of [false, true]) {
        const coverage = await page.evaluate(dark => {
          document.documentElement.classList.toggle('dark', dark)
          const sidebar = document.querySelector('.VPSidebar')
          sidebar.scrollTop = sidebar.scrollHeight
          const curtain = sidebar.querySelector('.curtain').getBoundingClientRect()
          const title = document.querySelector('.VPNavBarTitle').getBoundingClientRect()
          return {
            scroll: sidebar.scrollTop,
            top: curtain.top,
            bottom: curtain.bottom,
            titleBottom: title.bottom,
          }
        }, dark)
        if (coverage.scroll <= 0 || coverage.top > 0 || coverage.bottom < coverage.titleBottom) {
          throw new Error(
            `侧栏遮挡层未覆盖顶栏：${JSON.stringify({ width, locale, dark, ...coverage })}`,
          )
        }
        results.push({ width, locale, dark, ...coverage })
      }
    }
  }
  // 移动端仍可打开菜单并点击新增教程。
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${origin}/docs/quickstart`)
  await page.locator('.VPLocalNav .menu').click()
  await page.locator('.VPSidebar.open a[href*="/docs/agents/deepseek-harness"]').click()
  await page.waitForURL(/\/docs\/agents\/deepseek-harness(?:\.html)?$/)
  await page.locator('h1').filter({ hasText: 'DeepSeek Harness' }).waitFor()
  return results
}
