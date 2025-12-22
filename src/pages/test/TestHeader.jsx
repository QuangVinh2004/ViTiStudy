import React from 'react';

export default function TestHeader({ examData }) {
  if (!examData) return null;

  const totalQuestions = examData.sections?.reduce((sum, section) => 
    sum + (section.questions?.length || 0), 0
  ) || 0;

  return (
    <div className="bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{examData.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {examData.subject && (
                <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                  <span className="text-base">📚</span>
                  <span className="font-medium">{examData.subject}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <span className="text-base">⏱️</span>
                <span className="font-medium">{examData.duration_minutes} phút</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <span className="text-base">📝</span>
                <span className="font-medium">{totalQuestions} câu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
