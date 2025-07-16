import RegisterModal from "../../pages/RegisterModal";
import LoginModal from "../../pages/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent, InputComponent } from "./common";
import LogoComponent from "./common/LogoComponent";
function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    return (

        <header>
            <div className="flex items-center justify-between px-[100px] py-4 ">
                <LogoComponent className="w-[200px]" />

                <InputComponent
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    placeholder="Tìm kiếm các khóa học, giáo viên, quiz, ..."
                    className="w-[400px] h-[40px] rounded-full"
                />
                {
                    <div>
                        <ButtonComponent onClick={()=>setShowModal(true)} text="Đăng ký" type="link" href="#" textColor="text-blue-600" className="mx-4 font-medium"/>
                        {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
                        <ButtonComponent text="Đăng nhập" onClick={()=>setShowLoginModal(true)} />
                        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
                    </div>

                }
            </div>

            <div className="w-full border-t border-gray-300 mb-4"></div>

        </header>
    );
}

export default Header;
