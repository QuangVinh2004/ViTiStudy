import React from 'react';

export default function AdminSidebar({ activeTab, setActiveTab, userData, loading }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
    { id: 'users', label: 'Quản lí người dùng', icon: 'fa-users' },
    { id: 'courses', label: 'Quản lí khóa học', icon: 'fa-book' },
    { id: 'feedback', label: 'Phản hồi khách hàng', icon: 'fa-comments' },
  ];

  return (
    <aside className="w-1/5 bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* Admin Profile */}
      <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
        {loading ? (
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-3"></div>
        ) : (
          <img 
            src={userData?.avatar || 'https://i.pravatar.cc/100?img=1'} 
            alt="avatar" 
            className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-blue-500" 
          />
        )}
        
        <div className="text-center">
          {loading ? (
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          ) : (
            <>
              <div className="font-bold text-lg mb-1">{userData?.username || 'Admin'}</div>
              <span className="inline-block bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-medium">
                <i className="fa-solid fa-shield-halved mr-1"></i>
                Quản trị viên
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1">
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
      
      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <i className="fa-solid fa-shield mr-1"></i>
          Admin Control Panel
        </div>
      </div>
    </aside>
  );
}
