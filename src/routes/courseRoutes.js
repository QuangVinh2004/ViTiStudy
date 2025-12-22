import CoursePage from "../pages/courses/CourseDetail";
import CourseDetail from '../pages/courses/CourseDetail';
import CourseDirection from '../pages/CourseDirection';
import CheckoutPage from '../pages/CheckoutPage';
import TestPage from '../pages/test/TestPage';
import TestResultPage from '../pages/test/TestResultPage';
import CreateExam from '../pages/create_test/CreateExam';
import CreateCoursePage from '../pages/courses/CreateCoursePage';
import ManageLessonsPage from "../pages/courses/ManageLessonsPage";
import CourseListPage from "../pages/courses/CourseListPage";
const courseRoutes = [
  { path: '/course', element: <CoursePage /> },
  { path: '/course/course-direction', element: <CourseDirection /> },
  { path: '/course/course-detail', element: <CourseDetail /> },
  { path: '/course/course-detail/checkout', element: <CheckoutPage /> },
  { path: '/test/:examId', element: <TestPage /> },
  { path: '/test/:examId/result/:attemptId', element: <TestResultPage /> },
  { path: '/course/create-test', element: <CreateExam />, roles: ['teacher', 'admin'] },
  { path: '/course/create-course', element: <CreateCoursePage />, roles: ['teacher', 'admin'] },
  { path: '/course/course-list', element: <CourseListPage />, roles: ['teacher', 'admin'] },
  { path: '/course/manage-lessons', element: <ManageLessonsPage />, roles: ['teacher', 'admin'] },
  { path: '/test-role', element: <div>Role: teacher or admin</div>, roles: ['teacher', 'admin'] },
];

export default courseRoutes;