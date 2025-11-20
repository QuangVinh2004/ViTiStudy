import React from 'react';
import TeacherSidebar from './TeacherSidebar';

// Dữ liệu mẫu cho dashboard
const dashboardData = {
  totalCourses: 4,
  totalStudents: 120,
  upcomingTests: 2,
  gradedTests: 15,
  schedule: [
    { day: 'Thứ 2', time: '08:00', course: 'Toán 12', room: 'A101' },
    { day: 'Thứ 3', time: '10:00', course: 'Vật Lý 12', room: 'B202' },
    { day: 'Thứ 5', time: '14:00', course: 'Toán 12', room: 'A101' },
    { day: 'Thứ 6', time: '09:00', course: 'Hóa 12', room: 'C303' },
  ],
  notifications: [
    { content: 'Hệ thống sẽ bảo trì vào 22:00 tối nay.', time: '1 giờ trước' },
    { content: 'Có 2 bài kiểm tra cần chấm điểm.', time: '3 giờ trước' },
    { content: 'Bạn có lịch dạy mới vào Thứ 6.', time: 'Hôm qua' },
  ],
};

export default function TeacherPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar />
      {/* Main Content */}
      <main className="w-4/5 p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-3xl text-blue-600 font-bold mb-1">{dashboardData.totalCourses}</div>
            <div className="text-gray-600 text-sm font-medium">Khóa học đang dạy</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-3xl text-green-600 font-bold mb-1">{dashboardData.totalStudents}</div>
            <div className="text-gray-600 text-sm font-medium">Tổng số học viên</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-lg text-yellow-600 font-bold mb-1">
              {dashboardData.upcomingTests} <span className="text-gray-400">/</span> <span className="text-blue-600">{dashboardData.gradedTests}</span>
            </div>
            <div className="text-gray-600 text-sm font-medium">Bài kiểm tra sắp diễn ra / đã chấm</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-2xl text-indigo-600 font-bold mb-1">
              {dashboardData.schedule.length}
            </div>
            <div className="text-gray-600 text-sm font-medium">Buổi dạy trong tuần</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lịch dạy trong tuần */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="font-semibold text-lg mb-3">Lịch dạy trong tuần</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="pb-1">Thứ</th>
                  <th className="pb-1">Giờ</th>
                  <th className="pb-1">Khóa học</th>
                  <th className="pb-1">Phòng</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.schedule.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1">{item.day}</td>
                    <td className="py-1">{item.time}</td>
                    <td className="py-1">{item.course}</td>
                    <td className="py-1">{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Thông báo mới */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="font-semibold text-lg mb-3">Thông báo mới</div>
            <ul className="list-none p-0 m-0">
              {dashboardData.notifications.map((n, idx) => (
                <li key={idx} className="mb-4 border-b border-gray-100 pb-2 last:mb-0 last:border-0 last:pb-0">
                  <div className="text-gray-800">{n.content}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
