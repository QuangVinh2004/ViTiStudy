import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export default function ProfileContent({ setUserData }) {
  const { user } = useContext(AuthContext);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setLocalUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: ''
  });

  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    phone_number: '',
    avatar: ''
  });

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/auth/users/${user.id}`);
        
        // Extract data from response structure
        const userData = response.data.data;
        setLocalUserData(userData);
        
        // Update parent component if needed
        if (setUserData) {
          setUserData(userData);
        }
        
        // Update form data
        const newData = {
          name: userData.username || '',
          email: userData.email || '',
          phone_number: userData.phone_number || ''
        };
        setFormData(newData);
        setOriginalData({
          ...newData,
          avatar: userData.avatar || ''
        });
        setAvatarPreview(userData.avatar || '');
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Không thể tải thông tin người dùng!');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, setUserData]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Check if data has changed
  const hasChanges = () => {
    return (
      formData.name !== originalData.name ||
      formData.email !== originalData.email ||
      formData.phone_number !== originalData.phone_number ||
      avatarFile !== null
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB!');
        return;
      }

      setAvatarFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!hasChanges()) {
      return;
    }

    try {
      // Create FormData for multipart/form-data request
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      
      // Add avatar file if selected
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }

      // Call API
      const response = await api.put('/auth/update', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update successful
      alert('Cập nhật thông tin thành công!');
      console.log('Update response:', response.data);
      
      // Fetch updated user data
      const updatedUserResponse = await api.get(`/auth/users/${user.id}`);
      const updatedUserData = updatedUserResponse.data.data;
      
      setLocalUserData(updatedUserData);
      
      // Update parent component if needed
      if (setUserData) {
        setUserData(updatedUserData);
      }
      
      // Update form data with new values
      const newData = {
        name: updatedUserData.username || '',
        email: updatedUserData.email || '',
        phone_number: updatedUserData.phone_number || ''
      };
      setFormData(newData);
      setOriginalData({
        ...newData,
        avatar: updatedUserData.avatar || ''
      });
      setAvatarPreview(updatedUserData.avatar || '');
      
      // Reset avatar file state
      setAvatarFile(null);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Có lỗi xảy ra khi cập nhật thông tin!');
      }
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    // TODO: Implement API call to change password
    console.log('Change password');
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Đổi mật khẩu thành công!');
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông tin cá nhân</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
              <img 
                src={avatarPreview || 'https://i.pravatar.cc/150?img=3'} 
                alt="avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{formData.name}</h3>
                <p className="text-gray-500 mb-3">{userData?.role === 'student' ? 'Học viên' : 'Giáo viên'}</p>
                <div>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span className="font-medium">Chọn ảnh mới</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  {avatarFile && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="fa-solid fa-check-circle mr-1"></i>
                      Đã chọn: {avatarFile.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Định dạng: JPG, PNG. Tối đa 5MB</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fa-solid fa-user mr-2"></i>Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fa-solid fa-envelope mr-2"></i>Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fa-solid fa-phone mr-2"></i>Số điện thoại
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fa-solid fa-id-badge mr-2"></i>Vai trò
              </label>
              <input
                type="text"
                value={userData?.role === 'student' ? 'Học viên' : 'Giáo viên'}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!hasChanges()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                hasChanges()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <i className="fa-solid fa-check"></i>
              Cập nhật thông tin
            </button>
            <button
              type="button"
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-key"></i>
              Đổi mật khẩu
            </button>
          </div>
        </form>

        {/* Change Password Section */}
        {showChangePassword && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Đổi mật khẩu</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fa-solid fa-lock mr-2"></i>Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fa-solid fa-lock mr-2"></i>Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fa-solid fa-lock mr-2"></i>Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Đổi mật khẩu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
        </>
      )}
      </div>
    </div>
  );
}
