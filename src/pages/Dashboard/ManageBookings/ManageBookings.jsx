import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaCalendarCheck, FaSearch, FaWarehouse, FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import Loader from '../../../Loader/Loader';

const ManageBookings = () => {
  const [search, setSearch] = useState('');
  const axiosSecure = UseAxiosSecure();
  const [input, setInput] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['confirmedBookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/confirmed?search=${search}`);
      return res.data;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(input.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaCalendarCheck className="text-2xl sm:text-3xl" />
            Confirmed Bookings
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            View and manage all confirmed court reservations
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by court name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaSearch className="w-4 h-4" />
              Search
            </button>
          </form>
          <p className="text-gray-400 text-xs mt-2">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaCalendarCheck className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Bookings Found</h3>
              <p className="text-gray-400">
                {search ? `No confirmed bookings match "${search}".` : 'There are no confirmed bookings yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 px-6 py-4 border-b border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <MdVerified className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {booking.courtName || 'N/A'}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold mt-1">
                          <MdVerified className="w-3 h-3" />
                          Confirmed
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block">
                      ID: {booking._id.slice(-8)}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Court Name */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <FaWarehouse className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">Court</p>
                          <p className="text-white font-semibold truncate">
                            {booking.courtName || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <FaClock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">Time Slots</p>
                          <p className="text-white font-semibold truncate">
                            {Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-400/10 rounded-lg">
                          <FaCalendarAlt className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-1">Booking Date</p>
                          <p className="text-white font-semibold">
                            {new Date(booking.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <FaDollarSign className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                          <p className="text-white font-bold text-xl">
                            ${booking.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {booking.userEmail && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <p className="text-xs text-gray-400">
                        Booked by: <span className="text-white font-semibold">{booking.userEmail}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
