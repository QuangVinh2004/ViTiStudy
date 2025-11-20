import { useState, useEffect } from "react";
import api from "../../api/axios";
import LogoComponent from "../../components/common/LogoComponent";
import { ListItemLayout, CardComponent } from "../../components/layouts";

function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        const result = response.data;

        if (result.success) {
          // Map dữ liệu từ API sang format của CardComponent
          const mappedCourses = result.data.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            price: course.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
            duration: course.duration,
            level: course.level,
            lessons: course.total_lessons || 0,
            coverImage: course.thumbnail,
            rating: parseFloat(course.rating),
            teacherName: course.teacher_name,
            teacherImage: course.teacher_avatar || "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
          }));

          setCourses(mappedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải khóa học...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center">
        <LogoComponent className="w-[180px] mb-4" />
        <h1 className="text-4xl font-bold">Danh sách khóa học</h1>
        <p className="text-gray-600 mt-2">Khám phá các khóa học hiện có</p>
      </div>

      {/* Course Grid */}
      <ListItemLayout>
        {courses.map((item) => (
          <CardComponent
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.coverImage}
            rating={item.rating}
            type="detail"
            price={item.price}
            teacherImage={item.teacherImage}
            teacherName={item.teacherName}
            lessonCount={item.lessons}
            onClick={() => {}}
          />
        ))}
      </ListItemLayout>
    </div>
  );
}

export default CourseListPage;
