import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import { ListItemLayout, LessonsCardComponent, LessonItem } from "../../components/layouts";
import LogoComponent from "../../components/common/LogoComponent";

function CourseDetail() {
  const { courseId } = useParams();

  const [sections, setSections] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const fetchSections = async () => {
      const res = await api.get(`/sections/${courseId}`);
      setSections(res.data.data || []);

      const firstLesson = res.data.data?.[0]?.lessons?.[0];
      if (firstLesson) setCurrentLesson(firstLesson);
    };

    const fetchExams = async () => {
      setLoadingExams(true);
      try {
        const res = await api.get(`/exams/course/${courseId}`);
        setExams(res.data.data || []);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setExams([]);
      } finally {
        setLoadingExams(false);
      }
    };

    fetchSections();
    fetchExams();
  }, [courseId]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <LogoComponent className="w-[200px]" />

      <div className="flex gap-6 mt-12">
        <div className="w-[36%] border p-4 bg-slate-50 rounded-lg shadow max-h-[500px] overflow-y-auto">
          <ListItemLayout direction="vertical">
            {sections.map((section) => (
              <LessonsCardComponent
                key={section.id}
                chapterTitle={section.title}
                lessonCount={`${section.lessons.length} bài học`}
              >
                {section.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    title={lesson.title}
                    duration={lesson.duration}
                    onClick={() => setCurrentLesson(lesson)}
                    active={currentLesson?.id === lesson.id}
                  />
                ))}
              </LessonsCardComponent>
            ))}
          </ListItemLayout>
        </div>

        <div className="flex-1 ml-4">
          {currentLesson?.video_url ? (
            <video
              key={currentLesson.video_url}
              src={currentLesson.video_url}
              controls
              className="w-full h-[500px] rounded-xl bg-black"
            />
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center bg-gray-200 rounded-xl">
              <p className="text-gray-500">Chọn bài học để xem</p>
            </div>
          )}
        </div>
      </div>
      {/* Phần hiển thị bài kiểm tra */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Bài kiểm tra</h2>

        {loadingExams ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải bài kiểm tra...</p>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">Chưa có bài kiểm tra nào cho khóa học này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Thông tin bài kiểm tra */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {exam.title}
                        </h3>
                        {exam.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {exam.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full whitespace-nowrap">
                    ⏱️ {exam.duration_minutes} phút
                  </span>
                  {/* Nút hành động */}
                  <div>
                    <button
                      onClick={() => {
                        // Navigate to test page
                        window.location.href = `/test/${exam.id}`;
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                    >
                      Bắt đầu làm bài
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Hiển thị các bài kiểm tra dưới dạng danh sách tại đây */}
    </div>
  );
}

export default CourseDetail;