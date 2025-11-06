import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { use, useState } from "react";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";
import { FaChartPie, FaChartBar, FaCalendarCheck, FaClock, FaCheckCircle, FaBan } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const COLORS = {
  pending: '#FBBF24', // Yellow
  approved: '#10B981', // Green
  confirmed: '#3B82F6', // Blue
  cancelled: '#EF4444', // Red
};

const STATUS_ICONS = {
  pending: FaClock,
  approved: FaCalendarCheck,
  confirmed: FaCheckCircle,
  cancelled: FaBan,
};

const MemberDashboard = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [chartType, setChartType] = useState('pie'); // 'pie' or 'bar'

  const { data = [], isLoading } = useQuery({
    queryKey: ['member-status-count', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/bookings/status-count?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const totalBookings = data.reduce((sum, item) => sum + item.count, 0);

  // Format data for recharts
  const chartData = data.map(item => ({
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
                <MdDashboard className="text-2xl sm:text-3xl" />
                My Dashboard
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Overview of your booking statistics
              </p>
            </div>

            {data.length > 0 && (
              <button
                onClick={() => setChartType(chartType === 'pie' ? 'bar' : 'pie')}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                {chartType === 'pie' ? <FaChartBar className="w-4 h-4" /> : <FaChartPie className="w-4 h-4" />}
                <span>{chartType === 'pie' ? "Bar Chart" : "Pie Chart"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {data.map((item) => {
            const Icon = STATUS_ICONS[item.status.toLowerCase()] || FaCalendarCheck;
            const color = COLORS[item.status.toLowerCase()] || '#6B7280';
            const percentage = totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(0) : 0;

            return (
              <div
                key={item.status}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-yellow-400/20 p-4 sm:p-6 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 sm:p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-1 capitalize">{item.status}</p>
                <p className="text-white font-bold text-2xl sm:text-3xl mb-1">{item.count}</p>
                <p className="text-gray-500 text-xs">{percentage}% of total</p>
              </div>
            );
          })}
        </div>

        {data.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaChartPie className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h3>
              <p className="text-gray-400 mb-6">
                You haven't made any bookings yet. Start by booking a court to see your statistics here.
              </p>
              <button 
                onClick={() => window.location.href = '/courts'}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg"
              >
                Book a Court
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {chartType === 'pie' ? <FaChartPie className="text-yellow-400" /> : <FaChartBar className="text-yellow-400" />}
                  Booking Status Distribution
                </h2>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={350}>
                  {chartType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
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
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              {/* Total Summary */}
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Summary</h3>
                <div className="space-y-4">
                  <div className="text-center py-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                    <p className="text-yellow-400 font-black text-4xl">{totalBookings}</p>
                  </div>

                  <div className="space-y-2">
                    {data.map((item) => {
                      const color = COLORS[item.status.toLowerCase()] || '#6B7280';
                      const percentage = totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(1) : 0;

                      return (
                        <div key={item.status} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-gray-300 text-sm capitalize">{item.status}</span>
                          </div>
                          <span className="text-white font-semibold">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => window.location.href = '/courts'}
                    className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200"
                  >
                    Book New Court
                  </button>
                  <button 
                    onClick={() => window.location.href = '/dashboard/pendingBookings'}
                    className="w-full btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200"
                  >
                    View Pending
                  </button>
                  <button 
                    onClick={() => window.location.href = '/dashboard/confirmedBookings'}
                    className="w-full btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200"
                  >
                    View Confirmed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
