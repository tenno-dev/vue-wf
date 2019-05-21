export const state = () => ({
  darkmode: true,
  platform: [
    { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
    { short: 'ps4', label: 'PS4', icon: ['fab', 'playstation'] },
    { short: 'xb1', label: 'XBox', icon: ['fab', 'xbox'] },
    { short: 'swi', label: 'Switch', icon: ['fab', 'nintendo-switch'] }
  ],
  lang: [
    { short: 'en', label: 'English' },
    { short: 'de', label: 'German' },
    { short: 'es', label: 'Spanish' },
    { short: 'fr', label: 'French' },
    { short: 'it', label: 'Italian' },
    { short: 'ko', label: 'Korean' },
    { short: 'pl', label: 'Polish' },
    { short: 'pt', label: 'Portuguese' },
    { short: 'ru', label: 'Russian' },
    { short: 'zh', label: 'Chinese' }
  ],
  activeplatform: { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
  activelang: { short: 'en', label: 'English' }
})
export const mutations = {
  darkmodeswitch(state, dark) {
    state.darkmode = dark
  },
  setplatform(state, platform) {
    state.activeplatform = platform
  },
  setlang(state, lang) {
    state.activelang = lang
  }
}
