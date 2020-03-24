import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Vuybe',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { theme_color: '#ee644d' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Helping you vuybe anywhere, anytime.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav.ico' },
      { rel: 'preload', href: '/fonts/Bold.otf', as: 'font', type: 'font/otf', crossorigin:'true' },
      { rel: 'preload', href: '/fonts/DemiBold.otf', as: 'font', type: 'font/otf', crossorigin:'true'},
      { rel: 'preload', href: '/fonts/Regular.otf', as: 'font', type: 'font/otf', crossorigin:'true' },
      { rel: 'preload', href: '/fonts/RoundsNeue.css', as: 'style' }
    ],
    script: [
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-52019876-6'},
      { src: '/js/ga.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],
  webfontloader: {
    // add Google Fonts as "custom" | workaround required
    custom: {
        families: [
          'Rounds Neue'
        ],
        urls:
          [`/fonts/RoundsNeue.css`]
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  manifest: {
    name: 'Vuybe',
    short_name: 'Vuybe',
    display: 'standalone',
    theme_color: '#ee644d',
    background_color: '#F1F1F1',
    lang: 'en',
    icons: [
      {
        "src": "/img/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/img/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    ['@nuxtjs/google-analytics', {
      id: 'UA-52019876-6'
    }]
  ],
  googleAnalytics: {
    id: 'UA-52019876-6',
    autoTracking: {
      screenview: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
