import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const AllUsers = () => {
    const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['allUsers', searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users?search=${searchTerm}`);
      return res.data;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };
 

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded w-full sm:w-2/3"
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 rounded hover:bg-yellow-700"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border rounded p-4 shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
