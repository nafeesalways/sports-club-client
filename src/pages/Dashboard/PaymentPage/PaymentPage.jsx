import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState, use } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { AuthContext } from '../../../contexts/AuthContext';
import { FaCreditCard, FaLock, FaCheckCircle, FaShieldAlt, FaTags, FaPercent } from 'react-icons/fa';

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
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (booking?.price) {
      axiosSecure.post('/create-payment-intent', {
        amount: Math.round(discountedPrice * 100),
      }).then(res => setClientSecret(res.data.clientSecret));
    }
  }, [booking, discountedPrice, axiosSecure]);

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setMessage('Please enter a coupon code');
      return;
    }

    try {
      const res = await axiosSecure.post('/coupon/verify', { code: coupon });
      if (res.data.valid) {
        const discountAmount = (booking.price * res.data.discount) / 100;
        const newPrice = booking.price - discountAmount;
        setDiscountedPrice(Math.max(0, newPrice));
        setDiscount(res.data.discount);
        setCouponApplied(true);
        setMessage(`Coupon applied! You saved $${discountAmount.toFixed(2)} (${res.data.discount}% off)`);
        setError('');
      } else {
        setMessage('');
        setError('Invalid or expired coupon code');
      }
    } catch (err) {
      setMessage('');
      setError('Failed to apply coupon. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error: cardError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (cardError) {
      setError(cardError.message);
      setProcessing(false);
      return;
    }

    try {
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
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const transactionId = result.paymentIntent.id;

          await axiosSecure.post('/payments', {
            bookingId: booking._id,
            email: user.email,
            courtName: booking.courtName,
            slots: booking.slots,
            date: booking.date,
            originalPrice: booking.price,
            finalPrice: discountedPrice,
            discount: discount,
            couponCode: couponApplied ? coupon : null,
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types?.[0],
            status: 'confirmed'
          });

          await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `
              <div class="space-y-2">
                <p class="text-green-400 font-semibold">Your booking has been confirmed!</p>
                <p class="text-sm text-gray-400">Transaction ID:</p>
                <p class="text-white font-mono text-xs break-all">${transactionId}</p>
              </div>
            `,
            confirmButtonText: 'View Confirmed Bookings',
            confirmButtonColor: '#10b981',
            background: '#1f2937',
            color: '#fff',
          });

          navigate('/dashboard/confirmedBookings');
        }
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-red-500/20 p-6 sm:p-8 text-center max-w-md w-full">
          <p className="text-red-400 font-semibold mb-4">No booking selected for payment!</p>
          <button
            onClick={() => navigate('/dashboard/approvedBookings')}
            className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold w-full"
          >
            Go to Approved Bookings
          </button>
        </div>
      </div>
    );
  }

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 mb-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <FaCreditCard className="text-xl sm:text-2xl lg:text-3xl" />
            <span>Complete Payment</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
            Secure payment with optional coupon discount
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Coupon Section */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-500/20">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FaTags className="text-green-400 flex-shrink-0" />
                  <span className="truncate">Have a Coupon Code?</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                  Apply your discount code to reduce the total amount
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="ENTER COUPON CODE"
                    disabled={couponApplied}
                    className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all uppercase disabled:opacity-50"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    className="btn bg-green-500 hover:bg-green-600 text-white border-none font-bold px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {couponApplied ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>

                {message && (
                  <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-400 text-xs sm:text-sm font-semibold flex items-start sm:items-center gap-2">
                      <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span>{message}</span>
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-xs sm:text-sm font-semibold">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-yellow-400/20">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FaLock className="text-yellow-400 flex-shrink-0" />
                  <span>Payment Details</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                {/* Card Element */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                    Card Information
                  </label>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-blue-400 font-semibold mb-1">Secure Payment</p>
                      <p className="text-xs text-gray-400">
                        Your payment is processed securely through Stripe. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!stripe || !clientSecret || processing}
                  className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 sm:py-4 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Pay ${discountedPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/dashboard/approvedBookings')}
                  className="w-full btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden lg:sticky lg:top-6">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-yellow-400/20">
                <h3 className="text-base sm:text-lg font-bold text-white">Order Summary</h3>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Court</p>
                  <p className="text-white font-bold text-sm sm:text-base break-words">{booking.courtName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Time Slot</p>
                  <p className="text-white font-semibold text-sm sm:text-base break-words">
                    {Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Date</p>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-3 sm:my-4"></div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-300 text-sm">
                    <span>Original Price</span>
                    <span className={couponApplied ? 'line-through text-gray-500' : 'font-semibold'}>
                      ${booking.price.toFixed(2)}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex items-center justify-between text-green-400 text-sm">
                      <span className="flex items-center gap-1">
                        <FaPercent className="w-3 h-3" />
                        <span>Discount ({discount}%)</span>
                      </span>
                      <span className="font-semibold">
                        -${(booking.price - discountedPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-semibold text-sm sm:text-base">Total</span>
                    <span className="text-yellow-400 font-black text-xl sm:text-2xl">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {couponApplied && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs text-green-400 text-center font-semibold">
                      🎉 You saved ${(booking.price - discountedPrice).toFixed(2)}!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
