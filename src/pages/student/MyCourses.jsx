import React from 'react';

// Dữ liệu mẫu
const courses = [
  { name: 'Toán 12', teacher: 'Thầy Nam', progress: 75, cover: 'https://via.placeholder.com/80x50?text=Toán' },
  { name: 'Vật Lý 12', teacher: 'Cô Lan', progress: 40, cover: 'https://via.placeholder.com/80x50?text=Lý' },
  { name: 'Hóa học 12', teacher: 'Cô Hương', progress: 60, cover: 'https://via.placeholder.com/80x50?text=Hóa' },
  { name: 'Tiếng Anh 12', teacher: 'Cô Mai', progress: 85, cover: 'https://via.placeholder.com/80x50?text=Anh' },
];

const stats = {
  hours: 120,
  lessonsCompleted: 35,
  certificates: 2,
};

const tasks = [
  { title: 'Bài tập Toán tuần 3', dueIn: '2 ngày', warning: true },
  { title: 'Kiểm tra Vật Lý', dueIn: '5 ngày', warning: false },
  { title: 'Bài tập Hóa học', dueIn: '7 ngày', warning: false },
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

export default function MyCourses() {
  return (
    <div>
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
                className="bg-white rounded-xl p-4 shadow flex flex-col gap-2 hover:shadow-lg transition-shadow"
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
                <th className="pb-2 font-medium">Tên khóa học</th>
                <th className="pb-2 font-medium">Điểm</th>
                <th className="pb-2 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {completedCourses.map(c => (
                <tr key={c.name} className="border-t border-gray-100">
                  <td className="py-2">{c.name}</td>
                  <td className="py-2 text-green-600 font-medium">{c.score}</td>
                  <td className="py-2 text-gray-600 text-xs">{c.completedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
