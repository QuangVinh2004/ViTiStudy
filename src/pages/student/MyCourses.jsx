import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const stats = {
  hours: 120,
  lessonsCompleted: 35,
  certificates: 2,
};

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

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get('/courses/enrolled/my-courses');
        if (response.data.success) {
          setEnrolledCourses(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleViewCourse = (courseId) => {
    navigate(`/my-learning/courses/${courseId}`);
  };

  return (
    <div>

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

      {/* Detailed List: Khóa học đã mua */}
      <div className="bg-white rounded-2xl p-6 shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">📚 Khóa học của tôi</h3>
          {!loading && (
            <span className="text-sm text-gray-600">
              Tổng: {enrolledCourses.length} khóa học
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải khóa học...</p>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">Bạn chưa đăng ký khóa học nào</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors mt-2"
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/120x80?text=Course'}
                    alt={course.title}
                    className="w-[280px] h-[180px] object-cover rounded-lg bg-gray-200"
                  />

                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {course.description}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-3 ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <span>👨‍🏫</span>
                        <span>{course.teacher_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📖</span>
                        <span>{course.total_lessons} bài học</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{5} ({17})</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => handleViewCourse(course.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Tiếp tục học
                      </button>
                      <span className="text-xs text-gray-500">
                        Đăng ký: {new Date(course.enrolled_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}
