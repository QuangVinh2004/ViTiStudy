import React from 'react';

const adminMenu = [
  { label: 'Dashboard', icon: '🏠', link: '#' },
  { label: 'Quản lý Khóa học', icon: '📚', link: '#' },
  { label: 'Bài tập', icon: '📝', link: '#' },
  { label: 'Học sinh', icon: '👨‍🎓', link: '#' },
  { label: 'Phân tích', icon: '📊', link: '#' },
  { label: 'Cài đặt', icon: '⚙️', link: '#' },
];

const teacher = {
  name: 'Trịnh Giáo Viên',
  avatar: 'https://i.pravatar.cc/100?img=5',
};

export default function TeacherSidebar() {
  return (
    <aside className="w-1/6 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
      <img src={teacher.avatar} alt="avatar" className="w-20 h-20 rounded-full mb-3" />
      <div className="font-bold text-lg mb-4">{teacher.name}</div>
      <nav className="w-full mb-6">
        {adminMenu.map(item => (
          <a
            key={item.label}
            href={item.link}
            className="flex items-center py-2 text-gray-800 no-underline font-medium gap-2 hover:text-blue-600 transition-colors"
          >
            <span>{item.icon}</span> {item.label}
          </a>
        ))}
      </nav>
      
      <button
        className="bg-indigo-600 text-white rounded-lg py-2 font-semibold text-base cursor-pointer mt-4 w-full hover:bg-indigo-700 transition-colors"
      >
        Tạo Khóa học Mới
      </button>
    </aside>
  );
}
