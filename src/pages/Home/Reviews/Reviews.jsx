import React from 'react';

const reviews = [
  {
    name: "Ayaan Rahman",
    role: "Tennis Player",
    comment:
      "This system made booking so easy! I love how I can now reserve courts without calling anyone. It's fast, smooth, and perfect!",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sadia Noor",
    role: "Club Member",
    comment:
      "Managing my session slots and checking announcements has never been easier. The website is responsive and well-designed!",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Tim David",
    role: "Admin",
    comment:
      "Finally a system where I can approve bookings, track members, and update courts – all in one place. A huge time saver!",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const Reviews = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-12">🌟 What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-xl shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full border-2 border-blue-500"
              />
              <div>
                <h4 className="font-semibold text-lg text-yellow-600">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
