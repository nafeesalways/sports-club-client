import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';
import { AuthContext } from '../../../contexts/AuthContext';
import { use } from 'react';

const COLORS = ['#FACC15', '#22C55E', '#3B82F6']; // yellow, green, blue

const BookingStatusPieChart = () => {
  const axiosSecure = UseAxiosSecure();
  const {user} = use(AuthContext);

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ['booking-status-count'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/status-count?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Booking Status Pie Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusCounts}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry.status} (${entry.count})`}
          >
            {statusCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingStatusPieChart;
