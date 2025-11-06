import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaPaperPlane, FaBell } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Subscribed with email:", email);
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-yellow-400/20 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* IMAGE SIDE */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
                alt="Join our newsletter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent"></div>
            </div>

            {/* FORM SIDE */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                  <FaBell className="w-8 h-8 text-yellow-400" />
                </div>
              </div>

              {/* Header */}
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                Subscribe to our newsletter and never miss important updates, exclusive offers, and upcoming events from Champion Sports Club.
              </p>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaEnvelope className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <p className="text-gray-500 text-xs mt-4 text-center lg:text-left">
                🔒 We respect your privacy. Unsubscribe anytime.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-700">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-yellow-400">5,000+</p>
                  <p className="text-gray-400 text-sm">Subscribers</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-yellow-400">Weekly</p>
                  <p className="text-gray-400 text-sm">Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
