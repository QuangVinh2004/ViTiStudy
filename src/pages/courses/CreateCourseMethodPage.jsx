import { useNavigate } from "react-router-dom";

const CreateCourseMethodPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 py-12">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        Chọn phương thức tạo khóa học
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* 📝 Tạo thủ công */}
        <div
          onClick={() =>
            navigate("/teacher/manage-courses/create-course/manual")
          }
          className="cursor-pointer bg-white rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-8"
        >
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-semibold mb-3">Tạo thủ công</h2>
          <p className="text-gray-600 mb-4">
            Tự thiết kế khóa học theo cấu trúc và nội dung mong muốn.
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Kiểm soát toàn bộ nội dung</li>
            <li>✓ Tùy chỉnh từng bài học</li>
            <li>✓ Thêm video, tài liệu, bài tập</li>
            <li>✓ Phù hợp giảng viên chuyên sâu</li>
          </ul>
        </div>

        {/* 🤖 Tạo bằng AI */}
        <div
          onClick={() =>
            navigate("/teacher/manage-courses/create-course/ai")
          }
          className="cursor-pointer bg-white rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-8"
        >
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-xl font-semibold mb-3">Tạo bằng AI</h2>
          <p className="text-gray-600 mb-4">
            AI tự động xây dựng khóa học dựa trên yêu cầu của bạn.
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Tạo nhanh trong vài phút</li>
            <li>✓ Gợi ý nội dung & lộ trình học</li>
            <li>✓ Tự động chia bài học</li>
            <li>✓ Có thể chỉnh sửa sau khi tạo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseMethodPage;
