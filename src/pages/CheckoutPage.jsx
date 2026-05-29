import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Truck, CreditCard, MapPin, ArrowLeft, Heart } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51Px9zX2M4RzO3VzR8yM0Yp9X8S0S1S2S3S4S5S6S7S8S9S0S1S2S3S4S5S6S7S8S9S0S1S2S3S4S5S6'); // Placeholder test key

const CheckoutPage = () => {
  const { cart, cartTotal, isDonating, setIsDonating, donationAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const getMaxDeliveryDays = () => {
    if (cart.length === 0) return 0;
    return Math.max(...cart.map(item => {
      const estimate = item.delivery_days || item.shippingEstimate || "15-30";
      const parts = estimate.split('-');
      return parseInt(parts[parts.length - 1]);
    }));
  };

  const getDeliveryDate = () => {
    const days = getMaxDeliveryDays();
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cart,
          donationAmount: donationAmount
        }),
      });
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        console.error("Stripe Checkout error:", error);
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-primary mb-10 transition-colors font-bold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </button>

        <h1 className="text-4xl font-heading font-bold text-primary mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center">
                <MapPin className="h-7 w-7 mr-4 text-secondary" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary font-semibold text-primary transition-all" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Street Address</label>
                  <input required type="text" placeholder="123 Pet Lane" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary font-semibold text-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">City</label>
                  <input required type="text" placeholder="San Francisco" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary font-semibold text-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Zip Code</label>
                  <input required type="text" placeholder="94103" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary font-semibold text-primary transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center">
                <Heart className="h-7 w-7 mr-4 text-secondary" />
                Round Up for Charity
              </h2>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold text-primary">Support Animal Shelters</p>
                  <p className="text-sm text-slate-500 mt-1">Round up your total to the nearest dollar. Every cent goes to pets in need.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isDonating}
                    onChange={(e) => setIsDonating(e.target.checked)}
                  />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 sticky top-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Shipping</span>
                  <span className="text-secondary font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Estimated Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                {isDonating && (
                  <div className="flex justify-between text-secondary font-bold italic">
                    <span>Charity Round-up</span>
                    <span>${donationAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-100 pt-4 flex justify-between text-2xl font-bold text-primary">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08 + donationAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-secondary mr-2" />
                  <span className="font-bold text-primary">Estimated Delivery</span>
                </div>
                <p className="text-secondary font-bold">{getDeliveryDate()}</p>
                <p className="text-xs text-slate-500 mt-2">Calculated based on items in your cart.</p>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing || cart.length === 0}
                className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
