import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';
import CustomerFeedback from './CustomerFeedback';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default: Dashboard
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/auth/users/${user.id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Không thể tải thông tin người dùng!');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  // Render content based on active tab
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'feedback':
        return <CustomerFeedback />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} loading={loading} />

      {/* Main Content */}
      <main className="w-4/5 p-8">
        {renderContent()}
      </main>
    </div>
  );
}
