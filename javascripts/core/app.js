import { store } from './store.js';
import { routes } from './routes.js';
import { ScrollTopBot } from '../components/ui/scroll-top-bot.component.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});

Vue.component('ScrollTopBot', ScrollTopBot);

new Vue({
    el: '#app',
    router,
    store,
    render(h) {
        return h('div', { attrs: { id: 'root' } }, [
            h('router-view'),
            h(ScrollTopBot),
        ]);
    },
});