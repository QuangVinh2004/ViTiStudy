import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useExamState } from "./useExamState";
import ExamBasicInfo from "./components/ExamBasicInfo";
import Section from "./components/Section";
import CreateMethodSelector from "./components/CreateMethodSelector";
import ManualExamCreator from "./components/ManualExamCreator";
import AIExamCreator from "./components/AIExamCreator";

export default function CreateExam() {
  const [loading, setLoading] = useState(false);
  const [createMethod, setCreateMethod] = useState(null); // null | "manual" | "ai"
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;

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
  } = useExamState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { id: examId, sections, ...restExam } = exam;
    const payload = {
      ...restExam,
      course_id: courseId,
      sections: sections.map((section) => {
        const { id: secId, questions, ...restSection } = section;
        return {
          ...restSection,
          questions: questions.map((question) => {
            const { id: qId, options, ...restQuestion } = question;
            return {
              ...restQuestion,
              options: options.map((option) => {
                const { id: optId, ...restOption } = option;
                return restOption;
              }),
            };
          }),
        };
      }),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await api.post("/exams/create", payload);

      if (response.status === 200 || response.status === 201) {
        alert("🎉 Tạo bài kiểm tra thành công!");
        console.log("Response data:", response.data);
        navigate("/teacher/manage-courses");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài kiểm tra:", error);
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra!";
      alert(`⚠️ Thất bại: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCreateMethod(null);
  };

  const handleExamGenerated = (generatedExam) => {
    // Xử lý sau khi AI tạo xong đề
    console.log("Generated exam:", generatedExam);
    // Có thể chuyển hướng hoặc hiển thị thông báo
  };

  // Hiển thị màn hình chọn phương thức
  if (!createMethod) {
    return <CreateMethodSelector onSelect={setCreateMethod} />;
  }

  // Hiển thị giao diện tạo thủ công
  if (createMethod === "manual") {
    return <ManualExamCreator onBack={handleBack} />;
  }

  // Hiển thị giao diện tạo bằng AI
  if (createMethod === "ai") {
    return <AIExamCreator onBack={handleBack} onExamGenerated={handleExamGenerated} courseId={courseId} />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Tạo đề kiểm tra mới</h2>
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

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "Đang lưu..." : "Lưu đề kiểm tra"}
          </button>
        </div>
      </form>
    </div>
  );
}