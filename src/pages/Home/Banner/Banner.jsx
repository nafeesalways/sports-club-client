import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import club1 from '../../../assets/basketball-court.jpg';
import club2 from '../../../assets/indoors-tennis-court.jpg';
import club3 from '../../../assets/tennis-court-seen-from-air.jpg';
import events from '../../../assets/events.jpg';
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: club1,
      title: "Welcome to Our Sports Club",
      description: "Experience community, training, and elite facilities all under one roof.",
    },
    {
      id: 2,
      image: club2,
      title: "Premium Courts & Grounds",
      description: "Train like a champion on world-class turf and courts designed for every sport.",
    },
    {
      id: 3,
      image: club3,
      title: "Fun, Fitness & Activities",
      description: "Join yoga, strength training, football, cricket, swimming and much more!",
    },
    {
      id: 4,
      image: events,
      title: "Upcoming Events & Tournaments",
      description: "Stay tuned for exciting sports events, workshops and inter-club competitions.",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
        transitionTime={700}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
        className="banner-carousel"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            {/* Image Container */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
                <div className="max-w-3xl">
                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight animate-fadeInUp">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-4 sm:mb-6 md:mb-8 animate-fadeInUp animation-delay-200">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInUp animation-delay-400">
                    <Link to={'/blogs'} className="btn bg-yellow-400 mx-auto hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Explore Blogs
                    </Link>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Carousel Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        /* Custom Carousel Dot Styles */
        :global(.banner-carousel .control-dots) {
          bottom: 20px;
          margin-bottom: 0;
        }

        :global(.banner-carousel .control-dots .dot) {
          background: rgba(255, 255, 255, 0.4);
          width: 10px;
          height: 10px;
          box-shadow: none;
          transition: all 0.3s ease;
        }

        :global(.banner-carousel .control-dots .dot.selected),
        :global(.banner-carousel .control-dots .dot:hover) {
          background: #facc15;
          transform: scale(1.3);
        }

        /* Custom Arrow Styles */
        :global(.banner-carousel .control-arrow) {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        :global(.banner-carousel .control-arrow:hover) {
          opacity: 1;
          background: rgba(250, 204, 21, 0.2);
        }

        :global(.banner-carousel .control-arrow::before) {
          border-color: #facc15;
        }

        /* Hide arrows on mobile */
        @media (max-width: 640px) {
          :global(.banner-carousel .control-arrow) {
            display: none;
          }

          :global(.banner-carousel .control-dots) {
            bottom: 10px;
          }

          :global(.banner-carousel .control-dots .dot) {
            width: 8px;
            height: 8px;
          }
        }

        /* Responsive text adjustments */
        @media (max-width: 640px) {
          .animate-fadeInUp {
            animation-duration: 0.6s;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
