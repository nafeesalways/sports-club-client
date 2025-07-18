import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState, use } from 'react';


import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { AuthContext } from '../../../contexts/AuthContext';

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const booking = state?.booking;
  const [coupon, setCoupon] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(booking?.price || 0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (booking?.price) {
      axiosSecure.post('/create-payment-intent', {
        amount: booking.price * 100, // Convert to cents
      }).then(res => setClientSecret(res.data.clientSecret));
    }
  }, [booking, axiosSecure]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    } else {
      setError('');
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError('');
      if (result.paymentIntent.status === 'succeeded') {
        const transactionId = result.paymentIntent.id;

        // Store payment info
        await axiosSecure.post('/payments', {
          bookingId: booking._id,
          email: user.email,
          courtName: booking.courtName,
          slots: booking.slots,
          date: booking.date,
          originalPrice: booking.price,
          finalPrice: discountedPrice,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types
        });
        console.log(booking.slots)

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          confirmButtonText: 'Go to Confirmed Bookings',
        });

        navigate('/dashboard/confirmedBookings');
      }
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
          className="bg-green-600 btn text-white px-4 rounded hover:bg-green-700"
        >
          Apply
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded">
        <input className="w-full p-2 border rounded" readOnly value={user.email} />
        <input className="w-full p-2 border rounded" readOnly value={booking.courtName} />
        <input className="w-full p-2 border rounded" readOnly value={booking.slots} />
        <input className="w-full p-2 border rounded" readOnly value={booking.date} />
        <input className="w-full p-2 border rounded" readOnly value={`$${discountedPrice}`} />

        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          className="bg-yellow-600 btn text-white px-4 py-2 rounded hover:bg-yellow-700"
          disabled={!stripe || !clientSecret}
        >
          Submit Payment
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
};

export default PaymentPage;
