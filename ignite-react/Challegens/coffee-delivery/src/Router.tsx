import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Cart } from './pages/Cart'
import { Home } from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/:orderId/success',
        element: <div>Order success</div>,
      },
    ],
  },
])
