import React from 'react';
import ListItemLayout from '../../components/layouts/ListItemLayout';

const FeedbackSection = ({ feedbacks }) => (
  <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-50 rounded-2xl p-12 max-w-6xl mx-auto mt-20">
    <h2 className="text-3xl font-bold text-center mb-10 text-slate-800 tracking-tight">
      <span className="inline-block align-middle mr-2 text-orange-400">💬</span>
      Phản hồi từ người dùng
    </h2>
    <ListItemLayout>
      {feedbacks.map((fb, index) => (
        <div
          key={index}
          className="bg-white/90 min-w-[330px] border border-orange-100 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-7 flex flex-col items-center"
        >
          <div className="relative mb-4">
            <img
              src={fb.avatar}
              alt={fb.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-orange-200 shadow"
            />
            <span className="absolute -top-3 -right-3 text-3xl text-orange-300">“</span>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-900 text-lg">{fb.name}</p>
            <p className="text-xs text-gray-500 mb-2">{fb.role}</p>
            <p className="text-gray-700 italic text-base leading-relaxed">
              {fb.comment}
            </p>
          </div>
        </div>
      ))}
    </ListItemLayout>
  </div>
);

export default FeedbackSection;
