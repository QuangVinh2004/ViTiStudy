import  { useState } from "react";

const LessonItem = ({ title, duration, isLocked, isCompleted }) => {
  let icon = null;
  if (isCompleted) {
    icon = <i className="fa-solid fa-check text-green-500"></i>;
  } else if (isLocked) {
    icon = <i className="fa-solid fa-lock text-gray-400"></i>;
  }

  return (
    <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 rounded-md">
      <div className="flex items-center space-x-2">
        <i className="fa-solid fa-file-lines text-gray-500"></i>
        <span className="text-sm text-gray-800">{title}</span>
      </div>
      <div className="flex items-center space-x-3">
        <button className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">Preview</button>
        <span className="text-sm text-gray-600">{duration}</span>
        {icon}
      </div>
    </div>
  );
};

// Component chính
const LessonsCardComponent = ({
  className = "",
  chapterTitle,
  lessonCount,
  totalDuration,
  children
}) => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={`bg-white mb-3 rounded-md shadow-sm ${className}`}>
      <div
        onClick={toggleOpen}
        className="cursor-pointer p-4 flex justify-between items-center border-b"
      >
        <div className="flex items-center space-x-2">
          <i
            className={`fa-solid ${
              open ? "fa-caret-down" : "fa-caret-right"
            } text-orange-500`}
          ></i>
          <h4 className="text-orange-500 font-semibold text-sm">{chapterTitle}</h4>
        </div>
        <div className="text-sm text-gray-500">{lessonCount} • {totalDuration}</div>
      </div>

      {open && (
        <div className="p-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};


export {LessonsCardComponent,LessonItem};
