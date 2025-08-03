import React from 'react';

const TestConfirmStart = ({ onConfirm, onCancel }) => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-4 text-indigo-700">Bạn đã sẵn sàng bắt đầu làm bài kiểm tra?</h3>
        <p className="mb-6 text-gray-600 text-center">Sau khi xác nhận, thời gian sẽ bắt đầu tính và bạn không thể quay lại.</p>
        <div className="flex gap-4">
            <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
            >
                Xác nhận bắt đầu
            </button>
            <button
                onClick={onCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
            >
                Quay lại
            </button>
        </div>
    </div>
);

export default TestConfirmStart;
