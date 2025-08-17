import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import { useState, use } from "react";
import { useNavigate } from "react-router";

import CourtBookingModal from "./CourtBookingModal";

import { AuthContext } from "../../contexts/AuthContext";
import UseAxiosSecure from "../../hook/UseAxiosSecure";

const Courts = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"

  const cardsPerPage = 6;
  const rowsPerPage = 10;

  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const { data: courts = [] } = useQuery({
    queryKey: ["courts", user?.email],
    queryFn: async () => {
      console.log("test");
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  const handleBookNow = (court) => {
    if (!user) return navigate("/signin");
    setSelectedCourt(court);
  };

  const perPage = viewMode === "card" ? cardsPerPage : rowsPerPage;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCourts = courts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(courts.length / perPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-3xl font-bold">
          Court Sessions ({viewMode === "card" ? "Card View" : "Table View"})
        </h2>
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "card" ? "table" : "card"))
          }
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        >
          Switch to {viewMode === "card" ? "Table" : "Card"} View
        </button>
      </div>

      {/* === Card View === */}
      {viewMode === "card" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourts.map((court) => (
            <div key={court._id} className="bg-white rounded shadow p-4 border">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-yellow-600">
                {court.name}
              </h3>
              <p className="text-gray-600">Price per session: ${court.price}</p>
              <p className="text-gray-600 mb-2">
                Available Slots: {court.slot}
              </p>
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
      )}

      {/* === Table View === */}
      {viewMode === "table" && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white table-auto">
            <thead className="bg-yellow-300 text-black">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>

                <th className="py-3 px-4 text-left">Slot Times</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourts.map((court) => (
                <tr key={court._id} className="border-t">
                  <td className="py-2 px-4">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold text-yellow-600">
                    {court.name}
                  </td>
                  <td className="py-2 px-4 text-yellow-600">${court.price}</td>
                  <td className="py-2 px-4 text-yellow-600">{court.slot}</td>

                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleBookNow(court)}
                      className="bg-yellow-500 btn hover:bg-yellow-600 text-white font-semibold px-3 py-1 rounded"
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === Pagination Buttons === */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* === Booking Modal === */}
      {selectedCourt && (
        <CourtBookingModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default Courts;
