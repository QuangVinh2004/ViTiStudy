import React, { useState } from "react";
import api from "../../../api/axios";
import { useExamState } from "../useExamState";
import ExamBasicInfo from "./ExamBasicInfo";
import Section from "./Section";
import { convertEditableToBackend } from "../utils/examConverter";

export default function AIExamEditor({ initialExam, onBack, onSaved }) {
  const [loading, setLoading] = useState(false);

  // Sử dụng custom hook với initial data từ AI
  const {
    exam,
    handleExamChange,
    addSection,
    removeSection,
    updateSection,
    addQuestion,
    removeQuestion,
    updateQuestion,
    changeQuestionType,
    addOption,
    removeOption,
    updateOption,
  } = useExamState(initialExam);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert về format backend
    const payload = convertEditableToBackend(exam);

    console.log("Sending AI-edited exam:", payload);

    try {
      const response = await api.post("/exams/create", payload);

      if (response.status === 200 || response.status === 201) {
        alert("🎉 Lưu đề kiểm tra thành công!");
        console.log("Response data:", response.data);
        
        if (onSaved) {
          onSaved(response.data);
        }
      }
    } catch (error) {
      console.error("Lỗi khi lưu đề kiểm tra:", error);
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra!";
      alert(`⚠️ Thất bại: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-purple-700">
            ✏️ Chỉnh sửa đề kiểm tra (Tạo bởi AI)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Bạn có thể chỉnh sửa nội dung, thêm/xóa câu hỏi, thêm ảnh minh họa...
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <ExamBasicInfo exam={exam} onChange={handleExamChange} />

        <div>
          <h3 className="text-lg font-semibold mb-2">Các phần thi</h3>
          {exam.sections.map((section, sIdx) => (
            <Section
              key={section.id}
              section={section}
              sectionIndex={sIdx}
              canDelete={exam.sections.length > 1}
              onRemove={removeSection}
              onUpdate={updateSection}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
              onUpdateQuestion={updateQuestion}
              onChangeQuestionType={changeQuestionType}
              onAddOption={addOption}
              onRemoveOption={removeOption}
              onUpdateOption={updateOption}
            />
          ))}
          <button
            type="button"
            className="text-blue-700 font-semibold mt-2"
            onClick={addSection}
          >
            + Thêm phần thi
          </button>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded font-semibold hover:bg-gray-50 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? "Đang lưu..." : "💾 Lưu đề kiểm tra"}
          </button>
        </div>
      </form>
    </div>
  );
}
