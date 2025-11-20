import LogoComponent from "../components/common/LogoComponent";
import { useState } from "react";

function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // state để hiển thị lỗi
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // reset lỗi khi người dùng thay đổi input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError("Vui lòng chọn vai trò!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Đăng ký:", data);
        setError(""); // clear lỗi
        onClose(); // đóng modal
      } else {
        setError(data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đăng ký:", error);
      setError("Không thể kết nối đến máy chủ!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg relative w-[90%] max-w-[600px]">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xm leading-none"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <LogoComponent className="w-44 object-cover" />
        </div>

        {/* Form đăng ký */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center">Đăng ký tài khoản</h2>
          <p className="text-center text-sm">
            Mỗi người nên sử dụng riêng biệt một tài khoản, tài khoản nhiều
            người sử dụng chung sẽ bị khóa.
          </p>

          <input
            type="text"
            name="username"
            placeholder="Họ và tên"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Vai trò */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >
            <option value="">Chọn vai trò</option>
            <option value="teacher">Giáo viên</option>
            <option value="student">Học sinh</option>
          </select>

          {/* Social login icons */}
          <div className="flex justify-center gap-12 mt-2">
            <i className="fa-brands fa-google text-4xl text-red-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook text-4xl text-blue-600 cursor-pointer"></i>
            <i className="fa-brands fa-github text-4xl text-black cursor-pointer"></i>
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="bg-sky-300 text-white py-2 rounded-full hover:bg-sky-400 transition"
          >
            Đăng ký
          </button>

          {/* ✅ Hiển thị lỗi ngay dưới nút */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Liên kết khác */}
          <div className="flex flex-col items-center justify-between my-4">
            <p className="text-sm">
              Bạn đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-sm text-red-500 underline font-medium"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
