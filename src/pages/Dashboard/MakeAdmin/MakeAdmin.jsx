import { use, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaUserShield, FaSearch, FaUserCog, FaCalendarAlt, FaEnvelope, FaCrown, FaUserMinus } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const MakeAdmin = () => {
  const { user } = use(AuthContext);
  const [searchEmail, setSearchEmail] = useState("");
  const [message, setMessage] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      setSearchedUsers(res.data);
      setSearchEmail("");
    } catch (error) {
      console.log(error)
      setMessage("User not found or error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Mutation to toggle role
  const toggleRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      return res.data;
    },
    onSuccess: (data, variables) => {
      setMessage(`Role successfully changed to ${variables.role}`);
      handleSearch();
    },
    onError: () => {
      setMessage("Failed to change role. Please try again.");
    }
  });

  const handleRoleChange = (newRole, email) => {
    toggleRoleMutation.mutate({ email, role: newRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaUserShield className="text-2xl sm:text-3xl" />
            Manage Admins
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Search for users and manage their administrative privileges
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Enter user email address"
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !searchEmail}
              className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <FaSearch className="w-4 h-4" />
                  Search User
                </>
              )}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg border ${
              message.includes('successfully') 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <p className="text-sm font-semibold">{message}</p>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchedUsers.length > 0 ? (
          <div className="space-y-4">
            {searchedUsers.map((searchedUser) => (
              <div
                key={searchedUser._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* User Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        searchedUser.role === 'admin' 
                          ? 'bg-red-500/20' 
                          : searchedUser.role === 'member' 
                          ? 'bg-blue-500/20' 
                          : 'bg-gray-500/20'
                      }`}>
                        {searchedUser.role === 'admin' ? (
                          <MdAdminPanelSettings className="w-6 h-6 text-red-400" />
                        ) : (
                          <FaUserCog className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {searchedUser.email}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          searchedUser.role === 'admin'
                            ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                            : searchedUser.role === 'member'
                            ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                            : 'bg-gray-500/10 border border-gray-500/30 text-gray-400'
                        }`}>
                          {searchedUser.role === 'admin' && <FaCrown className="w-3 h-3" />}
                          {searchedUser.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-400/10 rounded-lg">
                        <FaEnvelope className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Email Address</p>
                        <p className="text-white font-semibold truncate">{searchedUser.email}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <FaUserShield className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Current Role</p>
                        <p className="text-white font-bold uppercase">{searchedUser.role}</p>
                      </div>
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <FaCalendarAlt className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Member Since</p>
                        <p className="text-white font-semibold">
                          {new Date(searchedUser.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* User ID */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <FaUserCog className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">User ID</p>
                        <p className="text-white font-mono text-sm truncate">{searchedUser._id.slice(-12)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {searchedUser.role !== "admin" ? (
                      <button
                        onClick={() => handleRoleChange("admin", searchedUser.email)}
                        disabled={toggleRoleMutation.isPending}
                        className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {toggleRoleMutation.isPending ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaCrown className="w-4 h-4" />
                            Promote to Admin
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange("user", searchedUser.email)}
                        disabled={toggleRoleMutation.isPending}
                        className="flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {toggleRoleMutation.isPending ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaUserMinus className="w-4 h-4" />
                            Remove Admin Privileges
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && searchedUsers.length === 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaSearch className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Search for Users</h3>
              <p className="text-gray-400">
                Enter an email address above to search for users and manage their roles.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
