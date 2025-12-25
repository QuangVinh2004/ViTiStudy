import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get('/courses');
        setCourses(response.data.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const handleDelete = async (id) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    
    if (!window.confirm(`Bạn có chắc muốn xóa khóa học "${course.title}"?`)) return;

    try {
      const res = await api.delete(`/courses/${id}`);
      if (res.data?.success === false) {
        showToast('Xóa thất bại');
        return;
      }
      setCourses((prev) => prev.filter((item) => item.id !== id));
      showToast(`Đã xóa: ${course.title}`);
    } catch (err) {
      console.error(err);
      showToast('Xóa thất bại');
    }
  };

  const filteredCourses = courses.filter(course => {
    const teacherName = course.teacher_name || course.teacher || '';
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lí khóa học</h1>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Tạo khóa học mới
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500">Đang tải khóa học...</p>
        </div>
      ) : (
        <>
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên khóa học hoặc giáo viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="draft">Bản nháp</option>
            <option value="archived">Đã lưu trữ</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="flex gap-4 p-6">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active' ? 'bg-green-100 text-green-800' :
                    course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status === 'active' ? 'Hoạt động' : 
                     course.status === 'draft' ? 'Bản nháp' : 'Lưu trữ'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <i className="fa-solid fa-chalkboard-user mr-2"></i>
                  {course.teacher_name || course.teacher || 'Chưa có giáo viên'}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>{course.students || course.total_students || 0} học viên</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <i className="fa-solid fa-tag"></i>
                    <span>{formatCurrency(course.price)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Tạo ngày: {new Date(course.created_at).toLocaleDateString('vi-VN')}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                  <i className="fa-solid fa-eye mr-1"></i>
                  Xem
                </button>
                <button className="px-3 py-1.5 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors">
                  <i className="fa-solid fa-pen-to-square mr-1"></i>
                  Sửa
                </button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <i className="fa-solid fa-book-open-reader text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy khóa học</h3>
          <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
      </>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
