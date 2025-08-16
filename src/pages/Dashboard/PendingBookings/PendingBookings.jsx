import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';

const PendingBookings = () => {
    const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  // Fetch bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['pendingBookings', user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/bookings?email=${user.email}&status=pending`);
        return res.data;
    },
    enabled: !!user?.email
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
  const res = await axiosSecure.delete(`/bookings/${id}`);
  return res.data;
},
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingBookings', user.email]);
    },
    onError: (error) => {
      console.error('Cancel failed:', error);
    }
  });

  const handleCancel = (id) => {
    cancelMutation.mutate(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>

      {isLoading ? (
       <Loader></Loader>
      ) : bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <div className="grid gap-4">
          {bookings?.map(booking => (
            <div key={booking._id} className="border rounded p-4 shadow">
              <p><strong>Slot:</strong> {booking.slots}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Price:</strong> ${booking.price}</p>
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-2 btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
