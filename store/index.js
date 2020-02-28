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
    { short: 'theme-normal', label: 'Default' },
    { short: 'theme-normal-grineer', label: 'Bright Grineer' },
    { short: 'theme-normal-corpus', label: 'Bright Corpus' },
    { short: 'theme-normal-solaris', label: 'Bright Solaris' },
    { short: 'theme-dark-normal', label: 'Dark' },
    { short: 'theme-dark-corpus', label: 'Dark Corpus' },
    { short: 'theme-dark-test2', label: 'Dark Grineer' },
    { short: 'theme-dark-test3', label: 'Dark Solaris' }
  ],
  activeplatform: { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
  activelang: { short: 'en', label: 'English' },
  activetheme: { short: 'theme-normal', label: 'Default' }
})
export const mutations = {
  settheme(state, theme) {
    state.activetheme = theme
    this.$warehouse.set('theme', theme)
  },
  setplatform(state, platform) {
    state.activeplatform = platform
    this.$warehouse.set('platform', platform)
    // eslint-disable-next-line no-console
    console.log(platform)
  },
  setlang(state, lang) {
    state.activelang = lang
    this.$warehouse.set('lang', lang)
  }
}
