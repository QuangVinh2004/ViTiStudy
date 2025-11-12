import React from "react";

export default function QuestionCard({
  index,
  question,
  updateQuestion,
  handleImageUpload,
  removeQuestion,
  duplicateQuestion,
}) {
  return (
    <div className="bg-white p-4 rounded-xl mb-4 shadow-md text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-lg">Câu {index + 1}</span>
        <select
          value={question.type}
          onChange={(e) => updateQuestion(index, "type", e.target.value)}
          className="bg-gray-100 rounded px-2 py-1 border border-gray-300"
        >
          <option value="multiple">Trắc nghiệm (A, B, C, D)</option>
          <option value="truefalse">Đúng / Sai</option>
          <option value="short">Tự luận ngắn</option>
        </select>
      </div>

      {/* Nội dung câu hỏi */}
      <textarea
        placeholder="Nhập nội dung câu hỏi"
        value={question.content}
        onChange={(e) => updateQuestion(index, "content", e.target.value)}
        className="w-full p-2 rounded bg-gray-100 border border-gray-300 mb-3"
      />

      {/* Ảnh minh họa */}
      <div className="mb-3">
        <label className="text-sm block mb-1 text-gray-700">
          Ảnh minh họa (tuỳ chọn)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(index, e.target.files[0])}
          className="w-full p-2 rounded bg-gray-100 border border-gray-300"
        />
        {question.imagePreview && (
          <img
            src={question.imagePreview}
            alt="Preview"
            className="mt-2 rounded-lg max-h-48 object-contain border border-gray-300"
          />
        )}
      </div>

      {/* Các loại câu hỏi */}
      {question.type === "multiple" && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name={`answer-${index}`}
                checked={question.answer === opt}
                onChange={() => updateQuestion(index, "answer", opt)}
              />
              <input
                type="text"
                placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
                value={opt}
                onChange={(e) => {
                  const opts = [...question.options];
                  opts[i] = e.target.value;
                  updateQuestion(index, "options", opts);
                }}
                className="flex-1 p-2 rounded bg-gray-100 border border-gray-300"
              />
            </div>
          ))}
        </div>
      )}

      {question.type === "truefalse" && (
        <div className="flex gap-4 mt-2">
          {["true", "false"].map((val, i) => (
            <label key={i} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name={`answer-${index}`}
                checked={question.answer === val}
                onChange={() => updateQuestion(index, "answer", val)}
              />
              {val === "true" ? "Đúng" : "Sai"}
            </label>
          ))}
        </div>
      )}

      {question.type === "short" && (
        <input
          type="text"
          placeholder="Nhập đáp án ngắn"
          value={question.answer}
          onChange={(e) => updateQuestion(index, "answer", e.target.value)}
          className="w-full p-2 rounded bg-gray-100 border border-gray-300 mt-2"
        />
      )}

      {/* Nút hành động */}
      <div className="flex justify-end mt-3 gap-2">
        <button
          onClick={() => removeQuestion(index)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Xóa
        </button>
        <button
          onClick={() => duplicateQuestion(index)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Nhân bản
        </button>
      </div>
    </div>
  );
}
