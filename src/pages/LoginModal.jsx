import LogoComponent from "../components/common/LogoComponent";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function LoginModal({ onClose }) {

  const { login } = useContext(AuthContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(""); // Thêm state lưu lỗi

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Đăng nhập thất bại");
        return;
      }
      login(data.data.token);
      console.log("Login successful");
      onClose();
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Login failed:", error);
    }
  }



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

        {/* Form đăng nhập */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold text-center">Đăng nhập tài khoản</h2>
          <p className="text-center text-sm">
            Vui lòng nhập thông tin để tiếp tục học tập cùng ViTiStudy.
          </p>

          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Các icon đăng nhập khác */}
          <div className="flex justify-center gap-12 mt-2">
            <i className="fa-brands fa-google text-4xl text-red-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook text-4xl text-blue-600 cursor-pointer"></i>
            <i className="fa-brands fa-github text-4xl text-black cursor-pointer"></i>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="bg-sky-300 text-white py-2 rounded-full"
          >
            Đăng nhập
          </button>
          {/* Hiển thị lỗi dưới nút đăng nhập */}
          {error && (
            <div className="text-red-600 text-center text-sm font-medium mt-1">
              {error}
            </div>
          )}
          {/* Liên kết khác */}
          <div className="flex flex-col items-center justify-between my-4">
            <p className="text-sm">
              Bạn chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-sm text-red-500 underline font-medium"
              >
                Đăng ký ngay
              </a>
            </p>
            <a
              href="/forgot-password"
              className="text-sm text-red-500 underline font-medium"
            >
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
