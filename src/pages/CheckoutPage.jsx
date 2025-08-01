import { LogoComponent, ButtonComponent } from '../components/common';
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {

  const navigate = useNavigate();

  const handleGoToDetailPage = () => {
    navigate("/course/course-detail");
  }

  return (
    <div className="max-w-7xl mx-auto pt-5 pb-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <LogoComponent className="w-[200px]" />

        <a href="/back" className="underline font-semibold text-sm text-gray-600">
          &lt; Back to merchant’s site
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <div className="flex items-start max-w-5xl  flex-row gap-8  bg-gray-100 py-8 px-24 rounded-lg shadow-md">
          <div className="bg-white flex-1 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">How would you like to pay?</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
                'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
                'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
                'https://img.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-2-2.png',
                'https://media.loveitopcdn.com/3807/logo-zalopay1-compressed.jpg',
                'https://mangviettel.com.vn/wp-content/uploads/2022/04/viettel-money-1.png',
              ].map((src, index) => (
                <div
                  key={index}
                  className="bg-white aspect-square h-[100px] flex items-center justify-center p-2 rounded border"
                >
                  <img src={src} alt={`Payment method ${index}`} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white flex-1 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Khóa học: Địa lý Việt Nam</h2>


            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <img
                  className="h-52 rounded-md object-cover mb-2"
                  src="https://thcshongthaiad.edu.vn/wp-content/uploads/2023/01/dia-ly.png"
                  alt=""
                />
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Giá gốc:</p>
                <p className="text-right line-through text-gray-500">3.200.000đ</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Giá ưu đãi:</p>
                <p className="text-right">2.880.000đ</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ButtonComponent text={"Áp dụng"} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium border-none' />
              </div>
              <div className="flex justify-between font-bold text-[13] border-t pt-4">
                <p>Tổng</p>
                <p>2.880.000đ</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">

              <ButtonComponent onClick={handleGoToDetailPage} text={"Continue to secure payment"} className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold' />
              <button className="w-full text-gray-600 underline hover:text-gray-800 text-sm">
                Cancel payment
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
