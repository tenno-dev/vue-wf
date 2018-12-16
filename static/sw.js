importScripts('/_nuxt/workbox.4c4f5ca6.js', 'firebase-sw.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/17ec6a2cdf19cadf6619.js",
    "revision": "a0bbba9c048682d65993cc5a2f41b9c5"
  },
  {
    "url": "/_nuxt/3e9ecd86dbab4ed9570a.js",
    "revision": "b08bf8cf3c0cc1332b52f404ab18d4f2"
  },
  {
    "url": "/_nuxt/46d17b07f4f6b5e6826a.js",
    "revision": "6841f93ca9f437bc3ac54ba01465546d"
  },
  {
    "url": "/_nuxt/53aed7aba3de86ceca95.js",
    "revision": "4b5234d9794e919207cd640b44e81f16"
  },
  {
    "url": "/_nuxt/8fedf1bbdc3f7d707f87.js",
    "revision": "6ba9e5c51387fb5dc4740cefeb195a03"
  },
  {
    "url": "/_nuxt/b3a0225b48270522eef8.js",
    "revision": "c84e56155f481485f3960b4ef26c90f0"
  },
  {
    "url": "/_nuxt/c25bcdc1645a6fd98e7a.js",
    "revision": "afc1bc6157ae6542edfdcb1761f28518"
  },
  {
    "url": "/_nuxt/d5257c59bab473ce53b1.js",
    "revision": "422007c3ef7efa3e2e6743081d0a2579"
  },
  {
    "url": "/_nuxt/e2a15a3b8a7dff3e127b.js",
    "revision": "cd16d0e384a3d12635dabab849875b58"
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
