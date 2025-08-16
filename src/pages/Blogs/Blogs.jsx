import React from 'react';

const blogs = [
  {
    title: "How We Built a Smart Sports Club Management System",
    date: "August 5, 2025",
    excerpt:
      "Discover how we transformed manual court booking and member tracking into a digital platform with React, Tailwind, and MongoDB...",
  },
  {
    title: "Automating Bookings and Member Approvals",
    date: "July 25, 2025",
    excerpt:
      "No more messy registers! Learn how our system allows admins to manage court sessions, bookings, and approvals seamlessly...",
  },
  {
    title: "Building an Admin Dashboard with Powerful Controls",
    date: "July 10, 2025",
    excerpt:
      "A quick guide on how we created a fully functional admin dashboard to manage users, announcements, courts, and coupons...",
  },
  {
    title: "Enhancing User Experience with Tailwind & Modals",
    date: "June 22, 2025",
    excerpt:
      "Here’s how we improved interactivity using slot dropdowns, responsive components, and form validations with React and Tailwind...",
  },
];

const Blogs = () => {
  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">📚 Developer Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700">{blog.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
