import {
  FaUserFriends,
  FaDumbbell,
  FaRunning,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaWallet,
  FaClock,
  FaMobileAlt,
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdOutlineSupportAgent,
  MdOutlineSportsSoccer,
  MdOutlineSecurity,
} from "react-icons/md";

const features = [
  {
    icon: FaUserFriends,
    title: "Member Management",
    desc: "Easily manage registrations, renewals, and profiles.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: FaCalendarAlt,
    title: "Court & Session Booking",
    desc: "Reserve courts, slots, or classes in real-time.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaWallet,
    title: "Online Payments",
    desc: "Secure payment processing with receipts and reports.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Coach Assignments",
    desc: "Assign and manage coaches based on sport/activity.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: FaClock,
    title: "Real-Time Schedule",
    desc: "Track all events, sessions, and matches live.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: FaRunning,
    title: "Activity Tracking",
    desc: "Log and monitor players' training & achievements.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "Member Support",
    desc: "Instant messaging and issue resolution tools.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: MdOutlineSportsSoccer,
    title: "Multi-Sport Support",
    desc: "Football, tennis, gym, swimming & more supported.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaDumbbell,
    title: "Fitness Programs",
    desc: "Offer yoga, cardio, strength & conditioning plans.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Location Maps",
    desc: "Navigate across all club branches or courts.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile-Friendly",
    desc: "Optimized for all devices with a smooth experience.",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: MdOutlineSecurity,
    title: "Secure & Private",
    desc: "Robust authentication and data protection in place.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
];

const KeyFeatures = () => {
  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaCheckCircle className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Key Features</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to manage and grow your sports club
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 group"
            >
              {/* Icon */}
              <div className={`${item.bgColor} rounded-lg p-4 mb-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg text-white mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 text-center leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default KeyFeatures;
