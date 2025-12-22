import React from 'react';
import ButtonComponent from '../../components/common/ButtonComponent';

export default function TestConfirmStart({ onConfirm, onCancel, examData, error }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⏱️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận bắt đầu</h3>
          <p className="text-gray-600">
            Bạn sẽ có <span className="font-bold text-sky-600">{examData?.duration_minutes} phút</span> để hoàn thành bài kiểm tra
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
            <p className="text-sm text-red-800">
              <span className="font-semibold">❌ Lỗi:</span> {error}
            </p>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">⚠️ Lưu ý:</span> Thời gian sẽ bắt đầu đếm ngược ngay khi bạn xác nhận. 
            Hãy đảm bảo bạn đã sẵn sàng!
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Hủy
          </button>
          <ButtonComponent
            onClick={onConfirm}
            text="Bắt đầu ngay"
            className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
          />
        </div>
      </div>
    </div>
  );
}
