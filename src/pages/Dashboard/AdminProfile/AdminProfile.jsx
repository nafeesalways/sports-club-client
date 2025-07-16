import { useQuery } from '@tanstack/react-query';

import { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../Loader/Loader';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure =UseAxiosSecure();

  // Fetch counts (users, members, courts)
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  if (isLoading) return <p className="p-4"><Loader></Loader></p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-100 text-center p-4 rounded shadow">
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p>Total Users</p>
        </div>
        <div className="bg-green-100 text-center p-4 rounded shadow">
          <p className="text-3xl font-bold">{stats.totalMembers}</p>
          <p>Total Members</p>
        </div>
        <div className="bg-yellow-100 text-center p-4 rounded shadow">
          <p className="text-3xl font-bold">{stats.totalCourts}</p>
          <p>Total Courts</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
