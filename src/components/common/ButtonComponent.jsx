import React from "react";

const ButtonComponent = ({
    type = "button",
    text,
    onClick,
    href = "#",
    bgColor = "bg-sky-300",
    textColor = "text-black",
    leftIcon,
    rightIcon,
    className = "",
}) => {
    return (
        type === "button" ? 
            <button onClick={onClick} className={`${bgColor} ${textColor} border-2 border-black font-semibold px-6 py-2 rounded-full hover:bg-lime-400 transition-all ${className}`}>
                {leftIcon && <span className="mr-1">{leftIcon}</span>}
                <span>{text}</span>
                {rightIcon && <span className="ml-1">{rightIcon}</span>}
            </button>
            :
            <a
                href={href}
                className={`${textColor}  ${className} text-blue-600 hover:text-blue-800 no-underline hover:underline font-medium`}
            >
                {leftIcon && <span className="mr-1">{leftIcon}</span>}
                <span>{text}</span>
                {rightIcon && <span className="ml-1">{rightIcon}</span>}
            </a>
    )
};

export default ButtonComponent;
