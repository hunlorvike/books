const store = new Vuex.Store({
	state: {
		theme: {
			theme: localStorage.getItem('theme') || 'default',
			fontFamily: localStorage.getItem('fontFamily') || 'Tahoma',
			fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
		},
		currentPage: 0,
	},
	mutations: {
		UPDATE_THEME(state, { key, value }) {
			state.theme[key] = value;
			this.commit('APPLY_THEME_TO_DOM');
			this.commit('SYNC_THEME_WITH_LOCALSTORAGE');
		},

		SYNC_THEME_WITH_LOCALSTORAGE(state) {
			Object.entries(state.theme).forEach(([key, value]) => {
				localStorage.setItem(key, value);
			});
		},

		SET_CURRENT_PAGE(state, pageIndex) {
			state.currentPage = pageIndex;
		},

		APPLY_THEME_TO_DOM(state) {
			const { theme, fontFamily, fontSize } = state.theme;
			const root = document.documentElement;
			
			root.style.setProperty('--font-family', fontFamily);
			root.style.setProperty('--font-size', `${fontSize}px`);

			document.querySelector('html').setAttribute('data-theme', theme);
		},
	},

	actions: {
		updateTheme({ commit }, payload) {
			commit('UPDATE_THEME', payload);
		},
		updateCurrentPage({ commit }, pageIndex) {
			commit('SET_CURRENT_PAGE', pageIndex);
		},
	},

	getters: {
		currentPage: state => state.currentPage,
		theme: state => state.theme,
	},
});

export { store };