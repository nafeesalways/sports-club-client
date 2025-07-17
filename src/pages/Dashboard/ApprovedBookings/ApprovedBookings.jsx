import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/AuthContext';


import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';

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
    navigate('/dashboard/payment', { state: { booking } });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Bookings</h2>

      {bookings.length === 0 ? (
        <p>No approved bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Court</th>
                <th className="p-2 border">Slot</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-2 border">{booking.courtName}</td>
                  <td className="p-2 border">{booking.slot}</td>
                  <td className="p-2 border">{booking.date}</td>
                  <td className="p-2 border">${booking.price}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => cancelBooking.mutate(booking._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default ApprovedBookings;
