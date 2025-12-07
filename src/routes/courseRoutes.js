import CoursePage from "../pages/courses/CourseDetail";
import CourseDetail from '../pages/courses/CourseDetail';
import CourseDirection from '../pages/CourseDirection';
import CheckoutPage from '../pages/CheckoutPage';
import TestPage from '../pages/test/TestPage';
import CreateTestPage from '../pages/create_test/CreateTestPage';
import CreateCoursePage from '../pages/courses/CreateCoursePage';
import ManageLessonsPage from "../pages/courses/ManageLessonsPage";
import CourseListPage from "../pages/courses/CourseListPage";
const courseRoutes = [
  { path: '/course', element: <CoursePage /> },
  { path: '/course/course-direction', element: <CourseDirection /> },
  { path: '/course/course-detail', element: <CourseDetail /> },
  { path: '/course/course-detail/checkout', element: <CheckoutPage /> },
  { path: '/course/test', element: <TestPage /> },
  { path: '/course/create-test', element: <CreateTestPage /> },
  { path: '/course/create-course', element: <CreateCoursePage /> },
  { path: '/course/course-list', element: <CourseListPage /> },
  { path: '/course/manage-lessons', element: <ManageLessonsPage /> },
]; 

export default courseRoutes;