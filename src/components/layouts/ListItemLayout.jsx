import React, { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const ListItemLayout = ({ children, className = "", direction = "horizontal" }) => {
  const scrollRef = useRef(null);
  const isHorizontal = direction === "horizontal";

  if (isHorizontal) {
    return (
      <ScrollContainer
        innerRef={scrollRef}
        className={`flex flex-row overflow-x-auto gap-5 p-2 max-w-full cursor-grab ${className}`}
        vertical={false}
        hideScrollbars={true}
      >
        {React.Children.toArray(children)}
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer
      innerRef={scrollRef}
      className={`flex flex-col overflow-y-auto gap-5 max-h-full cursor-grab ${className}`}
      vertical={true}
      horizontal={false}
      hideScrollbars={true}
    >
      {React.Children.toArray(children)}
    </ScrollContainer>
  );
};

export default ListItemLayout;
