import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function CreateCourseAI() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    topic: "",
    level: "Cấp 1",
    numSections: 4,
    lessonsPerSection: 3
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // 🚀 TẠO KHÓA HỌC AI + REDIRECT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("❌ Bạn chưa đăng nhập");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post(
        "/courses/create-ai",
        {
          teacher_id: user.id,
          subject: form.subject,
          topic: form.topic,
          level: form.level,
          numSections: Number(form.numSections),
          lessonsPerSection: Number(form.lessonsPerSection)
        }
      );

      if (!data.success) {
        alert("❌ " + data.message);
        return;
      }

      const courseId = data.data.id;

      // 👉 CHUYỂN SANG TRANG QUẢN LÝ LESSON
      navigate(`/teacher/manage-courses/${courseId}/lessons-ai`);

    } catch (err) {
      console.error(err);
      setError("Không thể tạo khóa học bằng AI. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center px-4 py-10">
      {/* CARD */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 p-10">

        {/* BADGE */}
        <div className="absolute -top-4 left-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
          🤖 AI hỗ trợ xây dựng khóa học
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Tạo khóa học bằng AI
        </h1>
        <p className="text-gray-600 mt-2 mb-8">
          Nhập thông tin cơ bản, AI sẽ xây dựng cấu trúc khóa học
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Môn học (Toán, Lịch sử, Địa lí...)"
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <input
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="Chủ đề chính"
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <div className="grid grid-cols-3 gap-4">
            {/* LEVEL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Trình độ
              </label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="rounded-xl border px-4 py-3"
              >
                <option value="Cấp 1">Cấp 1</option>
                <option value="Cấp 2">Cấp 2</option>
                <option value="Cấp 3">Cấp 3</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* SECTIONS */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Số chương
              </label>
              <input
                type="number"
                name="numSections"
                min="1"
                value={form.numSections}
                onChange={handleChange}
                className="rounded-xl border px-4 py-3"
              />
              <span className="text-xs text-gray-500">
                Mỗi chương gồm nhiều bài học
              </span>
            </div>

            {/* LESSONS */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Bài / chương
              </label>
              <input
                type="number"
                name="lessonsPerSection"
                min="1"
                value={form.lessonsPerSection}
                onChange={handleChange}
                className="rounded-xl border px-4 py-3"
              />
              <span className="text-xs text-gray-500">
                Số bài trong mỗi chương
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 text-white py-4 font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "⏳ AI đang tạo khóa học..." : "🚀 Tạo khóa học bằng AI"}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
