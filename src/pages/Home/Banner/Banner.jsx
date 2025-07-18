// src/components/FancyBanner.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import club1 from '../../../assets/basketball-court.jpg'
import club2 from '../../../assets/indoors-tennis-court.jpg'
import club3 from '../../../assets/tennis-court-seen-from-air.jpg'
import events from '../../../assets/events.jpg'

const Banner = () => {
  return (
     <div className="w-[70vw] h-[70vh] mx-auto mt-10 shadow-2xl rounded-2xl overflow-hidden relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={600}
      >
        {/* Slide 1 - Club */}
        <div className="relative">
          <img src={club1} alt="Club" className="object-cover w-full h-[70vh]" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-4 text-white text-left">
            <h2 className="text-3xl font-bold">Welcome to Our Sports Club</h2>
            <p className="mt-2 text-lg">Experience community, training, and elite facilities all under one roof.</p>
          </div>
        </div>

        {/* Slide 2 - Courts */}
        <div className="relative">
          <img src={club2} alt="Courts" className="object-cover w-full h-[70vh]" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-1 text-white text-left">
            <h2 className="text-3xl font-bold">Premium Courts & Grounds</h2>
            <p className="mt-2 text-lg">Train like a champion on world-class turf and courts designed for every sport.</p>
          </div>
        </div>

        {/* Slide 3 - Activities */}
        <div className="relative">
          <img src={club3} alt="Activities" className="object-cover w-full h-[70vh]" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-2 text-white text-left">
            <h2 className="text-3xl font-bold">Fun, Fitness & Activities</h2>
            <p className="mt-2 text-lg">Join yoga, strength training, football, cricket, swimming and much more!</p>
          </div>
        </div>

        {/* Slide 4 - Events */}
        <div className="relative">
          <img src={events} alt="Events" className="object-cover w-full h-[70vh]" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-1 text-white text-left">
            <h2 className="text-3xl font-bold">Upcoming Events & Tournaments</h2>
            <p className="mt-2 text-lg">Stay tuned for exciting sports events, workshops and inter-club competitions.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
