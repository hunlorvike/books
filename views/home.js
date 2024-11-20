import indexedDBService from '../assets/javascripts/db.js';

export default {
  data() {
    return {
      newQuote: '',
      quotes: [],
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  methods: {
    async initDB() {
      try {
        await indexedDBService.openDB('QuotesDB', 1);
        this.fetchQuotes();
      } catch (error) {
        console.error('Failed to open database:', error);
      }
    },
    async addQuote() {
      if (!this.newQuote) return;

      try {
        await indexedDBService.addQuote({ content: this.newQuote });
        this.newQuote = '';
        this.fetchQuotes();
      } catch (error) {
        console.error('Failed to add quote:', error);
      }
    },
    async fetchQuotes() {
      try {
        this.quotes = await indexedDBService.getAllQuotes();
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      }
    },
  },
  created() {
    this.initDB();
  },
  template: `
    <div class="p-8 min-h-screen" :class="{'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode}">
      <h1 class="text-3xl font-bold mb-4">Quotes List</h1>
      
      <input 
        v-model="newQuote" 
        type="text" 
        placeholder="Enter a new quote" 
        class="border rounded px-2 py-1 mb-4 w-full"
      />
      <button 
        @click="addQuote" 
        class="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Add Quote
      </button>

      <ul class="mt-6">
        <li v-for="quote in quotes" :key="quote.id" class="border-b py-2">
          {{ quote.content }}
        </li>
      </ul>
    </div>
  `,
};
