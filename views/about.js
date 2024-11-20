export default {
    template: `
      <div 
        class="p-8 min-h-screen"
        :class="{'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode}">
        <h1 class="text-3xl font-bold">About Page</h1>
      </div>
    `,
    computed: {
      isDarkMode() {
        return this.$store.getters.isDarkMode;
      },
    },
  };
  