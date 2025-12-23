import React from 'react';

// Dữ liệu mẫu lịch sử mua hàng
const purchaseHistory = [
  {
    id: 1,
    courseName: 'Toán 12 - Nâng cao',
    teacher: 'Thầy Nam',
    price: 500000,
    purchaseDate: '2024-01-15',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/100x60?text=Toán'
  },
  {
    id: 2,
    courseName: 'Vật Lý 12 - Cơ bản',
    teacher: 'Cô Lan',
    price: 450000,
    purchaseDate: '2024-02-20',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/100x60?text=Lý'
  },
  {
    id: 3,
    courseName: 'Hóa học 12 - Nâng cao',
    teacher: 'Cô Hương',
    price: 550000,
    purchaseDate: '2024-03-10',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/100x60?text=Hóa'
  },
  {
    id: 4,
    courseName: 'Tiếng Anh 12 - IELTS',
    teacher: 'Cô Mai',
    price: 800000,
    purchaseDate: '2024-04-05',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/100x60?text=Anh'
  },
  {
    id: 5,
    courseName: 'Sinh học 12 - Cơ bản',
    teacher: 'Thầy Tú',
    price: 400000,
    purchaseDate: '2024-05-12',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/100x60?text=Sinh'
  }
];

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
  const totalSpent = purchaseHistory.reduce((sum, item) => sum + item.price, 0);

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
                  Trạng thái
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
                        src={purchase.thumbnail} 
                        alt={purchase.courseName}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{purchase.courseName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {purchase.teacher}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatCurrency(purchase.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(purchase.purchaseDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <i className="fa-solid fa-check-circle mr-1"></i>
                      Hoàn thành
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                      <i className="fa-solid fa-eye"></i>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {purchaseHistory.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có lịch sử mua hàng</h3>
            <p className="text-gray-500">Bạn chưa mua khóa học nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
