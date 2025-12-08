import React from "react";
import { QUESTION_TYPES } from "../constants";

export default function Question({ 
  question, 
  questionIndex, 
  sectionId, 
  canDelete,
  onRemove, 
  onUpdate,
  onChangeType,
  onAddOption,
  onRemoveOption,
  onUpdateOption
}) {
  return (
    <div className="border rounded p-3 mb-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Câu {questionIndex + 1}</span>
        {canDelete && (
          <button 
            type="button" 
            className="text-red-500 text-xs" 
            onClick={() => onRemove(sectionId, question.id)}
          >
            Xóa câu hỏi
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
        <div className="md:col-span-2">
          <label className="block text-xs mb-1">Nội dung câu hỏi</label>
          <textarea 
            className="w-full border rounded px-2 py-1" 
            value={question.question_text} 
            onChange={(e) => onUpdate(sectionId, question.id, { question_text: e.target.value })} 
            required 
          />
          <div className="mt-2">
            <label className="block text-xs mb-1">Ảnh minh họa (URL hoặc upload)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => onUpdate(sectionId, question.id, { image_url: reader.result });
                reader.readAsDataURL(file);
              }} 
              className="mt-1" 
            />
            {question.image_url && (
              <img 
                src={question.image_url} 
                alt="preview" 
                className="mt-2 max-h-40 border rounded" 
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Loại câu hỏi</label>
          <select 
            className="w-full border rounded px-2 py-1" 
            value={question.question_type} 
            onChange={(e) => onChangeType(sectionId, question.id, e.target.value)}
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <label className="block text-xs mb-1 mt-2">Điểm</label>
          <input 
            type="number" 
            min={0.1}
            max={10}
            step={0.1}
            className="w-full border rounded px-2 py-1" 
            value={question.points} 
            onChange={(e) => onUpdate(sectionId, question.id, { points: Number(e.target.value) })} 
          />
        </div>
      </div>

      {(question.question_type === "MULTIPLE_CHOICE" || question.question_type === "TRUE_FALSE") && (
        <div>
          <div className="font-medium text-xs mb-1">
            {question.question_type === "MULTIPLE_CHOICE" 
              ? "Các lựa chọn đáp án (chỉ chọn 1 đáp án đúng)" 
              : "Các lựa chọn đáp án (có thể chọn nhiều đáp án đúng)"}
          </div>
          {question.options.map((opt, oIdx) => (
            <div key={opt.id} className="flex items-center gap-2 mb-1">
              <input 
                className="border rounded px-2 py-1 flex-1" 
                value={opt.option_text} 
                onChange={(e) => onUpdateOption(sectionId, question.id, opt.id, { option_text: e.target.value })} 
                placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`} 
              />
              <label className="flex items-center gap-1 text-xs">
                {question.question_type === "MULTIPLE_CHOICE" ? (
                  <input 
                    type="radio" 
                    name={`correct-${sectionId}-${question.id}`}
                    checked={!!opt.is_correct} 
                    onChange={(e) => onUpdateOption(sectionId, question.id, opt.id, { is_correct: e.target.checked })} 
                  />
                ) : (
                  <input 
                    type="checkbox" 
                    checked={!!opt.is_correct} 
                    onChange={(e) => onUpdateOption(sectionId, question.id, opt.id, { is_correct: e.target.checked })} 
                  />
                )}
                Đúng
              </label>
              {question.options.length > 2 && (
                <button 
                  type="button" 
                  className="text-red-400 text-xs" 
                  onClick={() => onRemoveOption(sectionId, question.id, opt.id)}
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            className="text-blue-600 text-xs mt-1" 
            onClick={() => onAddOption(sectionId, question.id)}
          >
            + Thêm lựa chọn
          </button>
        </div>
      )}

      {question.question_type === "SHORT_ANSWER" && (
        <div className="mt-2">
          <label className="block text-xs mb-1">Đáp án chuẩn (nếu có)</label>
          <input 
            className="w-full border rounded px-2 py-1" 
            value={question.correct_text_answer} 
            onChange={(e) => onUpdate(sectionId, question.id, { correct_text_answer: e.target.value })} 
            placeholder="Đáp án mẫu cho tự luận ngắn" 
          />
        </div>
      )}
    </div>
  );
}
