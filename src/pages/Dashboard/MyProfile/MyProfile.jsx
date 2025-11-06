import { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaShieldAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const MyProfile = () => {
  const { user } = use(AuthContext);
  const registrationDate = user?.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  const lastSignInDate = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaUser className="text-2xl sm:text-3xl" />
            My Profile
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Manage your account information and settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
          {/* Cover Background */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTAsIDIwNCwgMjEsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 sm:px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src={user?.photoURL || 'https://i.ibb.co/5vQ5cGV/default-user.png'}
                  alt={user?.displayName || 'User'}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-900 shadow-2xl"
                />
                {user?.emailVerified && (
                  <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1.5 border-2 border-gray-900">
                    <MdVerified className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {user?.displayName || 'User Name'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-3">
                  {user?.email}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                 
                  {user?.emailVerified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
                      <MdVerified className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

            
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent my-8"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <FaUser className="w-5 h-5" />
                  Personal Information
                </h3>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/30 transition-colors">
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

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/30 transition-colors">
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

              {/* Account Activity */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="w-5 h-5" />
                  Account Activity
                </h3>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-400/10 rounded-lg">
                      <FaCalendarAlt className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Member Since</p>
                      <p className="text-white font-semibold">
                        {registrationDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-400/10 rounded-lg">
                      <FaCalendarAlt className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Last Sign In</p>
                      <p className="text-white font-semibold">
                        {lastSignInDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default MyProfile;
