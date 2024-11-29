import { BOOK_RELATEDS } from '../core/const.js';

const BookPreviewComponent = {
    name: "BookPreviewComponent",

    template: `
        <section class="min-h-screen transition-all duration-300">
            <header class="p-2 xs:p-3 sm:p-4 shadow-md fixed top-0 left-0 w-full z-10">
                <div class="container mx-auto flex items-center justify-between h-10 xs:h-12 sm:h-14">
                    <h1 class="text-[1em] xs:text-[1.5em] sm:text-[1.75em] font-bold leading-tight">
                        <router-link to="/">
                            Cẩm nang Du lịch Huế
                        </router-link>
                    </h1>
                </div>
            </header>

            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-1 xs:px-2 sm:px-4 lg:px-8 py-4 xs:py-8 lg:py-12" style="padding-top: 150px;">
                <!-- Book Details -->
                <div class="rounded-2xl shadow-lg overflow-hidden">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 xs:gap-6 lg:gap-8 p-2 xs:p-4 sm:p-8">
                        <div class="col-span-12 lg:col-span-5 flex justify-center items-center">
                            <a data-fancybox="gallery" href="./public/images/covers/anh_bia_cndl1.png">
                                <img 
                                    src="./public/images/covers/anh_bia_cndl1.png" 
                                    alt="Book Image" 
                                    class="max-h-40 xs:max-h-60 sm:max-h-80 w-auto rounded-lg shadow-md object-cover sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                                >
                            </a>
                        </div>

                        <div class="col-span-12 lg:col-span-7 space-y-2 xs:space-y-4 sm:space-y-6">
                            <h1 class="text-[0.875em] xs:text-[1em] sm:text-[1.25em] font-bold">
                                CẨM NANG DU LỊCH HUẾ
                            </h1>

                            <div class="tag-container gap-1 xs:gap-2 gap-y-2 xs:gap-y-3 sm:gap-y-2 overflow-x-auto whitespace-nowrap">
                                <span 
                                    class="tag px-2 xs:px-3 py-1 text-[0.625em] xs:text-[0.75em] sm:text-[0.875em] font-medium text-white bg-[#8174A0] rounded-full shadow-sm">
                                    Du lịch - Văn hoá
                                </span>
                                <span 
                                    class="tag px-2 xs:px-3 py-1 text-[0.625em] xs:text-[0.75em] sm:text-[0.875em] font-medium text-white bg-[#89A8B2] rounded-full shadow-sm">
                                    Thừa Thiên Huế
                                </span>
                                <span 
                                    class="tag px-2 xs:px-3 py-1 text-[0.625em] xs:text-[0.75em] sm:text-[0.875em] font-medium text-white bg-[#BC7C7C] rounded-full shadow-sm">
                                    Sách du lịch
                                </span>
                            </div>

                            <div class="space-y-1 xs:space-y-2">
                                <p><span class="font-semibold">Tác giả:</span> Sở Du Lịch Tỉnh Thừa Thiên Huế</p>
                                <p><span class="font-semibold">Loại sách:</span> Multimediabook</p>
                                <p><span class="font-semibold">Thể loại:</span> Du lịch khám phá</p>
                            </div>

                            <div>
                                <h2 class="text-[1em] xs:text-[1.125em] sm:text-[1.25em] font-bold">GIỚI THIỆU</h2>
                                <p v-if="!isDesktop" class="mt-2 xs:mt-3 leading-relaxed" v-html="isExpanded ? bookIntroduction : truncatedIntroduction"></p>
                                <p v-else class="mt-2 xs:mt-3 leading-relaxed" v-html="bookIntroduction"></p>
                                <button 
                                    v-if="!isDesktop && !isExpanded" 
                                    @click="isExpanded = true" 
                                    class="mt-1 xs:mt-2 hover:underline">
                                    Xem thêm
                                </button>
                                <button 
                                    v-if="!isDesktop && isExpanded" 
                                    @click="isExpanded = false" 
                                    class="mt-1 xs:mt-2 hover:underline">
                                    Thu gọn
                                </button>
                            </div>

                            <div class="flex flex-wrap gap-2 xs:gap-4">
                                <!-- Read Button -->
                                <router-link 
                                    to="/detail" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-3 xs:px-4 py-2 sm:px-6 sm:py-3  border-2 font-medium rounded-lg">
                                    ĐỌC SÁCH
                                </router-link>

                                <!-- Favorite Button -->
                                <button 
                                    @click="toggleFavorite" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-3 xs:px-4 py-2 sm:px-6 sm:py-3 border-2 font-medium rounded-lg flex items-center gap-2">
                                    <i 
                                        :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'">
                                    </i> 
                                    <span>{{ isFavorite ? 'Đã yêu thích' : 'Yêu thích' }}</span>
                                </button>

                                <!-- Share Button -->
                                <button 
                                    @click="shareOnFacebook" 
                                    class="w-full sm:w-auto flex-grow sm:flex-grow-0 px-3 xs:px-4 py-2 sm:px-6 sm:py-3 border-2 font-medium rounded-lg flex items-center gap-2">
                                    <i class="fas fa-share"></i> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Related Books Section -->
                <div class="mt-6 xs:mt-12 rounded-2xl shadow-lg p-4 xs:p-6 lg:p-8">
                    <h2 class="text-base xs:text-lg sm:text-2xl text-center font-bold mb-4 xs:mb-8 text-gray-900">SÁCH CÙNG THỂ LOẠI</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6">
                        <div 
                            v-for="book in BOOK_RELATEDS" 
                            :key="book.id" 
                            class="flex flex-col items-center p-2 xs:p-4 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transform transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                            <img 
                                :src="book.image" 
                                alt="Book Image" 
                                class="h-32 xs:h-40 sm:h-48 w-auto rounded-md object-cover">
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="p-2 xs:p-4 sm:p-6">
                <div class="text-center space-y-1 xs:space-y-2">
                    <p class="font-semibold text-sm">BẢN QUYỀN NHÀ XUẤT BẢN TỔNG HỢP TP. HCM</p>
                    <p class="text-xs sm:text-sm">Địa chỉ: 62 Nguyễn Thị Minh Khai, Quận 1, TP. HCM</p>
                    <p class="text-xs sm:text-sm">Điện thoại: 
                        <a href="tel:(028)38256804">(028) 38 256 804</a>, 
                        <a href="tel:(028)38256713">(028) 38 256 713</a>, 
                        <a href="tel:(028)38296764">(028) 38 296 764</a>
                    </p>
                    <p class="text-xs sm:text-sm">Email: 
                        <a href="mailto:tonghop@nxbhcm.com.vn">tonghop@nxbhcm.com.vn</a>
                    </p>
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
                Không chỉ là một hành trình du lịch, mà còn là một cơ hội để hiểu thêm về văn hóa, con người Huế. Hãy để Huế trở thành một phần của trái tim bạn qua từng trang sách và từng bước chân trên mảnh đất cổ đ này.
            `,
            BOOK_RELATEDS
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

        Fancybox.bind("[data-fancybox]", {
            Toolbar: true,
            Thumbs: false,
            Image: {
                zoom: true
            },    
        });    
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
        },
    },
};

export { BookPreviewComponent };
