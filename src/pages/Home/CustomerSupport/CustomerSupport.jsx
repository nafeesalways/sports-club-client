import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaPhoneAlt, FaClock, FaSmile, FaHeadset } from "react-icons/fa";

const CustomerSupport = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: FaPhoneAlt,
      label: "Support Calls Handled",
      count: 2400,
      suffix: "+",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: FaClock,
      label: "Daily Work Hours",
      count: 16,
      suffix: "h",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: FaSmile,
      label: "Customer Satisfaction",
      count: 98,
      suffix: "%",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaHeadset className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Customer Support</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            We are committed to providing the best service to our valued members 24/7
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800 to-black rounded-2xl border ${item.borderColor} p-8 text-center transition-all duration-300 hover:scale-105 hover:border-yellow-400/40 shadow-xl group`}
            >
              {/* Icon */}
              <div className={`${item.bgColor} rounded-xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-10 h-10 ${item.color}`} />
              </div>

              {/* Count */}
              <h3 className={`text-4xl sm:text-5xl font-black ${item.color} mb-3`}>
                {inView ? (
                  <CountUp
                    end={item.count}
                    duration={2.5}
                    suffix={item.suffix || ""}
                  />
                ) : (
                  "0"
                )}
              </h3>

              {/* Label */}
              <p className="text-gray-300 text-sm sm:text-base font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Support Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-blue-500/30 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                <FaPhoneAlt className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Our support team is available to assist you with any questions or concerns.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    📞 <span className="text-blue-400 font-semibold">+880 1234-567890</span>
                  </p>
                  <p className="text-gray-400">
                    ✉️ <span className="text-blue-400 font-semibold">support@championclub.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Info */}
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-green-500/30 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg flex-shrink-0">
                <FaClock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Support Hours</h3>
                <p className="text-gray-300 text-sm mb-3">
                  We're here when you need us most.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    ⏰ <span className="text-green-400 font-semibold">Monday - Friday: 6:00 AM - 10:00 PM</span>
                  </p>
                  <p className="text-gray-400">
                    🌙 <span className="text-green-400 font-semibold">Weekend: 7:00 AM - 9:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default CustomerSupport;
