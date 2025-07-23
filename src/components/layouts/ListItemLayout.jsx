import React, { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ButtonComponent from '../common/ButtonComponent';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ListItemLayout = ({ children, className = "" }) => {
  const scrollRef = useRef(null);
  const cardCount = React.Children.count(children);

  const scrollByCards = (direction = "next") => {
    const cardWidth = 350;
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
      

      <ScrollContainer
        innerRef={scrollRef}
        className={`flex gap-5 p-2 overflow-x-auto max-w-full cursor-grab ${className}`}
        vertical={false}
        hideScrollbars={true}
      >
        {React.Children.toArray(children)}
      </ScrollContainer>

      
    </div>
  );
};

export default ListItemLayout;