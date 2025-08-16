import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

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
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      setForm({ code: '', discount: '', expiresAt: '' });
      setEditingId(null);
    }
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.expiresAt}
          onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 btn sm:col-span-3 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          {editingId ? 'Update Coupon' : 'Add Coupon'}
        </button>
      </form>

      {isLoading ? (
        <p>Loading coupons...</p>
      ) : (
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="bg-white border p-4 rounded shadow flex justify-between">
              <div>
                <p><strong className='text-yellow-500'>Code:</strong><span className='text-yellow-600'> {coupon.code}</span></p>
                <p><strong className='text-yellow-500'>Discount:</strong> <span className='text-yellow-600'>{coupon.discount}%</span></p>
                <p><strong className='text-yellow-500'>Expires:</strong> <span className='text-yellow-600'>{new Date(coupon.expiresAt).toLocaleDateString()}</span></p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="bg-yellow-500 btn text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCoupon.mutate(coupon._id)}
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

export default ManageCoupons;
