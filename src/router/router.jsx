import { createBrowserRouter } from 'react-router-dom';
import Stocks from '../pages/Stocks/Stocks.jsx';
import About from '../pages/About/About.jsx';

const router = createBrowserRouter([
  {
    path: '/favourites',
    element: <Stocks />,
  },
  {
    path: '/',
    element: <About />,
  },
]);

export default router;
