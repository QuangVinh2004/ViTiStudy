const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Useful Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">USEFUL LINKS</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-400 text-center block">About</a></li>
            <li><a href="/services" className="hover:text-gray-400 text-center block">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-400 text-center block">Contact</a></li>
            <li><a href="/shop" className="hover:text-gray-400 text-center block">Shop</a></li>
            <li><a href="/blog" className="hover:text-gray-400 text-center block">Blog</a></li>
          </ul>
        </div>


        {/* Newsletter */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-center">NEWSLETTER</h2>
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full max-w-xs px-4 py-2 rounded-md text-black"
          />
          <button className="mt-4 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
            SUBSCRIBE NOW
          </button>
        </div>


        {/* Contact Info */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-semibold mb-4">CONTACT</h2>
          <p className="mb-4">
            123, XYZ Road, 0603<br />
            Bengaluru, Karnataka, IN
          </p>
          <div className="flex justify-center space-x-4 text-xl">
            <a href="/FB" className="hover:text-gray-400"><i className="fa-brands fa-facebook"></i></a>
            <a href="/TW" className="hover:text-gray-400"><i className="fa-brands fa-square-twitter"></i></a>
            <a href="/IG" className="hover:text-gray-400"><i className="fa-brands fa-instagram"></i></a>
            <a href="/PT" className="hover:text-gray-400"><i className="fa-brands fa-pinterest"></i></a>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
