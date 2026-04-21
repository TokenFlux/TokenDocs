import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import DocsTabs from './components/DocsTabs.vue'
import DocsTab from './components/DocsTab.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    const { app } = ctx

    app.component('DocsTabs', DocsTabs)
    app.component('DocsTab', DocsTab)

    return DefaultTheme.enhanceApp?.(ctx)
  },
}
