import React from 'react';
import QuestionItem from './components/QuestionItem';

export default function TestQuestionList({ 
  examData, 
  userAnswers, 
  submitted, 
  onAnswerChange, 
  questionRefs 
}) {
  let globalQuestionNumber = 0;

  return (
    <div className="flex-1 overflow-y-auto pr-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      {examData?.sections?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-xl font-bold">{section.title}</h2>
            {section.description && (
              <p className="text-sky-100 text-sm mt-1">{section.description}</p>
            )}
          </div>

          {section.questions?.map((question, questionIndex) => {
            globalQuestionNumber++;
            const currentNumber = globalQuestionNumber;
            const answerKey = `${sectionIndex}-${questionIndex}`;

            return (
              <div 
                key={questionIndex}
                ref={(el) => (questionRefs.current[currentNumber - 1] = el)}
              >
                <QuestionItem
                  question={question}
                  questionNumber={currentNumber}
                  userAnswer={userAnswers[answerKey]}
                  onChange={onAnswerChange}
                  submitted={submitted}
                  sectionIndex={sectionIndex}
                  questionIndex={questionIndex}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
