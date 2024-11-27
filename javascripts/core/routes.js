import { BookPreviewComponent } from '../components/book-pre.component.js';
import { BookDetailComponent } from '../components/book-detail.component.js';

export const routes = [
	{
		path: "/",
		component: BookPreviewComponent,
	},
	{
		path: '/detail',
		component: BookDetailComponent,
	},
	{ path: '*', redirect: "/" },
];
