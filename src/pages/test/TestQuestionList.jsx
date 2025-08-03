import React from 'react';

const TestQuestionList = ({
    TestData,
    userAnswers,
    submitted,
    handleSelect,
    questionRefs
}) => (
    <div className="flex-1">
        {TestData.map((q, index) => (
            <div
                key={index}
                className="mb-6"
                ref={(el) => (questionRefs.current[index] = el)}
            >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-indigo-200 transition-shadow duration-200">
                    <h2 className="text-lg font-semibold mb-2 text-indigo-700">
                        {index + 1}. {q.question}
                    </h2>
                    {q.image && (
                        <div className="my-3 flex justify-start">
                            <img
                                src={q.image}
                                alt={`Hình minh họa cho câu hỏi ${index + 1}`}
                                className="max-h-56 rounded shadow"
                            />
                        </div>
                    )}
                    {q.audio && (
                        <div className="my-3 flex justify-start">
                            <audio controls src={q.audio}>
                                Trình duyệt của bạn không hỗ trợ audio.
                            </audio>
                        </div>
                    )}
                    <div className="space-y-2">
                        {q.options.map((opt, i) => (
                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={opt}
                                    disabled={submitted}
                                    checked={userAnswers[index] === opt}
                                    onChange={() => handleSelect(index, opt)}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                    {submitted && (
                        <div className="mt-2 text-sm">
                            <p
                                className={`font-medium ${userAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'}`}
                            >
                                Đáp án đúng: {q.answer}
                            </p>
                            <p className="text-gray-600">Giải thích: {q.explanation}</p>
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
);

export default TestQuestionList;
