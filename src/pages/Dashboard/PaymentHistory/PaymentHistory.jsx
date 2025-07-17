import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import UseAxiosSecure from '../../../hook/UseAxiosSecure';

import { AuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../Loader/Loader';

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payment-history', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/payments?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Court</th>
                <th className="p-2 border">Slot</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Original Price</th>
                <th className="p-2 border">Paid Price</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2 border">{p.courtName}</td>
                  <td className="p-2 border">{p.slot}</td>
                  <td className="p-2 border">{p.date}</td>
                  <td className="p-2 border">${p.originalPrice}</td>
                  <td className="p-2 border">${p.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
