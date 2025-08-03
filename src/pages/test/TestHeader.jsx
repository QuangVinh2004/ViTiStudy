import React from 'react';

const TestHeader = ({ totalQuestions, time }) => (
    <div className="max-w-6xl mx-auto mt-8 mb-6 px-6">
        <div className="bg-gradient-to-br from-cyan-100 via-white to-cyan-50 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h2 className="text-2xl md:text-2xl font-bold text-zinc-900 mb-2">Bài Test: Chiến tranh thế giới thứ hai</h2>
                <p className="text-lime-950">Kiểm tra kiến thức của bạn về các sự kiện, nhân vật và mốc lịch sử quan trọng trong Thế chiến II.</p>
            </div>
            <div className="flex flex-col md:items-end gap-1">
                <span className="text-lime-950 font-medium">Số câu hỏi: <span className="font-bold">{totalQuestions}</span></span>
                <span className="text-lime-950 font-medium">Thời gian làm bài: <span className="font-bold">{time} phút</span></span>
            </div>
        </div>
    </div>
);

export default TestHeader;
