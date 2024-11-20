import Header from '../../components/header.js';
import { store } from './store.js';               
import { routes } from './routes.js';            

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',  
});

new Vue({
  el: '#app',
  router,
  store,
  components: {
    Header,
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  watch: {
    isDarkMode(newVal) {
      document.body.classList.toggle('dark', newVal);
    },
  },
  template: `
    <div>
      <Header />
      <router-view></router-view>
    </div>
  `,
  created() {
    document.body.classList.toggle('dark', this.$store.state.isDarkMode);
  },
});
