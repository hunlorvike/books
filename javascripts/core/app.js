import { store } from './store.js';
import { ScrollTopBot } from '../components/ui/scroll-top-bot.component.js';

import { BookPreviewComponent } from '../components/book-pre.component.js';
import { BookDetailComponent } from '../components/book-detail.component.js';

Vue.use(VueRouter);

const routes = [
    { path: "/", component: BookPreviewComponent },
    { path: "/detail", component: BookDetailComponent },
    { path: "*", redirect: "/" },
];

const router = new VueRouter({
    routes,
    mode: "hash",
});

Vue.component("ScrollTopBot", ScrollTopBot);

new Vue({
    el: "#app",
    router,
    store,
    mounted() {
        this.$store.commit("APPLY_THEME_TO_DOM");
    },
    render(h) {
        return h("div", { attrs: { id: "root" } }, [
            h("router-view"),
            h(ScrollTopBot),
        ]);
    },
});
