import React from 'react';
import InputComponent from '../../components/common/InputComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => (
  <div className=" px-10 py-12 my-16 max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12">
    <div className="flex-1">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Contact</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Nếu bạn có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua biểu mẫu hoặc các kênh bên dưới:
      </p>
      <div className="space-y-4 text-gray-700 pl-7">
        <div className="flex items-center">
          <span className="text-blue-500 text-xl mr-3">📞</span>
          <span><b>Hotline:</b> 0123 456 789</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 text-xl mr-3">💬</span>
          <span><b>Zalo:</b> 0123 456 789</span>
        </div>
        <div className="flex items-center">
          <span className="text-red-500 text-xl mr-3">✉️</span>
          <span><b>Email:</b> contact@vitistudy.edu.vn</span>
        </div>
      </div>
      <div className="flex gap-6 mt-8 pl-7">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-4xl hover:scale-110 hover:text-blue-800 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-4xl hover:scale-110 hover:text-pink-700 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" className="text-cyan-500 text-4xl hover:scale-110 hover:text-cyan-700 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
      </div>
    </div>
    <form className="flex-1 bg-white border border-gray-300 rounded-2xl p-8 space-y-3 w-full">
      <h3 className="text-xl font-semibold text-gray-800">Gửi liên hệ</h3>
      <InputComponent placeholder="Nhập tên liên hệ" className='rounded-lg'/>
      <InputComponent placeholder="Nhập địa chỉ email" className='rounded-lg'/>
      <textarea
        placeholder="Nội dung liên hệ"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      />
      <ButtonComponent text="Gửi liên hệ" className='bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 font-medium transition w-full border-none' />
    </form>
  </div>
);

export default ContactSection;
