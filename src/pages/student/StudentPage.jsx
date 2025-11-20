import React, { useState } from 'react';

// Dữ liệu mẫu
const user = {
  name: 'Nguyễn Văn A',
  avatar: 'https://i.pravatar.cc/100?img=3',
  badges: ['Người học tích cực', 'Chăm chỉ'],
};

const menu = [
  { label: 'Trang Cá nhân', link: '#' },
  { label: 'Khóa học của tôi', link: '#' },
  { label: 'Lịch sử', link: '#' },
  { label: 'Cài đặt', link: '#' },
];

const courses = [
  { name: 'Toán 12', teacher: 'Thầy Nam', progress: 75, cover: 'https://via.placeholder.com/80x50?text=Toán' },
  { name: 'Vật Lý 12', teacher: 'Cô Lan', progress: 40, cover: 'https://via.placeholder.com/80x50?text=Lý' },
];

const stats = {
  hours: 120,
  lessonsCompleted: 35,
  certificates: 2,
};

const tasks = [
  { title: 'Bài tập Toán tuần 3', dueIn: '2 ngày', warning: true },
  { title: 'Kiểm tra Vật Lý', dueIn: '5 ngày', warning: false },
];

const nextClass = {
  course: 'Toán 12',
  lesson: 'Bài 5: Hàm số',
  link: '/courses/toan-12/lesson/5',
  time: 'Hôm nay, 19:00',
};

const completedCourses = [
  { name: 'Hóa 12', score: 9.0, completedDate: '15/05/2024' },
  { name: 'Sinh 12', score: 8.2, completedDate: '10/05/2024' },
];

function DonutChart({ percent }) {
  // Đơn giản, chỉ là hình tròn SVG
  const radius = 32, stroke = 8;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - percent / 100);
  return (
    <svg width="80" height="80">
      <circle cx="40" cy="40" r={radius} stroke="#eee" strokeWidth={stroke} fill="none" />
      <circle
        cx="40" cy="40" r={radius}
        stroke="#3b82f6"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text x="50%" y="54%" textAnchor="middle" fontSize="18" fill="#3b82f6" fontWeight="bold">{percent}%</text>
    </svg>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="bg-gray-200 rounded h-2 w-full">
      <div
        className="bg-green-600 h-2 rounded transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function StudentPage() {
  const [tab, setTab] = useState('score');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
        <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full mb-3" />
        <div className="font-bold text-lg mb-4">{user.name}</div>
        <nav className="w-full mb-6">
          {menu.map(item => (
            <a
              key={item.label}
              href={item.link}
              className="block py-2 text-gray-800 no-underline font-medium hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="w-full">
          <div className="font-medium mb-2">Huy hiệu nổi bật:</div>
          <div>
            {user.badges.map(badge => (
              <span
                key={badge}
                className="inline-block bg-blue-100 text-blue-700 rounded-xl px-3 py-1 text-xs mr-2 mb-2"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-4/5 p-8">
        {/* Priority Section */}
        <div className="flex gap-6 mb-6">
          {/* Truy cập nhanh */}
          <div className="flex-2 bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-center min-h-[120px]">
            <div className="text-lg font-medium mb-2">Lớp học gần nhất</div>
            <div className="text-base">{nextClass.course} - {nextClass.lesson}</div>
            <div className="text-sm mb-3">{nextClass.time}</div>
            <a
              href={nextClass.link}
              className="bg-white text-blue-600 px-5 py-2 rounded font-semibold no-underline w-fit hover:bg-blue-100 transition-colors"
            >
              Tiếp tục học
            </a>
          </div>
          {/* Nhiệm vụ sắp đến hạn */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow min-h-[120px]">
            <div className="font-medium text-base mb-3">Nhiệm vụ sắp đến hạn</div>
            <ul className="list-none p-0 m-0">
              {tasks.slice(0, 3).map(t => (
                <li
                  key={t.title}
                  className={`mb-2 ${t.warning ? 'text-yellow-500 font-semibold' : 'text-gray-800 font-normal'}`}
                >
                  {t.title}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs ${t.warning ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {t.dueIn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress & Tracking */}
        <div className="flex gap-6 mb-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow min-w-[180px]">
            <div className="font-medium mb-2">Tiến độ tổng thể</div>
            <DonutChart percent={75} />
          </div>
          {/* Metric Cards */}
          <div className="flex gap-4 flex-1">
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow flex-1">
              <span role="img" aria-label="clock" className="text-2xl mb-1">⏰</span>
              <div className="font-bold text-xl mb-0.5">{stats.hours}</div>
              <div className="text-xs text-gray-600">Giờ học</div>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow flex-1">
              <span role="img" aria-label="lesson" className="text-2xl mb-1">📚</span>
              <div className="font-bold text-xl mb-0.5">{stats.lessonsCompleted}</div>
              <div className="text-xs text-gray-600">Bài đã hoàn thành</div>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow flex-1">
              <span role="img" aria-label="cert" className="text-2xl mb-1">🎓</span>
              <div className="font-bold text-xl mb-0.5">{stats.certificates}</div>
              <div className="text-xs text-gray-600">Chứng chỉ</div>
            </div>
          </div>
        </div>

        {/* Detailed List: Khóa học & Kết quả */}
        <div className="flex gap-6">
          {/* Khóa học đang theo học */}
          <div className="flex-2">
            <div className="font-medium text-lg mb-4">Các khóa học đang theo học</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(c => (
                <div
                  key={c.name}
                  className="bg-white rounded-xl p-4 shadow flex flex-col gap-2"
                >
                  <img src={c.cover} alt={c.name} className="w-full h-[50px] object-cover rounded" />
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-600">GV: {c.teacher}</div>
                  <ProgressBar percent={c.progress} />
                  <div className="text-xs text-green-600 font-medium">{c.progress}% hoàn thành</div>
                </div>
              ))}
            </div>
          </div>
          {/* Khóa học đã hoàn thành */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow">
            <div className="font-medium text-lg mb-3">Khóa học đã hoàn thành</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="pb-1">Tên khóa học</th>
                  <th className="pb-1">Điểm</th>
                  <th className="pb-1">Ngày hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses.map(c => (
                  <tr key={c.name}>
                    <td className="py-1">{c.name}</td>
                    <td className="py-1">{c.score}</td>
                    <td className="py-1">{c.completedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Style helper
const metricCardStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 16,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 1px 4px #0001'
};
const iconStyle = { fontSize: 28, marginBottom: 6 };
const metricValueStyle = { fontWeight: 700, fontSize: 20, marginBottom: 2 };
const metricLabelStyle = { fontSize: 13, color: '#555' };
