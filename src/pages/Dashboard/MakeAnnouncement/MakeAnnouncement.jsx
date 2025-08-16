import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const MakeAnnouncement = () => {
  const [form, setForm] = useState({ title: '', message: '' });
  const axiosSecure= UseAxiosSecure();
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
    onSuccess: () => {
      queryClient.invalidateQueries(['announcementsAdmin']);
      setForm({ title: '', message: '' });
      setEditingId(null);
    }
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make Announcements</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mb-6">
        <input
          type="text"
          placeholder="Announcement Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          rows={3}
          placeholder="Announcement Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border p-2 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-600 btn text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          {editingId ? 'Update Announcement' : 'Add Announcement'}
        </button>
      </form>

      {/* List */}
      {isLoading ? (
        <p>Loading announcements...</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="bg-white border p-4 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-semibold text-yellow-600">{item.title}</p>
                <p className="text-sm text-gray-700">{item.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 btn text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(item._id)}
                  className="bg-red-600 btn text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MakeAnnouncement;
