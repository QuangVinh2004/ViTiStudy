import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CourseDetail from '../pages/CourseDetail';



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/course/course-detail" element={<CourseDetail />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
