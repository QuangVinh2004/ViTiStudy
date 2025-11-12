import React, { useState } from "react";
import TestInfoForm from "./TestInfoForm";
import QuestionCard from "./QuestionCard";
import ImportWordSection from "./ImportWordSection";
import AiGenerateSection from "./AiGenerateSection";
import TestPreview from "./TestPreview"; // 👈 import component mới
import { ButtonComponent } from "../../components/common";

export default function CreateTestPage() {
  const [method, setMethod] = useState("manual");
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [testInfo, setTestInfo] = useState({
    name: "",
    subject: "",
    description: "",
    duration: "",
  });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple",
        content: "",
        options: ["", "", "", ""],
        answer: "",
        image: null,
        imagePreview: null,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...questions];
      updated[index].image = file;
      updated[index].imagePreview = reader.result;
      setQuestions(updated);
    };
    if (file) reader.readAsDataURL(file);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const duplicateQuestion = (index) => {
    const duplicated = [...questions];
    duplicated.splice(index + 1, 0, { ...questions[index] });
    setQuestions(duplicated);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-[150px] py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tạo bài kiểm tra</h1>
        <div className="space-x-3">
          <ButtonComponent text="Xuất bản" className="bg-indigo-500 hover:bg-indigo-600 text-white border-none rounded-md" />
          <ButtonComponent
            text={showPreview ? "Đóng xem trước" : "Xem trước"}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 border-none rounded-md"
            onClick={() => setShowPreview((prev) => !prev)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { id: "manual", label: "Tạo thủ công" },
          { id: "word", label: "Import file Word" },
          { id: "ai", label: "Tạo bằng AI" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMethod(tab.id)}
            className={`px-4 py-2 rounded ${
              method === tab.id
                ? "bg-indigo-500 text-white"
                : "border border-gray-300 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Nội dung */}
      {method === "manual" && (
        <div>
          <TestInfoForm value={testInfo} onChange={setTestInfo} />
          {questions.map((q, i) => (
            <QuestionCard
              key={i}
              index={i}
              question={q}
              updateQuestion={updateQuestion}
              handleImageUpload={handleImageUpload}
              removeQuestion={removeQuestion}
              duplicateQuestion={duplicateQuestion}
            />
          ))}
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
          >
            + Thêm câu hỏi
          </button>
        </div>
      )}

      {method === "word" && <ImportWordSection />}
      {method === "ai" && <AiGenerateSection />}

      {/* Preview */}
      {showPreview && (
        <TestPreview
          testInfo={testInfo}
          questions={questions}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
