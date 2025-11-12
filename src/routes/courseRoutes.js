import CoursePage from "../pages/CourseDetail";
import CourseDetail from '../pages/CourseDetail';
import CourseDirection from '../pages/CourseDirection';
import CheckoutPage from '../pages/CheckoutPage';
import TestPage from '../pages/test/TestPage';
import CreateTestPage from '../pages/create_test/CreateTestPage';
const courseRoutes = [
  { path: '/course', element: <CoursePage /> },
  { path: '/course/course-direction', element: <CourseDirection /> },
  { path: '/course/course-detail', element: <CourseDetail /> },
  { path: '/course/course-detail/checkout', element: <CheckoutPage /> },
  { path: '/course/test', element: <TestPage /> },
  { path: '/course/create-test', element: <CreateTestPage /> },
]; 

export default courseRoutes;