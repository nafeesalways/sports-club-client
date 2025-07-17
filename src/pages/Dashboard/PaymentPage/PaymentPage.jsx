import { useLocation, useNavigate } from 'react-router';
import { use, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } =use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const booking = state?.booking;
  const [coupon, setCoupon] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(booking?.price || 0);
  const [message, setMessage] = useState('');

  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.post('/coupon/verify', { code: coupon });
      if (res.data.valid) {
        const newPrice = booking.price - res.data.discount;
        setDiscountedPrice(Math.max(0, newPrice));
        setMessage(`Coupon applied! New price: $${newPrice}`);
      } else {
        setMessage('Invalid coupon code');
      }
    } catch {
      setMessage('Failed to apply coupon');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post('/payments', {
        bookingId: booking._id,
        email: user.email,
        courtName: booking.courtName,
        slot: booking.slot,
        date: booking.date,
        originalPrice: booking.price,
        finalPrice: discountedPrice,
      });

      setMessage('Payment successful!');
      navigate('/dashboard/confirmedBookings');
    } catch {
      setMessage('Payment failed');
    }
  };

  if (!booking) return <p>No booking selected for payment</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      {/* Coupon Section */}
      <div className="flex gap-2 mb-4">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Apply
        </button>
      </div>

      <form onSubmit={handlePaymentSubmit} className="space-y-4 bg-white shadow p-6 rounded">
        <input className="w-full p-2 border rounded" readOnly value={user.email} />
        <input className="w-full p-2 border rounded" readOnly value={booking.courtName} />
        <input className="w-full p-2 border rounded" readOnly value={booking.slot} />
        <input className="w-full p-2 border rounded" readOnly value={booking.date} />
        <input
          className="w-full p-2 border rounded"
          readOnly
          value={`$${discountedPrice}`}
        />

        <button
          type="submit"
          className="bg-yellow-600 btn text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Submit Payment
        </button>
      </form>

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
};

export default PaymentPage;
