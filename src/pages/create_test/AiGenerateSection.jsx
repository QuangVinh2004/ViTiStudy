import React from "react";

export default function AiGenerateSection() {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
      <textarea
        placeholder="Ví dụ: Tạo 10 câu trắc nghiệm về cấu trúc dữ liệu và giải thuật"
        className="w-full p-2 rounded bg-gray-100 border border-gray-300 mb-3"
      />
      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white">
        Tạo bằng AI
      </button>
    </div>
  );
}
