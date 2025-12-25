import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export default function TeacherPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalExams: 0,
    recentActivity: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        // Fetch courses
        const coursesRes = await api.get(`/courses/teacher/${user.id}`);
        const courses = coursesRes.data?.data || [];
        
        // Fetch courses with students
        const studentsRes = await api.get(`/courses/teacher/${user.id}/courses-with-students`);
        const coursesWithStudents = studentsRes.data?.data?.courses || [];
        
        // Fetch exams
        const examsRes = await api.get(`/exams/teacher/${user.id}/courses-with-exams`);
        const coursesWithExams = examsRes.data?.data?.courses || [];
        
        // Calculate total students
        const totalStudents = coursesWithStudents.reduce((sum, course) => 
          sum + (course.students?.length || 0), 0
        );
        
        // Calculate total exams
        const totalExams = coursesWithExams.reduce((sum, course) => 
          sum + (course.exams?.length || 0), 0
        );
        
        setStats({
          totalCourses: courses.length,
          totalStudents: totalStudents,
          totalExams: totalExams,
          recentActivity: coursesWithStudents.filter(c => c.students?.length > 0).length,
        });
        
        // Get recent courses (top 5)
        setRecentCourses(courses.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {getCurrentGreeting()}, {user?.username || 'Giáo viên'}! 👋
          </h1>
          <p className="text-gray-600">Đây là tổng quan về hoạt động giảng dạy của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => navigate('/teacher/manage-courses')}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <i className="fa-solid fa-book text-2xl"></i>
              </div>
              <i className="fa-solid fa-arrow-right text-xl opacity-50"></i>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.totalCourses}</div>
            <div className="text-sm opacity-90">Khóa học đang dạy</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => navigate('/teacher/students')}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <i className="fa-solid fa-user-graduate text-2xl"></i>
              </div>
              <i className="fa-solid fa-arrow-right text-xl opacity-50"></i>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.totalStudents}</div>
            <div className="text-sm opacity-90">Tổng số học viên</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => navigate('/teacher/exercises')}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <i className="fa-solid fa-file-lines text-2xl"></i>
              </div>
              <i className="fa-solid fa-arrow-right text-xl opacity-50"></i>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.totalExams}</div>
            <div className="text-sm opacity-90">Bài kiểm tra</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <i className="fa-solid fa-chart-line text-2xl"></i>
              </div>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.recentActivity}</div>
            <div className="text-sm opacity-90">Khóa học có hoạt động</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Khóa học của bạn</h2>
                <button
                  onClick={() => navigate('/teacher/manage-courses')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  Xem tất cả
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentCourses.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fa-solid fa-book-open text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 mb-4">Bạn chưa có khóa học nào</p>
                  <button
                    onClick={() => navigate('/teacher/manage-courses/create-course')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Tạo khóa học đầu tiên
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigate(`/teacher/manage-courses/${course.id}/detail`)}
                    >
                      <img
                        src={course.thumbnail || course.coverImage || 'https://via.placeholder.com/100x60?text=Course'}
                        alt={course.title}
                        className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <i className="fa-solid fa-book-open"></i>
                            {course.total_lessons || 0} bài học
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {Number(course.price).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-2xl font-bold text-gray-800">Hành động nhanh</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => navigate('/teacher/manage-courses/create-course')}
                className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
              >
                <div className="bg-blue-500 text-white rounded-lg p-3">
                  <i className="fa-solid fa-plus text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Tạo khóa học mới</div>
                  <div className="text-xs text-gray-600">Tạo khóa học bằng AI hoặc thủ công</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/teacher/manage-courses')}
                className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left"
              >
                <div className="bg-green-500 text-white rounded-lg p-3">
                  <i className="fa-solid fa-list text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Quản lý khóa học</div>
                  <div className="text-xs text-gray-600">Xem và chỉnh sửa khóa học</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/teacher/students')}
                className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left"
              >
                <div className="bg-purple-500 text-white rounded-lg p-3">
                  <i className="fa-solid fa-users text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Xem học viên</div>
                  <div className="text-xs text-gray-600">Quản lý học viên các khóa học</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/teacher/exercises')}
                className="w-full flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-left"
              >
                <div className="bg-orange-500 text-white rounded-lg p-3">
                  <i className="fa-solid fa-file-lines text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Bài kiểm tra</div>
                  <div className="text-xs text-gray-600">Xem kết quả và thống kê</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/teacher/settings')}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
              >
                <div className="bg-gray-500 text-white rounded-lg p-3">
                  <i className="fa-solid fa-user text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Trang cá nhân</div>
                  <div className="text-xs text-gray-600">Chỉnh sửa thông tin cá nhân</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
