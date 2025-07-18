import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";

const ManageCourts = () => {
  const {user} = use(AuthContext);
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

  const { data: courts = [], isLoading,refetch } = useQuery({
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
      setForm({ name: "", location: "", surface: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, update }) =>
      axiosSecure.patch(`/admin/courts/${id}`, update),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      setForm({ name: "", location: "", surface: "" });
      setEditingId(null);
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
    });
    setEditingId(court._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Courts</h2>

      {/* Court Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Court Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="surface"
          value={form.surface}
          onChange={(e) => setForm({ ...form, surface: e.target.value })}
          placeholder="Surface (e.g. Hard, Clay)"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Court Image URL"
          className="border p-2 rounded"
        />

        <select
          name="slot"
          value={form.slot}
          onChange={(e) => setForm({ ...form, slot: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Slot Time</option>
          <option value="6:00 AM - 8:00 AM">6:00 AM - 8:00 AM</option>
          <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
          <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
          <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
          <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
        </select>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price per session"
          className="border p-2 rounded"
          min="0"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 btn bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          {editingId ? "Update Court" : "Add Court"}
        </button>
      </form>

      {/* Court List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : courts.length === 0 ? (
        <p>No courts available.</p>
      ) : (
        <div className="space-y-4">
          {courts.map((court) => (
            <div
              key={court._id}
              className="bg-white border rounded p-4 shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {court.name}
                </p>
                <p>
                  <strong>Location:</strong> {court.location}
                </p>
                <p>
                  <strong>Surface:</strong> {court.surface}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(court)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(court._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default ManageCourts;
