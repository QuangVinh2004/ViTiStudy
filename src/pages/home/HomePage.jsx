import { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import {
  CardComponent,
  SlideComponent,
  ListItemLayout,
} from "../../components/layouts";
import { TitleComponent } from "../../components/common";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import StatsSection from "./StatsSection";
import ReviewSection from "./ReviewSection";
import TeachersSection from "./TeachersSection";
import ContactSection from "./ContactSection";
import FeedbackSection from "./FeedbackSection";

function HomePage() {
  const navigate = useNavigate();

  // =========================
  // STATE (DATA THỰC)
  // =========================
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingExams, setLoadingExams] = useState(true);

  // =========================
  // STATIC UI DATA
  // =========================
  const slides = [
    {
      title: "Nền tảng học tập tích hợp AI",
      desc: "Tạo khóa học, bài giảng và bài kiểm tra thông minh với sự hỗ trợ của AI.",
      bg: "from-pink-500 to-orange-400",
    },
    {
      title: "Học tập hiệu quả hơn",
      desc: "Theo dõi tiến độ, làm bài kiểm tra và cải thiện kết quả học tập.",
      bg: "from-blue-500 to-purple-500",
    },
  ];

  const stats = [
    { number: "25K+", label: "Học viên" },
    { number: "800+", label: "Khóa học" },
    { number: "150+", label: "Giảng viên" },
    { number: "100%", label: "Hài lòng" },
  ];

  // =========================
  // FEEDBACK (DATA CỨNG)
  // =========================
  const feedbacks = [
    {
      name: "Nguyễn Văn A",
      role: "Sinh viên năm 3",
      avatar: "https://i.pravatar.cc/150?img=3",
      comment: "ViTiStudy giúp học hiệu quả, giao diện thân thiện và rất dễ sử dụng!",
    },
    {
      name: "Trần Thị B",
      role: "Phụ huynh",
      avatar: "https://i.pravatar.cc/150?img=5",
      comment: "Tôi yên tâm hơn khi con mình học qua nền tảng này, rất đáng tin cậy.",
    },
    {
      name: "Lê Văn C",
      role: "Giáo viên",
      avatar: "https://i.pravatar.cc/150?img=8",
      comment: "Tôi có thể theo dõi quá trình học tập của học sinh dễ dàng.",
    },
  ];

  // =========================
  // FETCH COURSES
  // =========================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = await api.get("/courses");
        if (res.data?.data) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // =========================
  // FETCH EXAMS
  // =========================
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoadingExams(true);
        const res = await api.get("/exams");
        if (res.data?.data) {
          setExams(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching exams:", err);
      } finally {
        setLoadingExams(false);
      }
    };

    fetchExams();
  }, []);

  // =========================
  // NAVIGATION
  // =========================
  const handleCourseClick = (courseId) => {
    navigate(`/course/course-direction/${courseId}`);
  };

  const handleExamClick = (examId) => {
    navigate(`/test/${examId}`);
  };

  // =========================
  // TEACHERS (TỪ COURSE)
  // =========================
  const teachers = Array.from(
    new Map(
      courses.map((c) => [
        c.teacher_name,
        {
          name: c.teacher_name,
          subject: "Giảng viên",
          bio: "Giảng viên trên nền tảng",
          image: c.teacher_avatar || "https://i.pravatar.cc/150",
        },
      ])
    ).values()
  );

  // =========================
  // RENDER JSX
  // =========================
  return (
    <div className="px-[100px] py-3">
      <Header />

      {/* SLIDER */}
      <SlideComponent>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-[400px] rounded-xl shadow-lg bg-gradient-to-r ${slide.bg} text-white`}
          >
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="mb-6">{slide.desc}</p>
              <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">
                Khám phá ngay
              </button>
            </div>
          </div>
        ))}
      </SlideComponent>

      {/* STATS */}
      <StatsSection stats={stats} />

      {/* KHÓA HỌC NỔI BẬT */}
      <TitleComponent text="Khóa học nổi bật" />
      <ListItemLayout>
        {loadingCourses ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Đang tải khóa học...
          </div>
        ) : (
          courses.slice(0, 4).map((course) => (
            <CardComponent
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.thumbnail || "https://via.placeholder.com/300"}
              rating={Number(course.rating) || 0}
              onClick={() => handleCourseClick(course.id)}
            />
          ))
        )}
      </ListItemLayout>

      {/* REVIEW */}
      <ReviewSection />

      {/* GỢI Ý KHÓA HỌC */}
      <TitleComponent text="Gợi ý khóa học" />
      <ListItemLayout>
        {loadingCourses ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Đang tải...
          </div>
        ) : (
          courses.map((course) => (
            <CardComponent
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.thumbnail || "https://via.placeholder.com/300"}
              rating={Number(course.rating) || 0}
              type="detail"
              price={course.price}
              teacherImage={course.teacher_avatar}
              teacherName={course.teacher_name}
              lessonCount={course.total_lessons}
              onClick={() => handleCourseClick(course.id)}
            />
          ))
        )}
      </ListItemLayout>

      {/* BÀI KIỂM TRA */}
      <TitleComponent text="Bài kiểm tra phổ biến" />
      <ListItemLayout>
        {loadingExams ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Đang tải bài kiểm tra...
          </div>
        ) : exams.length > 0 ? (
          exams.map((exam) => (
            <CardComponent
              key={exam.id}
              title={exam.title}
              description={`Thời gian: ${exam.duration_minutes} phút`}
              imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500"
              rating={4.5}
              onClick={() => handleExamClick(exam.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Chưa có bài kiểm tra
          </div>
        )}
      </ListItemLayout>

      {/* GIẢNG VIÊN */}
      <TeachersSection teachers={teachers} />

      {/* CONTACT + FEEDBACK */}
      <ContactSection />
      <FeedbackSection feedbacks={feedbacks} />

      <Footer />
    </div>
  );
}

export default HomePage;
