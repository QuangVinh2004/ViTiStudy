import logoweb from "../../assets/images/logoweb.png";

const LogoComponent = ({
    className = "",
}) => {
    return (
        <div className={`flex items-center ${className}`}>
            <img
                src={logoweb}
                alt="Logo"
                className="w-full"
            />
        </div>
    );
};

export default LogoComponent;
