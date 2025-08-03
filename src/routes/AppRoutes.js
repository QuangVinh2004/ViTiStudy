import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import CourseDetail from '../pages/CourseDetail';
import TestPage from '../pages/test/TestPage';



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/course/course-detail" element={<CourseDetail />} />
        <Route path="/test" element={<TestPage />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
