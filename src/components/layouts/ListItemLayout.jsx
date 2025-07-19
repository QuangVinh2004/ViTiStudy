import React, { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ButtonComponent from '../common/ButtonComponent';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ListItemLayout = ({ children, className = "" }) => {
  const scrollRef = useRef(null);

  // 👉 Scroll 2 card mỗi lần (giả định mỗi card rộng 220px + 20px gap)
  const scrollByCards = (direction = "next") => {
    const cardWidth = 350; // chỉnh nếu card bạn khác
    const scrollDistance = cardWidth * 2;

    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollDistance : -scrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Button Previous */}
      <ButtonComponent
        text=""
        onClick={() => scrollByCards("prev")}
        rightIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        className="absolute top-[40%] left-[-2%] -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md"
        bgColor="bg-white"
      />
      {/* Scroll container */}
      <ScrollContainer
        innerRef={scrollRef}
        className={`flex gap-5 p-2 overflow-x-auto cursor-grab ${className}`}
        vertical={false}
        hideScrollbars={true} // ẩn luôn thanh trượt
      >
        {React.Children.toArray(children)}
      </ScrollContainer>

      {/* Button Next */}
      <ButtonComponent
        text=""
        onClick={() => scrollByCards("next")}
        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
        className="absolute top-[40%] right-[-2%] -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md"
        bgColor="bg-white"
      />
    </div>
  );
};

export default ListItemLayout;
