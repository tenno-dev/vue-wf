export const state = () => ({
  platform: [
    { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
    { short: 'ps4', label: 'PS4', icon: ['fab', 'playstation'] },
    { short: 'xb1', label: 'XBox', icon: ['fab', 'xbox'] },
    { short: 'swi', label: 'Switch', icon: ['fas', 'gamepad'] }
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
  theme: [
    { short: '', label: 'Default' },
    { short: 'theme-dark', label: 'Dark normal' },
    { short: 'theme-dark-test', label: 'Dark Corpus' },
    { short: 'theme-dark-test2', label: 'Dark Grineer' },
    { short: 'theme-dark-test3', label: 'Dark Solaris' }
  ],
  activeplatform: { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
  activelang: { short: 'en', label: 'English' },
  activetheme: { short: '', label: 'Default' }
})
export const mutations = {
  themeswitch(state, theme) {
    state.activetheme = theme
  },
  setplatform(state, platform) {
    state.activeplatform = platform
  },
  setlang(state, lang) {
    state.activelang = lang
  }
}
