import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ButtonComponent,
    CommentComponent,
    LogoComponent,
    TitleComponent,
} from "../components/common";
import { CardComponent, ListItemLayout } from "../components/layouts";
import ChildImage from "../assets/images/child.png";
import api from "../api/axios";

function CourseDirection() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [suggestCourses, setSuggestCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseRes, sectionRes, suggestRes] = await Promise.all([
                    api.get(`/courses/${courseId}`),
                    api.get(`/sections/${courseId}`),
                    api.get(`/courses`),
                ]);

                setCourse(courseRes.data.data);
                setSections(sectionRes.data.data);
                setSuggestCourses(
                    suggestRes.data.data.filter(c => c.id !== Number(courseId))
                );
            } catch (err) {
                console.error(err);
                alert("Không thể tải khóa học");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    // =========================
    // VIDEO DEMO (LESSON ĐẦU TIÊN)
    // =========================
    const demoVideo =
        sections
            .flatMap(sec => sec.lessons)
            .find(l => l.video_url)?.video_url || null;

    // =========================
    // KIẾN THỨC HỌC ĐƯỢC
    // =========================
    const knowledgeList = sections.flatMap(sec =>
        sec.lessons.map(l => l.title)
    );

    // =========================
    // REVIEW (GIỮ CỨNG)
    // =========================
    const reviews = [
        {
            name: "Nguyễn Văn Nam",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
            rating: 5,
            comment: "Khóa học rất bổ ích, thầy giảng dễ hiểu!",
        },
        {
            name: "Trần Thị Hoa",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 5,
            comment: "Nội dung phong phú, thực tế, rất hài lòng.",
        },
    ];

    if (loading || !course) {
        return <div className="py-32 text-center">⏳ Đang tải...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">

            <LogoComponent className="w-[200px]" />

            {/* ===== HEADER ===== */}
            <div className="grid grid-cols-7 gap-4 mt-7">
                <div className="col-span-3 h-[300px] relative">
                    <img
                        src={course.thumbnail || "https://via.placeholder.com/600"}
                        alt={course.title}
                        className="rounded-3xl w-full h-full object-cover shadow"
                    />

                    <div className="absolute w-[750px] bg-cyan-200 top-56 left-[400px] p-5 rounded-3xl">
                        <h3 className="text-lg font-bold mb-2 pl-2">
                            {course.title}
                        </h3>
                        <p className="text-sm mb-4 pl-3 leading-relaxed w-5/6">
                            {course.description}
                        </p>
                        <div className="flex justify-end">
                            <ButtonComponent
                                text="Mua khóa học"
                                onClick={() => navigate(`/course/checkout/${courseId}`)}
                            />
                        </div>
                    </div>
                </div>

                {/* INFO */}
                <div className="col-span-2 h-[300px] ml-10">
                    <h2 className="text-xl font-bold my-4">Thông tin khóa học</h2>
                    <ul className="space-y-1 text-gray-700">
                        <li>🧾 <b>Số bài học:</b> {course.total_lessons}</li>
                        <li>⏱️ <b>Thời lượng:</b> {course.duration}</li>
                        <li>⭐ <b>Trình độ:</b> {course.level}</li>
                        <li className="text-blue-600 font-bold text-lg">
                            💵 Học phí: {course.price?.toLocaleString() || "Miễn phí"} VNĐ
                        </li>
                    </ul>
                </div>

                {/* TEACHER */}
                <div className="col-span-2 h-[300px]">
                    <h2 className="text-xl font-bold my-4">Giảng viên</h2>
                    <div className="flex items-start gap-4">
                        <img
                            src={course.teacher_avatar || "https://i.pravatar.cc/150"}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium text-lg">{course.teacher_name}</p>
                            <p className="text-gray-600 text-sm">
                                Giảng viên hệ thống
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== KIẾN THỨC ===== */}
            <div className="flex justify-center items-center w-full mt-40">
                <div className="rounded-xl shadow-2xl bg-white/70 p-4 flex gap-6">
                    <img src={ChildImage} className="w-96 rounded-lg" />
                    <div className="pr-10">
                        <h2 className="text-xl font-bold mb-3">
                            Kiến thức học được
                        </h2>
                        <ul className="list-disc pl-6">
                            {knowledgeList.map((item, idx) => (
                                <li key={idx}>📌 {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ===== VIDEO + REVIEW ===== */}
            <div className="mt-16 flex gap-10 items-start">

                {/* VIDEO DEMO */}
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-3">
                        Video giới thiệu khóa học
                    </h2>

                    {demoVideo ? (
                        <video
                            className="w-full rounded-xl shadow"
                            controls
                            poster={course.thumbnail}
                        >
                            <source src={demoVideo} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="text-gray-500">
                            Chưa có video giới thiệu
                        </div>
                    )}
                </div>

                {/* REVIEW */}
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-3">
                        Đánh giá từ học viên
                    </h2>

                    <div className="space-y-4">
                        {reviews.map((r, i) => (
                            <CommentComponent key={i} {...r} />
                        ))}
                    </div>
                </div>

            </div>

            {/* ===== SUGGEST ===== */}
            <TitleComponent text="Gợi ý khóa học" />
            <ListItemLayout>
                {suggestCourses.slice(0, 5).map(c => (
                    <CardComponent
                        key={c.id}
                        type="detail"
                        title={c.title}
                        description={c.description}
                        imageUrl={c.thumbnail}
                        rating={4.8}
                        price={c.price}
                        teacherImage={c.teacher_avatar}
                        teacherName={c.teacher_name}
                        lessonCount={c.total_lessons}
                        onClick={() => navigate(`/course/${c.id}`)}
                    />
                ))}
            </ListItemLayout>
        </div>
    );
}

export default CourseDirection;
