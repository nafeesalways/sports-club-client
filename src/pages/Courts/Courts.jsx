import { useQuery } from "@tanstack/react-query";


import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";
import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CourtBookingModal from "./CourtBookingModal";
import UseAxiosSecure from "../../hook/UseAxiosSecure";

const CourtsPage = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const handleBookNow = (court) => {
    if (!user) return navigate("/signin");
    setSelectedCourt(court);
  };

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/courts");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Courts & Sessions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="bg-white rounded shadow p-4 border">
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{court.name}</h3>
            <p className="text-gray-600">Price per session: ${court.price}</p>
            <p className="text-gray-600 mb-2">Available Slots:{court.slot}</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 mb-4">
              {court.slots?.map((slot, i) => (
                <li key={i}>{slot}</li>
              ))}
            </ul>
            <button
              className="bg-yellow-500 btn hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full"
              onClick={() => handleBookNow(court)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedCourt && (
        <CourtBookingModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default CourtsPage;
