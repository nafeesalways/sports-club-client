import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const ManageBookings = () => {
  const [search, setSearch] = useState('');
  const axiosSecure = UseAxiosSecure();
  const [input, setInput] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['confirmedBookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings/confirmed?search=${search}`);
      return res.data;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(input.trim());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Confirmed Bookings</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by court name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full sm:w-2/3"
        />
        <button type="submit" className="bg-yellow-600  text-white px-4 rounded hover:bg-yellow-700">
          Search
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border rounded p-4 shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
            >
              <div>
                <p><strong>Court:</strong> {booking.courtName || 'N/A'}</p>
                <p><strong>Slot:</strong> {booking.slots}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Price:</strong> ${booking.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
