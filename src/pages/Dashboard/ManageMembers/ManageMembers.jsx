import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaUserFriends, FaSearch, FaTrash, FaUser, FaEnvelope, FaCrown } from 'react-icons/fa';
import Loader from '../../../Loader/Loader';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  // Query to fetch members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/members?search=${search}`);
      return res.data;
    }
  });

  // Mutation to delete a member
  const deleteMutation = useMutation({
    mutationFn: (email) => axiosSecure.delete(`/admin/members/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
    }
  });

  const handleDelete = (email) => {
    Swal.fire({
      title: 'Delete Member?',
      text: "This action cannot be undone! The member will be permanently removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#fff',
      iconColor: '#facc15',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(email, {
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Member has been removed successfully.',
              icon: 'success',
              confirmButtonColor: '#10b981',
              background: '#1f2937',
              color: '#fff',
              iconColor: '#10b981',
            });
          },
          onError: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete member. Please try again.',
              icon: 'error',
              confirmButtonColor: '#ef4444',
              background: '#1f2937',
              color: '#fff',
              iconColor: '#ef4444',
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaUserFriends className="text-2xl sm:text-3xl" />
            Manage Members
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            View and manage all premium members in your sports club
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members by name or email..."
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
          </div>
          <p className="text-gray-400 text-xs mt-2">
            {members.length} member{members.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Members List */}
        {isLoading ? (
          <Loader />
        ) : members.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaUserFriends className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Members Found</h3>
              <p className="text-gray-400">
                {search ? `No members match "${search}". Try a different search term.` : 'There are no members registered yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Member Info */}
                    <div className="flex-1 flex items-center gap-4">
                      {/* Avatar Placeholder */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaUser className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-gray-900">
                          <FaCrown className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-white truncate">
                            {member.name || 'N/A'}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
                            <FaCrown className="w-3 h-3" />
                            Member
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
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-purple-500/10 rounded">
                              <FaUser className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-gray-400">Member ID</p>
                              <p className="text-white text-sm font-mono truncate">
                                {member._id.slice(-12)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(member.email)}
                      disabled={deleteMutation.isPending}
                      className="btn bg-red-500 hover:bg-red-600 text-white border-none font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      {deleteMutation.isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
