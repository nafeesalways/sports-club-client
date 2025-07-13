import { use } from "react";

import { useNavigate } from "react-router";
import { useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import BookingModal from "./BookingModal";

const Courts = ({ courts }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleBookNow = (court) => {
    if (!user) {
      navigate("/signin");
    } else {
      setSelectedCourt(court);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courts?.map((court) => (
        <div key={court.id} className="card shadow-lg border p-4 rounded">
          <img src={court.image} className="rounded mb-3 h-48 w-full object-cover" alt={court.type} />
          <h2 className="text-xl font-bold">{court.type}</h2>
          <p className="text-gray-600">Price per session: ${court.price}</p>
          <select className="select w-full mt-2">
            {court.slots.map((slot, i) => (
              <option key={i}>{slot}</option>
            ))}
          </select>
          <button
            onClick={() => handleBookNow(court)}
            className="btn bg-yellow-400 w-full mt-3"
          >
            Book Now
          </button>
        </div>
      ))}

      {selectedCourt && (
        <BookingModal court={selectedCourt} setSelectedCourt={setSelectedCourt} />
      )}
    </div>
  );
};

export default Courts;
