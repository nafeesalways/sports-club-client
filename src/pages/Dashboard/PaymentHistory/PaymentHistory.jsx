import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [isTableView, setIsTableView] = useState(true);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Switch to {isTableView ? "Card View" : "Table View"}
        </button>
      </div>

      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : isTableView ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Court</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Original Price</th>
                <th className="p-2 border">Paid Price</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{p.courtName}</td>
                  <td className="p-2 border">{p.date}</td>
                  <td className="p-2 border">${p.originalPrice}</td>
                  <td className="p-2 border">${p.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((p) => (
            <div
              key={p._id}
              className="border border-yellow-400 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-yellow-600 mb-1">
                {p.courtName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Date:</span> {p.date}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Original Price:</span> $
                {p.originalPrice}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Paid:</span> ${p.finalPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
