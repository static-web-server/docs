import { defineConfig } from 'vitepress'
import { v2 } from './config.v2.mjs'
import { v3 } from './config.v3.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "Static Web Server",
  description: "Static Web Server (SWS) — Static content delivery with speed and reliability",

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/assets/sws.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }],
  ],

  themeConfig: {
    logo: { light: '/assets/sws.svg', dark: '/assets/sws_white.svg' },
    siteTitle: 'Static Web Server',

    search: {
      provider: 'local',
    },

    nav: [
      ...(v3.nav || []),
      ...(v2.nav || []),
    ],

    sidebar: {
      ...v3.sidebar,
      ...v2.sidebar,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/static-web-server/static-web-server' },
      { icon: 'discord', link: 'https://discord.gg/VWvtZeWAA7' },
    ],

    editLink: {
      pattern: 'https://github.com/static-web-server/docs/edit/main/src/:path',
      text: 'Edit this page on GitHub',
    },
  }
})

