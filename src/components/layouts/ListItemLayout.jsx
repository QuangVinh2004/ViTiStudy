import React, { useRef } from "react";

const ListItemLayout = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    containerRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX);
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    isDown = false;
    containerRef.current.classList.remove("cursor-grabbing");
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`flex overflow-x-auto gap-4 cursor-grab ${className}`}
      style={{ userSelect: "none" }}
      onMouseDown={onMouseDown}
    >
      {React.Children.toArray(children).slice(0, 4)}
    </div>
  );
};

export default ListItemLayout;
