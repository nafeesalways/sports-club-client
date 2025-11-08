import React from 'react';
import { FaTachometerAlt, FaCalendarCheck, FaHistory, FaChartLine, FaBullhorn, FaUserCircle } from 'react-icons/fa';
import { MdSportsHandball } from 'react-icons/md';
import { Link } from 'react-router';

const UserDashboard = () => {
  const features = [
    {
      icon: FaCalendarCheck,
      title: "Manage Bookings",
      description: "View and manage all your court reservations in one place",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: FaChartLine,
      title: "Booking Statistics",
      description: "Visualize your booking patterns and activity",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: FaBullhorn,
      title: "Club Announcements",
      description: "Stay updated with the latest news and events",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="p-3 sm:p-4 bg-yellow-400/20 rounded-xl">
              <FaTachometerAlt className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400">
                Welcome Back!
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-1">
                Manage your bookings and explore court availability
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-2xl border border-yellow-400/20 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="p-4 bg-yellow-400/20 rounded-xl">
              <MdSportsHandball className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Your Personal Dashboard
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Welcome to your personal command center at Champion Sports Club. Here you can manage all aspects 
                of your membership, from booking courts to tracking your activity. Navigate through the sidebar to 
                access different features and make the most of your membership.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="w-5 h-5 text-yellow-400" />
                <h3 className="text-white font-semibold">Member Benefits</h3>
              </div>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Priority court booking access</li>
                <li>• Exclusive member discounts</li>
                <li>• Real-time booking updates</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <FaCalendarCheck className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">Quick Access</h3>
              </div>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Check booking status instantly</li>
                <li>• Easy payment processing</li>
                <li>• Download payment receipts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Dashboard Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <div className={`${feature.bgColor} rounded-lg p-4 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Browse Available Courts</h3>
                <p className="text-gray-400 text-sm">
                  Navigate to the Courts section to view all available courts, time slots, and pricing information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Make a Booking Request</h3>
                <p className="text-gray-400 text-sm">
                  Select your preferred date and time slots, then submit your booking request for admin approval.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Track & Complete Payment</h3>
                <p className="text-gray-400 text-sm">
                  Once approved, complete your payment securely through our integrated payment system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to={'/courts'} className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-4 rounded-xl transition-all duration-200 hover:scale-105">
            Book a Court
          </Link>
          <Link to={'/dashboard/pendingBookings'} className="btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-4 rounded-xl transition-all duration-200">
            View Bookings
          </Link>
     
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
