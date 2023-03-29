import { RouteInterface } from '../types/routes.type';
import Home from '../pages/home';
import Product from '../pages/product';
import EditProduct from '../pages/product/edit';
import NotFound from '../pages/notFound';

export const routes: RouteInterface[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/product/edit/:productId',
    component: EditProduct,
  },
  {
    path: '/product/:productId',
    component: Product,
  },
  {
    path: '/:rest/*',
    component: NotFound,
  },
];
