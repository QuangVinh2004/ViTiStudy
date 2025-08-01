import CoursePage from "../pages/CourseDetail";
import CourseDetail from '../pages/CourseDetail';
import CourseDirection from '../pages/CourseDirection';
import CheckoutPage from '../pages/CheckoutPage';
const courseRoutes = [
  { path: '/course', element: <CoursePage /> },
  { path: '/course/course-direction', element: <CourseDirection /> },
  { path: '/course/course-detail', element: <CourseDetail /> },
  { path: '/course/course-detail/checkout', element: <CheckoutPage /> },
];

export default courseRoutes;