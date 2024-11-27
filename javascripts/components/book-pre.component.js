const BookPreviewComponent = {
    name: "BookPreviewComponent",

    template: `
        <section class="min-h-screen bg-gray-50 dark:bg-gray-900">
            <!-- Header -->
            <header class="p-4 shadow-md fixed top-0 left-0 w-full z-10 bg-white dark:bg-gray-800 dark:text-white">
                <div class="container mx-auto flex items-center justify-between">
                    <h1 class="text-[1.125em] sm:text-[1.25em] font-semibold">
                        <router-link to="/" class="text-gray-900 dark:text-white">
                            Sách du lịch - Khám phá
                        </router-link>
                    </h1>
                </div>
            </header>

            <!-- Main Content -->
            <main class="max-w-[1400px] mx-auto px-20 sm:px-6 lg:px-12 py-8 lg:py-12" style="padding-top: 100px;">
                <!-- Book Details -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 lg:p-8">
                        <!-- Book Image -->
                        <div class="col-span-12 lg:col-span-5 flex justify-center items-center">
                            <img 
                                src="./public/images/covers/anh_bia_cndl1.png" 
                                alt="Book Image" 
                                class="max-h-80 sm:max-h-96 w-auto rounded-lg shadow-md object-cover dark:brightness-50">
                        </div>

                        <!-- Book Details Text -->
                        <div class="col-span-12 lg:col-span-7 space-y-4 sm:space-y-6">
                            <h1 class="text-[1.125em] sm:text-[1.25em] font-bold text-gray-900 dark:text-white">
                                CẨM NANG DU LỊCH HUẾ
                            </h1>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 text-[0.75em] sm:text-[0.875em] font-medium text-white bg-blue-600 rounded-full shadow-sm dark:bg-blue-500">Du lịch - Văn hoá</span>
                                <span class="px-3 py-1 text-[0.75em] sm:text-[0.875em] font-medium text-white bg-green-600 rounded-full shadow-sm dark:bg-green-500">Thừa Thiên Huế</span>
                                <span class="px-3 py-1 text-[0.75em] sm:text-[0.875em] font-medium text-white bg-purple-600 rounded-full shadow-sm dark:bg-purple-500">Sách du lịch</span>
                            </div>

                            <!-- Metadata -->
                            <div class="space-y-2 text-gray-700 text-[0.875em] sm:text-[1em] dark:text-gray-300">
                                <p><span class="font-medium text-gray-800 dark:text-gray-100">Tác giả:</span> Sở Du Lịch Tỉnh Thừa Thiên Huế</p>
                                <p><span class="font-medium text-gray-800 dark:text-gray-100">Loại sách:</span> Multimediabook</p>
                                <p><span class="font-medium text-gray-800 dark:text-gray-100">Thể loại:</span> Du lịch khám phá</p>
                            </div>

                            <!-- Introduction -->
                            <div>
                                <h2 class="text-[1.125em] sm:text-[1.25em] font-semibold text-gray-900 dark:text-white">GIỚI THIỆU</h2>
                                <p v-if="!isDesktop" class="mt-3 text-gray-600 text-[0.875em] sm:text-[1em] leading-relaxed dark:text-gray-300" v-html="isExpanded ? bookIntroduction : truncatedIntroduction"></p>
                                <p v-else class="mt-3 text-gray-600 text-[0.875em] sm:text-[1em] leading-relaxed dark:text-gray-300" v-html="bookIntroduction"></p>
                                <button 
                                    v-if="!isDesktop && !isExpanded" 
                                    @click="isExpanded = true" 
                                    class="mt-2 text-primary hover:underline text-[0.875em] sm:text-[1em]">
                                    Xem thêm
                                </button>
                                <button 
                                    v-if="!isDesktop && isExpanded" 
                                    @click="isExpanded = false" 
                                    class="mt-2 text-primary hover:underline text-[0.875em] sm:text-[1em]">
                                    Thu gọn
                                </button>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap gap-4">
                                <!-- Read Button -->
                                <router-link 
                                    to="/detail" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white text-[0.875em] sm:text-[1em] font-medium rounded-lg transition duration-500 ease-in-out transform hover:scale-105 shadow-md text-center">
                                    ĐỌC SÁCH
                                </router-link>

                                <!-- Favorite Button -->
                                <button 
                                    @click="toggleFavorite" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-4 py-2 sm:px-6 sm:py-3 border-2 border-primary text-primary text-[0.875em] sm:text-[1em] font-medium rounded-lg flex items-center gap-2 hover:bg-primary hover:text-white hover:border-transparent transition duration-500 ease-in-out transform hover:scale-105">
                                    <i 
                                        :class="isFavorite ? 'fas fa-heart text-red-500 dark:text-red-400' : 'far fa-heart text-gray-500 dark:text-gray-300'"
                                        aria-hidden="true">
                                    </i> 
                                    <span>{{ isFavorite ? 'Đã yêu thích' : 'Yêu thích' }}</span>
                                </button>

                                <!-- Share Button -->
                                <button 
                                    @click="shareOnFacebook" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-4 py-2 sm:px-6 sm:py-3 border-2 border-primary text-primary text-[0.875em] sm:text-[1em] font-medium rounded-lg flex items-center gap-2 hover:bg-primary hover:text-white hover:border-transparent transition duration-500 ease-in-out transform hover:scale-105">
                                    <i class="fas fa-share dark:text-blue-400"></i> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Related Books Section -->
                <div class="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800 p-6 lg:p-8">
                    <h2 class="text-lg sm:text-2xl text-center font-bold mb-8 text-gray-900 dark:text-white">SÁCH CÙNG THỂ LOẠI</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        <div 
                            v-for="book in books" 
                            :key="book.id" 
                            class="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:hover:shadow-xl">
                            <img 
                                :src="book.image" 
                                alt="Book Image" 
                                class="h-40 sm:h-48 w-auto rounded-md object-cover transform transition duration-300 ease-in-out hover:scale-105">
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="p-6 bg-gray-100 dark:bg-gray-800 dark:text-white">
                <div class="text-center">
                    <p class="font-semibold">BẢN QUYỀN NHÀ XUẤT BẢN TỔNG HỢP TP. HCM</p>
                    <p class="text-sm">Địa chỉ: 62 Nguyễn Thị Minh Khai, Quận 1, TP. HCM</p>
                    <p class="text-sm">Điện thoại: <a href="tel:(028)38256804">(028) 38 256 804</a>, <a href="tel:(028)38256713">(028) 38 256 713</a>, <a href="tel:(028)38296764">(028) 38 296 764</a></p>
                    <p class="text-sm">Email: <a href="mailto:tonghop@nxbhcm.com.vn">tonghop@nxbhcm.com.vn</a></p>
                    <p class="text-sm">Người chịu trách nhiệm chính: Ông Trần Đình Việt</p>
                </div>
            </footer>
        </section>
    `,

    data() {
        return {
            isFavorite: JSON.parse(localStorage.getItem("isFavorite")) || false,
            isExpanded: false,
            isDesktop: window.innerWidth >= 1024,
            bookIntroduction: `
                Huế - mảnh đất kinh kỳ với bao lớp trầm tích lịch sử, nơi mà những ai từng đặt chân đều không thể quên đi vẻ đẹp thanh bình và sâu lắng. 
                Cuốn sách này sẽ dẫn bạn qua những di tích lịch sử hào hùng, thưởng thức những món ăn đậm đà hương vị cố đô, và khám phá những dịch vụ địa phương từ hàng lưu niệm tinh xảo đến những nơi nghỉ chân tiện nghi.
                <br><br>
                Không chỉ là một hành trình du lịch, mà còn là một cơ hội để hiểu thêm về văn hóa, con người Huế. Hãy để Huế trở thành một phần của trái tim bạn qua từng trang sách và từng bước chân trên mảnh đất cổ đô này.
            `,
            books: [
                { id: 1, image: "./public/images/relateds/related1.jpg" },
                { id: 2, image: "./public/images/relateds/related2.jpg" },
                { id: 3, image: "./public/images/relateds/related3.jpg" },
                { id: 4, image: "./public/images/relateds/related4.jpg" },
                { id: 5, image: "./public/images/relateds/related5.jpg" },
            ],
        };
    },

    computed: {
        truncatedIntroduction() {
            const maxLength = 150;
            return this.bookIntroduction.length > maxLength
                ? this.bookIntroduction.substring(0, maxLength) + "..."
                : this.bookIntroduction;
        },
    },

    mounted() {
        window.addEventListener("resize", this.checkScreenSize);
        this.$store.dispatch("initializeTheme");
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.checkScreenSize);
    },

    methods: {
        checkScreenSize() {
            this.isDesktop = window.innerWidth >= 1024;
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            localStorage.setItem("isFavorite", JSON.stringify(this.isFavorite));
        },
        shareOnFacebook() {
            const shareUrl = encodeURIComponent(window.location.href);
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&hashtag=%23Hue`;
            window.open(facebookUrl, "_blank", "width=600,height=400");
        }
    },
};

export { BookPreviewComponent }