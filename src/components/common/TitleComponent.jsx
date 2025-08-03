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
    <div className="text-left mt-9 mb-4 cursor-pointer">
      <div ref={wrapperRef} className="inline-block">
        <p className="text-2xl font-bold m-0 font-sans">{text}</p>
        <div
          className="mx-auto h-[3px] rounded bg-gradient-to-r from-neutral-800 via-cyan-300 to-neutral-500 transition-all duration-200"
          style={{ width: underlineWidth, minWidth: 1 }}
        />
      </div>
    </div>
  );
};

export default TitleComponent;