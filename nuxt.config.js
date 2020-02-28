export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Warframe Info Hub' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/langflags.js', ssr: false },
    { src: '~/plugins/mqtt.js', ssr: false },
    { src: '~/plugins/accordion.js', ssr: false },
    { src: '~/plugins/vselect.js', ssr: false },
    { src: '~/plugins/vcircle.js' },
    { src: '@/plugins/i18n.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/tailwindcss',
    [
      'vue-warehouse/nuxt',
      {
        vuex: true,
        plugins: ['store/plugins/expire', 'store/plugins/defaults'],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ],
    '@nuxtjs/eslint-module',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          // import whole set
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faDesktop',
              'faSun',
              'faMoon',
              'faBars',
              'faGamepad',
              'faSnowflake',
              'faPalette'
            ]
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faXbox', 'faPlaystation']
          }
        ]
      }
    ]
  ],

  /*
   ** PurgeCSS
   ** https://github.com/Developmint/nuxt-purgecss
   */
  purgeCSS: {
    whitelistPatterns: [
      /(^|\.)fa-/,
      /-fa($|\.)/,
      /^vueperslide/,
      /^badger/,
      /^vs/,
      /^flag/,
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/
    ]
  },

  pwa: {
    manifest: {
      name: 'Warframe Info Hub',
      short_name: 'Warframe Info Hub'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
