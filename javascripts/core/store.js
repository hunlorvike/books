export const store = new Vuex.Store({
	state: {
		theme: {
			theme: localStorage.getItem('theme') || 'light',
			primaryColor: localStorage.getItem('primaryColor') || '#3490dc',
			fontFamily: localStorage.getItem('fontFamily') || 'Tahoma',
			fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
		},
		currentPage: 0,
	},
	mutations: {
		UPDATE_THEME(state, { key, value }) {
			state.theme[key] = value;
			localStorage.setItem(key, value);
			this.commit('APPLY_THEME_TO_DOM');
		},
		SET_CURRENT_PAGE(state, pageIndex) {
			state.currentPage = pageIndex;
		},
		APPLY_THEME_TO_DOM(state) {
			const root = document.documentElement;
			Object.entries(state.theme).forEach(([key, value]) => {
				const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
				root.style.setProperty(cssVar, key === 'fontSize' ? `${value}px` : value);
			});

			document.body.className = '';
			document.body.classList.toggle('dark', state.theme.theme === 'dark');
		},
	},
	actions: {
		updateTheme({ commit }, payload) {
			commit('UPDATE_THEME', payload);
		},
		updateCurrentPage({ commit }, pageIndex) {
			commit('SET_CURRENT_PAGE', pageIndex);
		},
		initializeTheme({ commit }) {
			commit('APPLY_THEME_TO_DOM');
		},
	},
	getters: {
		currentPage: state => state.currentPage,
		theme: state => state.theme,
	},
});