import LogoComponent from "../../components/common/LogoComponent";
import { useState, useContext, useEffect } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

function CreateCoursePage() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("User from AuthContext:", user);
    if (user) {
      console.log("User ID:", user.id);
    }
  }, [user]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    level: "",
    total_lessons: "",
    coverFile: null,
    coverPreview: null,
  });

  const [creating, setCreating] = useState(false);
  const [createdCourseId, setCreatedCourseId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({
        ...prev,
        coverFile: file,
        coverPreview: URL.createObjectURL(file),
      }));
    }
  };

  // =============================
  // 📌 TẠO KHÓA HỌC
  // =============================
  const handleCreateCourse = async () => {
    try {
      setCreating(true);

      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("price", courseData.price);
      formData.append("duration", courseData.duration);
      formData.append("level", courseData.level);
      formData.append("total_lessons", courseData.total_lessons);
      formData.append("teacher_id", user.id);

      if (courseData.coverFile) {
        formData.append("thumbnail", courseData.coverFile);
      }

      const { data } = await api.post(
        "/courses/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!data.success) {
        alert("❌ " + data.message);
        return;
      }

      alert("✅ Khóa học đã được tạo!");
      setCreatedCourseId(data.data.id);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi tạo khóa học");
    } finally {
      setCreating(false);
    }
  };

  const goToLessonCreate = () => {
    if (!createdCourseId) {
      alert("Bạn phải tạo khóa học trước!");
      return;
    }
    window.location.href = `/courses/${createdCourseId}/lessons/create`;
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      {/* Logo + tiêu đề */}
      <div className="flex flex-col items-center">
        <LogoComponent className="w-[200px] mb-6" />
        <h1 className="text-3xl font-bold mb-6">Tạo khóa học mới</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Form nhập liệu */}
        <div className="space-y-4 md:col-span-1">
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            placeholder="Tiêu đề khóa học"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            placeholder="Mô tả khóa học"
            className="w-full p-3 border rounded-lg"
            rows={4}
          />
          <input
            type="text"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            placeholder="Giá khóa học"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="duration"
            value={courseData.duration}
            onChange={handleInputChange}
            placeholder="Thời lượng"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="level"
            value={courseData.level}
            onChange={handleInputChange}
            placeholder="Trình độ"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            name="total_lessons"
            value={courseData.total_lessons}
            onChange={handleInputChange}
            placeholder="Số bài học"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Preview */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center p-8 relative">
            <span className="absolute top-4 right-6 text-5xl opacity-30">📚</span>
            <h2 className="text-3xl font-bold mb-2">
              {courseData.title || "Tiêu đề khóa học"}
            </h2>
            <p className="text-lg max-w-xl mx-auto">
              {courseData.description || "Mô tả khóa học sẽ hiển thị ở đây"}
            </p>
          </div>

          <div className="relative w-full h-48 bg-yellow-200 rounded-xl flex items-center justify-center mt-6 overflow-hidden border border-dashed border-gray-300 cursor-pointer">
            {!courseData.coverPreview && (
              <>
                <span className="text-6xl opacity-40">🎓</span>
                <div className="absolute bottom-4 bg-white bg-opacity-90 px-4 py-1 rounded-lg font-semibold text-gray-800">
                  Chọn ảnh bìa khóa học
                </div>
              </>
            )}
            {courseData.coverPreview && (
              <img
                src={courseData.coverPreview}
                alt="Course Cover"
                className="w-full h-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center bg-green-500 rounded-xl p-4 shadow-md text-white">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-2xl">💰</span> Giá khóa học
              </div>
              <div className="text-xl font-bold">{courseData.price || "0đ"}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-xl border-l-4 border-indigo-500">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-xs font-semibold text-gray-500 uppercase">Thời lượng</div>
                <div className="text-lg font-semibold">{courseData.duration || "0 giờ"}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl border-l-4 border-indigo-500">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs font-semibold text-gray-500 uppercase">Trình độ</div>
                <div className="text-lg font-semibold">{courseData.level || "Chưa rõ"}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl border-l-4 border-indigo-500">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-xs font-semibold text-gray-500 uppercase">Số bài học</div>
                <div className="text-lg font-semibold">{courseData.total_lessons || "0"}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCreateCourse}
                disabled={creating}
                className={`flex-1 px-4 py-3 rounded-xl text-white font-bold text-lg shadow-lg bg-pink-500 hover:bg-pink-600 transition 
                ${creating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {creating ? "Đang tạo..." : "Tạo Khóa Học →"}
              </button>

              <button
                onClick={goToLessonCreate}
                className="px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
              >
                + Thêm bài học
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCoursePage;
