import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function ManageLessonsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newSectionTitle, setNewSectionTitle] = useState("");

  // lessonInputs: title, type, duration cho mỗi section
  const [lessonInputs, setLessonInputs] = useState({});

  // ======================
  // Cập nhật input field
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
  // Load course + sections
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
  // Add Section
  // ======================
  const addSection = async () => {
    if (!newSectionTitle.trim()) {
      alert("⚠️ Vui lòng nhập tên phần");
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
      alert("❌ Lỗi khi thêm phần");
    }
  };

  // ======================
  // Delete Section
  // ======================
  const deleteSection = async (sectionId) => {
    if (!window.confirm("Xóa toàn bộ phần này?")) return;

    try {
      await api.delete(`/sections/${sectionId}`);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa phần");
    }
  };

  // ======================
  // Add Lesson
  // Lấy file trực tiếp từ DOM input
  // ======================
  const addLesson = async (sectionId, e) => {
    const sectionDiv = e.target.closest(".section");
    const fileInput = sectionDiv.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    const lesson = lessonInputs[sectionId] || {};

    // Kiểm tra field thiếu
    const missingFields = [];
    if (!lesson.title) missingFields.push("title");
    if (!lesson.duration) missingFields.push("duration");
    if (!lesson.type) missingFields.push("type"); // bắt buộc chọn
    if (!file) missingFields.push("file");

    if (missingFields.length > 0) {
      console.log("⚠️ Thiếu thông tin bài học:", missingFields);
      alert("⚠️ Thiếu thông tin: " + missingFields.join(", "));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", lesson.title);
      formData.append("type", lesson.type);
      formData.append("duration", lesson.duration);
      formData.append("file", file);

      const { data } = await api.post(
        `/lessons/${sectionId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update UI
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === sectionId
            ? { ...sec, lessons: [...sec.lessons, data.data] }
            : sec
        )
      );

      // Reset input state
      setLessonInputs((prev) => ({
        ...prev,
        [sectionId]: {
          title: "",
          type: "", // reset để bắt buộc chọn lại
          duration: "",
        },
      }));

      // Reset file input
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm bài học");
    }
  };

  // ======================
  // Delete Lesson
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

  // ======================
  // Loading
  // ======================
  if (loading) {
    return <p className="text-center py-20">Đang tải...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        {course?.thumbnail && (
          <img
            src={course.thumbnail}
            alt="course"
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">{course?.title}</h1>
      </div>

      {/* Add Section */}
      <div className="flex gap-2">
        <input
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="Tên phần mới"
          className="p-3 border rounded-lg flex-1"
        />
        <button
          onClick={addSection}
          className="bg-green-600 text-white px-5 rounded-lg"
        >
          Thêm phần
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => {
          // Khởi tạo input mặc định
          const input = lessonInputs[section.id] || {
            title: "",
            type: "", // bắt buộc chọn
            duration: "",
          };

          return (
            <div key={section.id} className="section p-6 bg-white rounded-xl shadow">
              {/* Section header */}
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">{section.title}</h2>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-500"
                >
                  Xóa phần
                </button>
              </div>

              {/* Lessons list */}
              <div className="space-y-3 mb-4">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{lesson.title}</p>
                      <p className="text-sm text-gray-500">
                        {lesson.type} · {lesson.duration}
                      </p>

                      {lesson.file_url && lesson.type === "video" && (
                        <video
                          src={lesson.file_url}
                          controls
                          className="w-full h-40 mt-2 rounded-lg"
                        />
                      )}

                      {lesson.file_url && lesson.type === "document" && (
                        <a
                          href={lesson.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          Tải tài liệu
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        deleteLesson(section.id, lesson.id)
                      }
                      className="text-red-500"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>

              {/* Add lesson */}
              <div className="flex gap-2 flex-wrap">
                <input
                  placeholder="Tiêu đề"
                  value={input.title}
                  onChange={(e) =>
                    updateLessonInput(section.id, "title", e.target.value)
                  }
                  className="p-2 border rounded flex-1"
                />

                {/* Drop-down select cho type */}
                <select
                  value={input.type}
                  onChange={(e) =>
                    updateLessonInput(section.id, "type", e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="">-- Chọn loại --</option>  {/* bắt buộc chọn */}
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>

                <input
                  placeholder="Thời lượng"
                  value={input.duration}
                  onChange={(e) =>
                    updateLessonInput(section.id, "duration", e.target.value)
                  }
                  className="p-2 border rounded w-32"
                />

                <input type="file" className="p-2 border rounded" />

                <button
                  onClick={(e) => addLesson(section.id, e)}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Thêm
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageLessonsPage;
