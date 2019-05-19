importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/21e038c35634b2136d1c.js",
    "revision": "a4ce6d1a7bc8d895f090a19fcf99b890"
  },
  {
    "url": "/_nuxt/4c65a6a0374b87a171ed.js",
    "revision": "086553bf25ec5859711f6f0ac17069d4"
  },
  {
    "url": "/_nuxt/53d81925b51cba292884.js",
    "revision": "c1cf7278a911497181120287e403dcbe"
  },
  {
    "url": "/_nuxt/809367e622ea2d4f5bd9.js",
    "revision": "1045399e5f5f97e41aec4a0953c1b1ed"
  },
  {
    "url": "/_nuxt/a8af4399b110fcb643bf.js",
    "revision": "ad500e639455f24e9d0b2a7bdeb154b9"
  },
  {
    "url": "/_nuxt/b586398a3b781caae39e.js",
    "revision": "3b3803375c67b9a1011e752f36faa13b"
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
