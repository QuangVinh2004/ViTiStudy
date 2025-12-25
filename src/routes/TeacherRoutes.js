import TeacherLayout from "../components/layouts/TeacherLayout";
import TeacherPage from "../pages/teacher/TeacherPage";
import TeacherManageCoursesPage from "../pages/courses/TeacherManageCoursesPage";
import StudentManagement from "../pages/teacher/StudentManagement";
import ExamManagement from "../pages/teacher/ExamManagement";
import ProfileContent from "../pages/student/ProfileContent";
import ManageLessonsPage from "../pages/courses/ManageLessonsPage";
import CourseDetail from "../pages/courses/CourseDetail";
import ManageAILessonsPage from "../pages/courses/ManageAILessonsPage";
import CreateCourseMethodPage from "../pages/courses/CreateCourseMethodPage";
import CreateCourseManualPage from "../pages/courses/CreateCourseManualPage";
import CreateCourseAIPage from "../pages/courses/CreateCourseAIPage";

const teacherRoutes = [
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      { index: true, element: <TeacherPage /> },
      { path: "dashboard", element: <TeacherPage /> },

      { path: "manage-courses", element: <TeacherManageCoursesPage /> },

      { path: "manage-courses/create-course", element: <CreateCourseMethodPage /> },
      { path: "manage-courses/create-course/manual", element: <CreateCourseManualPage /> },
      { path: "manage-courses/create-course/ai", element: <CreateCourseAIPage /> },

      { path: "manage-courses/:courseId/lessons", element: <ManageLessonsPage /> },
      { path: "manage-courses/:courseId/lessons-ai", element: <ManageAILessonsPage /> },
      { path: "manage-courses/:courseId/detail", element: <CourseDetail /> },
      { path: "exercises", element: <ExamManagement /> },
      { path: "students", element: <StudentManagement /> },
      { path: "settings", element: <ProfileContent /> },
    ],
  },
];

export default teacherRoutes;

