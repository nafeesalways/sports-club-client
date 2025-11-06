import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../Loader/Loader';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaUsers, FaUserFriends, FaWarehouse, FaChartLine, FaCrown, FaEnvelope, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings, MdVerified } from 'react-icons/md';

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // Fetch counts (users, members, courts)
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <MdAdminPanelSettings className="text-2xl sm:text-3xl" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Monitor and manage your sports club platform
          </p>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden mb-8">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-red-500/20 via-yellow-400/20 to-red-500/20 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDg0LCA4NCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src={user?.photoURL || 'https://i.ibb.co/5vQ5cGV/default-user.png'}
                  alt="Admin"
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-900 shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1.5 border-2 border-gray-900">
                  <FaCrown className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Admin Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {user?.displayName || 'Admin User'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-3">
                  {user?.email}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-semibold">
                    <MdAdminPanelSettings className="w-4 h-4" />
                    Administrator
                  </span>
                  {user?.emailVerified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
                      <MdVerified className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold">
                    <FaCrown className="w-3 h-3" />
                    Full Access
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent my-6"></div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/10 rounded-lg">
                    <FaUser className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Full Name</p>
                    <p className="text-white font-semibold truncate">
                      {user?.displayName || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/10 rounded-lg">
                    <FaEnvelope className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Email Address</p>
                    <p className="text-white font-semibold truncate">
                      {user?.email || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FaChartLine className="text-yellow-400" />
            Platform Statistics
          </h2>
          <p className="text-gray-400 text-sm">
            Overview of your platform's key metrics and user base
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl shadow-xl border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <FaUsers className="w-8 h-8 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                ALL USERS
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-black text-blue-400 mb-2">
              {stats.totalUsers || 0}
            </p>
            <p className="text-gray-400 text-sm font-medium">
              Registered Users
            </p>
          </div>

          {/* Total Members */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl shadow-xl border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <FaUserFriends className="w-8 h-8 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                MEMBERS
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-black text-green-400 mb-2">
              {stats.totalMembers || 0}
            </p>
            <p className="text-gray-400 text-sm font-medium">
              Premium Members
            </p>
          </div>

          {/* Total Courts */}
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-xl shadow-xl border border-yellow-400/20 p-6 hover:border-yellow-400/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <FaWarehouse className="w-8 h-8 text-yellow-400" />
              </div>
              <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                COURTS
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-black text-yellow-400 mb-2">
              {stats.totalCourts || 0}
            </p>
            <p className="text-gray-400 text-sm font-medium">
              Available Courts
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-400/10 rounded-lg">
              <FaChartLine className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Platform Performance
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your sports club platform is performing well. Monitor these key metrics to ensure optimal user experience and facility management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
