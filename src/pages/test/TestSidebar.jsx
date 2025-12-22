import React from 'react';
import ButtonComponent from '../../components/common/ButtonComponent';

export default function TestSidebar({
  timeLeft,
  submitted,
  submitting,
  formatTime,
  examData,
  userAnswers,
  onJumpToQuestion,
  onSubmit,
  getAnsweredCount,
  isQuestionAnswered
}) {
  let globalQuestionNumber = 0;
  const questions = [];

  examData?.sections?.forEach((section, sIdx) => {
    section.questions?.forEach((question, qIdx) => {
      globalQuestionNumber++;
      questions.push({
        number: globalQuestionNumber,
        sectionIndex: sIdx,
        questionIndex: qIdx,
        answered: isQuestionAnswered(sIdx, qIdx),
      });
    });
  });

  const totalQuestions = questions.length;
  const answeredCount = getAnsweredCount();

  return (
    <div className="w-full md:w-80 bg-gray-50 rounded-lg p-4 flex flex-col gap-4 sticky top-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      {/* Timer */}
      {!submitted && (
        <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-sky-200">
          <div className="text-sm text-gray-600 mb-1">Thời gian còn lại</div>
          <div className={`text-3xl font-bold ${timeLeft <= 60 ? 'text-red-600' : 'text-sky-600'}`}>
            {formatTime(timeLeft)}
          </div>
          {timeLeft <= 60 && (
            <div className="text-xs text-red-500 mt-1 animate-pulse">
              ⚠️ Sắp hết thời gian!
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-sky-200">
        <div className="text-sm text-gray-600 mb-2">Tiến độ làm bài</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-sky-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {answeredCount}/{totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs mt-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-sky-500"></div>
            <span className="text-gray-600">Đã làm ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-300"></div>
            <span className="text-gray-600">Chưa làm ({totalQuestions - answeredCount})</span>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-sky-200 flex-1 overflow-y-auto">
        <div className="text-sm font-semibold text-gray-700 mb-3">Danh sách câu hỏi</div>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q) => (
            <button
              key={q.number}
              onClick={() => onJumpToQuestion(q.number - 1)}
              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${q.answered
                  ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-sky-100 hover:text-sky-700'
                }`}
              title={`Câu ${q.number} - ${q.answered ? 'Đã làm' : 'Chưa làm'}`}
            >
              {q.number}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!submitted && (
        <ButtonComponent
          onClick={onSubmit}
          disabled={submitting}
          text={submitting ? "Đang nộp bài..." : "Nộp bài"}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        />
      )}

      {submitted && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
          <div className="text-green-700 font-bold text-lg mb-1">
            ✅ Đã nộp bài
          </div>
          <div className="text-sm text-green-600">
            Bài kiểm tra đã được ghi nhận
          </div>
        </div>
      )}
    </div>
  );
}
