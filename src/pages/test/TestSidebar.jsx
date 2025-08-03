import React from 'react';
import ButtonComponent from '../../components/common/ButtonComponent';

const TestSidebar = ({
    timeLeft,
    submitted,
    formatTime,
    userAnswers,
    TestData,
    handleJumpToQuestion,
    handleSubmit,
    score
}) => (
    <div className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-10 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow p-4 border border-blue-200 flex flex-col items-center">
                <span className="text-gray-500 text-sm">Thời gian còn lại</span>
                <span
                    className={`font-bold text-2xl ${timeLeft <= 60 ? 'text-red-600' : 'text-blue-700'}`}
                >
                    {formatTime(timeLeft)}
                </span>
                {submitted && <span className="text-xs text-gray-400 mt-2">Đã nộp bài</span>}
            </div>
            <div className="bg-white rounded-xl shadow p-4 border border-indigo-200">
                <div className="font-semibold mb-2 text-indigo-700 text-center">Câu hỏi</div>
                <div className="grid grid-cols-5 gap-2">
                    {TestData.map((q, idx) => {
                        let bgColor = 'bg-white text-gray-700 border-gray-300';
                        if (submitted) {
                            if (userAnswers[idx] === q.answer) {
                                bgColor = 'bg-green-500 text-white border-green-600';
                            } else if (userAnswers[idx] !== null) {
                                bgColor = 'bg-red-500 text-white border-red-600';
                            }
                        } else if (userAnswers[idx] !== null) {
                            bgColor = 'bg-blue-500 text-white border-blue-600';
                        }
                        return (
                            <button
                                key={idx}
                                onClick={() => handleJumpToQuestion(idx)}
                                className={`w-10 h-10 rounded-full border font-bold text-sm ${bgColor} ${submitted ? 'cursor-default' : 'hover:bg-blue-200'}`}
                                disabled={submitted}
                                title={`Câu ${idx + 1}`}
                            >
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-4 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-white border border-gray-400 inline-block"></span>
                        <span>Chưa chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-500 inline-block"></span>
                        <span>Đã chọn</span>
                    </div>
                    {submitted && (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                                <span>Đúng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                                <span>Sai</span>
                            </div>
                        </>
                    )}
                </div>
                {!submitted && (
                    <ButtonComponent onClick={handleSubmit} text="Nộp bài" className='w-full mt-6 px-6 py-2rounded-xl' />
                )}
                {submitted && (
                    <div className="mt-6 text-xl font-bold text-center text-indigo-600">
                        Bạn đúng {score}/{TestData.length} câu
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default TestSidebar;
