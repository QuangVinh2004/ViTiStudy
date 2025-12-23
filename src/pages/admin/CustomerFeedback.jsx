import React, { useState } from 'react';

export default function CustomerFeedback() {
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const feedbacks = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      subject: 'Góp ý về giao diện',
      message: 'Giao diện rất đẹp nhưng cần thêm chế độ tối. Tôi thường học vào ban đêm nên mắt hơi mỏi khi dùng giao diện sáng.',
      rating: 4,
      status: 'pending',
      created_at: '2025-12-20T10:30:00Z'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      email: 'tranthib@example.com',
      subject: 'Khóa học rất hay',
      message: 'Khóa học Toán 12 của thầy Nam rất chi tiết và dễ hiểu. Cảm ơn team đã tạo ra nền tảng học tập tuyệt vời này!',
      rating: 5,
      status: 'resolved',
      created_at: '2025-12-19T15:20:00Z'
    },
    {
      id: 3,
      user: 'Lê Văn C',
      email: 'levanc@example.com',
      subject: 'Lỗi thanh toán',
      message: 'Tôi gặp lỗi khi thanh toán bằng thẻ Visa. Vui lòng kiểm tra lại hệ thống thanh toán.',
      rating: 2,
      status: 'in-progress',
      created_at: '2025-12-21T09:15:00Z'
    },
    {
      id: 4,
      user: 'Phạm Thị D',
      email: 'phamthid@example.com',
      subject: 'Yêu cầu hoàn tiền',
      message: 'Khóa học không đúng như mô tả. Tôi muốn được hoàn tiền.',
      rating: 1,
      status: 'pending',
      created_at: '2025-12-22T14:45:00Z'
    },
    {
      id: 5,
      user: 'Hoàng Văn E',
      email: 'hoangvane@example.com',
      subject: 'Đề xuất tính năng mới',
      message: 'Nên có thêm tính năng chat trực tiếp với giáo viên để có thể hỏi đáp nhanh hơn.',
      rating: 4,
      status: 'resolved',
      created_at: '2025-12-18T11:00:00Z'
    },
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    return filterStatus === 'all' || feedback.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xử lý' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang xử lý' },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xử lý' }
    };
    return badges[status] || badges.pending;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fa-solid fa-star text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    inProgress: feedbacks.filter(f => f.status === 'in-progress').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
    avgRating: (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Phản hồi khách hàng</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Tổng phản hồi</div>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700 mb-1">{stats.pending}</div>
          <div className="text-sm text-yellow-700">Chờ xử lý</div>
        </div>
        <div className="bg-blue-50 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-700 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-blue-700">Đang xử lý</div>
        </div>
        <div className="bg-green-50 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-700 mb-1">{stats.resolved}</div>
          <div className="text-sm text-green-700">Đã xử lý</div>
        </div>
        <div className="bg-purple-50 rounded-xl shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-700 mb-1">{stats.avgRating}</div>
          <div className="text-sm text-purple-700">Đánh giá TB</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chờ xử lý
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'in-progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đang xử lý
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'resolved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã xử lý
            </button>
          </div>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => {
          const statusBadge = getStatusBadge(feedback.status);
          return (
            <div key={feedback.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {feedback.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{feedback.user}</h3>
                    <p className="text-sm text-gray-500">{feedback.email}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {renderStars(feedback.rating)}
                      <span className="text-xs text-gray-500">
                        {formatDate(feedback.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                  {statusBadge.label}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  <i className="fa-solid fa-tag mr-2 text-gray-400"></i>
                  {feedback.subject}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feedback.message}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                {feedback.status === 'pending' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <i className="fa-solid fa-check mr-1"></i>
                    Bắt đầu xử lý
                  </button>
                )}
                {feedback.status === 'in-progress' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    <i className="fa-solid fa-check-double mr-1"></i>
                    Đánh dấu đã xử lý
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <i className="fa-solid fa-reply mr-1"></i>
                  Trả lời
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <i className="fa-solid fa-eye mr-1"></i>
                  Chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFeedbacks.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <i className="fa-solid fa-comments text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có phản hồi</h3>
          <p className="text-gray-500">Chưa có phản hồi nào với bộ lọc này</p>
        </div>
      )}
    </div>
  );
}
