importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/18e5b4e0fdec5601540d.js",
    "revision": "54dca1108704de09d79f0bfe45ae9687"
  },
  {
    "url": "/_nuxt/247950c3e289923e497a.js",
    "revision": "0cc7f44ab44eb0b7f276ba079c11be33"
  },
  {
    "url": "/_nuxt/2f0ece0167f8de103258.js",
    "revision": "9ad64623e47807db1cc0f70ce22d81aa"
  },
  {
    "url": "/_nuxt/6307ef07beb06baa2995.js",
    "revision": "e5d4ba233bd8e4a7da11c4b09673315a"
  },
  {
    "url": "/_nuxt/809367e622ea2d4f5bd9.js",
    "revision": "1045399e5f5f97e41aec4a0953c1b1ed"
  },
  {
    "url": "/_nuxt/f9d8921d468cdc8c36e5.js",
    "revision": "b9c5e36917f4bcb00c3f95a741f172c1"
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
