import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      darkMode: true,
      platform: [
        { short: "pc", Tag: "PC" },
        { short: "ps4", Tag: "PS4" },
        { short: "xb1", Tag: "XBox" },
        { short: "swi", Tag: "Switch" }
      ],
      activeplatform: "pc"
    }),
    mutations: {
      darkmodeswitch(state, dark) {
        state.darkMode = dark;
      },
      setplatform(state, platform) {
        state.activeplatform = platform;
      }
    }
  });
};

export default createStore;
