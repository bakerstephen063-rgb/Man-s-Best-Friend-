import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { Truck, Calendar } from 'lucide-react';

const CheckoutForm = ({ clientSecret, onSuccess, onProcessing, getDeliveryDate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, cartTotal, donationAmount } = useCart();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    onProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      onProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      onSuccess();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center">
          <Truck className="h-7 w-7 mr-4 text-secondary" />
          Payment Information
        </h2>
        <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#001f3f',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#ff4136',
                },
              },
            }}
          />
        </div>
        {error && (
          <div className="mt-4 text-red-500 text-sm font-bold" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-heading font-bold text-primary mb-8">Order Summary</h2>
        <div className="space-y-4 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-500 font-semibold">{item.name} <span className="text-slate-400">x{item.quantity}</span></span>
              <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-slate-50 space-y-4 mb-10">
          <div className="flex justify-between text-slate-500 font-semibold">
            <span>Standard Shipping</span>
            <span className="text-accent font-bold tracking-widest uppercase text-xs">FREE</span>
          </div>
          {donationAmount > 0 && (
            <div className="flex justify-between text-secondary font-bold">
              <span>❤️ Charity Round-Up</span>
              <span>${donationAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-2xl font-heading font-bold text-primary pt-2">
            <span>Grand Total</span>
            <span className="text-secondary">${(cartTotal * 1.08 + donationAmount).toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-secondary/10 p-6 rounded-3xl mb-10 border border-secondary/10">
          <p className="text-xs text-secondary flex items-center font-bold mb-2 uppercase tracking-widest">
            <Truck className="h-4 w-4 mr-2" />
            All items delivered by
          </p>
          <p className="text-primary font-bold text-lg">{getDeliveryDate()}</p>
        </div>

        <button 
          disabled={processing || succeeded || !stripe || !elements}
          id="submit"
          className={`w-full py-6 rounded-2xl font-bold text-xl transition-all shadow-xl active:scale-95 ${
            processing || succeeded
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary/95 shadow-primary/20'
          }`}
        >
          <span id="button-text">
            {processing ? 'Processing Order...' : 'Complete Purchase'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
