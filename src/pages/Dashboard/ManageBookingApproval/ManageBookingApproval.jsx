import { useQuery, useMutation } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaClock, FaDollarSign, FaWarehouse } from 'react-icons/fa';
import { MdPending, MdCheckCircle, MdCancel } from 'react-icons/md';
import Loader from '../../../Loader/Loader';

const ManageBookingApproval = () => {
  const axiosSecure = UseAxiosSecure();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Get pending bookings
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingBookingsAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/bookings/pending');
      return res.data;
    }
  });

  // Approve booking
  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/bookings/approve/${id}`),
    onSuccess: () => {
      setMessage('Booking approved successfully! User promoted to member.');
      setError('');
      refetch();
      setTimeout(() => setMessage(''), 3000);
    },
    onError: () => {
      setError('Failed to approve booking. Please try again.');
      setMessage('');
      setTimeout(() => setError(''), 3000);
    }
  });

  // Reject booking
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/bookings/${id}`),
    onSuccess: () => {
      setMessage('Booking rejected and removed successfully.');
      setError('');
      refetch();
      setTimeout(() => setMessage(''), 3000);
    },
    onError: () => {
      setError('Failed to reject booking. Please try again.');
      setMessage('');
      setTimeout(() => setError(''), 3000);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <MdPending className="text-2xl sm:text-3xl" />
            Booking Approvals
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Review and approve or reject pending court bookings
          </p>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
            <MdCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <p className="text-green-400 font-semibold">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
            <MdCancel className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <MdCheckCircle className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">All Clear!</h3>
              <p className="text-gray-400">
                There are no pending bookings requiring approval at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <MdPending className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {booking.courtName}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold mt-1">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                          Pending Approval
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Court Name */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <FaWarehouse className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">Court</p>
                          <p className="text-white font-semibold truncate">
                            {booking.courtName}
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
                          <p className="text-xs text-gray-400 mb-1">Date</p>
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
                          <p className="text-xs text-gray-400 mb-1">Amount</p>
                          <p className="text-white font-bold text-xl">
                            ${booking.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => approveMutation.mutate(booking._id)}
                      disabled={approveMutation.isPending}
                      className="flex-1 btn bg-green-500 hover:bg-green-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {approveMutation.isPending ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Approving...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="w-5 h-5" />
                          Approve Booking
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => rejectMutation.mutate(booking._id)}
                      disabled={rejectMutation.isPending}
                      className="flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {rejectMutation.isPending ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Rejecting...
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="w-5 h-5" />
                          Reject Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManageBookingApproval;
