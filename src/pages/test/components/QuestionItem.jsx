import React from 'react';

export default function QuestionItem({ 
  question, 
  questionNumber,
  userAnswer, 
  onChange, 
  submitted,
  sectionIndex,
  questionIndex 
}) {
  const handleMultipleChoice = (optionIndex) => {
    onChange(sectionIndex, questionIndex, optionIndex);
  };

  const handleTrueFalseOption = (optionIndex, isTrue) => {
    const currentAnswers = userAnswer || {};
    const newAnswers = {
      ...currentAnswers,
      [optionIndex]: isTrue
    };
    onChange(sectionIndex, questionIndex, newAnswers);
  };

  const handleShortAnswer = (e) => {
    onChange(sectionIndex, questionIndex, e.target.value);
  };

  const renderOptions = () => {
    if (question.question_type === 'SHORT_ANSWER') {
      return (
        <textarea
          className="w-full border-2 border-sky-200 rounded-lg px-4 py-3 mt-3 min-h-[120px] focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
          placeholder="Nhập câu trả lời của bạn..."
          value={userAnswer || ''}
          onChange={handleShortAnswer}
          disabled={submitted}
        />
      );
    }

    if (question.question_type === 'TRUE_FALSE') {
      return (
        <div className="space-y-3 mt-3">
          {question.options?.map((option, idx) => {
            const userChoice = userAnswer?.[idx];
            
            return (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                <div className="text-gray-700 mb-3">
                  <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option.option_text}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleTrueFalseOption(idx, true)}
                    disabled={submitted}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      userChoice === true
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-sky-100 hover:text-sky-700'
                    } ${submitted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  >
                    ✓ Đúng
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTrueFalseOption(idx, false)}
                    disabled={submitted}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      userChoice === false
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-sky-100 hover:text-sky-700'
                    } ${submitted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  >
                    ✗ Sai
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // MULTIPLE_CHOICE
    return (
      <div className="space-y-3 mt-3">
        {question.options?.map((option, idx) => {
          const isSelected = userAnswer === idx;

          return (
            <label
              key={idx}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
              } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <input
                type="radio"
                name={`q-${sectionIndex}-${questionIndex}`}
                checked={isSelected}
                onChange={() => handleMultipleChoice(idx)}
                disabled={submitted}
                className="mt-1 w-4 h-4 text-sky-600"
              />
              <span className="flex-1 text-gray-700">
                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option.option_text}
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  const getQuestionTypeLabel = () => {
    switch (question.question_type) {
      case 'MULTIPLE_CHOICE':
        return 'Trắc nghiệm (chọn 1 đáp án)';
      case 'TRUE_FALSE':
        return 'Đúng/Sai';
      case 'SHORT_ANSWER':
        return 'Tự luận ngắn';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm">
              {questionNumber}
            </span>
            <span className="text-xs text-gray-600 bg-sky-100 px-3 py-1 rounded-full">
              {getQuestionTypeLabel()}
            </span>
          </div>
          <p className="text-lg text-gray-800 leading-relaxed ml-11">
            {question.question_text}
          </p>
        </div>
        <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full ml-4">
          {question.points} điểm
        </span>
      </div>

      {question.image_url && (
        <div className="ml-11 mb-4">
          <img 
            src={question.image_url} 
            alt="Question illustration" 
            className="max-w-full h-auto rounded-lg border-2 border-gray-200"
            style={{ maxHeight: '400px' }}
          />
        </div>
      )}

      <div className="ml-11">
        {renderOptions()}
      </div>
    </div>
  );
}
