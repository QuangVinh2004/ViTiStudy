import React from "react";

export default function TestInfoForm() {
  return (
    <div className="bg-white text-gray-800 p-4 rounded-xl mb-6 shadow-md space-y-3">
      <input
        type="text"
        placeholder="Tên bài kiểm tra"
        className="w-full p-2 rounded bg-gray-100 border border-gray-300"
      />
      <input
        type="text"
        placeholder="Môn học"
        className="w-full p-2 rounded bg-gray-100 border border-gray-300"
      />
      <textarea
        placeholder="Mô tả ngắn"
        className="w-full p-2 rounded bg-gray-100 border border-gray-300"
      />
      <input
        type="number"
        placeholder="Thời gian làm bài (phút)"
        className="w-full p-2 rounded bg-gray-100 border border-gray-300"
      />
    </div>
  );
}
