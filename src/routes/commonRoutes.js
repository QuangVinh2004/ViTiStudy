import HomePage from '../pages/home/HomePage';
import ErrorPage from '../pages/ErrorPage';
const commonRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '*', element: <ErrorPage /> },
];

export default commonRoutes;
