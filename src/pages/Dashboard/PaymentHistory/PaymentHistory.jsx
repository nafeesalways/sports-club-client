import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";
import { FaHistory, FaTable, FaTh, FaReceipt, FaDollarSign, FaWarehouse, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const totalSpent = payments.reduce((sum, p) => sum + (p.finalPrice || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-2 sm:gap-3">
                <FaHistory className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0" />
                <span>Payment History</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                View all your past transactions and bookings
              </p>
            </div>
            
            {payments.length > 0 && (
              <button
                onClick={() => setIsTableView(!isTableView)}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-4 py-2.5 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                {isTableView ? <FaTh className="w-4 h-4" /> : <FaTable className="w-4 h-4" />}
                <span className="hidden sm:inline">{isTableView ? "Card View" : "Table View"}</span>
                <span className="sm:hidden">{isTableView ? "Cards" : "Table"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {payments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-yellow-400/20 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                  <FaReceipt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Total Payments</p>
                  <p className="text-white font-bold text-xl sm:text-2xl">{payments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl border border-yellow-400/20 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg flex-shrink-0">
                  <FaDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Total Spent</p>
                  <p className="text-white font-bold text-xl sm:text-2xl">${totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {payments.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <FaHistory className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Payment History</h3>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                You haven't made any payments yet. Complete a booking to see your payment history here.
              </p>
              <button 
                onClick={() => window.location.href = '/dashboard/approvedBookings'}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg w-full sm:w-auto"
              >
                View Bookings
              </button>
            </div>
          </div>
        ) : isTableView ? (
          /* Table View */
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border-b border-yellow-400/20">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Court
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider whitespace-nowrap">
                      Time Slots
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Paid
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider hidden lg:table-cell">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaWarehouse className="w-4 h-4 text-purple-400 flex-shrink-0 hidden sm:block" />
                          <span className="text-white font-semibold text-sm">{p.courtName}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {Array.isArray(p.slots) ? p.slots.join(', ') : p.slots}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-300 text-xs sm:text-sm">
                        {new Date(p.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className="text-green-400 font-bold text-sm sm:text-base">${p.finalPrice?.toFixed(2)}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                        {p.transactionId ? (
                          <span className="text-blue-400 font-mono text-xs">{p.transactionId.slice(-12)}...</span>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {payments.map((p) => (
              <div
                key={p._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold text-xs uppercase tracking-wide flex items-center gap-1">
                      <FaCheckCircle className="w-3 h-3" />
                      Paid
                    </span>
                    <span className="text-xs text-gray-400">ID: {p._id.slice(-6)}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Court */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                      <FaWarehouse className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-1">Court</p>
                      <p className="text-white font-bold text-base sm:text-lg break-words">{p.courtName}</p>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Time Slots</p>
                    <p className="text-white text-sm break-words">
                      {Array.isArray(p.slots) ? p.slots.join(', ') : p.slots}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                      <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Booking Date</p>
                      <p className="text-white font-semibold text-sm">
                        {new Date(p.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-semibold text-sm">Amount Paid</span>
                      <span className="text-green-400 font-bold text-lg sm:text-xl">
                        ${p.finalPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  {p.transactionId && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <p className="text-xs text-blue-400 mb-1">Transaction ID</p>
                      <p className="text-white font-mono text-xs break-all">{p.transactionId}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
