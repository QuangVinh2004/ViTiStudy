import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import { ListItemLayout, LessonsCardComponent, LessonItem } from "../../components/layouts";
import LogoComponent from "../../components/common/LogoComponent";

function CourseDetail() {
  const { courseId } = useParams();

  const [sections, setSections] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchSections = async () => {
      const res = await api.get(`/sections/${courseId}`);
      setSections(res.data.data || []);

      const firstLesson = res.data.data?.[0]?.lessons?.[0];
      if (firstLesson) setCurrentLesson(firstLesson);
    };

    fetchSections();
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
    </div>
  );
}

export default CourseDetail;