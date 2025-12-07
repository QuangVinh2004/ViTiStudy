import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-7xl font-bold text-blue-600 mb-4">404</div>
      <div className="text-2xl font-semibold mb-2 text-gray-800">Không tìm thấy trang</div>
      <div className="text-gray-500 mb-6">Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</div>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
