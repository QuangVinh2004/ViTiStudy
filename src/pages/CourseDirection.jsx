import { useNavigate } from 'react-router-dom';
import { ButtonComponent, CommentComponent, LogoComponent, TitleComponent } from '../components/common';
import { CardComponent, ListItemLayout } from "../components/layouts";
import ChildImage from '../assets/images/child.png';

function CourseDetail() {

    const navigate = useNavigate();
    const handleGoToCheckoutPage = () => {
        navigate("/course/course-detail/checkout");
    };
    const course = {
        image: "https://thcshongthaiad.edu.vn/wp-content/uploads/2023/01/dia-ly.png",
        lessons: 24,
        duration: "30 giờ",
        rating: 4.9,
        price: 2990000,
        title: "Tìm hiểu Địa lí Việt Nam",
        description: "Cùng thầy Trần Dân tìm hiểu địa lí Việt Nam qua các bài học thú vị cùng các bài tập tự luyện giúp các em ghi nhớ nhanh và hiểu sâu hơn về địa lí nước ta.",
        teacher: {
            name: "Thầy Trịnh Quang Thắng",
            avatar: "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/474444882_1302949217615192_7690743294391666520_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=78OvE9IgzXsQ7kNvwH1l5sA&_nc_oc=Adm3oUdtHlNwG5BFdA7pObCMUNwCy_uUMbhaq5Bei2H18-BHzLWdqhMxqM10DDj3Vp64Qyb-yDHadoWOO73TKlMM&_nc_zt=23&_nc_ht=scontent.fdad2-1.fna&_nc_gid=SBl1i_cYT-ufn0tQVJeMkw&oh=00_AfTJhKTgPFuqgUUzttP0lvasnTUJtzSdjtSiHH8p46QZlg&oe=68862E6E",
            bio: "Giáo viên Địa lí hơn 15 năm kinh nghiệm.",
        },
    };

    const knowledgeList = [
        "Hiểu rõ các vùng miền địa lí Việt Nam",
        "Phân tích đặc điểm tự nhiên, dân cư, kinh tế",
        "Áp dụng kiến thức vào thực tế và bài tập",
        "Kỹ năng đọc bản đồ và số liệu địa lí",
        "Nắm vững kiến thức cơ bản và nâng cao",
        "Chuẩn bị tốt cho các kỳ thi và kiểm tra",
        "Phát triển tư duy phân tích và tổng hợp",
    ];

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
        {
            name: "Trịnh Trần Phương Huy",
            avatar: "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/484543239_1220077779635570_8139928040846312333_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=x00BH1d0FQYQ7kNvwHX-lCV&_nc_oc=Adl7GYmFAWzv7aIdmvxmTp8aRn7ClFttoZoSCpkZoiQltvw-k-RDdwkpEiQ3M9s4xkl-icXAmlpSoIb1lAwYD-MX&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=YbwKg1F2IKWsclhyycWy-w&oh=00_AfSmIiMrrjCn-REeUqzB3sqXgBc_RGfNe5ysEP6RT3zTbw&oe=68863B80",
            rating: 5,
            comment: "Địt m tuyệt cú mèo luôn. Xem hay hơn cả phim hành động two people",
        },
        {
            name: "Mít Tơ Quang Tèo",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 5,
            comment: "kimochi ngon quá, ăn mãi không chán",
        },
    ];

    return (
        <div className='max-w-7xl mx-auto py-10 px-4'>

            <LogoComponent className="w-[200px]" />

            <div className='grid grid-cols-7 gap-4 mt-7'>
                <div className='col-span-3 h-[300px] relative'>
                    <img
                        src={course.image}
                        alt={course.title}
                        className='rounded-3xl w-full h-full object-cover shadow'
                    />
                    <div className='absolute w-[750px] bg-cyan-200 top-56 left-[400px] p-5 rounded-3xl'>
                        <h3 className="text-lg font-bold mb-2 pl-2">{course.title}</h3>
                        <p className="text-black-500 text-sm mb-4 pl-3 leading-relaxed w-5/6">{course.description}</p>
                        <div className="flex justify-end">
                            <ButtonComponent onClick={handleGoToCheckoutPage} text="Mua khóa học" className='mr-2' />
                        </div>

                    </div>
                </div>

                <div className='col-span-2 h-[300px] ml-10'>
                    <h2 className="text-xl font-bold my-4">Thông tin khóa học</h2>
                    <ul className="space-y-1 text-gray-700 text-base">
                        <li>🧾 <strong>số bài học:</strong> {course.lessons}</li>
                        <li>⏱️ <strong>Thời lượng:</strong> {course.duration}</li>
                        <li>⭐ <strong>Đánh giá:</strong> {course.rating} / 5</li>
                        <li className='text-blue-600 font-bold text-lg ml-1'>💵Học phí: <strong>{course.price.toLocaleString()}</strong>  vnđ</li>
                    </ul>
                </div>

                <div className='col-span-2 h-[300px]'>
                    <h2 className="text-xl font-bold my-4">Giảng viên</h2>
                    <div className="flex items-start gap-4">
                        <img
                            src={course.teacher.avatar}
                            className="w-16 h-16 rounded-full object-cover"
                            alt={course.teacher.name}
                        />
                        <div>
                            <p className="font-medium text-lg">{course.teacher.name}</p>
                            <p className="text-gray-600 text-sm mt-1">{course.teacher.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center w-full mt-40">
                <div className="rounded-xl shadow-2xl bg-white/70 p-4 flex gap-6 items-center backdrop-blur-sm">
                    <img src={ChildImage} alt="ảnh" className="w-96 rounded-lg" />
                    <div className='pr-10'>
                        <h2 className="text-xl font-bold mb-3">Kiến thức học được</h2>
                        <ul className="list-disc pl-6 text-black">
                            {knowledgeList.map((item, idx) => (
                                <li key={idx} className="mb-1">📌 {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='flex content-between'>
                {/* Video giới thiệu */}
                <div className="mt-16 w-1/2">
                    <h2 className="text-xl font-bold mb-3">Video giới thiệu khóa học</h2>
                    <video
                        className="w-full max-w-2xl rounded-xl shadow mb-4"
                        controls
                        poster={course.image}
                    >
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>

                <div className="mt-16 ml-16 w-1/2">
                    <h2 className="text-xl font-bold mb-3">Đánh giá từ học viên</h2>
                    <div className="grid md:grid-cols-1 gap-3">
                        {reviews.map((review, idx) => (
                            <CommentComponent
                                key={idx}
                                avatar={review.avatar}
                                name={review.name}
                                rating={review.rating}
                                comment={review.comment}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-8">
                <ButtonComponent text="Mua ngay khóa học" bgColor='bg-orange-300' className='border-none py-3 px-4' />
            </div>

            <TitleComponent text="Gợi ý khóa học" />

            <ListItemLayout>
                {
                    [1, 2, 3, 4, 5].map((_, index) => (
                        <CardComponent
                            key={index}
                            type="detail"
                            title="GOAT Lionel Messi"
                            description="Cầu thủ vĩ đại nhất làng túc cầu."
                            imageUrl="https://i.pinimg.com/736x/22/82/31/228231b7995eab5f1fe75bfd11f224e3.jpg"
                            rating={4.9}
                            price={20000000}
                            teacherImage="https://randomuser.me/api/portraits/men/1.jpg"
                            teacherName="Thầy John"
                            lessonCount={10}
                            onClick={() => console.log("Messi is goat")}
                        />
                    ))
                }
            </ListItemLayout>
        </div>
    );
}

export default CourseDetail;
