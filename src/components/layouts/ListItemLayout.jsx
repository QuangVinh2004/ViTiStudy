import React, { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const ListItemLayout = ({ children, className = "" }) => {
  const scrollRef = useRef(null);

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