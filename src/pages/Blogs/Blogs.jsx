import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaCalendarAlt, FaArrowRight, FaClock, FaUser } from 'react-icons/fa';

const blogs = [
  {
    title: "How We Built a Smart Sports Club Management System",
    date: "August 5, 2025",
    author: "Dev Team",
    readTime: "8 min read",
    category: "Development",
    excerpt:
      "Discover how we transformed manual court booking and member tracking into a digital platform with React, Tailwind, and MongoDB. Learn about our architecture decisions and implementation details.",
    tags: ["React", "MongoDB", "Full-Stack"],
  },
  {
    title: "Automating Bookings and Member Approvals",
    date: "July 25, 2025",
    author: "Admin Team",
    readTime: "5 min read",
    category: "Features",
    excerpt:
      "No more messy registers! Learn how our system allows admins to manage court sessions, bookings, and approvals seamlessly with real-time updates and notifications.",
    tags: ["Automation", "Admin Panel", "UX"],
  },
  {
    title: "Building an Admin Dashboard with Powerful Controls",
    date: "July 10, 2025",
    author: "Backend Team",
    readTime: "10 min read",
    category: "Backend",
    excerpt:
      "A deep dive into how we created a fully functional admin dashboard to manage users, announcements, courts, and coupons with advanced filtering and analytics.",
    tags: ["Dashboard", "Analytics", "API"],
  },
  {
    title: "Enhancing User Experience with Tailwind & Modals",
    date: "June 22, 2025",
    author: "Frontend Team",
    readTime: "6 min read",
    category: "Frontend",
    excerpt:
      "Here's how we improved interactivity using slot dropdowns, responsive components, and form validations with React and Tailwind CSS for a seamless user experience.",
    tags: ["Tailwind", "React", "UI/UX"],
  },
  {
    title: "Implementing Secure Payment Integration",
    date: "June 10, 2025",
    author: "Security Team",
    readTime: "7 min read",
    category: "Security",
    excerpt:
      "Learn how we integrated Stripe payment gateway with proper security measures, webhook handling, and receipt generation for seamless transactions.",
    tags: ["Stripe", "Security", "Payments"],
  },
  {
    title: "Real-Time Notifications with WebSockets in Future Plan",
    date: "May 28, 2025",
    author: "Backend Team",
    readTime: "9 min read",
    category: "Backend",
    excerpt:
      "Explore our implementation of real-time notifications for booking updates, announcements, and member communications using WebSocket technology.",
    tags: ["WebSocket", "Real-Time", "Node.js"],
  },
];

const categories = ["All", "Development", "Features", "Backend", "Frontend", "Security"];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaBookOpen className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Developer Blogs</span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights, tutorials, and behind-the-scenes stories from our development journey
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ y: -8 }}
            >
              {/* Category Badge */}
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-3 border-b border-gray-700">
                <span className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-bold uppercase">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-3 h-3 text-yellow-400" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-3 h-3 text-green-400" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaUser className="w-3 h-3" />
                  <span>by {blog.author}</span>
                </div>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-xs text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

          
             
              </div>
            </motion.div>
          ))}
        </motion.div>

      
      </div>
    </section>
  );
};

export default Blogs;
