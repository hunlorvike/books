import { pages } from '../core/pages.js';
import { highlightDB } from '../core/db.js';

const BookDetailComponent = {
	name: 'BookDetailComponent',
	template: `
        <section class="min-h-screen bg-gray-50 dark:bg-gray-900" @contextmenu.prevent="openContextMenu">
            <!-- Context Menu -->
            <div v-if="contextMenu.visible" class="absolute z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2" :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
                <button @click="addHighlight" class="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Thêm Highlight</button>
                <button @click="removeHighlight" class="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Xoá Highlight</button>
            </div>
            
            <!-- Header -->
            <header class="fixed top-0 left-0 w-full z-10 p-4 shadow-md bg-white dark:bg-gray-800 dark:text-white">
                <div class="container mx-auto flex items-center justify-between">
                    <h1 class="text-[1.125em] sm:text-[1.25em] font-semibold flex items-center gap-2 dark:text-white">
                        <router-link to="/" class="flex items-center gap-2">
                            <i class="fas fa-long-arrow-alt-left"></i>
                            <span class="hidden sm:block">Cẩm nang Du lịch Huế</span>
                        </router-link>
                    </h1>
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <button 
                            class="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all shadow bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white text-sm sm:text-base"
                            @click="toggleMenu('tableOfContents')"
                        >
                            <i class="fas fa-bars sm:text-lg"></i>
                        </button>
                        <button 
                            class="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all shadow bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white text-sm sm:text-base"
                            @click="toggleMenu('settingsModal')"
                        >
                            <i class="fas fa-cog sm:text-lg"></i>
                        </button>
                        <button 
                            class="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all shadow bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white text-sm sm:text-base"
                            @click="toggleFullScreen"
                        >
                            <i class="fas fa-expand sm:text-lg"></i>
                        </button>
                        <button 
                            class="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all shadow bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white text-sm sm:text-base"
                            @click="toggleDarkMode"
                        >
                            <i :class="['fas', isDarkMode ? 'fa-sun' : 'fa-moon', 'sm:text-lg']"></i>
                        </button>
                        <button 
                            class="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all shadow bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white text-sm sm:text-base"
                            @click="toggleBookmark"
                        >
                            <i :class="isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
                        </button>
                    </div>
                </div>
            </header>
    
            <!-- Main Content -->
            <main class="mt-16 py-4 transition-all dark:bg-gray-800 dark:text-white flex flex-col items-center justify-between min-h-screen">
                <!-- Content Section -->
                <section class="p-4 w-full flex-grow flex items-center justify-center relative">
                    <div ref="contentRef" class="flex justify-center text-[0.875em] sm:text-[1em] leading-relaxed dark:text-gray-300" v-html="highlightedContent"></div>
    
                    <!-- Navigation Buttons -->
                    <button 
                        @click="goToPreviousPage" 
                        :disabled="currentPage === 0" 
                        class="p-4 rounded-lg shadow-lg border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:border-transparent absolute left-4 top-1/2 transform -translate-y-1/2 text-[1.25em] sm:text-[1.5em] md:text-[1.75em] lg:text-[2em] xl:text-[2.5em] transition-all duration-300"
                    >
                        <i class="fas fa-chevron-left text-xl sm:text-2xl md:text-3xl"></i>
                    </button>
    
                    <button 
                        @click="goToNextPage" 
                        :disabled="currentPage === pages.length - 1" 
                        class="p-4 rounded-lg shadow-lg border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:border-transparent absolute right-4 top-1/2 transform -translate-y-1/2 text-[1.25em] sm:text-[1.5em] md:text-[1.75em] lg:text-[2em] xl:text-[2.5em] transition-all duration-300"
                    >
                        <i class="fas fa-chevron-right text-xl sm:text-2xl md:text-3xl"></i>
                    </button>
                </section>
            </main>
    
            <!-- Table of Contents -->
            <div 
                :class="{'translate-x-0': isTableOfContentsOpen, 'translate-x-full': !isTableOfContentsOpen}" 
                class="fixed inset-y-0 right-0 z-30 w-80 shadow-lg border-l transform transition-transform duration-300 dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-800"
            >
                <!-- Header -->
                <div class="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <h2 class="text-[1.125em] sm:text-[1.25em] font-semibold dark:text-white text-gray-800">Mục lục</h2>
                    <button class="text-gray-500 dark:text-gray-400" @click="closeMenu('tableOfContents'); showBookmarkedOnly = false">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
    
                <!-- Toggle Button -->
                <div class="p-4 border-b dark:border-gray-700 flex justify-end">
                    <button 
                        @click="toggleBookmarkedView"
                        class="w-full text-sm px-4 py-2 rounded transition-all 
                            p-4 rounded-lg shadow-lg border-2 border-primary text-primary bg-transparent 
                            hover:bg-primary hover:text-white hover:border-transparent
                            focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        {{ showBookmarkedOnly ? 'Xem tất cả trang' : 'Xem trang đánh dấu' }}
                    </button>
                </div>
    
                <!-- Content List -->
                <ul class="divide-y divide-gray-200 dark:divide-gray-700 p-4">
                    <li 
                        v-for="(item, index) in filteredTableOfContents" 
                        :key="index" 
                        class="flex justify-between items-center px-4 py-3 text-[0.875em] sm:text-[1em] hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded"
                    >
                        <button 
                            class="text-left text-primary font-medium hover:underline flex-1"
                            @click="goToPage(item.pageIndex)"
                        >
                            {{ item.title }}
                        </button>
                        <i 
                            v-if="bookmarks.includes(item.pageIndex)" 
                            class="fas fa-bookmark text-yellow-500"
                            aria-label="Đã đánh dấu trang"
                        ></i>
                    </li>
                </ul>
            </div>
    
            <!-- Settings Modal -->
            <div v-if="isSettingsModalOpen" class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeMenu('settingsModal')">
                <div class="relative w-96 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 dark:text-white text-gray-900" @click.stop>
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Cài đặt</h2>
                        <button class="text-gray-500 dark:text-gray-400" @click="closeMenu('settingsModal')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
    
                    <!-- Primary Color -->
                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Màu chủ đạo</label>
                        <input 
                            type="color" 
                            v-model="settings.primaryColor"
                            class="w-full h-10 rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600 focus:outline-none"
                        >
                    </div>
    
                    <!-- Font Settings -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium dark:text-gray-300">Phông chữ</label>
                        <select 
                            v-model="settings.fontFamily" 
                            class="w-full px-4 py-2 mt-2 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none"
                        >
                            <option v-for="font in fontOptions" :key="font.value" :value="font.value">
                                {{ font.label }}
                            </option>
                        </select>
                    </div>
    
                    <!-- Font Size -->
                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Cỡ chữ</label>
                        <div class="flex items-center justify-between">
                            <!-- Slider -->
                            <div class="w-full flex items-center">
                                <input
                                    type="range"
                                    min="12"
                                    max="32"
                                    v-model="settings.fontSize"
                                    step="2"
                                    class="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none focus:outline-none"
                                >
                            </div>
                            <!-- Font Size Display -->
                            <span class="ml-4 text-lg font-semibold text-gray-800 dark:text-white">{{ settings.fontSize }}</span>
                        </div>
                    </div>
    
                    <div class="flex justify-end">
                        <button 
                            @click="saveSettings" 
                            class="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-80 dark:bg-primary dark:text-white transition-all duration-300"
                        >
                            Lưu cài đặt
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="isTableOfContentsOpen" class="fixed inset-0 bg-black bg-opacity-30 z-20" @click="closeMenu('tableOfContents'); showBookmarkedOnly = false"></div>
        </section>
    `,
	data() {
		return {
			dropdownOpen: false,
			isTableOfContentsOpen: false,
			isSettingsModalOpen: false,
			openChapters: {},
			tableOfContents: [
				{ title: "Trang bìa", pageIndex: 0 },
				{ title: "Nội dung chính", pageIndex: 1 },
				{ title: "Video và giới thiệu", pageIndex: 2 },
				{ title: "Nội dung chờ", pageIndex: 3 },
			],
			pages,
			currentPage: 0,
			fontOptions: [
				{ value: 'Arial', label: 'Arial' },
				{ value: 'Georgia', label: 'Georgia' },
				{ value: 'Times New Roman', label: 'Times New Roman' },
				{ value: 'Courier New', label: 'Courier New' },
				{ value: 'Verdana', label: 'Verdana' },
				{ value: 'Tahoma', label: 'Tahoma' },
				{ value: 'Roboto', label: 'Roboto' },
			],
			showBookmarkedOnly: false,
			bookmarks: [],
			highlightText: {
				id: '',
				content: '',
				pageIndex: 0,
				startOffset: 0,
				endOffset: 0,
			},
			highlights: [],
			contextMenu: {
				visible: false,
				x: 0,
				y: 0,
			},
		};
	},
	computed: {
		settings() {
			return this.$store.getters.theme;
		},
		isDarkMode() {
			return this.settings.theme === 'dark';
		},
		filteredTableOfContents() {
			return this.showBookmarkedOnly
				? this.tableOfContents.filter(item => this.bookmarks.includes(item.pageIndex))
				: this.tableOfContents;
		},
		isBookmarked() {
			return this.bookmarks.includes(this.currentPage);
		},
		highlightedContent() {
			return this.applyHighlights(this.pages[this.currentPage]);
		},
	},
	methods: {
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
		goToPage(pageIndex) {
			this.currentPage = pageIndex;
		},
		goToNextPage() {
			if (this.currentPage < this.pages.length - 1) {
				this.currentPage++;
			}
		},
		goToPreviousPage() {
			if (this.currentPage > 0) {
				this.currentPage--;
			}
		},
		saveSettings() {
			this.$store.dispatch("updateTheme", {
				key: 'primaryColor',
				value: this.settings.primaryColor
			});
			this.$store.dispatch("updateTheme", {
				key: 'fontFamily',
				value: this.settings.fontFamily
			});
			this.$store.dispatch("updateTheme", {
				key: 'fontSize',
				value: this.settings.fontSize
			});
			this.closeMenu("settingsModal");
		},
		toggleDarkMode() {
			this.$store.dispatch("updateTheme", {
				key: 'theme',
				value: this.isDarkMode ? 'light' : 'dark'
			});
		},
		toggleBookmarkedView() {
			this.showBookmarkedOnly = !this.showBookmarkedOnly;
		},
		loadBookmarks() {
			const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
			this.bookmarks = savedBookmarks;
		},
		saveBookmarks() {
			localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
		},
		toggleBookmark() {
			if (this.isBookmarked) {
				this.bookmarks = this.bookmarks.filter(page => page !== this.currentPage);
			} else {
				this.bookmarks.push(this.currentPage);
			}
			this.saveBookmarks();
		},
		saveHighlights() {
			localStorage.setItem('highlights', JSON.stringify(this.highlights));
		},
		async loadHighlights() {
			try {
				const pageHighlights = await highlightDB.getHighlights(this.currentPage);
				this.highlights = pageHighlights;
			} catch (error) {
				console.error('Error loading highlights:', error);
			}
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
					highlightSpan.classList.add('highlight');
					highlightSpan.setAttribute('id', highlight.id);
					highlightSpan.textContent = range.toString();

					range.deleteContents();
					range.insertNode(highlightSpan);
				}
			}

			return tempDiv.innerHTML;
		},
		async addHighlight() {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const range = selection.getRangeAt(0);

			const content = this.$refs.contentRef;

			const startOffset = this.getTextOffset(content, range.startContainer, range.startOffset);
			const endOffset = this.getTextOffset(content, range.endContainer, range.endOffset);

			let highlightToSave = {
				id: Date.now().toString(36) + Math.random().toString(36).substr(2),
				content: selection.toString().trim(),
				pageIndex: this.currentPage,
				startOffset,
				endOffset,
			};

			this.highlights.push(highlightToSave);

			try {
				await highlightDB.saveHighlight(highlightToSave);
			} catch (error) {
				console.error('Error saving highlight:', error);
			} finally {
				this.closeContextMenu();
			}
		},
		async removeHighlight() {
			const selection = window.getSelection();

			if (selection.isCollapsed || selection.toString().trim() === '') {
				this.contextMenu.visible = false;
				return;
			}

			const highlightElement = selection.anchorNode.parentElement.closest('.highlight');
			if (!highlightElement) return;

			const highlightId = highlightElement.id;

			try {
				await highlightDB.deleteHighlight(highlightId);

				this.highlights = this.highlights.filter(h => h.id !== highlightId);

				highlightElement.outerHTML = highlightElement.textContent;
			} catch (error) {
				console.error('Lỗi xóa highlight:', error);
			} finally {
				this.closeContextMenu();
			}
		},
		openContextMenu(event) {
			event.preventDefault();

			const selection = window.getSelection();

			if (selection.isCollapsed || selection.toString().trim() === '') {
				this.contextMenu.visible = false;
				return;
			}

			this.contextMenu = {
				visible: true,
				x: event.clientX,
				y: event.clientY,
			};
		},
		closeContextMenu() {
			this.contextMenu.visible = false;
		},
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
					current.content = this.pages[current.pageIndex].slice(current.after.textStartOffset, current.after.textEndOffset);
					this.highlights.splice(i + 1, 1);
					i--;
				}
			}
		},
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	},
	watch: {
		currentPage: {
			handler: 'loadHighlights',
			immediate: true
		}
	},
	async mounted() {
		try {
			await highlightDB.openDatabase();

			this.loadBookmarks();

			document.addEventListener('click', this.closeContextMenu);
			document.addEventListener('mouseup', this.openContextMenu);
		} catch (error) {
			console.error('Initialization error:', error);
		}
	},
	beforeDestroy() {
		document.removeEventListener('mouseup', this.openContextMenu);
		document.removeEventListener('click', this.closeContextMenu);
	}
};

export { BookDetailComponent };