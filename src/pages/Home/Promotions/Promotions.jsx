import { FaTags, FaPercent } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';

const promotions = [
  {
    discount: "5%",
    title: "New Member Offer",
    description: "Get 5% off on your first membership registration.",
    color: {
      from: "from-blue-500/20",
      to: "to-blue-500/5",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      badge: "bg-blue-500"
    },
  },
  {
    discount: "20%",
    title: "Fitness Fest Deal",
    description: "Enjoy 20% off on all fitness packages this month.",
    color: {
      from: "from-green-500/20",
      to: "to-green-500/5",
      border: "border-green-500/30",
      icon: "text-green-400",
      badge: "bg-green-500"
    },
  },
  {
    discount: "15%",
    title: "Summer Sports Offer",
    description: "Avail 15% discount on all summer sport activities.",
    color: {
      from: "from-purple-500/20",
      to: "to-purple-500/5",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      badge: "bg-purple-500"
    },
  },
];

const Promotions = () => {
  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaTags className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Special Offers</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Save more with our exclusive discount promotions
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {promotions.map((promo, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${promo.color.from} ${promo.color.to} rounded-2xl border ${promo.color.border} overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl`}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-6 py-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdLocalOffer className={`w-5 h-5 ${promo.color.icon}`} />
                    <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                  </div>
                  <div className={`${promo.color.badge} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1`}>
                    <FaPercent className="w-3 h-3" />
                    {promo.discount}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {promo.description}
                </p>

                {/* Terms */}
                <div className={`bg-gradient-to-r ${promo.color.from} ${promo.color.to} border ${promo.color.border} rounded-lg p-3`}>
                  <p className="text-xs text-gray-300 text-center">
                    ✨ Limited time offer • Terms & conditions apply
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

    
      </div>
    </section>
  );
};

export default Promotions;
