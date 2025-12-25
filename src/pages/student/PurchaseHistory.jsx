import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

export default function PurchaseHistory() {
  const navigate = useNavigate();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      setLoading(true);
      try {
        const response = await api.get('/courses/enrolled/my-courses');
        if (response.data.success) {
          setPurchaseHistory(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching purchase history:', error);
        setPurchaseHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const totalSpent = purchaseHistory.reduce((sum, item) => sum + item.price, 0);

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}/detail`);
  };

  return (
    <div className="max-w-6xl">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-4">
              <i className="fa-solid fa-shopping-cart text-2xl"></i>
            </div>
            <div>
              <div className="text-sm opacity-90">Tổng đơn hàng</div>
              <div className="text-3xl font-bold">{purchaseHistory.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-4">
              <i className="fa-solid fa-book text-2xl"></i>
            </div>
            <div>
              <div className="text-sm opacity-90">Khóa học đã mua</div>
              <div className="text-3xl font-bold">{purchaseHistory.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-4">
              <i className="fa-solid fa-wallet text-2xl"></i>
            </div>
            <div>
              <div className="text-sm opacity-90">Tổng chi tiêu</div>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Lịch sử mua khóa học</h2>
          <p className="text-gray-500 mt-1">Danh sách các khóa học bạn đã mua</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải lịch sử mua hàng...</p>
          </div>
        ) : purchaseHistory.length === 0 ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có lịch sử mua hàng</h3>
            <p className="text-gray-500 mb-4">Bạn chưa mua khóa học nào</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khóa học
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giáo viên
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày mua
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tiến độ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchaseHistory.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={purchase.thumbnail || 'https://via.placeholder.com/100x60?text=Course'} 
                          alt={purchase.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{purchase.title}</div>
                          <div className="text-xs text-gray-500">{purchase.total_lessons} bài học</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {purchase.teacher_avatar && (
                          <img 
                            src={purchase.teacher_avatar} 
                            alt={purchase.teacher_name}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        {purchase.teacher_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(purchase.price)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(purchase.enrolled_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${purchase.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{purchase.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewCourse(purchase.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                      >
                        <i className="fa-solid fa-eye"></i>
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
