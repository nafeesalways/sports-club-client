import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";

const ConfirmedBookings = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["confirmed-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/confirmed-bookings?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-yellow-600">Court</th>
                <th className="p-2 border text-yellow-600">Slot</th>
                <th className="p-2 border text-yellow-600">Date</th>
                <th className="p-2 border text-yellow-600">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-2 border">{booking.courtName}</td>
                  <td className="p-2 border">{booking.slots}</td>
                  <td className="p-2 border">{booking.date}</td>
                  <td className="p-2 border">${booking.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
