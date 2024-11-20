import { DEFAULTS } from './constants.js';

export const store = new Vuex.Store({
  state: {
    isDarkMode: false,
    language: DEFAULTS.LANGUAGE,
  },
  mutations: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setLanguage(state, lang) {
      state.language = lang;
    },
  },
  getters: {
    isDarkMode: state => state.isDarkMode,
    language: state => state.language,
  },
});
