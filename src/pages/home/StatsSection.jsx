import React from 'react';

const StatsSection = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 py-16">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="bg-gray-100 rounded-xl text-center py-6 shadow-md"
      >
        <h3 className="text-2xl font-bold text-orange-500">{stat.number}</h3>
        <p className="mt-2 text-gray-700">{stat.label}</p>
      </div>
    ))}
  </div>
);

export default StatsSection;
