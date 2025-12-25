import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export default function StudentManagement() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses with students for current teacher
  useEffect(() => {
    const fetchCoursesWithStudents = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await api.get(`/courses/teacher/${user.id}/courses-with-students`);
        const coursesData = res.data?.data?.courses || [];
        setCourses(coursesData);
        
        // Auto select first course if available
        if (coursesData.length > 0) {
          setSelectedCourse(coursesData[0]);
          setStudents(coursesData[0].students || []);
        }
      } catch (error) {
        console.error('Error fetching courses with students:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesWithStudents();
  }, [user?.id]);

  // Update students when selected course changes
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setStudents(course.students || []);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Đang tải khóa học...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý học viên</h1>
          <p className="text-gray-600">Xem danh sách học viên đã đăng ký các khóa học của bạn</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <i className="fa-solid fa-book-open text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có khóa học</h3>
            <p className="text-gray-500">Bạn chưa tạo khóa học nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Course List Sidebar */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-4 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Khóa học của tôi</h2>
              <div className="space-y-2">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleCourseSelect(course)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCourse?.id === course.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-semibold text-sm line-clamp-2">{course.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {course.students?.length || 0} học viên
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Students List */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCourse?.title || 'Chọn khóa học'}
                </h2>
                {selectedCourse && (
                  <p className="text-gray-600 mt-1">
                    Tổng số: {students.length} học viên
                  </p>
                )}
              </div>

              {students.length === 0 ? (
                <div className="p-12 text-center">
                  <i className="fa-solid fa-user-graduate text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Chưa có học viên
                  </h3>
                  <p className="text-gray-500">
                    Khóa học này chưa có học viên nào đăng ký
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Học viên
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Ngày đăng ký
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tiến độ
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.student_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.student_avatar || 'https://i.pravatar.cc/100'}
                                alt={student.student_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {student.student_name}
                                </div>
                                {student.phone_number && (
                                  <div className="text-xs text-gray-500">
                                    {student.phone_number}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.student_email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.enrolled_at
                              ? new Date(student.enrolled_at).toLocaleDateString('vi-VN')
                              : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-600 min-w-[40px]">
                                {student.progress || 0}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.enrollment_status === 'enrolled'
                                  ? 'bg-green-100 text-green-800'
                                  : student.enrollment_status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {student.enrollment_status === 'enrolled'
                                ? 'Đang học'
                                : student.enrollment_status === 'completed'
                                ? 'Hoàn thành'
                                : 'Chưa bắt đầu'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
