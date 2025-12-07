import TeacherLayout from "../components/layouts/TeacherLayout";
import TeacherPage from "../pages/teacher/TeacherPage";
import TeacherManageCoursesPage from "../pages/courses/TeacherManageCoursesPage";
import ManageLessonsPage from "../pages/courses/ManageLessonsPage";
import CreateCoursePage from "../pages/courses/CreateCoursePage";
import CourseDetail from '../pages/courses/CourseDetail';
const teacherRoutes = [
  {
    path: "/teacher",
    element: <TeacherLayout />,  // Layout bao ngoài
    children: [
      { path: "dashboard", element: <TeacherPage /> },
      { path: "manage-courses", element: <TeacherManageCoursesPage /> },
      { path: "manage-courses/create-course", element: <CreateCoursePage /> },
      { path: "manage-courses/:courseId/lessons", element: <ManageLessonsPage /> },
      { path: "manage-courses/:courseId/detail", element: <CourseDetail /> },
    ],
  },
];

export default teacherRoutes;
