import CoursePage from "../pages/CoursepPage";
import CourseDetail from '../pages/CourseDetail';

const courseRoutes = [
  { path: '/course', element: <CoursePage /> },
  { path: '/course/course-detail', element: <CourseDetail /> },
];

export default courseRoutes;