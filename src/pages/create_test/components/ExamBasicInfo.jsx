import React from "react";

export default function ExamBasicInfo({ exam, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">Tên đề kiểm tra</label>
        <input 
          className="w-full border rounded px-3 py-2" 
          name="title" 
          value={exam.title} 
          onChange={onChange} 
          required 
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Môn học</label>
        <input 
          className="w-full border rounded px-3 py-2" 
          name="subject" 
          value={exam.subject} 
          onChange={onChange} 
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Thời lượng (phút)</label>
        <input 
          className="w-full border rounded px-3 py-2" 
          type="number" 
          min={1} 
          name="duration_minutes" 
          value={exam.duration_minutes} 
          onChange={onChange} 
          required 
        />
      </div>
      <div className="md:col-span-2">
        <label className="block font-medium mb-1">Mô tả</label>
        <textarea 
          className="w-full border rounded px-3 py-2" 
          name="description" 
          value={exam.description} 
          onChange={onChange} 
          rows={2} 
        />
      </div>
    </div>
  );
}
