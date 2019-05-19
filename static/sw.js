importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/4c65a6a0374b87a171ed.js",
    "revision": "086553bf25ec5859711f6f0ac17069d4"
  },
  {
    "url": "/_nuxt/809367e622ea2d4f5bd9.js",
    "revision": "1045399e5f5f97e41aec4a0953c1b1ed"
  },
  {
    "url": "/_nuxt/a145d1f5488ae78390af.js",
    "revision": "450445cffcd016d7bc11dbb74846dc35"
  },
  {
    "url": "/_nuxt/a8af4399b110fcb643bf.js",
    "revision": "ad500e639455f24e9d0b2a7bdeb154b9"
  },
  {
    "url": "/_nuxt/cbe4fc88405bb6dc7898.js",
    "revision": "0f579c27c4be6eacb454f0cc8185057f"
  },
  {
    "url": "/_nuxt/dd48d6716cf7570360d0.js",
    "revision": "f5e5e3922c69ad7ac8a8c346b5607ece"
  }
], {
  "cacheId": "vue-wf",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
