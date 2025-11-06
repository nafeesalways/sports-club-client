import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';
import { AuthContext } from '../../../contexts/AuthContext';
import { use, useState } from 'react';
import { FaChartPie, FaChartBar, FaClock, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';

const COLORS = {
  pending: '#FACC15', // Yellow
  approved: '#22C55E', // Green
  confirmed: '#3B82F6', // Blue
};

const STATUS_ICONS = {
  pending: FaClock,
  approved: FaCalendarCheck,
  confirmed: FaCheckCircle,
};

const BookingStatusPieChart = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
  const [chartType, setChartType] = useState('pie');

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ['booking-status-count'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/status-count?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const totalBookings = statusCounts.reduce((sum, item) => sum + item.count, 0);

  // Format data for charts
  const chartData = statusCounts.map(item => ({
    ...item,
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    fill: COLORS[item.status.toLowerCase()] || '#6B7280'
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 border border-yellow-400/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-1">{data.name}</p>
          <p className="text-gray-300 text-sm">
            Count: <span className="text-yellow-400 font-bold">{data.value}</span>
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {((data.value / totalBookings) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-4 sm:px-6 py-4 border-b border-yellow-400/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            {chartType === 'pie' ? <FaChartPie className="text-yellow-400" /> : <FaChartBar className="text-yellow-400" />}
            Booking Status Overview
          </h2>
          <button
            onClick={() => setChartType(chartType === 'pie' ? 'bar' : 'pie')}
            className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            {chartType === 'pie' ? <FaChartBar className="w-4 h-4" /> : <FaChartPie className="w-4 h-4" />}
            <span>{chartType === 'pie' ? "Bar Chart" : "Pie Chart"}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 p-4 sm:p-6 border-b border-gray-700">
        {statusCounts.map((item) => {
          const Icon = STATUS_ICONS[item.status.toLowerCase()] || FaCheckCircle;
          const color = COLORS[item.status.toLowerCase()] || '#6B7280';
          const percentage = totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(0) : 0;

          return (
            <div
              key={item.status}
              className="bg-gray-900/50 rounded-lg border border-gray-700 p-3 sm:p-4 hover:border-yellow-400/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 sm:p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color }} />
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-1 capitalize">{item.status}</p>
              <p className="text-white font-bold text-xl sm:text-2xl mb-0.5">{item.count}</p>
              <p className="text-gray-500 text-xs">{percentage}%</p>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="p-4 sm:p-6">
        {statusCounts.length === 0 ? (
          <div className="text-center py-12">
            <FaChartPie className="w-16 h-16 text-yellow-400/30 mx-auto mb-4" />
            <p className="text-gray-400">No booking data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label={({ status, count, percent }) => 
                    `${status}: ${count} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                  iconType="circle"
                />
              </PieChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="status" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
          <p className="text-yellow-400 font-black text-3xl">{totalBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingStatusPieChart;
