// src/components/AboutClub.jsx
const AboutClub = () => {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-12 bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow-400">
          About Our Club
        </h2>

        <div className="space-y-8 text-lg leading-relaxed">
          {/* About */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">Who We Are</h3>
            <p>
              Our sports club is a vibrant hub for athletes, enthusiasts, and the community. Whether you're a
              professional player or just starting out, we provide top-class facilities and a supportive
              environment for everyone to grow and thrive.
            </p>
          </div>

          {/* History */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">Our History</h3>
            <p>
              Established in 2010, our club began with a handful of passionate individuals and a single
              multi-purpose court. Today, we’ve grown into a full-fledged sports organization with hundreds
              of members, state-of-the-art infrastructure, and a calendar full of exciting events.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-10">Our Mission</h3>
            <p>
              To promote a healthy and active lifestyle through quality sports programs, inclusive activities,
              and community-driven values. We aim to nurture talent, foster teamwork, and create memorable
              sporting experiences for all ages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
