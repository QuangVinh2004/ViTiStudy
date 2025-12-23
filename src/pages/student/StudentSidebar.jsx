import React from 'react';

export default function StudentSidebar({ activeTab, setActiveTab, userData, loading }) {
  const menuItems = [
    { id: 'profile', label: 'Trang Cá nhân', icon: 'fa-user' },
    { id: 'courses', label: 'Khóa học của tôi', icon: 'fa-book' },
    { id: 'history', label: 'Lịch sử', icon: 'fa-clock-rotate-left' },
  ];

  return (
    <aside className="w-1/5 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
      {loading ? (
        <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-3"></div>
      ) : (
        <img 
          src={userData?.avatar || 'https://i.pravatar.cc/100?img=3'} 
          alt="avatar" 
          className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-200" 
        />
      )}
      
      <div className="font-bold text-lg mb-4">
        {loading ? (
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          userData?.username || 'Student'
        )}
      </div>
      
      <nav className="w-full mb-6">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left py-3 px-4 rounded-lg mb-2 font-medium transition-all flex items-center gap-3 ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="w-full mt-auto">
        <div className="font-medium mb-2">Huy hiệu nổi bật:</div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 rounded-xl px-3 py-1 text-xs">
            Người học tích cực
          </span>
          <span className="inline-block bg-green-100 text-green-700 rounded-xl px-3 py-1 text-xs">
            Chăm chỉ
          </span>
        </div>
      </div>
    </aside>
  );
}
