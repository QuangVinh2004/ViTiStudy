import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function ManageAILessonsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // upload state
  const [uploadingLessonId, setUploadingLessonId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // =========================
  // LOAD COURSE + SECTIONS
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, sectionRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/sections/${courseId}`),
        ]);

        setCourse(courseRes.data.data);
        setSections(sectionRes.data.data);
      } catch (err) {
        console.error(err);
        alert("❌ Không thể tải dữ liệu khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // =========================
  // DELETE SECTION
  // =========================
  const deleteSection = async (sectionId) => {
    if (!window.confirm("Xóa toàn bộ chương này và các bài học bên trong?"))
      return;

    try {
      await api.delete(`/sections/${sectionId}`);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch (err) {
      console.error(err);
      alert("❌ Xóa chương thất bại");
    }
  };

  // =========================
  // DELETE LESSON
  // =========================
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
      alert("❌ Xóa bài học thất bại");
    }
  };

  // =========================
  // UPLOAD CONTENT
  // =========================
  const uploadLessonContent = async (lessonId, file, type) => {
    try {
      setUploadingLessonId(lessonId);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("type", type);
      formData.append("file", file);

      const { data } = await api.put(
        `/lessons/${lessonId}/upload`,
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
        prev.map((sec) => ({
          ...sec,
          lessons: sec.lessons.map((l) =>
            l.id === lessonId ? data.data : l
          ),
        }))
      );

      alert("✅ Đã upload nội dung bài học");
    } catch (err) {
      console.error(err);
      alert("❌ Upload thất bại");
    } finally {
      setUploadingLessonId(null);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">
        ⏳ Đang tải khóa học AI...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* COURSE HEADER */}
        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 flex items-center gap-6">
          <div className="w-28 h-28 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
            AI
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {course?.title}
            </h1>
            <p className="text-gray-500 mt-1">
              Hoàn thiện nội dung khóa học do AI tạo
            </p>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              {/* SECTION HEADER */}
              <div className="flex justify-between items-center px-8 py-6 bg-indigo-50">
                <div>
                  <h2 className="text-xl font-bold">
                    📘 {section.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {section.lessons.length} bài học
                  </p>
                </div>

                <button
                  onClick={() => deleteSection(section.id)}
                  className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                  title="Xóa chương"
                >
                  🗑
                </button>
              </div>

              {/* LESSONS */}
              <div className="p-6 space-y-4">
                {section.lessons.map((lesson) => {
                  const hasContent =
                    lesson.video_url || lesson.document_url;

                  return (
                    <div
                      key={lesson.id}
                      className="bg-slate-50 rounded-2xl p-5 border"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            ⏱ {lesson.duration}
                          </p>

                          <span
                            className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                              hasContent
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {hasContent
                              ? "✅ Đã có nội dung"
                              : "⚠️ Chưa có nội dung"}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            deleteLesson(section.id, lesson.id)
                          }
                          className="w-8 h-8 rounded-full bg-red-50 text-red-500"
                          title="Xóa bài học"
                        >
                          ✕
                        </button>
                      </div>

                      {/* UPLOAD */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        <select
                          className="rounded-xl border px-4 py-2"
                          onChange={(e) =>
                            (lesson._uploadType = e.target.value)
                          }
                        >
                          <option value="">Loại nội dung</option>
                          <option value="video">🎥 Video</option>
                          <option value="document">📄 Tài liệu</option>
                        </select>

                        <input
                          type="file"
                          className="rounded-xl border px-4 py-2"
                          onChange={(e) =>
                            (lesson._file = e.target.files[0])
                          }
                        />

                        <button
                          disabled={uploadingLessonId === lesson.id}
                          onClick={() => {
                            if (!lesson._file || !lesson._uploadType) {
                              alert("⚠️ Chọn file và loại nội dung");
                              return;
                            }
                            uploadLessonContent(
                              lesson.id,
                              lesson._file,
                              lesson._uploadType
                            );
                          }}
                          className={`rounded-xl px-6 py-2 text-white font-semibold ${
                            uploadingLessonId === lesson.id
                              ? "bg-gray-400"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          Upload
                        </button>
                      </div>

                      {/* PROGRESS */}
                      {uploadingLessonId === lesson.id && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Đang upload</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-indigo-600 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
