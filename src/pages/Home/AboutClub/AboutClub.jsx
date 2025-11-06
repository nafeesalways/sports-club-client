import { FaTrophy, FaHistory, FaBullseye, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { MdSportsHandball } from 'react-icons/md';

const AboutClub = () => {
  const stats = [
    { icon: FaUsers, label: "Active Members", value: "500+", color: "text-blue-400" },
    { icon: MdSportsHandball, label: "Courts Available", value: "12+", color: "text-green-400" },
    { icon: FaTrophy, label: "Championships Won", value: "25+", color: "text-yellow-400" },
    { icon: FaCheckCircle, label: "Years of Excellence", value: "15", color: "text-purple-400" },
  ];

  const values = [
    { title: "Excellence", description: "We strive for the highest standards in everything we do", icon: FaTrophy },
    { title: "Community", description: "Building strong connections through sports", icon: FaUsers },
    { title: "Growth", description: "Nurturing talent and personal development", icon: FaBullseye },
    { title: "Integrity", description: "Fair play and respect in all activities", icon: FaCheckCircle },
  ];

  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaTrophy className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>About Champion</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Your premier destination for sports excellence and community
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-yellow-400/20 p-6 text-center hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Who We Are */}
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 p-6 sm:p-8 hover:border-yellow-400/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Who We Are</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Champion Sports Club is a vibrant hub for athletes, enthusiasts, and the community. Whether you're a
              professional player or just starting out, we provide top-class facilities and a supportive
              environment for everyone to grow and thrive.
            </p>
          </div>

          {/* Our History */}
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 p-6 sm:p-8 hover:border-yellow-400/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <FaHistory className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our History</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Established in 2010, our club began with a handful of passionate individuals and a single
              multi-purpose court. Today, we've grown into a full-fledged sports organization with hundreds
              of members, state-of-the-art infrastructure, and a calendar full of exciting events.
            </p>
          </div>
        </div>

        {/* Mission Statement - Full Width */}
        <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-2xl border border-yellow-400/30 p-8 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="p-4 bg-yellow-400/20 rounded-xl">
              <FaBullseye className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-gray-400 text-sm sm:text-base">Guiding our every decision and action</p>
            </div>
          </div>
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            To promote a healthy and active lifestyle through quality sports programs, inclusive activities,
            and community-driven values. We aim to nurture talent, foster teamwork, and create memorable
            sporting experiences for all ages.
          </p>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 hover:border-yellow-400/40 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-400/10 rounded-lg">
                    <value.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

   
      </div>
    </section>
  );
};

export default AboutClub;
