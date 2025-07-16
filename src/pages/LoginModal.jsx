import LogoComponent from "../components/common/LogoComponent";
function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-20 rounded-lg shadow-lg relative w-[90%] max-w-[600px]">
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xm leading-none"
          onClick={onClose}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div className="flex justify-center mb-4">
          <LogoComponent className="w-44  object-cover"/>
        </div>
        <form className="flex flex-col gap-4">

          <h2 className="text-2xl font-bold text-center">Đăng nhập vào ViTiStudy</h2>
          <p className="text-center text-sm">Mỗi người nên sử dụng riêng biệt một tài khoản ,tài khoản nhiều người sử dụng chung sẽ bị khóa</p>
          <div className="flex flex-col gap-2 ">
            <a
              href="https://www.youtube.com/"
              className="relative flex items-center px-8 py-2 border border-gray-300 rounded-full w-full hover:bg-gray-100"
            >
              <i className="fa-regular fa-user text-gray-500 text-lg absolute left-4" />

              <span className="mx-auto font-medium text-black">
                Sử dụng email / số điện thoại
              </span>
            </a>
            <a href="https://www.youtube.com/"
              className="relative flex items-center px-8 py-2 border border-gray-300 rounded-full w-full hover:bg-gray-100">
              <i class="fa-brands fa-google text-gray-500 text-lg absolute left-4"></i>
              <span className="mx-auto font-medium text-black">Đăng kí với Google</span>
            </a>

            <a href="https://www.youtube.com/"
              className="relative flex items-center px-8 py-2 border border-gray-300 rounded-full w-full hover:bg-gray-100"
            >
              <i className="fa-brands fa-facebook text-gray-500 text-lg absolute left-4"></i>
              <span className="mx-auto font-medium text-black">Đăng kí với Fakebook</span>
            </a>

            <a href="https://www.youtube.com/"
              className="relative flex items-center px-8 py-2 border border-gray-300 rounded-full w-full hover:bg-gray-100"
            >
              <i className="fa-brands fa-github text-gray-500 text-lg absolute left-4"></i>
              <span className="mx-auto font-medium text-black">Đăng kí với GitHub</span>
            </a>
          </div>

          <div className="flex flex-col items-center justify-between my-4">
            <p className="text-sm">Bạn đã có tài khoản? <a href="/login" className="text-sm text-red-500 underline font-medium">Đăng nhập</a></p>
            <a href="/forgot-password" className="text-sm text-red-500 underline font-medium">Quên mật khẩu?</a>
            <p className="text-center text-sm">Việc bạn tiếp tục trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;