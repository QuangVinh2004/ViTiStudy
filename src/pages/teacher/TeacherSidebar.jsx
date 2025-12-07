import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link} from "react-router-dom";

const adminMenu = [
  { label: "Dashboard", icon: "🏠", link: "/teacher/dashboard" },
  { label: "Quản lý Khóa học", icon: "📚", link: "/teacher/manage-courses" },
  { label: "Bài tập", icon: "📝", link: "/teacher/exercises" },
  { label: "Học sinh", icon: "👨‍🎓", link: "/teacher/students" },
  { label: "Phân tích", icon: "📊", link: "/teacher/analytics" },
  { label: "Cài đặt", icon: "⚙️", link: "/teacher/settings" },
];

export default function TeacherSidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-1/6 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
      {/* Avatar */}
      <img
        src={user?.avatar || "https://i.pravatar.cc/100"}
        alt="avatar"
        className="w-20 h-20 rounded-full mb-3"
      />

      {/* Username */}
      <div className="font-bold text-lg mb-4">
        {user?.username || "Giáo viên"}
      </div>

      {/* Menu */}
      <nav className="w-full mb-6">
        {adminMenu.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="flex items-center py-2 text-gray-800 font-medium gap-2 hover:text-blue-600 transition-colors"
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        ))}
      </nav>

      {/* Button */}
      <Link
        to="/teacher/manage-courses/create-course"
        className="bg-indigo-600 text-white rounded-lg py-2 font-semibold text-base cursor-pointer mt-4 w-full text-center hover:bg-indigo-700 transition-colors"
      >
        Tạo Khóa học Mới
      </Link>
    </aside>
  );
}
