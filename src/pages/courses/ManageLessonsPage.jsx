import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function ManageLessonsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [lessonInputs, setLessonInputs] = useState({});

  // 👉 Upload state
  const [uploadingSectionId, setUploadingSectionId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ======================
  // Update lesson input
  // ======================
  const updateLessonInput = (sectionId, field, value) => {
    setLessonInputs((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }));
  };

  // ======================
  // Load data
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [secRes, courseRes] = await Promise.all([
          api.get(`/sections/${courseId}`),
          api.get(`/courses/${courseId}`),
        ]);

        setSections(secRes.data.data);
        setCourse(courseRes.data.data);
      } catch (err) {
        console.error(err);
        alert("❌ Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // ======================
  // Add section
  // ======================
  const addSection = async () => {
    if (!newSectionTitle.trim()) {
      alert("⚠️ Vui lòng nhập tên chương");
      return;
    }

    try {
      const { data } = await api.post(`/sections/${courseId}`, {
        title: newSectionTitle,
      });

      setSections((prev) => [...prev, { ...data.data, lessons: [] }]);
      setNewSectionTitle("");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm chương");
    }
  };

  // ======================
  // Delete section
  // ======================
  const deleteSection = async (sectionId) => {
    if (!window.confirm("Xóa toàn bộ chương này?")) return;

    try {
      await api.delete(`/sections/${sectionId}`);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa chương");
    }
  };

  // ======================
  // Add lesson (UPLOAD WITH PROGRESS)
  // ======================
  const addLesson = async (sectionId, e) => {
    const sectionDiv = e.target.closest(".section");
    const fileInput = sectionDiv.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    const lesson = lessonInputs[sectionId] || {};

    const missing = [];
    if (!lesson.title) missing.push("tiêu đề");
    if (!lesson.duration) missing.push("thời lượng");
    if (!lesson.type) missing.push("loại");
    if (!file) missing.push("file");

    if (missing.length) {
      alert("⚠️ Thiếu: " + missing.join(", "));
      return;
    }

    try {
      setUploadingSectionId(sectionId);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("title", lesson.title);
      formData.append("type", lesson.type);
      formData.append("duration", lesson.duration);
      formData.append("file", file);

      const { data } = await api.post(
        `/lessons/${sectionId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        }
      );

      setSections((prev) =>
        prev.map((sec) =>
          sec.id === sectionId
            ? { ...sec, lessons: [...sec.lessons, data.data] }
            : sec
        )
      );

      setLessonInputs((prev) => ({
        ...prev,
        [sectionId]: { title: "", type: "", duration: "" },
      }));

      if (fileInput) fileInput.value = "";

      alert("✅ Thêm bài học thành công");
    } catch (err) {
      console.error(err);
      alert("❌ Upload thất bại");
    } finally {
      setUploadingSectionId(null);
      setUploadProgress(0);
    }
  };

  // ======================
  // Delete lesson
  // ======================
  const deleteLesson = async (sectionId, lessonId) => {
    if (!window.confirm("Xóa bài học này?")) return;

    try {
      await api.delete(`/lessons/${lessonId}`);

      setSections((prev) =>
        prev.map((sec) =>
          sec.id === sectionId
            ? {
                ...sec,
                lessons: sec.lessons.filter((l) => l.id !== lessonId),
              }
            : sec
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa bài học");
    }
  };

  if (loading) {
    return <p className="text-center py-20">⏳ Đang tải dữ liệu...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow">
          {course?.thumbnail && (
            <img
              src={course.thumbnail}
              alt="course"
              className="w-24 h-24 rounded-2xl object-cover shadow"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{course?.title}</h1>
            <p className="text-gray-500">
              Quản lý chương & bài học
            </p>
          </div>
        </div>

        {/* ADD SECTION */}
        <div className="bg-white p-6 rounded-3xl shadow flex gap-4">
          <input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Nhập tên chương mới"
            className="flex-1 px-4 py-3 border rounded-xl"
          />
          <button
            onClick={addSection}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            ➕ Thêm chương
          </button>
        </div>

        {/* SECTIONS */}
        <div className="space-y-8">
          {sections.map((section) => {
            const input = lessonInputs[section.id] || {
              title: "",
              type: "",
              duration: "",
            };

            return (
              <div
                key={section.id}
                className="section bg-white rounded-3xl shadow border"
              >
                <div className="flex justify-between p-6 border-b">
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    🗑
                  </button>
                </div>

                {/* LESSONS */}
                <div className="p-6 space-y-3">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex justify-between bg-slate-50 p-4 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold">{lesson.title}</p>
                        <p className="text-sm text-gray-500">
                          {lesson.type} · {lesson.duration}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          deleteLesson(section.id, lesson.id)
                        }
                        className="w-8 h-8 rounded-full bg-red-50 text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* ADD LESSON */}
                <div className="p-6 border-t bg-slate-50 rounded-b-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <input
                      placeholder="Tiêu đề"
                      value={input.title}
                      onChange={(e) =>
                        updateLessonInput(section.id, "title", e.target.value)
                      }
                      className="md:col-span-2 px-3 py-2 border rounded-lg"
                    />

                    <select
                      value={input.type}
                      onChange={(e) =>
                        updateLessonInput(section.id, "type", e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="">Loại</option>
                      <option value="video">Video</option>
                      <option value="document">Tài liệu</option>
                    </select>

                    <input
                      placeholder="Thời lượng"
                      value={input.duration}
                      onChange={(e) =>
                        updateLessonInput(section.id, "duration", e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg"
                    />

                    <input type="file" className="px-3 py-2 border rounded-lg" />

                    <button
                      onClick={(e) => addLesson(section.id, e)}
                      disabled={uploadingSectionId === section.id}
                      className={`rounded-lg font-semibold text-white ${
                        uploadingSectionId === section.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {uploadingSectionId === section.id
                        ? "Đang tải..."
                        : "Thêm"}
                    </button>
                  </div>

                  {/* PROGRESS BAR */}
                  {uploadingSectionId === section.id && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Đang tải video...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ManageLessonsPage;
