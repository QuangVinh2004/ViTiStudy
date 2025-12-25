import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export default function ExamManagement() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [examStats, setExamStats] = useState(null);

  // Fetch courses with exams for current teacher
  useEffect(() => {
    const fetchCoursesWithExams = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await api.get(`/exams/teacher/${user.id}/courses-with-exams`);
        const coursesData = res.data?.data?.courses || [];
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses with exams:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesWithExams();
  }, [user?.id]);

  // Fetch exam attempts when exam is selected
  const handleExamClick = async (exam) => {
    setSelectedExam(exam);
    setLoadingAttempts(true);
    try {
      const res = await api.get(`/exams/${exam.exam_id}/attempts`);
      setAttempts(res.data?.data?.attempts || []);
      setExamStats({
        total_attempts: res.data?.data?.total_attempts || 0,
        completed_attempts: res.data?.data?.completed_attempts || 0,
        in_progress_attempts: res.data?.data?.in_progress_attempts || 0,
      });
    } catch (error) {
      console.error('Error fetching exam attempts:', error);
      setAttempts([]);
      setExamStats(null);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const handleBackToList = () => {
    setSelectedExam(null);
    setAttempts([]);
    setExamStats(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Đang tải bài kiểm tra...</p>
      </div>
    );
  }

  // Show exam attempts view
  if (selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToList}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại danh sách
          </button>

          {/* Exam Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedExam.exam_title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock"></i>
                <span>{selectedExam.duration_minutes} phút</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-book"></i>
                <span>{selectedExam.subject}</span>
              </div>
              {selectedExam.description && (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>{selectedExam.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          {examStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm opacity-90 mb-1">Tổng lượt làm</div>
                <div className="text-4xl font-bold">{examStats.total_attempts}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm opacity-90 mb-1">Đã hoàn thành</div>
                <div className="text-4xl font-bold">{examStats.completed_attempts}</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm opacity-90 mb-1">Đang làm</div>
                <div className="text-4xl font-bold">{examStats.in_progress_attempts}</div>
              </div>
            </div>
          )}

          {/* Attempts Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Kết quả làm bài</h2>
            </div>

            {loadingAttempts ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">Đang tải kết quả...</p>
              </div>
            ) : attempts.length === 0 ? (
              <div className="p-12 text-center">
                <i className="fa-solid fa-file-circle-question text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có lượt làm bài</h3>
                <p className="text-gray-500">Chưa có học viên nào làm bài kiểm tra này</p>
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
                        Thời gian bắt đầu
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Thời gian hoàn thành
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Điểm
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attempts.map((attempt) => {
                      const isCompleted = attempt.completed_at !== null;
                      return (
                        <tr key={attempt.attempt_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={attempt.student_avatar || 'https://i.pravatar.cc/100'}
                                alt={attempt.student_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{attempt.student_name}</div>
                                <div className="text-xs text-gray-500">{attempt.student_email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(attempt.started_at).toLocaleString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {isCompleted
                              ? new Date(attempt.completed_at).toLocaleString('vi-VN')
                              : '-'}
                          </td>
                          <td className="px-6 py-4">
                            {isCompleted ? (
                              <span className={`text-lg font-bold ${
                                attempt.total_score >= 80 ? 'text-green-600' :
                                attempt.total_score >= 50 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {attempt.total_score.toFixed(1)}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                isCompleted
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {isCompleted ? 'Hoàn thành' : 'Đang làm'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show courses and exams list
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý bài kiểm tra</h1>
          <p className="text-gray-600">Xem danh sách bài kiểm tra và kết quả của học viên</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <i className="fa-solid fa-file-lines text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có bài kiểm tra</h3>
            <p className="text-gray-500">Bạn chưa tạo bài kiểm tra nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.course_id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">{course.course_title}</h2>
                  <p className="text-gray-600 mt-1">{course.exams?.length || 0} bài kiểm tra</p>
                </div>

                {course.exams && course.exams.length > 0 ? (
                  <div className="p-6">
                    <div className="space-y-4">
                      {course.exams.map((exam) => (
                        <button
                          key={exam.exam_id}
                          onClick={() => handleExamClick(exam)}
                          className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-800 flex-1">
                              {exam.exam_title}
                            </h3>
                            <span
                              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                exam.is_active
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {exam.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>

                          {exam.description && (
                            <p className="text-sm text-gray-600 mb-3">
                              {exam.description}
                            </p>
                          )}

                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <i className="fa-solid fa-clock"></i>
                              <span>{exam.duration_minutes} phút</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="fa-solid fa-users"></i>
                              <span>{exam.total_attempts} lượt làm</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Tạo: {new Date(exam.created_at).toLocaleDateString('vi-VN')}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <i className="fa-solid fa-inbox text-4xl mb-2 text-gray-300"></i>
                    <p>Chưa có bài kiểm tra nào cho khóa học này</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
