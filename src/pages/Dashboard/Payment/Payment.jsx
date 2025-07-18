import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentPage from '../PaymentPage/PaymentPage';


const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentPage></PaymentPage>
            </Elements>
        </div>
    );
};

export default Payment;