import CoursePage from "../pages/CourseDetail";
import CourseDetail from '../pages/CourseDetail';
import CourseDirection from '../pages/CourseDirection';
import CheckoutPage from '../pages/CheckoutPage';
import TestPage from '../pages/test/TestPage';
import CreateTestPage from '../pages/create_test/CreateTestPage';
import CreateCoursePage from '../pages/create_course/CreateCoursePage';
import ManageLessonsPage from "../pages/create_course/ManageLessonsPage";
import CourseListPage from "../pages/create_course/CourseListPage";

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