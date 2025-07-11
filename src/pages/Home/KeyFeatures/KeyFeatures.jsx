import {
  FaUserFriends,
  FaDumbbell,
  FaRunning,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaWallet,
  FaClock,
  FaMedal,
  FaMobileAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import {
  MdOutlineSupportAgent,
  MdOutlineSportsSoccer,
  MdOutlineSecurity,
} from "react-icons/md";

const features = [
  {
    icon: <FaUserFriends size={32} />,
    title: "Member Management",
    desc: "Easily manage registrations, renewals, and profiles.",
  },
  {
    icon: <FaCalendarAlt size={32} />,
    title: "Court & Session Booking",
    desc: "Reserve courts, slots, or classes in real-time.",
  },
  {
    icon: <FaWallet size={32} />,
    title: "Online Payments",
    desc: "Secure payment processing with receipts and reports.",
  },
  {
    icon: <FaChalkboardTeacher size={32} />,
    title: "Coach Assignments",
    desc: "Assign and manage coaches based on sport/activity.",
  },
  {
    icon: <FaClock size={32} />,
    title: "Real-Time Schedule",
    desc: "Track all events, sessions, and matches live.",
  },
  {
    icon: <FaRunning size={32} />,
    title: "Activity Tracking",
    desc: "Log and monitor players’ training & achievements.",
  },
  {
    icon: <MdOutlineSupportAgent size={32} />,
    title: "Member Support",
    desc: "Instant messaging and issue resolution tools.",
  },
  {
    icon: <MdOutlineSportsSoccer size={32} />,
    title: "Multi-Sport Support",
    desc: "Football, tennis, gym, swimming & more supported.",
  },
  {
    icon: <FaDumbbell size={32} />,
    title: "Fitness Programs",
    desc: "Offer yoga, cardio, strength & conditioning plans.",
  },
  {
    icon: <FaMapMarkedAlt size={32} />,
    title: "Location Maps",
    desc: "Navigate across all club branches or courts.",
  },
  {
    icon: <FaMobileAlt size={32} />,
    title: "Mobile-Friendly",
    desc: "Optimized for all devices with a smooth experience.",
  },
  {
    icon: <MdOutlineSecurity size={32} />,
    title: "Secure & Private",
    desc: "Robust authentication and data protection in place.",
  },
];

const KeyFeatures = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-white text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-600">
        Club Management Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center"
          >
            <div className="text-yellow-600 mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
