import React, { useRef, useState, useEffect } from "react";

const TitleComponent = ({ text }) => {
  const wrapperRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  useEffect(() => {
    if (wrapperRef.current) {
      setUnderlineWidth(wrapperRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <div className="text-left mt-9 mb-6 cursor-pointer">
      <div ref={wrapperRef} className="inline-block">
        <h1 className="text-3xl font-bold m-0 font-sans">{text}</h1>
        <div
          className="mx-auto h-1 rounded bg-gradient-to-r from-amber-300 to-cyan-300 transition-all duration-200"
          style={{ width: underlineWidth, minWidth: 1 }}
        />
      </div>
    </div>
  );
};

export default TitleComponent;