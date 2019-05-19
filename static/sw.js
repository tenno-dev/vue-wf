importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/09bc851fc1924f3a66c0.js",
    "revision": "fdbc44f16e6e75982d85b03d4194783c"
  },
  {
    "url": "/_nuxt/183c453ef04781ef2b12.js",
    "revision": "356cf61838b08113bc08afd838ce2c72"
  },
  {
    "url": "/_nuxt/4c65a6a0374b87a171ed.js",
    "revision": "086553bf25ec5859711f6f0ac17069d4"
  },
  {
    "url": "/_nuxt/4d55cd02be4da0630f92.js",
    "revision": "a43014920bea51780c3eda169c50852f"
  },
  {
    "url": "/_nuxt/809367e622ea2d4f5bd9.js",
    "revision": "1045399e5f5f97e41aec4a0953c1b1ed"
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
