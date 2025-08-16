import React, { useState } from "react";
import { toast } from "react-toastify";


const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    console.log("Subscribed with email:", email);
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gray-100 my-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* IMAGE SIDE */}
        <div className="w-full lg:w-1/2">
          <img
            src='https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D'
            alt="Join our newsletter"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* FORM SIDE */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">📬 Join Our Newsletter</h2>
          <p className="text-gray-700 mb-6">
            Stay up to date with the latest news, matches, and events from our Sports Club.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 btn py-3 rounded-lg bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-all duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
