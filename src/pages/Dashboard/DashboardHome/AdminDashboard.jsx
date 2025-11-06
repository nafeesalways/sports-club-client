import { useQuery } from '@tanstack/react-query';
import { FaClock, FaCheckCircle, FaCreditCard, FaChartLine } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';
import BookingStatusPieChart from './BookingStatusPieChart';
import { AuthContext } from '../../../contexts/AuthContext';
import { use } from 'react';

const statusIcons = {
  pending: FaClock,
  approved: FaCheckCircle,
  confirmed: FaCreditCard,
};

const statusColors = {
  pending: {
    bg: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-400/20',
    iconBg: 'bg-yellow-400/20',
    iconColor: 'text-yellow-400',
    hoverBorder: 'hover:border-yellow-400/40',
  },
  approved: {
    bg: 'from-green-500/10 to-green-500/5',
    border: 'border-green-500/20',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    hoverBorder: 'hover:border-green-500/40',
  },
  confirmed: {
    bg: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
  },
};

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ['booking-status-count'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/status-count?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const totalBookings = statusCounts.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <MdDashboard className="text-2xl sm:text-3xl" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Overview of all booking statistics and analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Bookings Card */}
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 hover:border-yellow-400/40 transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-yellow-400/20 rounded-xl flex-shrink-0">
                <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Total Bookings</p>
                <p className="text-white font-black text-2xl sm:text-3xl">{totalBookings}</p>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          {statusCounts.map((item) => {
            const Icon = statusIcons[item.status.toLowerCase()] || FaClock;
            const colors = statusColors[item.status.toLowerCase()] || statusColors.pending;
            const percentage = totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(0) : 0;

            return (
              <div
                key={item.status}
                className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 ${colors.hoverBorder} transition-all duration-300`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-3 sm:p-4 ${colors.iconBg} rounded-xl flex-shrink-0`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 capitalize">{item.status}</p>
                    <p className="text-white font-black text-2xl sm:text-3xl mb-0.5">{item.count}</p>
                    <p className="text-gray-500 text-xs">{percentage}% of total</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <BookingStatusPieChart />
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {statusCounts.map((item) => {
            const Icon = statusIcons[item.status.toLowerCase()] || FaClock;
            const colors = statusColors[item.status.toLowerCase()] || statusColors.pending;
            const percentage = totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(1) : 0;

            return (
              <div
                key={`summary-${item.status}`}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700 p-6 hover:border-yellow-400/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${colors.iconBg} rounded-lg`}>
                    <Icon className={`w-5 h-5 ${colors.iconColor}`} />
                  </div>
                  <span className="text-gray-400 text-sm capitalize">{item.status}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black text-white">{item.count}</span>
                    <span className="text-xl font-bold text-gray-500">{percentage}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${colors.iconBg}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
