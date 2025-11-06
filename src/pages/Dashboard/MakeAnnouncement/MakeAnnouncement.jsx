import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';
import Loader from '../../../Loader/Loader';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const [form, setForm] = useState({ title: '', message: '' });
  const axiosSecure = UseAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  const queryClient = useQueryClient();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcementsAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/announcements');
      return res.data;
    }
  });

  const addOrUpdateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return id
        ? axiosSecure.patch(`/admin/announcements/${id}`, data)
        : axiosSecure.post('/admin/announcements', data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['announcementsAdmin']);
      setForm({ title: '', message: '' });
      setEditingId(null);
      Swal.fire({
        title: variables.id ? 'Updated!' : 'Published!',
        text: variables.id ? 'Announcement updated successfully.' : 'Announcement published successfully.',
        icon: 'success',
        confirmButtonColor: '#10b981',
        background: '#1f2937',
        color: '#fff',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/announcements/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['announcementsAdmin'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateMutation.mutate({ id: editingId, data: form });
  };

  const handleEdit = (announcement) => {
    setForm({ title: announcement.title, message: announcement.message });
    setEditingId(announcement._id);
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Delete Announcement?',
      text: `Are you sure you want to delete "${title}"? This action cannot be undone!`,
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
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Announcement has been removed successfully.',
              icon: 'success',
              confirmButtonColor: '#10b981',
              background: '#1f2937',
              color: '#fff',
            });
          },
        });
      }
    });
  };

  const handleCancel = () => {
    setForm({ title: '', message: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaBullhorn className="text-2xl sm:text-3xl" />
            Make Announcements
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Create and manage announcements for all club members
          </p>
        </div>

        {/* Announcement Form */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {editingId ? (
              <>
                <FaEdit className="text-yellow-400" />
                Edit Announcement
              </>
            ) : (
              <>
                <FaPlus className="text-yellow-400" />
                New Announcement
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Announcement Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Important: Facility Maintenance Schedule"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                rows={5}
                placeholder="Write your announcement message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                {editingId ? (
                  <>
                    <FaEdit className="w-4 h-4" />
                    Update Announcement
                  </>
                ) : (
                  <>
                    <FaBullhorn className="w-4 h-4" />
                    Publish Announcement
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Announcements List */}
        {isLoading ? (
          <Loader />
        ) : announcements.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <MdAnnouncement className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Announcements Yet</h3>
              <p className="text-gray-400">
                Create your first announcement to notify all club members.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MdAnnouncement className="text-yellow-400" />
              Published Announcements ({announcements.length})
            </h2>

            {announcements.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group"
              >
                {/* Announcement Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-yellow-400/20 rounded-lg flex-shrink-0">
                        <FaBullhorn className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0 ml-4">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {/* Announcement Body */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0 mt-1">
                      <FaInfoCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-base leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-700/50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.title)}
                      className="flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
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

export default MakeAnnouncement;
