// import logoweb from "../../assets/images/logoweb.png";

const LogoComponent = ({
    className = "",
}) => {
    return (
        <div className={`flex items-center h-[55px] ${className}`}>
            <img
                src="https://quiz.com/images/logo/quiz-multicolor.svg"
                alt="Logo"
                className="w-full"
            />
        </div>
    );
};

export default LogoComponent;
