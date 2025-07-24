import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
const commonRoutes = [
  { path: '/', element: <HomePage /> },
];

export default commonRoutes;
