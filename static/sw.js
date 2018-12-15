importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/013321fd24388e1d8e77.js",
    "revision": "a88d0de9cf2b1fd9bf5df212f9050537"
  },
  {
    "url": "/_nuxt/2449fdd36fd7f807ca4d.js",
    "revision": "5cd4c285c2fd6934dc23bc817e7e1d78"
  },
  {
    "url": "/_nuxt/5497b00bbe96571b93a0.js",
    "revision": "61fa0ddcec3cd80a2b27fbcbf04d0397"
  },
  {
    "url": "/_nuxt/5904fa198c2f416df67e.js",
    "revision": "6bb91dee1dfe49179b04541968e5c450"
  },
  {
    "url": "/_nuxt/5c48c92e6fc84bfe2860.js",
    "revision": "f454d63bd0299f9df614e675840cf0fe"
  },
  {
    "url": "/_nuxt/5e8406d3c0816bf66b54.js",
    "revision": "1d56f6c0817d838d83691a82f03b3411"
  },
  {
    "url": "/_nuxt/61b5075c30c8f51ecac6.js",
    "revision": "01a6c45d815ece1979e0502a6d123b32"
  },
  {
    "url": "/_nuxt/6bd9e17d94b07daa92d8.js",
    "revision": "1b11cf4e4eff06fd1bb835a36763dec4"
  },
  {
    "url": "/_nuxt/72d5d263155c18de6767.js",
    "revision": "e9a56e71c5115ac9df5c0113b216e256"
  },
  {
    "url": "/_nuxt/8e28109f6b0dce6624a9.js",
    "revision": "b9317d8d2555bac68563cbe206ab6e2d"
  },
  {
    "url": "/_nuxt/9383cfb674df8a635a84.js",
    "revision": "7662895d02690598de403cf953f06c57"
  },
  {
    "url": "/_nuxt/b0c86fc03f7dd7e63b8c.js",
    "revision": "4444e5622c000a739ec438b752f8f062"
  },
  {
    "url": "/_nuxt/b6cd90088601e8fbd68a.js",
    "revision": "97a30059a330ff456f952f8f607af2f5"
  },
  {
    "url": "/_nuxt/c582bb28ecbb91d5130c.js",
    "revision": "b8ad0ebc22ba00f10abba9a57f1c52d8"
  },
  {
    "url": "/_nuxt/da1263f7faa9d4e52903.js",
    "revision": "7d861b2afc3cb716618f72da0b4432a4"
  },
  {
    "url": "/_nuxt/dde00d8c2ede5323b332.js",
    "revision": "0ad469d4fdbc032cf589be8003efc10d"
  },
  {
    "url": "/_nuxt/e07747f4dc991b0d5d72.js",
    "revision": "2c2f8804573ec519977166a03fc23c73"
  },
  {
    "url": "/_nuxt/f7115f82df457fbdde33.js",
    "revision": "d85410f2a6b5b757b290088c059aaf02"
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
