// src/components/PromotionsSection.jsx
const promotions = [
  {
    code: "ABC",
    discount: "5%",
    title: "New Member Offer",
    description: "Get 5% off on your first membership registration.",
    color: "from-yellow-300 to-yellow-500",
  },
  {
    code: "FIT20",
    discount: "20%",
    title: "Fitness Fest Deal",
    description: "Enjoy 20% off on all fitness packages this month.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    code: "SUMMER15",
    discount: "15%",
    title: "Summer Sports Offer",
    description: "Avail 15% discount on all summer sport activities.",
    color: "from-yellow-200 to-yellow-400",
  },
];

const Promotions = () => {
  return (
    <section className="w-full px-6 md:px-16 py-12 bg-gray-50 text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-yellow-400">
        Promotions & Discount Coupons
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {promotions.map((promo, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r ${promo.color} hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{promo.title}</h3>
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {promo.discount} OFF
              </span>
            </div>
            <p className="mb-4">{promo.description}</p>
            <p className="text-sm">
              Use Code: <span className="font-bold tracking-widest">{promo.code}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
