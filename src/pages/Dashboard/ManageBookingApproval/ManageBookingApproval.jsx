import { useQuery, useMutation } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { useState } from 'react';

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
      setMessage('Booking approved & user promoted to member!');
      setError('');
      refetch();
    },
    onError: () => {
      setError('Failed to approve booking');
      setMessage('');
    }
  });

  // Reject booking
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/bookings/${id}`),
    onSuccess: () => {
      setMessage('Booking rejected and removed.');
      setError('');
      refetch();
    },
    onError: () => {
      setError('Failed to reject booking');
      setMessage('');
    }
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Booking Approvals</h2>

      {/* Feedback Messages */}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded p-4 shadow bg-white flex justify-between items-center"
            >
              <div>
                <p><strong>Court Name:</strong> {booking.courtName}</p>
                <p><strong>Slots:</strong> {Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Price:</strong> ${booking.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => approveMutation.mutate(booking._id)}
                  className="bg-green-600 btn text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectMutation.mutate(booking._id)}
                  className="bg-red-600 text-white btn px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookingApproval;
