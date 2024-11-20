import { ROUTE_NAMES } from '../assets/javascripts/constants.js';

export default {
  template: `
    <header 
      class="p-4 flex justify-between items-center"
      :class="{'bg-gray-900 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode}">
      <nav>
        <ul class="flex space-x-4">
          <!-- Dùng :to để bind hằng số ROUTE_NAMES -->
          <li><router-link :to="ROUTE_NAMES.HOME" class="hover:underline">Home</router-link></li>
          <li><router-link :to="ROUTE_NAMES.ABOUT" class="hover:underline">About</router-link></li>
        </ul>
      </nav>
      <button 
        @click="toggleTheme" 
        class="ml-auto px-4 py-2 rounded"
        :class="{'bg-blue-700 text-white': isDarkMode, 'bg-blue-500 text-black': !isDarkMode}">
        Switch Theme
      </button>
    </header>
  `,
  data() {
    return {
      ROUTE_NAMES,
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme');
    },
  },
};
