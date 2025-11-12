import LogoComponent from "../components/common/LogoComponent";
import { useState } from "react";

function RegisterModal({ onClose }) {
  const [role, setRole] = useState("");

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

        {/* Form đăng ký chính */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!role) {
              alert("Vui lòng chọn vai trò!");
              return;
            }
            alert(`Đăng ký thành công với vai trò: ${role}`);
          }}
        >
          <h2 className="text-2xl font-bold text-center">Đăng ký tài khoản</h2>
          <p className="text-center text-sm">
            Mỗi người nên sử dụng riêng biệt một tài khoản, tài khoản nhiều người
            sử dụng chung sẽ bị khóa.
          </p>

          <input
            type="text"
            placeholder="Họ và tên"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          {/* Vai trò - dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >
            <option value="">Chọn vai trò</option>
            <option value="Giáo viên">Giáo viên</option>
            <option value="Học sinh">Học sinh</option>
          </select>

          {/* Các icon phương pháp khác */}
          <div className="flex justify-center gap-12 mt-2">
            <i className="fa-brands fa-google text-4xl text-red-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook text-4xl text-blue-600 cursor-pointer"></i>
            <i className="fa-brands fa-github text-4xl text-black cursor-pointer"></i>
          </div>


          {/* Nút đăng ký */}
          <button
            type="submit"
            className="bg-sky-300 text-white py-2 rounded-full"
          >
            Đăng ký
          </button>

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
            <a
              href="/forgot-password"
              className="text-sm text-red-500 underline font-medium"
            >
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
