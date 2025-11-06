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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-2 sm:gap-3 flex-wrap">
            <FaBullhorn className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0" />
            <span className="break-words">Make Announcements</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
            Create and manage announcements for all club members
          </p>
        </div>

        {/* Announcement Form */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
            {editingId ? (
              <>
                <FaEdit className="text-yellow-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="break-words">Edit Announcement</span>
              </>
            ) : (
              <>
                <FaPlus className="text-yellow-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="break-words">New Announcement</span>
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Facility Maintenance"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={addOrUpdateMutation.isPending}
                className="w-full sm:flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 sm:py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addOrUpdateMutation.isPending ? (
                  <span>Processing...</span>
                ) : editingId ? (
                  <>
                    <FaEdit className="w-4 h-4 flex-shrink-0" />
                    <span>Update</span>
                  </>
                ) : (
                  <>
                    <FaBullhorn className="w-4 h-4 flex-shrink-0" />
                    <span>Publish</span>
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-3 px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Announcements List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <MdAnnouncement className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Announcements Yet</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Create your first announcement to notify all club members.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-4 flex items-center gap-2 flex-wrap">
              <MdAnnouncement className="text-yellow-400 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="break-words">Published ({announcements.length})</span>
            </h2>

            {announcements.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-yellow-400/20">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-yellow-400/20 rounded-lg flex-shrink-0 mt-0.5">
                        <FaBullhorn className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      </div>
                      <h3 className="flex-1 text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors break-words leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 pl-9 sm:pl-11">
                      <FaCalendarAlt className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg flex-shrink-0 mt-0.5">
                      <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-full sm:flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaEdit className="w-4 h-4 flex-shrink-0" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.title)}
                      className="w-full sm:flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaTrash className="w-4 h-4 flex-shrink-0" />
                      <span>Delete</span>
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
