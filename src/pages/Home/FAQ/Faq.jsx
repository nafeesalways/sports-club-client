import React, { useState } from "react";

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
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-10">❓ Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-md transition-all duration-300 ease-in-out"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <span className="text-2xl text-yellow-500">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="mt-3 text-gray-600 transition duration-300 ease-in-out">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
