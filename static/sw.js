importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/037afb94ea9fe8163c5d.js",
    "revision": "08f97e5be44e0c93367cc8d66850a6a2"
  },
  {
    "url": "/_nuxt/4c65a6a0374b87a171ed.js",
    "revision": "086553bf25ec5859711f6f0ac17069d4"
  },
  {
    "url": "/_nuxt/809367e622ea2d4f5bd9.js",
    "revision": "1045399e5f5f97e41aec4a0953c1b1ed"
  },
  {
    "url": "/_nuxt/928c70e19c34bac3cb8a.js",
    "revision": "26e2060a197d3ced82298f8084494920"
  },
  {
    "url": "/_nuxt/9bfe1bf31a3fc678b389.js",
    "revision": "38225e3c61f73a0128a285553de30fe4"
  },
  {
    "url": "/_nuxt/a8af4399b110fcb643bf.js",
    "revision": "ad500e639455f24e9d0b2a7bdeb154b9"
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
