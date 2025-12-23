import React from 'react';

export default function AdminDashboard() {
  // Mock data
  const stats = {
    totalUsers: 1250,
    totalCourses: 89,
    totalRevenue: 125000000,
    newUsersThisMonth: 156
  };

  const recentActivities = [
    { id: 1, type: 'user', message: 'Người dùng mới đăng ký: Nguyễn Văn A', time: '5 phút trước' },
    { id: 2, type: 'course', message: 'Khóa học mới được tạo: Toán 12 Nâng cao', time: '1 giờ trước' },
    { id: 3, type: 'payment', message: 'Thanh toán thành công: 500,000đ', time: '2 giờ trước' },
    { id: 4, type: 'feedback', message: 'Phản hồi mới từ khách hàng', time: '3 giờ trước' },
  ];

  const topCourses = [
    { name: 'Toán 12', students: 450, revenue: 22500000 },
    { name: 'Vật Lý 12', students: 380, revenue: 19000000 },
    { name: 'Hóa học 12', students: 320, revenue: 16000000 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <i className="fa-solid fa-users text-2xl"></i>
            </div>
            <span className="text-sm opacity-90">Tổng số</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-sm opacity-90">Người dùng</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <i className="fa-solid fa-book text-2xl"></i>
            </div>
            <span className="text-sm opacity-90">Tổng số</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalCourses}</div>
          <div className="text-sm opacity-90">Khóa học</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <i className="fa-solid fa-wallet text-2xl"></i>
            </div>
            <span className="text-sm opacity-90">Doanh thu</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            {(stats.totalRevenue / 1000000).toFixed(0)}M
          </div>
          <div className="text-sm opacity-90">VNĐ</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <i className="fa-solid fa-user-plus text-2xl"></i>
            </div>
            <span className="text-sm opacity-90">Tháng này</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.newUsersThisMonth}</div>
          <div className="text-sm opacity-90">Người dùng mới</div>
        </div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Khóa học phổ biến</h2>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.students} học viên</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {(course.revenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-gray-500">VNĐ</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Hoạt động gần đây</h2>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'course' ? 'bg-green-100 text-green-600' :
                  activity.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <i className={`fa-solid ${
                    activity.type === 'user' ? 'fa-user' :
                    activity.type === 'course' ? 'fa-book' :
                    activity.type === 'payment' ? 'fa-credit-card' :
                    'fa-comment'
                  } text-sm`}></i>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-800">{activity.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
            <i className="fa-solid fa-user-plus text-2xl text-blue-600 mb-2"></i>
            <div className="text-sm font-medium text-gray-700">Thêm người dùng</div>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
            <i className="fa-solid fa-book-medical text-2xl text-green-600 mb-2"></i>
            <div className="text-sm font-medium text-gray-700">Tạo khóa học</div>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
            <i className="fa-solid fa-chart-bar text-2xl text-purple-600 mb-2"></i>
            <div className="text-sm font-medium text-gray-700">Xem báo cáo</div>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
            <i className="fa-solid fa-cog text-2xl text-orange-600 mb-2"></i>
            <div className="text-sm font-medium text-gray-700">Cài đặt</div>
          </button>
        </div>
      </div>
    </div>
  );
}
