import { ROUTE_NAMES } from './constants.js';

import Home from '../../views/home.js';
import About from '../../views/about.js';

export const routes = [
  { path: ROUTE_NAMES.HOME, component: Home },
  { path: ROUTE_NAMES.ABOUT, component: About },
  { path: '*', redirect: ROUTE_NAMES.HOME },
];
