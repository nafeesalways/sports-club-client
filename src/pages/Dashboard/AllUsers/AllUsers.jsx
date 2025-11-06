import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaUsers, FaSearch, FaEnvelope, FaShieldAlt, FaUser, FaCrown, FaUserTie } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Loader from '../../../Loader/Loader';

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['allUsers', searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users?search=${searchTerm}`);
      return res.data;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  // Get role badge configuration
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Admin',
          icon: <MdAdminPanelSettings className="w-4 h-4" />,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
        };
      case 'member':
        return {
          label: 'Member',
          icon: <FaUserTie className="w-4 h-4" />,
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400',
        };
      default:
        return {
          label: 'User',
          icon: <FaUser className="w-4 h-4" />,
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          textColor: 'text-gray-400',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaUsers className="text-2xl sm:text-3xl" />
            All Users
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            View and search all registered users in the system
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaSearch className="w-4 h-4" />
              Search
            </button>
          </form>
          <p className="text-gray-400 text-xs mt-2">
            {users.length} user{users.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Users List */}
        {isLoading ? (
          <Loader />
        ) : users.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaUsers className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Users Found</h3>
              <p className="text-gray-400">
                {searchTerm ? `No users match "${searchTerm}". Try a different search term.` : 'There are no users registered yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1">
            {users.map((user) => {
              const roleBadge = getRoleBadge(user.role);
              
              return (
                <div
                  key={user._id}
                  className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* User Avatar & Info */}
                      <div className="flex-1 flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                            user.role === 'admin'
                              ? 'bg-gradient-to-br from-red-500 to-red-600'
                              : user.role === 'member'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                              : 'bg-gradient-to-br from-gray-500 to-gray-600'
                          }`}>
                            <FaUser className="w-6 h-6 text-white" />
                          </div>
                          {user.role !== 'user' && (
                            <div className={`absolute -bottom-1 -right-1 rounded-full p-1 border-2 border-gray-900 ${
                              user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                            }`}>
                              {user.role === 'admin' ? (
                                <FaCrown className="w-3 h-3 text-white" />
                              ) : (
                                <FaCrown className="w-3 h-3 text-white" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="text-lg font-bold text-white truncate">
                              {user.name || user.email.split('@')[0]}
                            </h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${roleBadge.bgColor} border ${roleBadge.borderColor} rounded-full ${roleBadge.textColor} text-xs font-semibold`}>
                              {roleBadge.icon}
                              {roleBadge.label}
                            </span>
                          </div>

                          {/* Email and ID Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-yellow-400/10 rounded">
                                <FaEnvelope className="w-4 h-4 text-yellow-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-white text-sm font-semibold truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-purple-500/10 rounded">
                                <FaShieldAlt className="w-4 h-4 text-purple-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-400">User ID</p>
                                <p className="text-white text-sm font-mono truncate">
                                  {user._id.slice(-12)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
