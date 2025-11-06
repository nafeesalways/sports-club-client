import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaTags, FaPlus, FaEdit, FaTrash, FaPercent, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import Loader from '../../../Loader/Loader';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
  const [form, setForm] = useState({ code: '', discount: '', expiresAt: '' });
  const axiosSecure = UseAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  const queryClient = useQueryClient();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/coupons');
      return res.data;
    }
  });

  const addOrUpdateCoupon = useMutation({
    mutationFn: ({ id, data }) => {
      return id
        ? axiosSecure.patch(`/admin/coupons/${id}`, data)
        : axiosSecure.post('/admin/coupons', data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['coupons']);
      setForm({ code: '', discount: '', expiresAt: '' });
      setEditingId(null);
      Swal.fire({
        title: variables.id ? 'Updated!' : 'Added!',
        text: variables.id ? 'Coupon updated successfully.' : 'Coupon added successfully.',
        icon: 'success',
        confirmButtonColor: '#10b981',
        background: '#1f2937',
        color: '#fff',
      });
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/coupons/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['coupons'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateCoupon.mutate({ id: editingId, data: form });
  };

  const handleEdit = (coupon) => {
    setForm({
      code: coupon.code,
      discount: coupon.discount,
      expiresAt: coupon.expiresAt.split('T')[0]
    });
    setEditingId(coupon._id);
  };

  const handleDelete = (id, code) => {
    Swal.fire({
      title: 'Delete Coupon?',
      text: `Are you sure you want to delete coupon "${code}"? This action cannot be undone!`,
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
        deleteCoupon.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Coupon has been removed successfully.',
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
    setForm({ code: '', discount: '', expiresAt: '' });
    setEditingId(null);
  };

  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaTags className="text-2xl sm:text-3xl" />
            Manage Coupons
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Create and manage discount coupons for your customers
          </p>
        </div>

        {/* Coupon Form */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {editingId ? (
              <>
                <FaEdit className="text-yellow-400" />
                Edit Coupon
              </>
            ) : (
              <>
                <FaPlus className="text-yellow-400" />
                Add New Coupon
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Coupon Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Coupon Code *
              </label>
              <input
                type="text"
                placeholder="e.g., SUMMER2025"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all uppercase"
                required
              />
            </div>

            {/* Discount Percentage */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Discount (%) *
              </label>
              <input
                type="number"
                placeholder="e.g., 20"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                min="1"
                max="100"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="col-span-1 sm:col-span-3 flex gap-3">
              <button
                type="submit"
                className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                {editingId ? (
                  <>
                    <FaEdit className="w-4 h-4" />
                    Update Coupon
                  </>
                ) : (
                  <>
                    <FaPlus className="w-4 h-4" />
                    Add Coupon
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

        {/* Coupons List */}
        {isLoading ? (
          <Loader />
        ) : coupons.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaTags className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Coupons Available</h3>
              <p className="text-gray-400">
                Create your first discount coupon using the form above.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {coupons.map((coupon) => {
              const expired = isExpired(coupon.expiresAt);
              
              return (
                <div
                  key={coupon._id}
                  className={`bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border overflow-hidden transition-all duration-300 ${
                    expired 
                      ? 'border-red-500/20 hover:border-red-500/40 opacity-75' 
                      : 'border-yellow-400/20 hover:border-yellow-400/40'
                  }`}
                >
                  {/* Coupon Header */}
                  <div className={`px-6 py-4 border-b ${
                    expired 
                      ? 'bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/20' 
                      : 'bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border-yellow-400/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          expired ? 'bg-red-500/20' : 'bg-yellow-400/20'
                        }`}>
                          <FaTicketAlt className={`w-6 h-6 ${
                            expired ? 'text-red-400' : 'text-yellow-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white tracking-wider">
                            {coupon.code}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                            expired
                              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                              : 'bg-green-500/10 border border-green-500/30 text-green-400'
                          }`}>
                            {expired ? 'Expired' : 'Active'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Discount */}
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <FaPercent className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Discount</p>
                            <p className="text-white font-bold text-2xl">
                              {coupon.discount}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expiry Date */}
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            expired ? 'bg-red-500/10' : 'bg-blue-500/10'
                          }`}>
                            <FaCalendarAlt className={`w-5 h-5 ${
                              expired ? 'text-red-400' : 'text-blue-400'
                            }`} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Expires On</p>
                            <p className={`font-semibold ${
                              expired ? 'text-red-400' : 'text-white'
                            }`}>
                              {new Date(coupon.expiresAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaEdit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id, coupon.code)}
                        className="flex-1 btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaTrash className="w-4 h-4" />
                        Delete
                      </button>
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

export default ManageCoupons;
