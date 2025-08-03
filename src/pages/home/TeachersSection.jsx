import React from 'react';

const TeachersSection = ({ teachers }) => (
  <section className="py-14 px-4 bg-gradient-to-r from-white via-cyan-50 to-white rounded-lg">
    <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-700 tracking-tight">
      Giáo viên nổi bật
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {teachers.map((teacher, index) => (
        <div
          key={index}
          className="bg-white/90 shadow-2xl rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 border border-blue-100 relative"
        >
          <div className="flex justify-center mb-4">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
            />
          </div>
          <span className="absolute animate-pulse top-7 right-7 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow">
            Nổi bật
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{teacher.name}  <span className='text-blue-500 font-semibold mb-2 text-base'>{teacher.subject}</span></h3>
          <p className="text-gray-600 text-sm mb-4">{teacher.bio}</p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="bg-blue-50 text-blue-400 px-2 py-1 rounded text-xs font-medium">Kinh nghiệm</span>
            <span className="bg-cyan-50 text-cyan-400 px-2 py-1 rounded text-xs font-medium">Chuyên môn</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TeachersSection;
