import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import RootLayout from './layouts/root';
import CartPage from './routes/cart';
import ProductsPage from './routes/products';
import RootBoundary from './routes/root-boundary';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/products',
          element: <ProductsPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
      errorElement: <RootBoundary />,
    },
  ],
  { basename: '/geektrust-teerex-store/' },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
