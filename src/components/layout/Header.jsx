import RegisterModal from "../../pages/RegisterModal";
import LoginModal from "../../pages/LoginModal";
import React, { useState } from "react";
function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    return (
        
        <header >
            <div className="flex items-center justify-between px-6 py-4 ">
                {/* Logo */}
                <div >
                    <img
                        src="https://quiz.com/images/logo/quiz-multicolor.svg"
                        alt="Logo"
                        className="w-[280px]"
                    />
                </div>

                {/* Search form */}
                <div className="flex items-center space-x-4  border-[1px] border-black rounded-full  w-[400px] bg-white">
                    <div className="w-10 h-10 flex justify-center  p-2 ">
                        <i className="fa-solid fa-magnifying-glass text-lg text-black"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học ,giáo viên,bài quizz,..."
                        className=" w-[300px]   text-center text-gray-500 placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-black"
                    />


                </div>

                {/*  Sign in + Sign up */}
                <div>

                    <button onClick={()=>setShowModal(true)} className="text-black font-semibold px-6 py-2" id='openModal'>
                        Sign up
                    </button>
                    {showModal && <RegisterModal onClose={() => setShowModal(false)} />}

                    <button onClick={() => setShowLoginModal(true)} className="bg-lime-300 border-2 border-black text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-400 transition-all">
                        Sign in
                    </button>
                    {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

                </div>

            </div>

            {/* Divider line */}
            <div className="w-full border-t border-gray-300 mb-4"></div>
            <div id="modal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Đăng ký tài khoản F8</h2>
                    {/* <!-- Form hoặc các nút đăng ký --> */}
                </div>
            </div>
        </header>

    );
}

export default Header;
