import React from "react";

export default function CreateMethodSelector({ onSelect }) {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Chọn phương thức tạo đề kiểm tra
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => onSelect("manual")}
          className="border-2 border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all bg-white"
        >
          <div className="text-center">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-xl font-bold mb-2">Tạo thủ công</h3>
            <p className="text-gray-600 mb-4">
              Tự thiết kế từng câu hỏi, phần thi theo ý muốn
            </p>
            <ul className="text-sm text-left space-y-2 text-gray-700">
              <li>✓ Kiểm soát hoàn toàn nội dung</li>
              <li>✓ Tùy chỉnh chi tiết từng câu hỏi</li>
              <li>✓ Thêm ảnh minh họa</li>
              <li>✓ Điều chỉnh điểm số linh hoạt</li>
            </ul>
          </div>
        </div>

        <div 
          onClick={() => onSelect("ai")}
          className="border-2 border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all bg-white"
        >
          <div className="text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Tạo bằng AI</h3>
            <p className="text-gray-600 mb-4">
              AI tự động tạo đề dựa trên yêu cầu của bạn
            </p>
            <ul className="text-sm text-left space-y-2 text-gray-700">
              <li>✓ Tạo nhanh chỉ trong vài giây</li>
              <li>✓ Đa dạng câu hỏi tự động</li>
              <li>✓ Dựa trên chủ đề và độ khó</li>
              <li>✓ Có thể chỉnh sửa sau khi tạo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
