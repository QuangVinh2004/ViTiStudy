import { useState, useEffect } from "react";

function HomePage() {
  const slides = [
    {
      title: "F8 trên Youtube",
      desc: "F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.",
      bg: "from-pink-500 to-orange-400",
    },
    {
      title: "Khóa học Pro",
      desc: "Cơ hội học tập chuyên sâu với giảng viên hàng đầu.",
      bg: "from-blue-500 to-purple-500",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className="p-4">
      {/* Banner Slider */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg h-[250px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full h-[250px] flex justify-between items-center px-10 bg-gradient-to-r ${slide.bg} text-white`}
            >
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="mb-4">{slide.desc}</p>
                <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                  ĐĂNG KÝ KÊNH
                </button>
              </div>
              {/* <img src={slide.img} alt="slide" className="h-40 rounded-md" /> */}
            </div>
          ))}
        </div>

        {/* Nút chuyển */}
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow"
        >
          &#8592;
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow"
        >
          &#8594;
        </button>

        {/* Dấu chấm */}
        <div className="absolute bottom-2 w-full flex justify-center gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
