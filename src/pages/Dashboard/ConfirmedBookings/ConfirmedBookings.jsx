import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import {
  FaCalendarCheck,
  FaWarehouse,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ConfirmedBookings = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["confirmed-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/confirmed-bookings?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <MdVerified className="text-2xl sm:text-3xl" />
            Confirmed Bookings
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Your paid and confirmed court reservations
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Confirmed Bookings
              </h3>
              <p className="text-gray-400 mb-6">
                You don't have any confirmed bookings yet. Complete payment for
                approved bookings to see them here.
              </p>
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/approvedBookings")
                }
                className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg"
              >
                View Approved Bookings
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-green-500/20 overflow-hidden hover:border-green-500/40 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 px-6 py-4 border-b border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-green-400 font-bold text-sm uppercase tracking-wide">
                        Confirmed & Paid
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ID: {booking._id.slice(-6)}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Court Name */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <FaWarehouse className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Court Name</p>
                      <p className="text-white font-bold text-lg">
                        {booking.courtName}
                      </p>
                    </div>
                  </div>

                  {/* Slot Info */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <FaClock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Time Slot</p>
                      <p className="text-white font-semibold">
                        {Array.isArray(booking.slots)
                          ? booking.slots.join(", ")
                          : booking.slots}
                      </p>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-400/10 rounded-lg">
                      <FaCalendarAlt className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Booking Date</p>
                      <p className="text-white font-semibold">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                 

                  {/* Transaction ID (if available) */}
                  {booking.transactionId && (
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">
                        Transaction ID
                      </p>
                      <p className="text-white font-mono text-xs break-all">
                        {booking.transactionId}
                      </p>
                    </div>
                  )}

                  {/* Confirmation Badge */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 text-sm font-semibold">
                          Payment Confirmed
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Your booking is confirmed and ready to use
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Booking Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-400 mb-1">
                  {bookings.length}
                </p>
                <p className="text-xs text-gray-400">Total Bookings</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-400 mb-1">
                  {bookings.reduce(
                    (total, b) =>
                      total + (Array.isArray(b.slots) ? b.slots.length : 1),
                    0
                  )}
                </p>
                <p className="text-xs text-gray-400">Total Slots</p>
              </div>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmedBookings;
