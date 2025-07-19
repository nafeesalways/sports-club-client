// src/components/LocationSection.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Optional custom icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Location = () => {
  const position = [22.3569, 91.7832]; // Example: Chattogram coordinates

  return (
    <section className="w-full px-6 md:px-16 py-12 bg-gray-100 text-gray-800 mb-10 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow-400">
        Club Location
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Address Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-400">Main Clubhouse</h3>
          <p>🏟️ Sports Club Arena</p>
          <p>📍 123 Fitness Lane, Sector 7, Chattogram, Bangladesh</p>
          <p>📞 +880 1234-567890</p>
          <p>✉️ info@championclub.com</p>
          <p className="text-sm text-gray-600">Open: 6:00 AM – 10:00 PM (Everyday)</p>
        </div>

        {/* Map */}
        <div className="w-full h-80 rounded-xl overflow-hidden">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>
                Sports Club Arena <br /> Chattogram, BD
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Location;
