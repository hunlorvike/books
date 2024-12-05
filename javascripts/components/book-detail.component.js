import { PAGES, FONT_OPTIONS, THEME_OPTIONS, HIGHLIGHT_COLORS, SONG_OPTIONS } from '../core/const.js';
import { ScriptService } from '../core/utils.js';
const BookDetailComponent = {
	name: 'BookDetailComponent',

	template: `
    <section class="min-h-screen" @contextmenu.prevent="openContextMenu">
        <header class="p-2 xs:p-3 sm:p-4 shadow-md fixed top-0 left-0 w-full z-10">
            <div class="container mx-auto flex items-center justify-between h-10 xs:h-12 sm:h-14">
                <!-- Logo / Title -->
                <h1 class="text-[1em] xs:text-[1.5em] sm:text-[1.75em] font-bold leading-tight">
                    <router-link to="/" class="flex items-center gap-2 hover:underline">
                        Về trang chủ
                    </router-link>
                </h1>

                <!-- Header Buttons -->
                <div class="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
                    <!-- Fullscreen Button -->
                    <button 
                        @click="toggleFullScreen"
                        class="p-2 sm:p-3 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f] 
                        shadow-md transition duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg">
                        <i class="fas fa-expand"></i>
                    </button>

                    <!-- Music Button -->
                    <button 
                        @click="toggleMenu('musicModal')"
                        class="p-2 sm:p-3 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f] 
                        shadow-md transition duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg">
                        <i class="fas fa-music"></i>
                    </button>

                    <!-- Settings Button -->
                    <button
                        @click="toggleMenu('settingsModal')"
                        class="p-2 sm:p-3 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f] 
                        shadow-md transition duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg">
                        <i class="fas fa-cog"></i>
                    </button>

                    <!-- Table of Contents Button -->
                    <button 
                        @click="toggleMenu('notesOrContentsPanel')"
                        class="p-2 sm:p-3 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f] 
                        shadow-md transition duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </header>

        <main class="py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-12" style="padding-top: 80px;">
            <section class="p-4 w-full relative">
                <!-- Content -->
                <div ref="contentRef" class="flex justify-center text-sm sm:text-base leading-relaxed" v-html="highlightedContent" v-execute-script></div>

                <!-- Desktop Navigation Buttons -->
                <button 
                    @click="navigatePage('previous')" 
                    :disabled="currentPage === 0" 
                    class="hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 
                        border-2 border-[#a1ce9f] rounded-full shadow-md fixed left-4 top-1/2 transform -translate-y-1/2 
                        bg-white text-[#a1ce9f] 
                        transition-all duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg 
                        disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-chevron-left text-lg md:text-xl lg:text-2xl"></i>
                </button>

                <button 
                    @click="navigatePage('next')" 
                    :disabled="currentPage === PAGES.length - 1" 
                    class="hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16
                        border-2 border-[#a1ce9f] rounded-full shadow-md fixed right-4 top-1/2 transform -translate-y-1/2 
                        bg-white text-[#a1ce9f] 
                        transition-all duration-300 ease-in-out 
                        hover:bg-[#f0f7ef] hover:shadow-lg 
                        disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-chevron-right text-lg md:text-xl lg:text-2xl"></i>
                </button>

                <!-- Mobile Pagination -->
				<div class="sm:hidden py-4 flex justify-center items-center space-x-4">
					<button 
						@click="navigatePage('previous')" 
						:disabled="currentPage === 0" 
						class="px-4 py-2 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f]
						shadow-md transition duration-300 ease-in-out
						hover:bg-[#f0f7ef] hover:shadow-lg
						disabled:opacity-50 disabled:cursor-not-allowed">
						<i class="fas fa-chevron-left"></i>
					</button>

					<button 
						@click="navigatePage('next')" 
						:disabled="currentPage === PAGES.length - 1" 
						class="px-4 py-2 rounded-lg border-2 border-[#a1ce9f] bg-white text-[#a1ce9f]
						shadow-md transition duration-300 ease-in-out
						hover:bg-[#f0f7ef] hover:shadow-lg
						disabled:opacity-50 disabled:cursor-not-allowed">
						<i class="fas fa-chevron-right"></i>
					</button>
				</div>

            </section>
        </main>

        <div 
            :class="{'translate-x-0': isNotesOrContentsPanelOpen, 'translate-x-full': !isNotesOrContentsPanelOpen}" 
            class="fixed bg-white text-black inset-y-0 right-0 z-30 w-80 shadow-xl border-l transform transition-transform duration-300 overflow-y-auto"
        >
            <!-- Header with Tabs -->
            <div class="sticky top-0 bg-white border-b z-10">
                <div class="p-4 flex justify-between items-center">
                    <div class="flex space-x-6">
                        <button 
                            :class="{'text-[#a1ce9f] border-b-2 border-[#a1ce9f]': activeTab === 'notes', 
                                    'text-gray-500 hover:text-gray-700': activeTab !== 'notes'}"
                            @click="activeTab = 'notes'"
                            class="pb-2 text-lg font-medium transition-all"
                        >
                            <i class="fas fa-sticky-note mr-2"></i>Ghi chú
                        </button>
                        <button 
                            :class="{'text-[#a1ce9f] border-b-2 border-[#a1ce9f]': activeTab === 'tableOfContents',
                                    'text-gray-500 hover:text-gray-700': activeTab !== 'tableOfContents'}"
                            @click="activeTab = 'tableOfContents'"
                            class="pb-2 text-lg font-medium transition-all"
                        >
                            <i class="fas fa-list mr-2"></i>Mục lục
                        </button>
                    </div>
                    <button 
                        class="text-gray-500 hover:text-red-500 transition-all"
                        @click="closeMenu('notesOrContentsPanel')"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="h-[calc(100vh-5rem)] overflow-y-auto">
                <!-- Notes Tab -->
                <div v-if="activeTab === 'notes'" class="p-4 space-y-4">
                    <ul class="space-y-3">
                        <li 
                            v-for="(item, index) in notes" 
                            :key="index" 
                            class="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div class="p-4">
                                <p class="text-gray-700 font-medium mb-3 line-clamp-2">
                                    {{ item.content }}
                                </p>
                                <div class="flex justify-end">
                                    <button 
                                        class="flex items-center px-3 py-1.5 text-sm rounded-md bg-white border border-red-400 text-red-400 
                                            hover:bg-red-50 transition-all duration-200"
                                        @click="deleteNote(index)"
                                    >
                                        <i class="fas fa-trash-alt text-xs"></i>
                                        <span class="ml-2">Xóa</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

				<div v-if="activeTab === 'tableOfContents'" class="divide-y divide-gray-100">
					<button 
						v-for="(item, index) in PAGES" 
						:key="index" 
						class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all duration-200 flex items-center justify-between group"
						:class="{'bg-gray-50': currentPage === index}"
						@click="currentPage = index"
					>
						<span class="font-medium text-gray-700 group-hover:text-[#a1ce9f] transition-colors truncate max-w-[calc(100%-1.5rem)]">
							{{ item.title }}
						</span>
						
						<i class="fas fa-chevron-right text-gray-400 group-hover:text-[#a1ce9f] text-sm transition-colors"></i>
					</button>
				</div>
            </div>
        </div>

        <div v-if="isNotesOrContentsPanelOpen" class="fixed inset-0 bg-black bg-opacity-30 z-20" @click="closeMenu('notesOrContentsPanel');"></div>

        <div
            v-if="isMusicModalOpen"
            class="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
            @click.self="closeMenu('musicModal')"
        >
            <div class="relative w-96 p-6 rounded-lg shadow-xl bg-white" @click.stop>
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Trình phát nhạc</h2>
                    <button class="text-gray-500 hover:text-red-500 transition-all" @click="closeMenu('musicModal')">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>

                <!-- Currently Playing -->
                <div class="text-center mb-6">
                    <h3 class="font-medium text-gray-800">
                        {{ musicState.currentSong ? musicState.currentSong.name : 'Chọn bài hát' }}
                    </h3>
                </div>

                <!-- Player Controls -->
                <div class="flex justify-center items-center space-x-8 mb-6">
                    <button class="text-gray-400 hover:text-[#a1ce9f] transition-all" @click="previousSong">
                        <i class="fas fa-backward text-xl"></i>
                    </button>
                    <button 
                        class="w-14 h-14 rounded-lg border-2 border-[#a1ce9f] flex items-center justify-center 
                            text-[#a1ce9f] hover:bg-[#f0f7ef] transition-all"
                        @click="togglePlay"
                    >
                        <i :class="['fas text-xl', musicState.isPlaying ? 'fa-pause' : 'fa-play']"></i>
                    </button>
                    <button class="text-gray-400 hover:text-[#a1ce9f] transition-all" @click="nextSong">
                        <i class="fas fa-forward text-xl"></i>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div class="mb-6">
                    <div 
                        class="relative h-2 bg-gray-100 rounded-lg cursor-pointer"
                        @click="seekToPosition($event)"
                    >
                        <div 
                            class="absolute left-0 top-0 h-full bg-[#a1ce9f] rounded-lg transition-all"
                            :style="{ width: musicState.progress + '%' }"
                        ></div>
                    </div>
                    <div class="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{{ formatTime(musicState.currentTime) }}</span>
                        <span>{{ formatTime(musicState.duration) }}</span>
                    </div>
                </div>

                <!-- Song List -->
                <div class="max-h-64 overflow-y-auto border-t divide-y divide-gray-100">
                    <div 
                        v-for="(song, index) in musicState.options" 
                        :key="index"
                        class="flex items-center justify-between p-3 cursor-pointer transition-all hover:bg-gray-50"
                        :class="[musicState.currentSongIndex === index ? 'bg-[#f0f7ef]' : '']"
                        @click="playSong(song, index)"
                    >
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-lg bg-[#f0f7ef] flex items-center justify-center">
                                <i :class="['fas', musicState.currentSongIndex === index ? 'fa-volume-up text-[#a1ce9f]' : 'fa-music text-gray-400']"></i>
                            </div>
                            <span class="font-medium" :class="[musicState.currentSongIndex === index ? 'text-[#a1ce9f]' : 'text-gray-700']">
                                {{ song.name }}
                            </span>
                        </div>
                        <i class="fas fa-play text-[#a1ce9f] opacity-0 group-hover:opacity-100 transition-all"></i>
                    </div>
                </div>
            </div>
        </div>
                
        <!-- Settings Modal -->
        <div v-if="isSettingsModalOpen" class="fixed bg-white text-black inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeMenu('settingsModal')">
            <div class="relative w-96 p-6 rounded-lg shadow-xl bg-white" @click.stop>
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Cài đặt</h2>
                    <button class="text-gray-500 hover:text-red-500 transition-all" @click="closeMenu('settingsModal')">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>

                <!-- Font Settings -->
                <div class="mb-5">
                    <label class="block text-sm font-medium mb-2">Phông chữ</label>
                    <div class="relative inline-block w-full">
                        <select v-model="settings.fontFamily" class="block w-full px-4 py-2 pr-10 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">
                            <option v-for="font in FONT_OPTIONS" :key="font.value" :value="font.value">
                                {{ font.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Background Color Settings -->
                <div class="mb-5">
                    <label class="block text-sm font-medium mb-2">Màu nền</label>
                    <select v-model="settings.theme" class="block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">
                        <option v-for="theme in THEME_OPTIONS" :key="theme.value" :value="theme.value">
                            {{ theme.label }}
                        </option>
                    </select>
                </div>

                <!-- Font Size Settings -->
                <div class="mb-5">
                    <label class="block text-sm font-medium mb-2">Cỡ chữ</label>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 flex-grow justify-center">
                            <button 
                                @click="changeFontSize(-1)" 
                                class="px-4 py-1 border-2 border-[#a1ce9f] rounded-lg bg-white text-[#a1ce9f] 
                                    shadow-md transition duration-300 ease-in-out 
                                    hover:bg-[#f0f7ef] hover:shadow-lg">
                                -
                            </button>
                            <span class="text-lg font-semibold">{{ settings.fontSize }}</span>
                            <button 
                                @click="changeFontSize(1)" 
                                class="px-4 py-1 border-2 border-[#a1ce9f] rounded-lg bg-white text-[#a1ce9f] 
                                    shadow-md transition duration-300 ease-in-out 
                                    hover:bg-[#f0f7ef] hover:shadow-lg">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end">
                    <button 
                        @click="saveThemeSettings" 
                        class="px-6 py-2 font-medium rounded-lg border-2 border-[#a1ce9f] bg-[#a1ce9f] text-white 
                            shadow-md transition duration-300 ease-in-out 
                            hover:bg-[#89a88b] hover:shadow-lg">
                        Lưu cài đặt
                    </button>
                </div>
            </div>
        </div>

        <!-- Context Menu -->
        <div v-if="contextMenu.visible" 
            class="absolute z-50 bg-white text-black shadow-xl rounded-lg overflow-hidden w-56"
            :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
            
            <!-- Highlight color buttons (show only when text is selected) -->
            <div v-if="contextMenu.selection">
                <div class="flex space-x-3 p-3 border-b border-gray-200">
                    <button 
                        v-for="color in HIGHLIGHT_COLORS" 
                        :key="color" 
                        @click="addHighlight(color)" 
                        class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors duration-200" 
                        :style="{ backgroundColor: color }">
                    </button>
                    <button @click="removeHighlight" class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors duration-200 flex items-center justify-center">
                        <i class="fas fa-trash text-gray-500 hover:text-gray-700 transition-colors duration-200"></i>
                    </button>
                </div>
				<button 
					@click="saveNote" 
					class="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
				>
					<i class="fas fa-pencil-alt text-gray-500 hover:text-gray-700 transition-colors duration-200"></i>
					<span class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">Thêm ghi chú</span>
				</button>

				<button 
					@click="saveReadingPosition" 
					class="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
				>
					<i class="fas fa-bookmark text-gray-500 hover:text-gray-700 transition-colors duration-200"></i>
					<span class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">Lưu vị trí đọc</span>
				</button>

            </div>

            <button 
                @click="clearSavedReadingPosition" 
                class="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
            >
                <i class="fas fa-trash text-gray-500 hover:text-gray-700 transition-colors duration-200"></i>
                <span class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">Xóa vị trí đã lưu</span>
            </button>

        </div>
        
    </section>
    `,

	data() {
		return {
			contextMenu: {
				visible: false,
				x: 0,
				y: 0,
				selection: null,
			},
			dropdownOpen: false,
			FONT_OPTIONS,
			HIGHLIGHT_COLORS,
			highlightText: {
				id: '',
				content: '',
				color: '',
				pageIndex: 0,
				startOffset: 0,
				endOffset: 0,
			},
			highlights: [],
			isSettingsModalOpen: false,
			isNotesOrContentsPanelOpen: false,
			PAGES,
			currentPage: 0,
			THEME_OPTIONS,
			isMusicModalOpen: false,
			musicState: {
				player: null,
				currentSong: null,
				currentSongIndex: -1,
				isPlaying: false,
				currentTime: 0,
				duration: 0,
				progress: 0,
				options: SONG_OPTIONS
			},
			notes: [],
			note: '',
			activeTab: 'notes',
			selectionTimer: null,
		};
	},

	computed: {
		settings() {
			return this.$store.getters.theme;
		},

		highlightedContent() {
			return this.applyHighlights(this.PAGES[this.currentPage].content);
		}
	},

	methods: {
		// Initialization methods
		initializeSwiper() {
			if (this.swiperInstance) {
				this.swiperInstance.destroy(true, true);
				this.swiperInstance = null;
			}

			this.$nextTick(() => {
				const swiperContainer = this.$refs.contentRef.querySelector('.swiper-container');
				const swiperWrapper = swiperContainer?.querySelector('.swiper-wrapper');

				if (!swiperContainer || !swiperWrapper) {
					return;
				}

				this.swiperInstance = new Swiper('.swiper-container', {
					loop: false,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					autoplay: {
						delay: 3000,
						disableOnInteraction: false,
					},
				});
			});
		},

		// UI interaction methods
		toggleFullScreen() {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		},

		toggleMenu(menu) {
			this[`is${this.capitalize(menu)}Open`] = !this[`is${this.capitalize(menu)}Open`];
		},

		closeMenu(menu) {
			this[`is${this.capitalize(menu)}Open`] = false;
		},

		navigatePage(direction) {
			if (direction === 'next' && this.currentPage < this.PAGES.length - 1) {
				this.currentPage++;
			} else if (direction === 'previous' && this.currentPage > 0) {
				this.currentPage--;
			}
		},

		// Settings methods
		saveThemeSettings() {
			this.$store.dispatch("updateTheme", {
				key: 'fontFamily',
				value: this.settings.fontFamily
			});
			this.$store.dispatch("updateTheme", {
				key: 'theme',
				value: this.settings.theme
			});
			this.$store.dispatch("updateTheme", {
				key: 'fontSize',
				value: this.settings.fontSize
			});
			this.closeMenu("settingsModal");
		},

		changeFontSize(delta) {
			const newSize = this.settings.fontSize + delta * 2;
			if (newSize >= 12 && newSize <= 24) {
				this.settings.fontSize = newSize;
			}
		},

		// Highlight methods
		saveHighlights() {
			localStorage.setItem('highlights', JSON.stringify(this.highlights));
			this.loadHighlights();
		},

		loadHighlights() {
			const storedHighlights = localStorage.getItem('highlights');
			if (!storedHighlights) {
				this.highlights = [];
				return;
			}

			const allHighlights = JSON.parse(storedHighlights);
			this.highlights = allHighlights.filter(h => h.pageIndex === this.currentPage);
		},

		applyHighlights(content) {
			if (!this.highlights.length) return content;

			const highlightsOnCurrentPage = this.highlights
				.filter(h => h.pageIndex === this.currentPage)
				.sort((a, b) => a.startOffset - b.startOffset);

			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = content;

			for (const highlight of highlightsOnCurrentPage.reverse()) {
				const range = document.createRange();
				const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);

				let currentNode;
				let currentOffset = 0;
				let startNode = null;
				let startNodeOffset = 0;
				let endNode = null;
				let endNodeOffset = 0;

				while ((currentNode = walker.nextNode())) {
					const nodeLength = currentNode.length;

					if (currentOffset <= highlight.startOffset && currentOffset + nodeLength >= highlight.startOffset) {
						startNode = currentNode;
						startNodeOffset = highlight.startOffset - currentOffset;
					}

					if (currentOffset <= highlight.endOffset && currentOffset + nodeLength >= highlight.endOffset) {
						endNode = currentNode;
						endNodeOffset = highlight.endOffset - currentOffset;
					}

					currentOffset += nodeLength;

					if (startNode && endNode) break;
				}

				if (startNode && endNode) {
					range.setStart(startNode, startNodeOffset);
					range.setEnd(endNode, endNodeOffset);

					const highlightSpan = document.createElement('span');
					highlightSpan.classList.add('highlight', `bg-[${highlight.color}]`, 'text-black');
					highlightSpan.setAttribute('id', `${highlight.id}`);
					highlightSpan.textContent = range.toString();

					range.deleteContents();
					range.insertNode(highlightSpan);
				}
			}
			return tempDiv.innerHTML;
		},

		addHighlight(color) {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const range = selection.getRangeAt(0);

			let startContainer = range.startContainer;
			let endContainer = range.endContainer;
			let startOffset = range.startOffset;
			let endOffset = range.endOffset;

			if (startContainer.nodeType === Node.TEXT_NODE) {
				const text = startContainer.textContent;

				while (startOffset > 0 && !/\s/.test(text[startOffset - 1])) {
					startOffset--;
				}

				range.setStart(startContainer, startOffset);
			}

			if (endContainer.nodeType === Node.TEXT_NODE) {
				const text = endContainer.textContent;

				while (endOffset < text.length && !/\s/.test(text[endOffset])) {
					endOffset++;
				}

				range.setEnd(endContainer, endOffset);
			}

			startContainer = range.startContainer;
			endContainer = range.endContainer;

			const content = this.$refs.contentRef;
			const startTextOffset = this.getTextOffset(content, range.startContainer, range.startOffset);
			const endTextOffset = this.getTextOffset(content, range.endContainer, range.endOffset);

			const highlight = {
				id: Date.now().toString(36) + Math.random().toString(36).substr(2),
				content: range.toString(),
				color: color,
				pageIndex: this.currentPage,
				startOffset: startTextOffset,
				endOffset: endTextOffset,
			};

			this.highlights.push(highlight);
			this.saveHighlights();
			this.closeContextMenu();
		},

		removeHighlight() {
			const selection = window.getSelection();

			if (selection.isCollapsed || selection.toString().trim() === '') {
				this.contextMenu.visible = false;
				return;
			}

			const range = selection.getRangeAt(0);

			const container = range.commonAncestorContainer;
			const highlightsToRemove = [];
			const walker = document.createTreeWalker(
				container,
				NodeFilter.SHOW_ELEMENT,
				{
					acceptNode: (node) => {
						return node.classList.contains('highlight') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
					}
				}
			);

			let currentNode = walker.nextNode();
			while (currentNode) {
				const highlightRange = document.createRange();
				highlightRange.selectNodeContents(currentNode);
				if (range.intersectsNode(currentNode)) {
					highlightsToRemove.push(currentNode);
				}
				currentNode = walker.nextNode();
			}

			highlightsToRemove.forEach(highlight => {
				this.highlights = this.highlights.filter(h => h.id !== highlight.id);
				highlight.replaceWith(...highlight.childNodes);
			});

			this.saveHighlights();
			this.closeContextMenu();
		},

		// Context menu methods
		openContextMenu(event) {
			event.preventDefault();
			event.stopPropagation();

			const selection = window.getSelection();

			const hasSelection = !selection.isCollapsed && selection.toString().trim() !== '';

			if (hasSelection) {
				const isTouchEvent = event.type.startsWith('touch');

				const x = isTouchEvent ? event.changedTouches[0].pageX : event.pageX;
				const y = isTouchEvent ? event.changedTouches[0].pageY : event.pageY;

				const menuWidth = 224;
				const menuHeight = 200;
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				let adjustedX = x;
				let adjustedY = y;

				if (x + menuWidth > viewportWidth) {
					adjustedX = viewportWidth - menuWidth;
				}

				if (y + menuHeight > viewportHeight) {
					adjustedY = viewportHeight - menuHeight;
				}

				this.contextMenu = {
					visible: true,
					x: adjustedX,
					y: adjustedY,
					selection: selection
				};
			} else {
				this.contextMenu = {
					visible: true,
					x: event.pageX,
					y: event.pageY,
					selection: ''
				};
			}
		},

		closeContextMenu() {
			this.contextMenu.visible = false;
			this.contextMenu.selection = null;
		},

		// Utility methods
		getTextOffset(root, node, offset) {
			let textOffset = 0;
			const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
			let currentNode;

			while ((currentNode = walk.nextNode()) && currentNode !== node) {
				textOffset += currentNode.length;
			}

			return textOffset + (currentNode === node ? offset : 0);
		},

		mergeOverlappingHighlights() {
			this.highlights.sort((a, b) => a.after.textStartOffset - b.after.textStartOffset || b.after.textEndOffset - a.after.textEndOffset);

			for (let i = 0; i < this.highlights.length - 1; i++) {
				const current = this.highlights[i];
				const next = this.highlights[i + 1];

				if (current.pageIndex === next.pageIndex && next.after.textStartOffset <= current.after.textEndOffset) {
					current.after.textEndOffset = Math.max(current.after.textEndOffset, next.after.textEndOffset);
					current.after.htmlEndOffset = Math.max(current.after.htmlEndOffset, next.after.htmlEndOffset);
					current.content = this.PAGES[current.pageIndex].slice(current.after.textStartOffset, current.after.textEndOffset);
					this.highlights.splice(i + 1, 1);
					i--;
				}
			}
		},

		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},

		saveToLocalStorage(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},

		loadFromLocalStorage(key, defaultValue = []) {
			return JSON.parse(localStorage.getItem(key)) || defaultValue;
		},

		toggleState(array, value) {
			const index = array.indexOf(value);
			if (index > -1) {
				array.splice(index, 1);
			} else {
				array.push(value);
			}
		},

		// Music player methods
		playSong(song, index) {
			if (this.musicState.player) {
				this.musicState.player.pause();
			}

			this.musicState.player = new Audio(song.url);
			this.musicState.currentSong = song;
			this.musicState.currentIndex = index;

			this.musicState.player.addEventListener('timeupdate', this.updateProgress);
			this.musicState.player.addEventListener('loadedmetadata', () => {
				this.musicState.duration = this.musicState.player.duration;
			});
			this.musicState.player.addEventListener('ended', this.handleSongEnd);

			this.musicState.player.play();
			this.musicState.isPlaying = true;
		},

		togglePlay() {
			if (!this.musicState.player) {
				if (this.musicState.options.length) {
					this.playSong(this.musicState.options[0], 0);
				}
				return;
			}

			if (this.musicState.isPlaying) {
				this.musicState.player.pause();
			} else {
				this.musicState.player.play();
			}
			this.musicState.isPlaying = !this.musicState.isPlaying;
		},

		updateProgress() {
			if (!this.musicState.player) return;
			this.musicState.currentTime = this.musicState.player.currentTime;
			this.musicState.progress = (this.musicState.player.currentTime / this.musicState.player.duration) * 100;
		},

		seekToPosition(event) {
			if (!this.musicState.player) return;
			const rect = event.target.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const percentage = x / rect.width;
			this.musicState.player.currentTime = percentage * this.musicState.player.duration;
		},

		formatTime(seconds) {
			if (!seconds) return '00:00';
			const mins = Math.floor(seconds / 60);
			const secs = Math.floor(seconds % 60);
			return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
		},

		previousSong() {
			if (this.musicState.currentIndex > 0) {
				this.playSong(
					this.musicState.options[this.musicState.currentIndex - 1],
					this.musicState.currentIndex - 1
				);
			}
		},

		nextSong() {
			if (this.musicState.currentIndex < this.musicState.options.length - 1) {
				this.playSong(
					this.musicState.options[this.musicState.currentIndex + 1],
					this.musicState.currentIndex + 1
				);
			}
		},

		handleSongEnd() {
			if (this.musicState.currentIndex < this.musicState.options.length - 1) {
				this.nextSong();
			} else {
				this.musicState.isPlaying = false;
				this.musicState.currentTime = 0;
				this.musicState.progress = 0;
			}
		},

		cleanup() {
			if (this.musicState.player) {
				this.musicState.player.pause();
				this.musicState.player.removeEventListener('timeupdate', this.updateProgress);
				this.musicState.player.removeEventListener('ended', this.handleSongEnd);
				this.musicState.player = null;
			}
		},

		saveReadingPosition() {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const range = selection.getRangeAt(0);

			const startContainer = range.startContainer;
			const endContainer = range.endContainer;

			let startOffset = range.startOffset;
			let endOffset = range.endOffset;

			let startText = '';
			let endText = '';

			if (startContainer.nodeType === Node.TEXT_NODE) {
				const text = startContainer.textContent;
				const start = Math.max(0, startOffset - 20);
				const end = Math.min(text.length, startOffset + 20);
				startText = text.slice(start, end);
			}

			if (endContainer.nodeType === Node.TEXT_NODE) {
				const text = endContainer.textContent;
				const start = Math.max(0, endOffset - 20);
				const end = Math.min(text.length, endOffset + 20);
				endText = text.slice(start, end);
			}

			const position = {
				page: this.currentPage,
				startOffset,
				endOffset,
				startText,
				endText,
			};

			localStorage.setItem('readingPosition', JSON.stringify(position));
		},

		loadSavedReadingPosition() {
			const savedPosition = localStorage.getItem('readingPosition');

			if (savedPosition) {
				const confirmLoad = window.confirm("Bạn có muốn đến vị trí đọc cuối cùng của mình không?");

				if (confirmLoad) {
					const position = JSON.parse(savedPosition);
					this.currentPage = position.page;

					setTimeout(() => {
						const content = this.$refs.contentRef;
						const range = document.createRange();
						const textNodes = this.getTextNodesIn(content);

						let charCount = 0;
						let startNode, endNode, startOffset, endOffset;

						for (let i = 0; i < textNodes.length; i++) {
							const node = textNodes[i];
							const nodeLength = node.length;

							if (!startNode && charCount + nodeLength > position.startOffset) {
								startNode = node;
								startOffset = position.startOffset - charCount;
							}

							if (!endNode && charCount + nodeLength >= position.endOffset) {
								endNode = node;
								endOffset = position.endOffset - charCount;
								break;
							}

							charCount += nodeLength;
						}

						if (startNode && endNode) {
							range.setStart(startNode, startOffset);
							range.setEnd(endNode, endOffset);

							const selection = window.getSelection();
							selection.removeAllRanges();
							selection.addRange(range);

							range.startContainer.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
						}

						localStorage.removeItem('readingPosition');
					}, 0);
				}
			}
		},

		getTextNodesIn(node) {
			let textNodes = [];
			if (node.nodeType === 3) {
				textNodes.push(node);
			} else {
				const children = node.childNodes;
				for (let i = 0, len = children.length; i < len; ++i) {
					textNodes = textNodes.concat(this.getTextNodesIn(children[i]));
				}
			}
			return textNodes;
		},

		clearSavedReadingPosition() {
			localStorage.removeItem('readingPosition');
		},

		// Note methods
		loadNotes() {
			const storedNotes = localStorage.getItem('notes');

			if (storedNotes) {
				this.notes = JSON.parse(storedNotes);
			}
		},

		saveNote() {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const range = selection.getRangeAt(0);
			let startContainer = range.startContainer;
			let endContainer = range.endContainer;
			let startOffset = range.startOffset;
			let endOffset = range.endOffset;

			if (startContainer.nodeType === Node.TEXT_NODE) {
				const text = startContainer.textContent;

				while (startOffset > 0 && !/\s/.test(text[startOffset - 1])) {
					startOffset--;
				}
				range.setStart(startContainer, startOffset);
			}

			if (endContainer.nodeType === Node.TEXT_NODE) {
				const text = endContainer.textContent;

				while (endOffset < text.length && !/\s/.test(text[endOffset])) {
					endOffset++;
				}
				range.setEnd(endContainer, endOffset);
			}

			startContainer = range.startContainer;
			endContainer = range.endContainer;

			const noteContent = range.toString().trim();

			const note = {
				page: this.currentPage,
				content: noteContent,
			};

			this.notes.push(note);

			localStorage.setItem('notes', JSON.stringify(this.notes));

			alert("Thêm ghi chú thành công!");
		},

		deleteNote(index) {
			if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
				this.notes.splice(index, 1);

				localStorage.setItem('notes', JSON.stringify(this.notes));
			}
		},

		// Page change handler
		handlePageChange() {
			this.$nextTick(() => {
				ScriptService.clearExecutedScripts();

				if (localStorage.getItem('readingPosition')) {
					this.loadSavedReadingPosition();
				}

				this.loadHighlights();
				this.loadNotes();
				this.initializeSwiper();

				const content = this.$refs.contentRef;
				if (content) {
					ScriptService.executeScriptsInElement(content);
				}
			});
		}
	},

	watch: {
		currentPage: {
			handler() {
				this.$nextTick(() => {
					this.handlePageChange();
				})
			},
			immediate: true,
		},
	},

	mounted() {
		this.$nextTick(() => {
			const content = this.$refs.contentRef;
			if (content) {
				this.handlePageChange();
			}
		});

		document.addEventListener('click', this.closeContextMenu);
		document.addEventListener('contextmenu', this.openContextMenu);
	},

	beforeDestroy() {
		document.removeEventListener('click', this.closeContextMenu);
		document.removeEventListener('contextmenu', this.openContextMenu);

		this.cleanup();

		if (this.$refs.contentRef) {
			ScriptService.removeScripts(this.$refs.contentRef);
		}
		ScriptService.clearExecutedScripts();
	}
};

export { BookDetailComponent };