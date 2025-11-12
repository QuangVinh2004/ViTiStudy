import React from "react";

export default function ImportWordSection() {
  return (
    <div className="bg-white text-gray-800 p-6 text-center rounded-xl shadow-md">
      <input
        type="file"
        accept=".docx"
        className="bg-gray-100 p-2 rounded border border-gray-300 mb-3 w-full text-gray-800"
      />
      <p className="text-sm text-gray-500">
        Tải file Word có định dạng chuẩn (Câu 1:..., A. ..., B. ...).
      </p>
    </div>
  );
}
