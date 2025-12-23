import RegisterModal from "../../pages/RegisterModal";
import LoginModal from "../../pages/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent, InputComponent } from "../common";
import LogoComponent from "../common/LogoComponent";
import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate("/");
    };

    const handleProfileClick = () => {
        setShowDropdown(false);
        navigate(user.role === "teacher" ? "/teacher" : user.role === "admin" ? "/admin" : "/my-learning");
    };

    return (
        <header>
            <div className="flex items-center justify-between px-[100px] py-4 ">
                <LogoComponent className="w-[200px]" />
                
                <InputComponent
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    placeholder="Tìm kiếm các khóa học, giáo viên, quiz, ..."
                    className="w-[400px] h-[40px] rounded-full"
                />

                {user ? (
                    // Nếu đã đăng nhập
                    <div className="flex items-center gap-4">
                        <i className="fa-solid fa-bell font-medium"></i>
                        {
                            user.role === "teacher" ? (
                                <ButtonComponent text="Lớp học của tôi" type="link" href="/teacher"/>
                            ) : user.role === "admin" ? (
                                <ButtonComponent text="Trang quản trị" type="link" href="/admin"/>
                            ) : (
                                <ButtonComponent text="My Learning" type="link" href="/my-learning"/>
                            )
                        }
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user.avatar || "https://img.freepik.com/vector-mien-phi/vong-tron-mau-xanh-voi-nguoi-dung-mau-trang_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full border cursor-pointer hover:opacity-80"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <button
                                        onClick={handleProfileClick}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <i className="fa-solid fa-user"></i>
                                        <span>Trang cá nhân</span>
                                    </button>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Nếu chưa đăng nhập
                    <div>
                        <ButtonComponent
                            onClick={() => setShowRegisterModal(true)}
                            text="Đăng ký"
                            textColor="text-blue-600"
                            bgColor="bg-transparent"
                            className="mx-4 font-medium border-none hover:bg-transparent"
                        />
                        {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
                        <ButtonComponent
                            text="Đăng nhập"
                            onClick={() => setShowLoginModal(true)}
                        />
                        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
                    </div>
                )}
            </div>

            <div className="w-full border-t border-gray-300 mb-4"></div>
        </header>
    );
}

export default Header;
