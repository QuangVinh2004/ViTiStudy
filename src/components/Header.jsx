import { Link } from 'react-router-dom';

function Header() {
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


                {/* Search icon + Sign in */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder=""
                        className=" w-[230px] font-bold text-xl text-center text-gray-500 placeholder-gray-400  border-[1px] border-black rounded-full py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="w-10 h-10 flex justify-center bg-[#eee] p-2 rounded-full">
                        <i className="fa-solid fa-magnifying-glass text-lg text-black"></i>
                    </div>
                    <button className="bg-lime-300 border-2 border-black text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-400 transition-all">
                        Sign in
                    </button>
                </div>
            </div>
            {/* Divider line */}
             <div className="w-full border-t border-gray-300 mb-4"></div>
            {/* Navigation links */}
            <div className=" py-2">
                <nav className="flex justify-center space-x-32">
                    <Link to="/" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-house"></i>
                        <label>Home</label>

                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-info-circle"></i>
                        <label>About</label>
                        
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-envelope"></i>
                        <label>Contact</label>
                        
                    </Link>
                    <Link to="/" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-house"></i>
                        <label>Home</label>

                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-info-circle"></i>
                        <label>About</label>
                        
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-envelope"></i>
                        <label>Contact</label>
                        
                    </Link>
                    <Link to="/" className="text-gray-600 hover:text-black flex flex-col items-center">
                        <i className="fa-solid fa-house"></i>
                        <label>Home</label>

                    </Link>
                   
                </nav>
            </div>
         
        </header>

    );
}

export default Header;
