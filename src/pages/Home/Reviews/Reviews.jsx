import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  {
    name: "Ayaan Rahman",
    role: "Tennis Player",
    comment:
      "This system made booking so easy! I love how I can now reserve courts without calling anyone. It's fast, smooth, and perfect!",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sadia Noor",
    role: "Club Member",
    comment:
      "Managing my session slots and checking announcements has never been easier. The website is responsive and well-designed!",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "Tim David",
    role: "Admin",
    comment:
      "Finally a system where I can approve bookings, track members, and update courts – all in one place. A huge time saver!",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaStar className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Testimonials</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            See what our members and staff have to say about Champion
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 shadow-xl group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full border-2 border-yellow-400 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <FaStar className="w-3 h-3 text-gray-900" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base sm:text-lg truncate">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <FaQuoteLeft className="w-8 h-8 text-yellow-400/30" />
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Decorative Bottom Border */}
              <div className="h-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0"></div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Reviews;
