import { PAGES, FONT_OPTIONS, THEME_OPTIONS, HIGHLIGHT_COLORS, SONG_OPTIONS } from '../core/const.js';
import { highlightDB } from '../core/db.js';

const BookDetailComponent = {
	name: 'BookDetailComponent',

	template: `
        <section class="min-h-screen" @contextmenu.prevent="openContextMenu">
			<header class="p-2 xs:p-3 sm:p-4 shadow-md fixed top-0 left-0 w-full z-10">
				<div class="container mx-auto flex items-center justify-between h-10 xs:h-12 sm:h-14">
                    <h1 class="text-[1em] xs:text-[1.5em] sm:text-[1.75em] font-bold leading-tight">
						<router-link to="/" class="flex items-center gap-2 hover:underline">
							Về trang chủ
						</router-link>
					</h1>

					<div class="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
						<!-- Fullscreen Button -->
						<button 
							class="p-2 sm:p-3 rounded-lg transition duration-300 shadow-md"
							@click="toggleFullScreen"
						>
							<i class="fas fa-expand"></i>
						</button>

						<!-- Music Button -->
						<button 
							class="p-2 sm:p-3 rounded-lg transition duration-300 shadow-md"
							@click="toggleMenu('musicModal')"
						>
							<i class="fas fa-music"></i>
						</button>

						<!-- Settings Button -->
						<button 
							class="p-2 sm:p-3 rounded-lg transition duration-300 shadow-md"
							@click="toggleMenu('settingsModal')"
						>
							<i class="fas fa-cog"></i>
						</button>

						<!-- Table of Contents Button -->
						<button 
							class="p-2 sm:p-3 rounded-lg transition duration-300 shadow-md"
							@click="toggleMenu('tableOfContents')"
						>
							<i class="fas fa-bars"></i>
						</button>

					</div>
				</div>
			</header>

			<main 
				class="px-2 xs:px-4 sm:px-6 lg:px-12 py-4 xs:py-8 lg:py-12 flex flex-col items-center justify-between min-h-screen"
				style="padding-top: 80px;" 
				@touchstart="handleTouchStart" 
				@touchmove="handleTouchMove"
			>
				<!-- Content Section -->
				<section class="p-4 w-full flex-grow flex sm:items-center justify-center relative">
					<div ref="contentRef" class="flex justify-center text-[0.875em] sm:text-[1em] leading-relaxed" v-html="highlightedContent"></div>

					<!-- Navigation Buttons -->
					<button 
						@click="navigatePage('previous')" 
						:disabled="currentPage === 0" 
						class="hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 rounded-full shadow-md fixed left-4 top-1/2 transform -translate-y-1/2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<i class="fas fa-chevron-left text-lg md:text-xl lg:text-2xl"></i>
					</button>

					<button 
						@click="navigatePage('next')" 
						:disabled="currentPage === PAGES.length - 1" 
						class="hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 rounded-full shadow-md fixed right-4 top-1/2 transform -translate-y-1/2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<i class="fas fa-chevron-right text-lg md:text-xl lg:text-2xl"></i>
					</button>
				</section>
			</main>

            <!-- Table of Contents -->
            <div 
                :class="{'translate-x-0': isTableOfContentsOpen, 'translate-x-full': !isTableOfContentsOpen}" 
                class="fixed inset-y-0 right-0 z-30 w-80 shadow-lg border-l transform transition-transform duration-300 bg-white"
            >
                <!-- Header -->
                <div class="p-4 flex justify-between items-center border-b">
                    <h2 class="text-[1.125em] sm:text-[1.25em] font-semibold text-gray-800">Mục lục</h2>
                    <button class="text-gray-500 hover:text-red-500 transition-all" @click="closeMenu('tableOfContents');">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
    
                <!-- Content List -->
                <ul class="divide-y divide-gray-200 p-4">
                    <li 
                        v-for="(item, index) in PAGES" 
                        :key="index" 
                        class="flex justify-between items-center px-4 py-3 text-[0.875em] sm:text-[1em]"
                    >
                        <button 
                            class="text-left font-medium hover:underline flex-1"
                            @click="currentPage = index"
                        >
                            {{ item.title }}
                        </button>
                    </li>
                </ul>
            </div>

			<!-- Music Modal -->
			<div
				v-if="isMusicModalOpen"
				class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
				@click.self="closeMenu('musicModal')"
			>
				<div class="relative w-96 p-6 rounded-2xl shadow-xl bg-white" @click.stop>
					<div class="flex flex-col space-y-4">

						<!-- Currently Playing -->
						<div class="text-center">
							<h3 class="font-medium text-lg">{{ currentSong ? currentSong.name : 'Chọn bài hát' }}</h3>
						</div>

						<!-- Player Controls -->
						<div class="flex justify-center items-center space-x-6">
							<button class="text-gray-400 hover:text-gray-600 transition-all" @click="previousSong">
								<i class="fas fa-step-backward"></i>
							</button>
							<button class="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all" @click="togglePlay">
								<i :class="['fas', isPlaying ? 'fa-pause' : 'fa-play']"></i>
							</button>
							<button class="text-gray-400 hover:text-gray-600 transition-all" @click="nextSong">
								<i class="fas fa-step-forward"></i>
							</button>
						</div>

						<!-- Progress Bar -->
						<div class="w-full">
							<div 
								class="relative w-full h-1 bg-gray-200 rounded-full cursor-pointer"
								@click="seekToPosition($event)"
							>
								<div 
									class="absolute left-0 top-0 h-full bg-gray-500 rounded-full"
									:style="{ width: progress + '%' }"
								></div>
							</div>
							<div class="flex justify-between mt-1 text-sm text-gray-500">
								<span>{{ formatTime(currentTime) }}</span>
								<span>{{ formatTime(duration) }}</span>
							</div>
						</div>

						<!-- Song List -->
						<div class="mt-6 space-y-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
							<div 
								v-for="(song, index) in SONG_OPTIONS" 
								:key="index"
								class="group flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer"
								:class="[
									currentSongIndex === index 
									? 'bg-gray-50 text-gray-700' 
									: 'hover:bg-gray-50 text-gray-700'
								]"
								@click="playSong(song, index)"
							>
								<div class="flex items-center space-x-3">
									<div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
										<i 
											:class="[
											'fas',
											'text-gray-500',
											currentSongIndex === index 
												? 'fa-volume-up ' 
												: 'fa-music'
											]"
										></i>
									</div>
									<span 
										class="font-medium transition-colors"
										:class="['text-gray-700',]"
									>
										{{ song.name }}
									</span>
								</div>
								<div class="opacity-0 group-hover:opacity-100 transition-opacity">
									<i class="fas fa-play text-sm"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    
			<!-- Settings Modal -->
			<div v-if="isSettingsModalOpen" class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeMenu('settingsModal')">
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
									class="px-4 py-1 border border-gray-300 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all">
									-
								</button>
								<span class="text-lg font-semibold">{{ settings.fontSize }}</span>
								<button 
									@click="changeFontSize(1)" 
									class="px-4 py-1 border border-gray-300 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all">
									+
								</button>
							</div>
						</div>
					</div>

					<!-- Save Button -->
					<div class="flex justify-end">
						<button 
							@click="saveThemeSettings" 
							class="px-6 py-2 font-medium rounded-lg border-2">
							Lưu cài đặt
						</button>
					</div>
				</div>
			</div>

			<div v-if="isTableOfContentsOpen" class="fixed inset-0 bg-black bg-opacity-30 z-20" @click="closeMenu('tableOfContents');"></div>

			<!-- Context Menu -->
			<div v-if="contextMenu.visible" 
				class="absolute z-50 bg-white shadow-xl rounded-lg overflow-hidden w-56"
				:style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
				
				<!-- Highlight color buttons (show only when text is selected) -->
				<div v-if="contextMenu.selection" class="p-3 border-b border-gray-200">
					<div class="flex space-x-3">
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
				</div>
				
				<!-- Save Reading Position Option -->
				<button 
					@click="saveReadingPosition" 
					class="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
				>
					<i class="fas fa-bookmark text-gray-500 hover:text-gray-700 transition-colors duration-200"></i>
					<span class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">Lưu vị trí đọc</span>
				</button>

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
			isTableOfContentsOpen: false,
			openChapters: {},
			PAGES,
			currentPage: 0,
			THEME_OPTIONS,
			isMusicModalOpen: false,
			SONG_OPTIONS,
			audioPlayer: null,
			currentSong: null,
			currentSongIndex: -1,
			isPlaying: false,
			currentTime: 0,
			duration: 0,
			progress: 0,
		};
	},

	computed: {
		settings() {
			return this.$store.getters.theme;
		},

		highlightedContent() {
			return this.applyHighlights(this.PAGES[this.currentPage].content);
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

		navigatePage(direction) {
			if (direction === 'next' && this.currentPage < this.PAGES.length - 1) {
				this.currentPage++;
			} else if (direction === 'previous' && this.currentPage > 0) {
				this.currentPage--;
			}
		},

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
					highlightSpan.classList.add('highlight', `bg-[${highlight.color}]`, 'text-black');
					highlightSpan.setAttribute('id', 'highlight-id');
					highlightSpan.textContent = range.toString();

					range.deleteContents();
					range.insertNode(highlightSpan);
				}
			}
			return tempDiv.innerHTML;
		},

		async addHighlight(color) {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const range = selection.getRangeAt(0);

			const content = this.$refs.contentRef;

			const startOffset = this.getTextOffset(content, range.startContainer, range.startOffset);
			const endOffset = this.getTextOffset(content, range.endContainer, range.endOffset);

			let highlightToSave = {
				id: Date.now().toString(36) + Math.random().toString(36).substr(2),
				content: selection.toString().trim(),
				color: color,
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
		
			const hasSelection = !selection.isCollapsed && selection.toString().trim() !== '';
			this.contextMenu = {
				visible: true,
				x: event.pageX,
				y: event.pageY,
				selection: hasSelection ? selection : null
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

		handleTouchStart(event) {
			this.touchStartX = event.touches[0].clientX;
			this.isTransitioning = false;
		},

		handleTouchMove(event) {
			const touchEndX = event.touches[0].clientX;
			const touchDiff = this.touchStartX - touchEndX;

			if (Math.abs(touchDiff) > 50 && !this.isTransitioning) {
				this.isTransitioning = true;
				if (touchDiff > 0) {
					this.navigatePage('next');
				} else {
					this.navigatePage('previous');
				}
			}
		},

		playSong(song, index) {
			if (this.audioPlayer) {
				this.audioPlayer.pause();
			}

			this.audioPlayer = new Audio(song.url);
			this.currentSong = song;
			this.currentSongIndex = index;

			// Set up audio event listeners
			this.audioPlayer.addEventListener('timeupdate', this.updateProgress);
			this.audioPlayer.addEventListener('loadedmetadata', () => {
				this.duration = this.audioPlayer.duration;
			});
			this.audioPlayer.addEventListener('ended', this.handleSongEnd);

			this.audioPlayer.play();
			this.isPlaying = true;
		},

		togglePlay() {
			if (!this.audioPlayer) {
				if (this.SONG_OPTIONS.length) {
					this.playSong(this.SONG_OPTIONS[0], 0);
				}
				return;
			}

			if (this.isPlaying) {
				this.audioPlayer.pause();
			} else {
				this.audioPlayer.play();
			}
			this.isPlaying = !this.isPlaying;
		},

		updateProgress() {
			if (!this.audioPlayer) return;
			this.currentTime = this.audioPlayer.currentTime;
			this.progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
		},

		seekToPosition(event) {
			if (!this.audioPlayer) return;
			const rect = event.target.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const percentage = x / rect.width;
			this.audioPlayer.currentTime = percentage * this.audioPlayer.duration;
		},

		formatTime(seconds) {
			if (!seconds) return '00:00';
			const mins = Math.floor(seconds / 60);
			const secs = Math.floor(seconds % 60);
			return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
		},

		previousSong() {
			if (this.currentSongIndex > 0) {
				this.playSong(this.SONG_OPTIONS[this.currentSongIndex - 1], this.currentSongIndex - 1);
			}
		},

		nextSong() {
			if (this.currentSongIndex < this.SONG_OPTIONS.length - 1) {
				this.playSong(this.SONG_OPTIONS[this.currentSongIndex + 1], this.currentSongIndex + 1);
			}
		},

		handleSongEnd() {
			if (this.currentSongIndex < this.SONG_OPTIONS.length - 1) {
				this.nextSong();
			} else {
				this.isPlaying = false;
				this.currentTime = 0;
				this.progress = 0;
			}
		},

		cleanup() {
			if (this.audioPlayer) {
				this.audioPlayer.pause();
				this.audioPlayer.removeEventListener('timeupdate', this.updateProgress);
				this.audioPlayer.removeEventListener('ended', this.handleSongEnd);
				this.audioPlayer = null;
			}
		},

		saveReadingPosition() {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;

			const position = {
				page: this.currentPage,
				startOffset: selection.getRangeAt(0).startOffset,
				endOffset: selection.getRangeAt(0).endOffset,
			}

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
		}

	},

	watch: {
		currentPage: {
			handler: 'loadHighlights',
			immediate: true
		},
	},

	async mounted() {
		try {
			await highlightDB.openDatabase();

			this.loadSavedReadingPosition();

			document.addEventListener('click', this.closeContextMenu);
			document.addEventListener('mouseup', this.openContextMenu);
		} catch (error) {
			console.error('Initialization error:', error);
		}
	},

	beforeDestroy() {
		document.removeEventListener('mouseup', this.openContextMenu);
		document.removeEventListener('click', this.closeContextMenu);
		this.cleanup();
	}
};

export { BookDetailComponent };