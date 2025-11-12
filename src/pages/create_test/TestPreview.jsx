// src/pages/components/TestPreview.jsx
import React from "react";

export default function TestPreview({ testInfo, questions, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-xl shadow-lg max-w-2xl w-full p-8 relative overflow-y-auto max-h-[80vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Xem trước bài kiểm tra</h2>

        {/* Thông tin bài kiểm tra */}
        <div className="mb-4 space-y-1">
          <div>
            <span className="font-semibold">Tên bài kiểm tra:</span> {testInfo.name}
          </div>
          <div>
            <span className="font-semibold">Môn học:</span> {testInfo.subject}
          </div>
          <div>
            <span className="font-semibold">Thời gian:</span> {testInfo.duration} phút
          </div>
          <div>
            <span className="font-semibold">Mô tả:</span> {testInfo.description}
          </div>
        </div>

        {/* Danh sách câu hỏi */}
        <div>
          {questions.length === 0 && (
            <div className="text-gray-500 text-center">Chưa có câu hỏi nào.</div>
          )}

          {questions.map((q, i) => (
            <div key={i} className="mb-6 border-b pb-4">
              <div className="font-semibold mb-2">
                Câu {i + 1}: {q.content}
              </div>

              {q.imagePreview && (
                <img
                  src={q.imagePreview}
                  alt="minh họa"
                  className="mb-2 max-h-40 rounded shadow-sm"
                />
              )}

              {q.type === "multiple" && (
                <div className="space-y-1">
                  {q.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                      {q.answer === opt && (
                        <span className="ml-2 text-green-600 font-semibold">
                          (Đáp án)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {q.type === "truefalse" && (
                <div>
                  <span className="font-bold">Đáp án:</span>{" "}
                  <span>{q.answer === "true" ? "Đúng" : "Sai"}</span>
                </div>
              )}

              {q.type === "short" && (
                <div>
                  <span className="font-bold">Đáp án:</span> {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
