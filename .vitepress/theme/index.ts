// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './components/Home.vue'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter } = useData()
    if (frontmatter.value.layout === 'Home') {
      return h(Home)
    }
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
