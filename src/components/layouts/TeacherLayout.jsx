import { Outlet } from "react-router-dom";
import TeacherSidebar from "../../pages/teacher/TeacherSidebar";

export default function TeacherLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar />

      <main className="w-5/6 p-8">
        <Outlet />
      </main>
    </div>
  );
}
