import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import club1 from "../../../assets/basketball-court.jpg";
import club2 from "../../../assets/indoors-tennis-court.jpg";
import club3 from "../../../assets/tennis-court-seen-from-air.jpg";
import events from "../../../assets/events.jpg";
import { Link } from "react-router";
import { FaPlay, FaArrowRight, FaTrophy } from "react-icons/fa";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: club1,
      badge: "WELCOME",
      heading: "Build Your Legacy",
      title: "Champion Sports Club",
      description:
        "Join the community where champions are made. Experience world-class facilities, expert coaching, and a supportive environment designed to help you reach your peak performance.",
    },
    {
      id: 2,
      image: club2,
      badge: "FEATURED",
      heading: "Train Like a Pro",
      title: "Premium Courts & Facilities",
      description:
        "Access state-of-the-art courts and training grounds designed by professionals for professionals. Every detail crafted to elevate your game to the next level.",
    },
    {
      id: 3,
      image: club3,
      badge: "POPULAR",
      heading: "Stay Active, Stay Healthy",
      title: "Diverse Fitness Programs",
      description:
        "From yoga to strength training, football to swimming - discover a wide range of activities tailored for all ages and fitness levels. Your journey to wellness starts here.",
    },
    {
      id: 4,
      image: events,
      badge: "LIVE",
      heading: "Compete & Connect",
      title: "Exciting Events & Tournaments",
      description:
        "Participate in thrilling sports events, workshops, and inter-club competitions. Connect with fellow athletes and showcase your skills on the big stage.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const slideUpVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={6000}
        transitionTime={800}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
        className="banner-carousel"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            {/* Image Container */}
            <div className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] xl:h-[800px]">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.15, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />

              {/* Overlay Gradients */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />

              {/* Dot Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10">
              <div className="h-full flex items-center">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <motion.div
                    className="max-w-4xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Badge */}
                    <motion.div
                      className="inline-block mb-4 sm:mb-5"
                      variants={badgeVariants}
                    >
                      <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-yellow-400/15 border border-yellow-400/30 backdrop-blur-md rounded-full">
                        <FaTrophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                          {slide.badge}
                        </span>
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      </div>
                    </motion.div>

                    {/* Heading (Small text above title) */}
                    <motion.p
                      className="text-yellow-400 text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 tracking-wide uppercase"
                      variants={slideUpVariants}
                    >
                      {slide.heading}
                    </motion.p>

                    {/* Main Title */}
                    <motion.h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4 sm:mb-5 md:mb-6"
                      variants={slideUpVariants}
                      style={{
                        textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl"
                      variants={slideUpVariants}
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      className="flex justify-center sm:justify-start mb-8 sm:mb-10 md:mb-12"
                      variants={containerVariants}
                    >
                      <motion.div
                        variants={buttonVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={"/blogs"}
                          className=" flex  justify-center gap-2 sm:gap-3 w-full sm:w-auto btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-xl shadow-2xl transition-all duration-300"
                        >
                          <FaPlay className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          Explore More
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                      className="flex flex-wrap gap-6 sm:gap-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      {/* Stat 1 */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center border border-yellow-400/30">
                          <span className="text-yellow-400 font-black text-base sm:text-xl">
                            12
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-xs sm:text-sm">
                            Premium Courts
                          </p>
                          <p className="text-gray-400 text-xs">Available Now</p>
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-400/20 backdrop-blur-sm flex items-center justify-center border border-green-400/30">
                          <span className="text-green-400 font-black text-base sm:text-xl">
                            500+
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-xs sm:text-sm">
                            Active Members
                          </p>
                          <p className="text-gray-400 text-xs">Join Today</p>
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400/20 backdrop-blur-sm flex items-center justify-center border border-blue-400/30">
                          <span className="text-blue-400 font-black text-base sm:text-xl">
                            15+
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-xs sm:text-sm">
                            Sports Activities
                          </p>
                          <p className="text-gray-400 text-xs">For All Ages</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Carousel Styles */}
      <style jsx>{`
        :global(.banner-carousel .control-dots) {
          bottom: 20px;
          margin-bottom: 0;
          z-index: 20;
        }

        :global(.banner-carousel .control-dots .dot) {
          background: rgba(255, 255, 255, 0.3);
          width: 32px;
          height: 3px;
          border-radius: 2px;
          margin: 0 5px;
          box-shadow: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(4px);
        }

        :global(.banner-carousel .control-dots .dot.selected) {
          background: #facc15;
          width: 48px;
          box-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
        }

        :global(.banner-carousel .control-dots .dot:hover) {
          background: rgba(250, 204, 21, 0.7);
        }

        :global(.banner-carousel .control-arrow) {
          opacity: 0;
          transition: all 0.4s ease;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }

        :global(.banner-carousel:hover .control-arrow) {
          opacity: 0.8;
        }

        :global(.banner-carousel .control-arrow:hover) {
          opacity: 1;
          background: rgba(250, 204, 21, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        :global(.banner-carousel .control-arrow.control-prev) {
          left: 20px;
        }

        :global(.banner-carousel .control-arrow.control-next) {
          right: 20px;
        }

        :global(.banner-carousel .control-arrow::before) {
          border-color: #facc15;
          border-width: 0 3px 3px 0;
        }

        @media (max-width: 768px) {
          :global(.banner-carousel .control-arrow) {
            display: none;
          }

          :global(.banner-carousel .control-dots) {
            bottom: 15px;
          }

          :global(.banner-carousel .control-dots .dot) {
            width: 20px;
            height: 3px;
            margin: 0 3px;
          }

          :global(.banner-carousel .control-dots .dot.selected) {
            width: 32px;
          }
        }

        :global(.banner-carousel .slide) {
          background: transparent;
        }
      `}</style>
    </section>
  );
};

export default Banner;
