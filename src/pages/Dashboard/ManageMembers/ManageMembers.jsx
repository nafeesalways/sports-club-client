import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

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
    if (confirm('Are you sure you want to delete this member?')) {
      deleteMutation.mutate(email);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border p-2 rounded w-full input-lg sm:w-1/2"
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white border rounded p-4 flex justify-between items-center shadow"
            >
              <div>
                <p><strong>Name:</strong> {member.displayName || 'N/A'}</p>
                <p><strong>Email:</strong> {member.email}</p>
              </div>
              <button
                onClick={() => handleDelete(member.email)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
