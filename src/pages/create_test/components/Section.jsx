import React from "react";
import Question from "./Question";

export default function Section({ 
  section, 
  sectionIndex, 
  canDelete,
  onRemove,
  onUpdate,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onChangeQuestionType,
  onAddOption,
  onRemoveOption,
  onUpdateOption
}) {
  return (
    <div className="border rounded p-4 mb-6 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Phần {sectionIndex + 1}</div>
        {canDelete && (
          <button 
            type="button" 
            className="text-red-500 text-sm" 
            onClick={() => onRemove(section.id)}
          >
            Xóa phần
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-sm mb-1">Tên phần</label>
          <input 
            className="w-full border rounded px-3 py-2" 
            value={section.title} 
            onChange={(e) => onUpdate(section.id, { title: e.target.value })} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Mô tả phần</label>
          <input 
            className="w-full border rounded px-3 py-2" 
            value={section.description} 
            onChange={(e) => onUpdate(section.id, { description: e.target.value })} 
          />
        </div>
      </div>

      {section.questions.map((q, qIdx) => (
        <Question
          key={q.id}
          question={q}
          questionIndex={qIdx}
          sectionId={section.id}
          canDelete={section.questions.length > 1}
          onRemove={onRemoveQuestion}
          onUpdate={onUpdateQuestion}
          onChangeType={onChangeQuestionType}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onUpdateOption={onUpdateOption}
        />
      ))}

      <button 
        type="button" 
        className="text-blue-600 text-xs" 
        onClick={() => onAddQuestion(section.id)}
      >
        + Thêm câu hỏi
      </button>
    </div>
  );
}
