import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { CardComponent, SlideComponent, ListItemLayout } from "../../components/layouts";
import { TitleComponent } from "../../components/common";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';
import StatsSection from './StatsSection';
import ReviewSection from './ReviewSection';
import TeachersSection from './TeachersSection';
import ContactSection from './ContactSection';
import FeedbackSection from './FeedbackSection';

function HomePage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);

  const handleCardClick = () => {
    console.log("click")
    navigate('/course/course-direction');
  };
  const handleTestClick = (examId) => {
    console.log("test click", examId)
    navigate(`/test/${examId}`);
  }

  const slides = [
    {
      title: "Kèo nhà cái tại fb88",
      desc: "Fb88 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.",
      bg: "from-pink-500 to-orange-400",
    },
    {
      title: "Khóa học Pro",
      desc: "Cơ hội học tập chuyên sâu với giảng viên hàng đầu.",
      bg: "from-blue-500 to-purple-500",
    },
  ];

  const stats = [
    { number: '25K+', label: 'Active Students' },
    { number: '899', label: 'Total Courses' },
    { number: '158', label: 'Instructor' },
    { number: '100%', label: 'Satisfaction Rate' },
  ];

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
    comment: "Tôi có thể theo dõi quá trình học tập của học sinh dễ dàng. Rất tiện lợi!",
  },
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
    comment: "Tôi có thể theo dõi quá trình học tập của học sinh dễ dàng. Rất tiện lợi!",
  },
];

const teachers = [
  {
    name: "Nguyễn Văn A",
    subject: "Toán học",
    bio: "Giáo viên Toán học với hơn 10 năm kinh nghiệm giảng dạy cấp 3.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Trần Thị B",
    subject: "Tiếng Anh",
    bio: "Chuyên gia luyện thi IELTS với phong cách giảng dạy cuốn hút.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Lê Văn C",
    subject: "Vật lý",
    bio: "Đã từng đạt giải quốc gia, hiện là giảng viên đại học.",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const course = [
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
  {
    title: "Khóa học làm người",
    image: "https://pms.edu.vn/wp-content/uploads/2024/04/khoa-hoc-ky-nang-mem.jpg",
    description: "Khóa học giúp bạn làm người.",
    rating: 4.8,
    teacherImage: "https://i.pravatar.cc/150?img=3",
    teacherName: "Nguyễn Văn A",
    lessonCount: 10,
    price: 2500000,
  },
]

  // Fetch exams from API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoadingExams(true);
        const response = await api.get('/exams/');
        if (response.data && response.data.data) {
          setExams(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoadingExams(false);
      }
    };

    fetchExams();
  }, []);

  return (

    <div className="px-[100px] py-3">
      <Header />
      <SlideComponent>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex items-center overflow-hidden rounded-xl shadow-lg justify-center h-[400px] bg-gradient-to-r ${slide.bg} text-white`}
          >
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="mb-6">{slide.desc}</p>
              <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </SlideComponent>

      <StatsSection stats={stats} />

      <TitleComponent text="Khóa học của tôi." />
      <ListItemLayout>
        {course.map((item, index) => (
          <CardComponent
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.image}
            rating={item.rating}
            onClick={handleTestClick}
          />
        ))}
      </ListItemLayout>

      <ReviewSection />

      <TitleComponent text="Gợi ý khóa học" />
      <ListItemLayout>
        {course.map((item, index) => (
          <CardComponent
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.image}
            rating={item.rating}
            type="detail"
            price={item.price}
            teacherImage={item.teacherImage}
            teacherName={item.teacherName}
            lessonCount={item.lessonCount}
            onClick={handleCardClick}
          />
        ))}
      </ListItemLayout>

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
              description={exam.description || `Thời gian: ${exam.duration_minutes} phút - ${exam.sections?.reduce((sum, s) => sum + (s.questions?.length || 0), 0) || 0} câu hỏi`}
              imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500"
              rating={4.5}
              onClick={() => handleTestClick(exam.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Chưa có bài kiểm tra nào
          </div>
        )}
      </ListItemLayout>

      <TeachersSection teachers={teachers} />

      <ContactSection />

      <FeedbackSection feedbacks={feedbacks} />

      <Footer />
    </div>
  );
}

export default HomePage;