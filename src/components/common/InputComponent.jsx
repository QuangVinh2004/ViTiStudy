import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputComponent = ({
    leftIcon,
    value,
    onChange,
    placeholder = "Enter text...",
    type = "text",
    name,
    className = "",
    inputClassName = "",
    disabled = false,
    isPassword = false,
}) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const inputType = isPassword ? (isShowPassword ? "text" : "password") : type;

    return (
        <div
            className={`flex items-center border border-gray-300 rounded-2xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition ${className}`}
        >
            {leftIcon && (
                <span className="mr-2 text-gray-500 flex items-center">{leftIcon}</span>
            )}
            <input
                type={inputType}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 ${inputClassName}`}
            />
            {isPassword && (
                <span
                    className="ml-2 text-gray-500 flex items-center cursor-pointer"
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                >
                    <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
                </span>
            )}
        </div>
    );
};

export default InputComponent;
