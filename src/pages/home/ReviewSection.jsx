import React from 'react';
import HomeImage1 from '../../assets/images/home-image1.png';
import ButtonComponent from '../../components/common/ButtonComponent';

const ReviewSection = () => (
  <div className="flex flex-col md:flex-row items-center gap-12">
    <div className="w-full md:w-1/2 p-10">
      <img src={HomeImage1} alt="Illustration" className="w-full h-auto" />
    </div>
    <div className="w-full md:w-1/2 pl-10">
      <h2 className="text-3xl font-bold mb-4">
        Grow Us Your Skill <br /> With LearnPress LMS
      </h2>
      <p className="text-gray-600 mb-6">
        We denounce with righteous indignation and dislike men who are so beguiled and
        demoralized that cannot trouble.
      </p>
      <ul className="space-y-2 mb-6 text-gray-800">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✔</span> Certification
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✔</span> Certification
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✔</span> Certification
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✔</span> Certification
        </li>
      </ul>
      <ButtonComponent text="Explorer Course" className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition" />
    </div>
  </div>
);

export default ReviewSection;
