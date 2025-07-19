import { useQuery } from '@tanstack/react-query';
import { FaClock, FaCheckCircle, FaCreditCard } from 'react-icons/fa';


import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';
import BookingStatusPieChart from './BookingStatusPieChart';
import { AuthContext } from '../../../contexts/AuthContext';
import { use } from 'react';

const statusIcons = {
  pending: <FaClock className="text-yellow-500 text-3xl" />,
  approved: <FaCheckCircle className="text-green-500 text-3xl" />,
  paid: <FaCreditCard className="text-blue-500 text-3xl" />,
};

const statusColors = {
  pending: 'bg-yellow-100 border-yellow-300',
  approved: 'bg-green-100 border-green-300',
  paid: 'bg-blue-100 border-blue-300',
};

const AdminDashboard= () => {
  const axiosSecure = UseAxiosSecure();
  const {user} = use(AuthContext);

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ['booking-status-count'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/status-count?email=${user.email}`);
      return res.data;
    },
  });
  console.log(statusCounts)

  if (isLoading) return <Loader />;

  return (
    <div>
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Booking Status Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statusCounts.map((item) => (
          <div
            key={item.status}
            className={`card border ${statusColors[item.status] || 'bg-gray-100 border-gray-300'} shadow`}
          >
            <div className="card-body flex flex-row items-center gap-5">
              <div>
                {statusIcons[item.status] || <FaClock className="text-gray-500 text-3xl" />}
              </div>
              <div>
                <h2 className="card-title capitalize">{item.status}</h2>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <BookingStatusPieChart></BookingStatusPieChart>
    </div>
  );
};

export default AdminDashboard;
