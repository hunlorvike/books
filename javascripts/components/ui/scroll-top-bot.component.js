const ScrollTopBot = {
    name: 'ScrollTopBot',

    template: `
        <div class="fixed bottom-4 right-4 flex flex-col items-center gap-4 z-50">
            <button v-if="showScrollButton === 'top'" @click="scrollToTop" 
                class="p-4 rounded-lg shadow-lg border-2">
                <i class="fas fa-chevron-up"></i>
            </button>
            <button v-if="showScrollButton === 'bottom'" @click="scrollToBottom" 
                class="p-4 rounded-lg shadow-lg border-2">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
    `,

    data() {
        return {
            showScrollButton: null,
        };
    },

    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        scrollToBottom() {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        },
        checkScroll() {
            if (window.scrollY > 200) {
                this.showScrollButton = 'top';
            } else if (window.scrollY < document.body.scrollHeight - window.innerHeight - 200) {
                this.showScrollButton = 'bottom';
            } else {
                this.showScrollButton = null;
            }
        },
    },

    mounted() {
        window.addEventListener('scroll', this.checkScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.checkScroll);
    },
};

export { ScrollTopBot }