const BOOK_RELATEDS = [
	{ id: 1, image: "./public/images/relateds/related1.jpg" },
	{ id: 2, image: "./public/images/relateds/related2.jpg" },
	{ id: 3, image: "./public/images/relateds/related3.jpg" },
	{ id: 4, image: "./public/images/relateds/related5.jpg" },
]

const FONT_OPTIONS = [
	{ value: 'Arial', label: 'Arial' },
	{ value: 'Tahoma', label: 'Tahoma' },
	{ value: 'Verdana', label: 'Verdana' },
	{ value: 'Roboto', label: 'Roboto' },
	{ value: 'Open Sans', label: 'Open Sans' },
	{ value: 'Noto Sans', label: 'Noto Sans' },
];

const THEME_OPTIONS = [
	{ value: 'default', label: 'Mặc định' },
	{ value: 'light', label: 'Trắng' },
	{ value: 'dark', label: 'Đen' },
];

const HIGHLIGHT_COLORS = [
	'#FFFF00', '#90EE90', '#FFA500', '#ADD8E6'
];

const SONG_OPTIONS = [
	{ name: 'Nhạc 1', url: './public/audios/audio1.mp3' },
	{ name: 'Nhạc 2', url: './public/audios/audio2.mp3' },
	{ name: 'Nhạc 3', url: './public/audios/audio3.mp3' },
	{ name: 'Nhạc 4', url: './public/audios/audio4.mp3' },
]

const PAGES = [
	// Trang 1: Ảnh bìa
	{
		title: 'Trang bìa',
		content:
			`<div class="flex-grow p-4 sm:p-6 max-w-md sm:max-w-[1400px] mx-auto text-center">
				<img
					src="./public/images/covers/anh_bia_cndl2.png"
					alt="Book Image"
					class="w-full max-w-[12rem] sm:max-w-[16rem] lg:max-w-[20rem] mx-auto rounded-md shadow-lg"
				/>
			</div>
		`
	}
	,

	// Trang 2: Nội dung chính
	{
		title: 'Nội dung chính',
		content:
			`<div class="flex-grow p-4 sm:p-6 max-w-md sm:max-w-[1400px] mx-auto text-center">
				<p class="text-[0.875em] sm:text-[1em] font-medium leading-relaxed">
					Xuất bản phẩm này là sản phẩm trí tuệ được bảo hộ bản quyền. Mọi hành động sao chép hoặc phát hành dưới bất kỳ hình thức nào đều cần có sự đồng ý
					từ
					<a
						href="https://sdl.thuathienhue.gov.vn/"
						class="text-blue-600 underline hover:text-blue-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						Sở Du lịch tỉnh Thừa Thiên Huế
					</a>
					.
				</p>

				<div class="mt-6 sm:mt-8">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Chỉ đạo nội dung</h2>
					<p class="mt-2 text-[0.875em] sm:text-[1em]">PHAN TIẾN DŨNG</p>
				</div>

				<div class="mt-4 sm:mt-6">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Chịu trách nhiệm xuất bản</h2>
					<p class="mt-2 text-[0.875em] sm:text-[1em]">NGUYỄN BẢO KỲ</p>
				</div>

				<div class="mt-4 sm:mt-6">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Biên tập nội dung</h2>
					<p class="mt-2 text-[0.875em] sm:text-[1em]">NHÂM THỊ HIỀN</p>
				</div>

				<div class="mt-4 sm:mt-6">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Biên tập sách điện tử</h2>
					<ul class="list-none mt-2 space-y-1 text-[0.875em] sm:text-[1em]">
						<li>PHẠM THỊ HIỀN</li>
						<li>NGUYỄN THỊ KHUYÊN</li>
						<li>ĐÀO THỊ HƯỜNG</li>
						<li>TRẦN QUANG NHẬT TÂM</li>
					</ul>
				</div>

				<div class="mt-4 sm:mt-6">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Kỹ thuật sách điện tử</h2>
					<ul class="list-none mt-2 space-y-1 text-[0.875em] sm:text-[1em]">
						<li>PHẠM THỊ HIỀN</li>
						<li>NGUYỄN THỊ KHUYÊN</li>
						<li>ĐÀO THỊ HƯỜNG</li>
						<li>TRẦN QUANG NHẬT TÂM</li>
					</ul>
				</div>

				<div class="mt-4 sm:mt-6">
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold">Thiết kế bìa</h2>
					<p class="mt-2 text-[0.875em] sm:text-[1em]">NGUYỄN VĂN ĐỦ</p>
				</div>
			</div>`,
	},

	// Trang 3: Video và nội dung giới thiệu
	{
		title: 'Video và nội dung giới thiệu',
		content:
			`<div class="flex-grow p-4 sm:p-6 max-w-md sm:max-w-[1400px] mx-auto space-y-4">
				<div class="aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
					<video class="w-full h-auto" controls controlsList="nodownload">
						<source src="./public/videos/video.mp4" type="video/mp4" />
						Trình duyệt của bạn không hỗ trợ video.
					</video>
				</div>

				<div>
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold text-center mb-2">Nhã nhạc cung đình Huế</h2>
					<div class="relative">
						<audio
							class="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
							controls controlsList="nodownload"
						>
							<source src="http://chimvie2.free.fr/amnhac/dantoc/lenhac/khaikinh/CVCN_chuongtrongBatNha.mp3" />
							Trình duyệt của bạn không hỗ trợ audio.
						</audio>
					</div>
				</div>

				<div>
					<h2 class="text-[1.125em] sm:text-[1.25em] font-semibold text-center">Lời Nói Đầu</h2>
					<p class="text-[0.875em] sm:text-[1em] mt-2 leading-relaxed">
						Nằm ở miền Trung Việt Nam, từ lâu Huế được biết đến là một thành phố lịch sử cùng với cảnh quan thơ mộng và lãng mạn. Huế vốn là thủ phủ của
						các chúa Nguyễn xứ Đàng Trong, một thời là kinh đô của triều đại Tây Sơn và sau đó là kinh đô của nước Việt Nam dưới triều Nguyễn. Hệ thống
						kiến trúc thành quách, cung điện, lăng tẩm, đình chùa... mang đậm bản sắc văn hóa đã được kết tinh qua gần 3 thế kỷ của các triều đại quân
						chủ cuối cùng ở Việt Nam. Những giá trị tốt đẹp của đời sống văn hóa cung đình hòa lẫn với văn hóa dân gian đang hiện hữu trong cuộc sống
						bình yên của người dân xứ Huế.
					</p>
					<p class="text-[0.875em] sm:text-[1em] mt-2 leading-relaxed">
						Thiên nhiên cũng ưu ái ban tặng Huế nhiều danh lam thắng cảnh, tạo nên bức tranh tổng thể hài hòa của sông, núi, biển, đầm phá khiến du khách
						một lần đến Huế luôn bỡ ngỡ và lưu luyến khi rời xa.
					</p>
				</div>
			</div>`,
	},

	// Trang 4: Nội dung chờ
	{
		title: 'Nội dung chờ',
		content:
			`<div class="flex-grow p-4 sm:p-6 max-w-md sm:max-w-[1400px] mx-auto space-y-8">
				<p class="text-[1em] sm:text-[1.25em] font-medium text-center">Nội dung đang được cập nhật...</p>
			</div>`,
	}
];

export { BOOK_RELATEDS, PAGES, FONT_OPTIONS, THEME_OPTIONS, HIGHLIGHT_COLORS, SONG_OPTIONS };