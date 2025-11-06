import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaWarehouse, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaImage, FaClock, FaDollarSign } from 'react-icons/fa';
import { MdSports } from 'react-icons/md';
import Loader from '../../../Loader/Loader';
import Swal from 'sweetalert2';

const ManageCourts = () => {
  const { user } = use(AuthContext);
  const [form, setForm] = useState({
    name: "",
    location: "",
    surface: "",
    image: "",
    slot: "",
    price: "",
    email: user.email
  });

  const [editingId, setEditingId] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: courts = [], isLoading, refetch } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/courts");
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (newCourt) => axiosSecure.post("/admin/courts", newCourt),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      setForm({ name: "", location: "", surface: "", image: "", slot: "", price: "", email: user.email });
      Swal.fire({
        title: 'Success!',
        text: 'Court added successfully.',
        icon: 'success',
        confirmButtonColor: '#10b981',
        background: '#1f2937',
        color: '#fff',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, update }) =>
      axiosSecure.patch(`/admin/courts/${id}`, update),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      setForm({ name: "", location: "", surface: "", image: "", slot: "", price: "", email: user.email });
      setEditingId(null);
      Swal.fire({
        title: 'Updated!',
        text: 'Court updated successfully.',
        icon: 'success',
        confirmButtonColor: '#10b981',
        background: '#1f2937',
        color: '#fff',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/courts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["courts"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, update: form });
    } else {
      addMutation.mutate(form);
    }
    refetch();
  };

  const handleEdit = (court) => {
    setForm({
      name: court.name,
      location: court.location,
      surface: court.surface,
      image: court.image || "",
      slot: court.slot || "",
      price: court.price || "",
      email: user.email
    });
    setEditingId(court._id);
  };

  const handleDelete = (id, courtName) => {
    Swal.fire({
      title: 'Delete Court?',
      text: `Are you sure you want to delete "${courtName}"? This action cannot be undone!`,
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
              text: 'Court has been removed successfully.',
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
    setForm({ name: "", location: "", surface: "", image: "", slot: "", price: "", email: user.email });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaWarehouse className="text-2xl sm:text-3xl" />
            Manage Courts
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Add, edit, and manage all court facilities
          </p>
        </div>

        {/* Court Form */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {editingId ? (
              <>
                <FaEdit className="text-yellow-400" />
                Edit Court
              </>
            ) : (
              <>
                <FaPlus className="text-yellow-400" />
                Add New Court
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Court Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Court Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Center Court"
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g., Main Building"
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Surface */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Surface Type
              </label>
              <input
                type="text"
                name="surface"
                value={form.surface}
                onChange={(e) => setForm({ ...form, surface: e.target.value })}
                placeholder="e.g., Hard, Clay, Grass"
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Court Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://example.com/court.jpg"
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Slot Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Available Slot Time
              </label>
              <select
                name="slot"
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              >
                <option value="">Select Slot Time</option>
                <option value="6:00 AM - 8:00 AM">6:00 AM - 8:00 AM</option>
                <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Price per Session ($)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="e.g., 50"
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                min="0"
              />
            </div>

            {/* Action Buttons */}
            <div className="col-span-1 sm:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                {editingId ? (
                  <>
                    <FaEdit className="w-4 h-4" />
                    Update Court
                  </>
                ) : (
                  <>
                    <FaPlus className="w-4 h-4" />
                    Add Court
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

        {/* Courts List */}
        {isLoading ? (
          <Loader />
        ) : courts.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaWarehouse className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Courts Available</h3>
              <p className="text-gray-400">
                Add your first court facility using the form above.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {courts.map((court) => (
              <div
                key={court._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* Court Image */}
                {court.image && (
                  <div className="h-48 overflow-hidden bg-gray-900">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=Court+Image';
                      }}
                    />
                  </div>
                )}

                {/* Court Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MdSports className="text-yellow-400" />
                    {court.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-400/10 rounded-lg">
                        <FaMapMarkerAlt className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-white font-semibold">{court.location}</p>
                      </div>
                    </div>

                    {court.surface && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <MdSports className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Surface</p>
                          <p className="text-white font-semibold">{court.surface}</p>
                        </div>
                      </div>
                    )}

                    {court.slot && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <FaClock className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Time Slot</p>
                          <p className="text-white font-semibold">{court.slot}</p>
                        </div>
                      </div>
                    )}

                    {court.price && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <FaDollarSign className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Price per Session</p>
                          <p className="text-white font-bold text-lg">${court.price}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(court)}
                      className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(court._id, court.name)}
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

export default ManageCourts;
