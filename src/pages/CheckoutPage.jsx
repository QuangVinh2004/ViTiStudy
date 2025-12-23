import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogoComponent, ButtonComponent } from "../components/common";
import api from "../api/axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const handleGoToDetailPage = () => {
    navigate(`/course/course-direction/${courseId}`);
  };

  // =========================
  // FETCH COURSE
  // =========================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Không thể tải thông tin khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // =========================
  // ENROLL COURSE (FAKE PAYMENT)
  // =========================
  const handleEnrollCourse = async () => {
    try {
      setEnrolling(true);

      await api.post(`/courses/${courseId}/enroll`);

      alert("🎉 Đăng ký khóa học thành công!");
      navigate(`/my-learning`);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Không thể đăng ký khóa học"
      );
    } finally {
      setEnrolling(false);
    }
  };

  // =========================
  // RENDER STATES
  // =========================
  if (loading) {
    return <div className="py-32 text-center">⏳ Đang tải...</div>;
  }

  if (!course) {
    return <div className="py-32 text-center">❌ Khóa học không tồn tại</div>;
  }

  // Demo: chưa có giảm giá thật
  const originalPrice = course.price;
  const discountPrice = course.price;

  return (
    <div className="max-w-7xl mx-auto pt-5 pb-10 px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <LogoComponent className="w-[200px]" />

        <button
          onClick={handleGoToDetailPage}
          className="underline font-semibold text-sm text-gray-600"
        >
          &lt; Back to course
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex items-start max-w-5xl flex-row gap-8 bg-gray-100 py-8 px-24 rounded-lg shadow-md">

          {/* PAYMENT METHODS */}
          <div className="bg-white flex-1 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              How would you like to pay?
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
                "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
                "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                "https://img.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-2-2.png",
                "https://media.loveitopcdn.com/3807/logo-zalopay1-compressed.jpg",
                "https://mangviettel.com.vn/wp-content/uploads/2022/04/viettel-money-1.png",
              ].map((src, index) => (
                <div
                  key={index}
                  className="bg-white aspect-square h-[100px] flex items-center justify-center p-2 rounded border"
                >
                  <img
                    src={src}
                    alt="payment"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white flex-1 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Khóa học: {course.title}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  className="h-52 rounded-md object-cover"
                  src={
                    course.thumbnail ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={course.title}
                />
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Giá gốc:</p>
                <p className="line-through text-gray-500">
                  {originalPrice.toLocaleString()}đ
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Giá ưu đãi:</p>
                <p className="font-semibold">
                  {discountPrice.toLocaleString()}đ
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 border rounded-md px-3 py-2 text-sm"
                  disabled
                />
                <ButtonComponent
                  text="Áp dụng"
                  className="bg-blue-600 text-white px-4 py-2 border-none"
                  disabled
                />
              </div>

              <div className="flex justify-between font-bold border-t pt-4">
                <p>Tổng</p>
                <p>{discountPrice.toLocaleString()}đ</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <ButtonComponent
                text={enrolling ? "Processing..." : "Continue to secure payment"}
                className="w-full bg-green-600 text-white py-3 border-none"
                onClick={handleEnrollCourse}
                disabled={enrolling}
              />

              <button
                onClick={handleGoToDetailPage}
                className="w-full text-gray-600 underline text-sm"
              >
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
