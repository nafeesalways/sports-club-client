import { use } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../Loader/Loader';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaCalendarAlt, FaClock, FaDollarSign, FaTrash, FaWarehouse, FaCreditCard } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import Swal from 'sweetalert2';

const ApprovedBookings = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch approved bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approved-bookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/approved-bookings?email=${user.email}`);
      return res.data;
    }
  });

  // Cancel mutation
  const cancelBooking = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/member/booking/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['approved-bookings', user?.email]);
    }
  });

  const handlePayment = (booking) => {
    navigate(`/dashboard/payment`, { state: { booking } });
  };

  const handleCancel = (bookingId, courtName) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: `Are you sure you want to cancel your approved booking for "${courtName}"? You'll need to rebook.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Keep Booking',
      background: '#1f2937',
      color: '#fff',
      iconColor: '#facc15',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking.mutate(bookingId, {
          onSuccess: () => {
            Swal.fire({
              title: 'Cancelled!',
              text: 'Your approved booking has been cancelled.',
              icon: 'success',
              confirmButtonColor: '#10b981',
              background: '#1f2937',
              color: '#fff',
            });
          },
        });
      }
    });
  };

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
            <MdCheckCircle className="text-2xl sm:text-3xl" />
            Approved Bookings
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Your approved bookings ready for payment confirmation
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <MdCheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Approved Bookings</h3>
              <p className="text-gray-400 mb-6">
                You don't have any approved bookings waiting for payment at the moment.
              </p>
              <button className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg">
                Book a Court
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
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-green-400 font-bold text-sm uppercase tracking-wide">
                        Approved - Pay Now
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">ID: {booking._id.slice(-6)}</span>
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
                      <p className="text-white font-bold text-lg">{booking.courtName}</p>
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
                        {Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}
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
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <FaDollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                      <p className="text-white font-bold text-xl">${booking.price}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <FaCreditCard className="w-4 h-4" />
                      Pay Now
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id, booking.courtName)}
                      disabled={cancelBooking.isPending}
                      className="flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {cancelBooking.isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <FaTrash className="w-4 h-4" />
                          Cancel
                        </>
                      )}
                    </button>
                  </div>

                  {/* Payment Notice */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs text-green-400 text-center">
                      ✓ Booking approved! Complete payment to confirm your reservation.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedBookings;
