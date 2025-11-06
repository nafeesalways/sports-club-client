import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import { useState, use } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import CourtBookingModal from "./CourtBookingModal";
import { AuthContext } from "../../contexts/AuthContext";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { FaTh, FaTable, FaClock, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { MdSportsHandball } from "react-icons/md";

const Courts = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card");

  const cardsPerPage = 6;
  const rowsPerPage = 10;

  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts", user?.email],
    queryFn: async () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-2 flex items-center gap-3">
                <MdSportsHandball className="text-2xl sm:text-3xl lg:text-4xl" />
                <span>Available Courts</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {courts.length} courts • {viewMode === "card" ? "Card" : "Table"} View
              </p>
            </div>

            {/* View Toggle */}
            <button
              onClick={() => setViewMode((prev) => (prev === "card" ? "table" : "card"))}
              className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              {viewMode === "card" ? <FaTable className="w-4 h-4" /> : <FaTh className="w-4 h-4" />}
              <span>Switch to {viewMode === "card" ? "Table" : "Card"} View</span>
            </button>
          </div>
        </div>

        {/* Card View */}
        {viewMode === "card" && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {paginatedCourts.map((court, index) => (
              <motion.div
                key={court._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    ${court.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Court Name */}
                  <h3 className="text-xl font-bold text-white">
                    {court.name}
                  </h3>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <FaDollarSign className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Price</p>
                        <p className="text-white font-semibold">${court.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <FaCalendarAlt className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Slots</p>
                        <p className="text-white font-semibold">{court.slot}</p>
                      </div>
                    </div>
                  </div>

                  {/* Available Times */}
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                      <FaClock className="w-3 h-3" />
                      Available Times
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {court.slots?.slice(0, 3).map((slot, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700"
                        >
                          {slot}
                        </span>
                      ))}
                      {court.slots?.length > 3 && (
                        <span className="text-xs text-yellow-400">
                          +{court.slots.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105"
                    onClick={() => handleBookNow(court)}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <motion.div 
            className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-400/20 overflow-hidden shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border-b border-yellow-400/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Court Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Available Slots
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedCourts.map((court) => (
                    <tr key={court._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={court.image}
                          alt={court.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {court.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-green-400 font-bold">
                          <FaDollarSign className="w-3 h-3" />
                          {court.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {court.slot} slots
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBookNow(court)}
                          className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-yellow-400 text-gray-900 shadow-lg scale-110"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
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
