import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function TeacherCourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch courses for current teacher
  const fetchCourses = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await api.get(`/courses/teacher/${user.id}`); 
      // nếu API trả data như bạn mô tả, map sang trường hợp bạn cần
      const mapped = (res.data?.data || []).map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        price: typeof c.price === "number" ? c.price : Number(c.price) || 0, 
        total_lessons: c.total_lessons || 0,
        level: c.level || "",
        cover_url: c.thumbnail || c.coverImage || "",
      }));
      setCourses(mapped);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const handleView = (id) => {
    navigate(`${id}/detail`);
  };

  const handleUpdate = (id) => {
    navigate(`/teacher/courses/update/${id}`);
  };

  const handleDelete = async (id) => {
    const c = courses.find((x) => x.id === id);
    if (!c) return;
    if (!window.confirm(`Bạn có chắc muốn xóa khóa học "${c.title}"?`)) return;

    try {
      const res = await api.delete(`/courses/${id}`);
      if (res.data?.success === false) {
        showToast("Xóa thất bại");
        return;
      }
      setCourses((prev) => prev.filter((item) => item.id !== id));
      showToast(`Đã xóa: ${c.title}`);
    } catch (err) {
      console.error(err);
      showToast("Xóa thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl">
              📚
            </div>
            <span className="font-bold text-xl text-gray-800">EduManage</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500 mt-1">Manage your teaching courses efficiently</p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-600 tracking-wider">
                  Course Title
                </th>
                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-600 tracking-wider">
                  Price
                </th>
                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-600 tracking-wider">
                  Level
                </th>
                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-600 tracking-wider">
                  Lessons
                </th>
                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-6">
                    Đang tải khóa học...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    Chưa có khóa học.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-100 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.cover_url || "https://via.placeholder.com/140x90"}
                          alt={course.title}
                          className="w-36 h-24 rounded-lg object-cover bg-gray-200"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{course.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-[250px]">
                            {course.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      {Number(course.price).toLocaleString("vi-VN")} ₫
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${(course.level || "").toLowerCase() === "beginner"
                            ? "bg-blue-100 text-blue-800"
                            : (course.level || "").toLowerCase() === "intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {course.level}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">📖 {course.total_lessons} lessons</td>

                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleView(course.id)}
                          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm shadow"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleUpdate(course.id)}
                          className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm shadow"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(course.id)}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm shadow"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
