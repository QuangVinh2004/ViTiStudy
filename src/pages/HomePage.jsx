import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CardComponent, SlideComponent, ListItemLayout } from "../components/layouts";
import { TitleComponent } from "../components/common";

function HomePage() {
  const slides = [
    {
      title: "Kèo nhà cái tại fb88",
      desc: "Fb88 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.",
      bg: "from-pink-500 to-orange-400",
    },
    {
      title: "Khóa học Pro",
      desc: "Cơ hội học tập chuyên sâu với giảng viên hàng đầu.",
      bg: "from-blue-500 to-purple-500",
    },
  ];

  return (
    
<div className="px-[100px] py-3">
      <Header />
      <SlideComponent>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex items-center overflow-hidden rounded-xl shadow-lg justify-center h-[400px] bg-gradient-to-r ${slide.bg} text-white`}
          >
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="mb-6">{slide.desc}</p>
              <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </SlideComponent>

      <TitleComponent text="Khóa học của tôi."/>

      <ListItemLayout>
        <CardComponent type="simple" title="GOAT Lionel Messi" description="Cầu thủ vĩ đại nhất làng túc cầu." imageUrl="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/anh-messi-trong-mon-bong-da_105532690.jpg" rating={4}/>
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
      </ListItemLayout>

      <TitleComponent text="Gợi ý khóa học"/>

      <ListItemLayout>
        <CardComponent 
          type="detail" 
          title="GOAT Lionel Messi" 
          description="Cầu thủ vĩ đại nhất làng túc cầu." 
          imageUrl="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/anh-messi-trong-mon-bong-da_105532690.jpg" 
          rating={4} 
          teacherImage="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/12/20/base64-16715047461231280255424.png"
          teacherName="Thầy Ông Nậu"
          lessonCount={10}
          price={20000000}
          onClick={() => console.log("Messi is goat")}
        />
        <CardComponent title="Bảy Chọ - Bủ ngay" description="Ăn vạ, hải dưới, hôi bàn thắng..." imageUrl="https://tophinhanhdep.com/wp-content/uploads/2021/10/Cristiano-Ronaldo-Portugal-Wallpapers.jpg" />
      </ListItemLayout>

      <TitleComponent text="Giáo viên nổi bật"/>
      <Footer />
    </div>
    
  );
}

export default HomePage;
