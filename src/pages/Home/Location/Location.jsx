import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Location = () => {
  const position = [22.3569, 91.7832]; // Chattogram coordinates

  const contactInfo = [
    {
      icon: MdLocationOn,
      label: "Address",
      value: "123 Fitness Lane, Sector 7, Chattogram, Bangladesh",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+880 1234-567890",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "info@championclub.com",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: FaClock,
      label: "Hours",
      value: "6:00 AM – 10:00 PM (Everyday)",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    },
  ];

  return (
    <section className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-3">
            <FaMapMarkerAlt className="text-2xl sm:text-3xl lg:text-4xl" />
            <span>Find Us</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Visit our state-of-the-art facility in the heart of Chattogram
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Club Name Card */}
            <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-2xl border border-yellow-400/30 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  className="w-16 h-16"
                  src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
                  alt="Champion"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-yellow-400 italic">
                    CHAMPION
                  </h3>
                  <p className="text-gray-400 text-sm">Sports Club Arena</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Your premier destination for sports and fitness excellence
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
              </div>
              <div className="p-6 space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-yellow-400/30 transition-all"
                  >
                    <div className={`p-3 ${item.bgColor} rounded-lg flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                      <p className="text-white font-semibold text-sm sm:text-base break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaDirections className="w-5 h-5" />
              Get Directions
            </a>
          </div>

          {/* Map Section */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                <h3 className="text-xl font-bold text-white">Our Location</h3>
              </div>
              <div className="relative w-full h-96 sm:h-[450px]">
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                  style={{ zIndex: 0 }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={markerIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong className="text-yellow-600">Champion Sports Club</strong>
                        <br />
                        Chattogram, Bangladesh
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Map Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-semibold mb-1 text-sm sm:text-base">Easy to Find</p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Located in the heart of Chattogram with ample parking and easy access to public transportation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 text-center hover:border-yellow-400/30 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Free Parking</h4>
            <p className="text-gray-400 text-sm">Ample parking space available for all members</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 text-center hover:border-yellow-400/30 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <FaClock className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Extended Hours</h4>
            <p className="text-gray-400 text-sm">Open 16 hours daily to fit your schedule</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 text-center hover:border-yellow-400/30 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <FaDirections className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Easy Access</h4>
            <p className="text-gray-400 text-sm">Well-connected to major roads and transit</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
