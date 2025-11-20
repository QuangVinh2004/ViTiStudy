import { useState } from "react";

function CourseSectionsPage() {
  // Khóa học mẫu
  const course = {
    title: "Khóa học React cơ bản",
    coverImage: "https://via.placeholder.com/150",
  };

  // State lưu các phần
  const [sections, setSections] = useState([
    
  ]);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newLesson, setNewLesson] = useState({
    sectionId: null,
    title: "",
    type: "Video",
    duration: "",
  });

  // Thêm phần mới
  const addSection = () => {
    if (!newSectionTitle) return;
    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      lessons: [],
    };
    setSections((prev) => [...prev, newSection]);
    setNewSectionTitle("");
  };

  // Xóa phần
  const deleteSection = (id) => {
    setSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  // Thêm bài học mới vào phần
  const addLesson = (sectionId) => {
    if (!newLesson.title || !newLesson.duration) return;
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          const lesson = {
            ...newLesson,
            id: Date.now(),
          };
          return { ...sec, lessons: [...sec.lessons, lesson] };
        }
        return sec;
      })
    );
    setNewLesson({ sectionId: null, title: "", type: "Video", duration: "" });
  };

  // Xóa bài học
  const deleteLesson = (sectionId, lessonId) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            lessons: sec.lessons.filter((l) => l.id !== lessonId),
          };
        }
        return sec;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        {course.coverImage && (
          <img
            src={course.coverImage}
            alt="Course Cover"
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">{course.title}</h1>
      </div>

      {/* Form thêm phần mới */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Tên phần mới"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="p-3 border rounded-lg w-full"
        />
        <button
          onClick={addSection}
          className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Thêm phần
        </button>
      </div>

      {/* Danh sách các phần */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{section.title}</h2>
              <button
                onClick={() => deleteSection(section.id)}
                className="text-red-500 hover:text-red-700"
              >
                Xóa phần
              </button>
            </div>

            {/* Danh sách bài học */}
            <div className="space-y-2 mb-4">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{lesson.title}</p>
                    <p className="text-sm text-gray-500">
                      {lesson.type} - {lesson.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteLesson(section.id, lesson.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>

            {/* Form thêm bài học */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tiêu đề bài học"
                value={newLesson.sectionId === section.id ? newLesson.title : ""}
                onChange={(e) =>
                  setNewLesson({
                    ...newLesson,
                    sectionId: section.id,
                    title: e.target.value,
                  })
                }
                className="p-3 border rounded-lg w-full"
              />
              <select
                value={newLesson.type}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, type: e.target.value })
                }
                className="p-3 border rounded-lg"
              >
                <option value="Video">Video</option>
                <option value="Text">Văn bản</option>
                <option value="Quiz">Quiz</option>
              </select>
              <input
                type="text"
                placeholder="Thời lượng"
                value={newLesson.sectionId === section.id ? newLesson.duration : ""}
                onChange={(e) =>
                  setNewLesson({
                    ...newLesson,
                    sectionId: section.id,
                    duration: e.target.value,
                  })
                }
                className="p-3 border rounded-lg w-32"
              />
              <button
                onClick={() => addLesson(section.id)}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSectionsPage;
