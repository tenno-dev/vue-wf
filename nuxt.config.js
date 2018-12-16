const pkg = require("./package");
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/vue-wf/"
        }
      }
    : {};
module.exports = {
  mode: "spa",

  // https://nuxtjs.org/api/configuration-modern
  modern: false,

  /*
   ** Headers of the pages
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/countdown",
    {
      src: "~/plugins/firebase.js",
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/apollo", "@nuxtjs/pwa", "@nuxtjs/vuetify"],
  apollo: {
    includeNodeModules: true, // optionals default: false (this includes graphql-tag for node_modules folder)
    // optional
    errorHandler(error) {
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    },
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: "https://mybitti.de/graphql",
        wsEndpoint: null,
        httpLinkOptions: {
          credentials: "same-origin"
        }
      }
    }
  },
  vuetify: {
    // Vuetify options s
    treeShake: true,
    materialIcons: false
  },
  manifest: {
    gcm_sender_id: "103953800507"
  },
  workbox: {
    dev: true,
    importScripts: ["/firebase-messaging-sw.js"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
    }
  },
  ...routerBase
};
