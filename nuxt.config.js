const path = require('path')
const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | ' + pkg.name,
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  css: ['@/assets/css/tailwind.css', 'vue-select/dist/vue-select.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/langflags.js', ssr: false },
    { src: '~/plugins/mqtt.js', ssr: false },
    { src: '~/plugins/accordion.js', ssr: false },
    { src: '~/plugins/vselect.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-purgecss',
    '@nuxtjs/pwa',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          // import whole set
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['faDesktop', 'faSun', 'faMoon']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faXbox', 'faPlaystation', 'faNintendoSwitch']
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
    mode: 'postcss',
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
          }
        }
      }
    ],
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

  /*
   ** This option is given directly to the vue-router Router constructor
   */
  router: {
    base: '',
    linkActiveClass: 'is-active'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** PostCSS setup
     */
    postcss: {
      // Add plugin names as key and arguments as value
      // Disable a plugin by passing false as value
      plugins: {
        'postcss-url': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        cssnano: {
          preset: 'default',
          discardComments: { removeAll: true },
          zIndex: false
        }
      },
      // Change the postcss-preset-env settings
      preset: {
        stage: 0,
        autoprefixer: {
          cascade: false,
          grid: true
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
