import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function ManageAILessonsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== Edit course modal =====
  const [openEditModal, setOpenEditModal] = useState(false);
  const [price, setPrice] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [savingCourse, setSavingCourse] = useState(false);

  // ===== Upload lesson =====
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
        setPrice(courseRes.data.data.price || "");
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
  // UPDATE COURSE INFO
  // =========================
  const updateCourseInfo = async () => {
    try {
      setSavingCourse(true);

      const formData = new FormData();
      formData.append("price", price);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const { data } = await api.put(
        `/courses/${courseId}/metadata`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setCourse(data.data);
      setOpenEditModal(false);
      setThumbnailFile(null);
      setThumbnailPreview(null);

      alert("✅ Đã cập nhật thông tin khóa học");
    } catch (err) {
      console.error(err);
      alert("❌ Cập nhật thất bại");
    } finally {
      setSavingCourse(false);
    }
  };

  // =========================
  // DELETE SECTION
  // =========================
  const deleteSection = async (sectionId) => {
    if (!window.confirm("Xóa toàn bộ chương và các bài học bên trong?")) return;

    try {
      await api.delete(`/sections/${sectionId}`);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch (err) {
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
            ? { ...sec, lessons: sec.lessons.filter((l) => l.id !== lessonId) }
            : sec
        )
      );
    } catch {
      alert("❌ Xóa bài học thất bại");
    }
  };

  // =========================
  // UPLOAD LESSON CONTENT
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
          onUploadProgress: (e) =>
            setUploadProgress(Math.round((e.loaded * 100) / e.total)),
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

      alert("✅ Upload thành công");
    } catch {
      alert("❌ Upload thất bại");
    } finally {
      setUploadingLessonId(null);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return <div className="py-32 text-center">⏳ Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* ===== COURSE HEADER ===== */}
        <div className="bg-white rounded-3xl shadow p-8 flex gap-6 items-center">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Chưa có ảnh
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-500">
              Khóa học được AI tạo · Giảng viên hoàn thiện nội dung
            </p>
            <p className="text-lg">
              💰 Giá:{" "}
              <span className="font-semibold text-indigo-600">
                {course.price ? `${course.price} VNĐ` : "Miễn phí"}
              </span>
            </p>
          </div>

          <button
            onClick={() => setOpenEditModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            ✏️ Chỉnh sửa
          </button>
        </div>

        {/* ===== SECTIONS ===== */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-3xl shadow">
              <div className="flex justify-between items-center p-6 bg-indigo-50">
                <div>
                  <h2 className="text-xl font-bold">📘 {section.title}</h2>
                  <p className="text-sm text-gray-500">
                    {section.lessons.length} bài học
                  </p>
                </div>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-600"
                >
                  🗑
                </button>
              </div>

              <div className="p-6 space-y-4">
                {section.lessons.map((lesson) => {
                  const hasContent =
                    lesson.video_url || lesson.document_url;

                  return (
                    <div
                      key={lesson.id}
                      className="bg-slate-50 p-5 rounded-xl border"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{lesson.title}</p>
                          <p className="text-sm text-gray-500">
                            ⏱ {lesson.duration}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            deleteLesson(section.id, lesson.id)
                          }
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <select
                          onChange={(e) =>
                            (lesson._type = e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        >
                          <option value="">Loại</option>
                          <option value="video">Video</option>
                          <option value="document">Tài liệu</option>
                        </select>

                        <input
                          type="file"
                          onChange={(e) =>
                            (lesson._file = e.target.files[0])
                          }
                        />

                        <button
                          onClick={() => {
                            if (!lesson._file || !lesson._type) {
                              alert("Chọn file và loại");
                              return;
                            }
                            uploadLessonContent(
                              lesson.id,
                              lesson._file,
                              lesson._type
                            );
                          }}
                          className="bg-indigo-600 text-white px-4 rounded"
                        >
                          Upload
                        </button>
                      </div>

                      {uploadingLessonId === lesson.id && (
                        <div className="mt-2 text-sm">
                          Đang upload: {uploadProgress}%
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

      {/* ===== EDIT MODAL ===== */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-6">
            <h2 className="text-xl font-bold">
              Chỉnh sửa thông tin khóa học
            </h2>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Giá khóa học (VNĐ)"
              className="w-full border px-4 py-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setThumbnailFile(e.target.files[0]);
                setThumbnailPreview(
                  URL.createObjectURL(e.target.files[0])
                );
              }}
            />

            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                className="h-32 rounded object-cover"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenEditModal(false)}
                className="border px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={updateCourseInfo}
                className="bg-indigo-600 text-white px-6 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
