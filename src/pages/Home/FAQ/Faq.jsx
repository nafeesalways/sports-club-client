import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a court?",
    answer:
      "You can easily book a court by visiting the 'Courts' section, selecting your preferred time slot, and submitting the booking request.",
  },
  {
    question: "How will I know if my booking is approved?",
    answer:
      "Once your booking is approved by the admin, you will receive a confirmation under the 'Approved Bookings' section in your dashboard.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel your booking anytime before the session starts from your dashboard under 'Pending' or 'Approved Bookings'.",
  },
  {
    question: "Who can become a member?",
    answer:
      "Any user whose booking has been approved and has completed the payment becomes a member automatically.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes! We use Stripe to handle all payments securely and offer coupon support for discounts.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaQuestionCircle className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>FAQ</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Find answers to the most commonly asked questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800 to-black rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-yellow-400/40 shadow-xl"
                  : "border-gray-700 hover:border-yellow-400/20"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left p-5 sm:p-6 focus:outline-none group"
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-4 group-hover:text-yellow-400 transition-colors">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? "bg-yellow-400/20 text-yellow-400" 
                    : "bg-gray-700 text-gray-400 group-hover:bg-yellow-400/10 group-hover:text-yellow-400"
                }`}>
                  {openIndex === index ? (
                    <FaChevronUp className="w-4 h-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

   
      </div>
    </section>
  );
};

export default Faq;
