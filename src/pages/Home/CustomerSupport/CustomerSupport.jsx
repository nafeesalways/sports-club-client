import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaPhoneAlt, FaClock, FaSmile } from "react-icons/fa";

const CustomerSupport = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const stats = [
    {
      icon: <FaPhoneAlt size={32} className="text-blue-600" />,
      label: "Support Calls",
      count: 240,
    },
    {
      icon: <FaClock size={32} className="text-green-600" />,
      label: "Daily Work Hours",
      count: 10,
    },
    {
      icon: <FaSmile size={32} className="text-yellow-500" />,
      label: "Customer Satisfaction",
      count: 98,
      suffix: "%",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-yellow-600">
          🤝 Customer Support
        </h2>
        <p className="text-gray-600 mb-12">
          We are committed to providing the best service to our valued members.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {item.icon}
              <h3 className="text-3xl font-bold text-yellow-600 mt-4">
                {inView && (
                  <CountUp
                    end={item.count}
                    duration={2}
                    suffix={item.suffix || ""}
                  />
                )}
              </h3>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
