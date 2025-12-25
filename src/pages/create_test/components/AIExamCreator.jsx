import React, { useState } from "react";
import api from "../../../api/axios";
import { convertAIExamToEditable } from "../utils/examConverter";
import AIExamEditor from "./AIExamEditor";

export default function AIExamCreator({ onBack, onExamGenerated, courseId }) {
  const [loading, setLoading] = useState(false);
  const [generatedExam, setGeneratedExam] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    topic: "",
    difficulty: "medium",
    num_questions: 10,
    duration_minutes: 60,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/exams/generate-ai", formData);

      if (response.status === 200 || response.status === 201) {
        console.log("AI Generated Exam:", response.data);

        if (response.data.success && response.data.data) {
          setGeneratedExam(response.data.data);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo đề bằng AI:", error);
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra!";
      alert(`⚠️ Thất bại: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleRegenerate = () => {
    setGeneratedExam(null);
    setEditMode(false);
  };

  const handleBackToPreview = () => {
    setEditMode(false);
  };

  const handleSaved = (savedData) => {
    if (onExamGenerated) {
      onExamGenerated(savedData);
    }
  };

  // Nếu đang ở chế độ chỉnh sửa
  if (editMode && generatedExam) {
    const editableExam = convertAIExamToEditable(generatedExam, formData.duration_minutes);
    return (
      <AIExamEditor
        initialExam={editableExam}
        onBack={handleBackToPreview}
        onSaved={handleSaved}
        courseId={courseId}
      />
    );
  }

  // Hiển thị preview đề thi đã được AI tạo
  if (generatedExam) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-purple-700">
            🤖 Xem trước đề kiểm tra
          </h2>
          <button
            type="button"
            onClick={handleRegenerate}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Tạo lại
          </button>
        </div>

        <div className="space-y-6">
          {generatedExam.sections?.map((section, sIdx) => (
            <div key={sIdx} className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-bold text-lg mb-3 text-gray-800">{section.title}</h4>
              
              <div className="space-y-4">
                {section.questions?.map((question, qIdx) => (
                  <div key={qIdx} className="bg-white border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">
                        Câu {qIdx + 1}: {question.question_text}
                      </p>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {question.points} điểm
                      </span>
                    </div>

                    {/* Hiển thị options cho trắc nghiệm và đúng/sai */}
                    {(question.question_type === "MULTIPLE_CHOICE" || question.question_type === "TRUE_FALSE") && (
                      <div className="mt-3 space-y-2">
                        {question.options?.map((option, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`flex items-center gap-2 p-2 rounded ${
                              option.is_correct ? 'bg-green-50 border border-green-300' : 'bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{option.option_text}</span>
                            {option.is_correct && (
                              <span className="ml-auto text-green-600 text-sm font-semibold">✓ Đáp án đúng</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hiển thị đáp án mẫu cho tự luận */}
                    {question.question_type === "SHORT_ANSWER" && question.correct_text_answer && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm font-semibold text-green-800 mb-1">Đáp án mẫu:</p>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{question.correct_text_answer}</p>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-gray-500">
                      Loại: {question.question_type === "MULTIPLE_CHOICE" ? "Trắc nghiệm" : 
                             question.question_type === "TRUE_FALSE" ? "Đúng/Sai" : "Tự luận ngắn"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleRegenerate}
            className="px-6 py-2 border border-purple-300 text-purple-700 rounded font-semibold hover:bg-purple-50 transition"
          >
            🔄 Tạo lại
          </button>
          <button
            type="button"
            onClick={handleEdit}
            className="px-6 py-2 border border-blue-300 text-blue-700 rounded font-semibold hover:bg-blue-50 transition"
          >
            ✏️ Chỉnh sửa
          </button>
        </div>
      </div>
    );
  }

  // Form nhập thông tin để AI tạo đề
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-700">
          🤖 Tạo đề kiểm tra bằng AI
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Tên đề kiểm tra *</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="VD: Kiểm tra giữa kỳ Toán 10"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Môn học *</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="VD: Toán học, Vật lý, Hóa học..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Chủ đề/Nội dung *</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="VD: Hàm số bậc nhất, Định luật Newton..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Độ khó *</label>
            <select
              className="w-full border rounded px-3 py-2"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Số lượng câu hỏi *</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="number"
              min={1}
              max={50}
              name="num_questions"
              value={formData.num_questions}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Thời lượng (phút) *</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="number"
              min={1}
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Gợi ý sử dụng AI:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Mô tả chủ đề càng chi tiết, AI sẽ tạo câu hỏi càng chính xác</li>
            <li>• AI sẽ tự động kết hợp các loại câu hỏi phù hợp với chủ đề</li>
            <li>• Bạn có thể xem trước và chỉnh sửa đề sau khi AI tạo xong</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
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
            {loading ? "🤖 AI đang tạo đề..." : "🚀 Tạo đề bằng AI"}
          </button>
        </div>
      </form>
    </div>
  );
}
