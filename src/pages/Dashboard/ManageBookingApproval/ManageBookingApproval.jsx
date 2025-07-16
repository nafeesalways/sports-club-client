import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const ManageBookingApproval = () => {
  const queryClient = useQueryClient();
  const axiosSecure=UseAxiosSecure();

  // Get pending bookings
  const { data: bookings = [], isLoading } = useQuery({
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
      queryClient.invalidateQueries(['pendingBookingsAdmin']);
    }
  });

  // Reject booking
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingBookingsAdmin']);
    }
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Booking Approvals</h2>

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
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Slot:</strong> {booking.slot}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Price:</strong> ${booking.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => approveMutation.mutate(booking._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectMutation.mutate(booking._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
