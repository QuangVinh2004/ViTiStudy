import StudentPage from "../pages/student/StudentPage";
import CourseDetail from "../pages/courses/CourseDetail";
const studentRoutes = [
    {path: "/my-learning", element: <StudentPage /> },
    {path: "/my-learning/courses/:courseId", element: <CourseDetail /> },
];

export default studentRoutes;