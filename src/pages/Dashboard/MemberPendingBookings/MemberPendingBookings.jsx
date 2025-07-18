import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import Loader from '../../../Loader/Loader';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { AuthContext } from '../../../contexts/AuthContext';

const MemberPendingBookings = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending bookings of the logged-in member
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['pending-bookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/pending-bookings?email=${user.email}`);
      return res.data;
    }
  });

  // Cancel mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId) => {
      const res = await axiosSecure.delete(`/member/booking/${bookingId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-bookings', user?.email]);
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>

      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Court</th>
                <th className="p-2 border">Slot</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-2 border">{booking.courtName}</td>
                  <td className="p-2 border">{booking.slots}</td>
                  <td className="p-2 border">{booking.date}</td>
                  <td className="p-2 border">${booking.price}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => cancelBookingMutation.mutate(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberPendingBookings;
