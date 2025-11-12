import RegisterModal from "../../pages/RegisterModal";
import LoginModal from "../../pages/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent, InputComponent } from "../common";
import LogoComponent from "../common/LogoComponent";
import { useState, useEffect } from 'react';

function Header() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [user, setUser] = useState(null);

    // Kiểm tra session khi load
    useEffect(() => {
        const savedUser = sessionStorage.getItem("userSession");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userSession");
        setUser(null);
        window.location.reload();
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
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full border"
                        />
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
