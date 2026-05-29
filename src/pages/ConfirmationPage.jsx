import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

const ConfirmationPage = () => {
  const { cart, cartTotal, donationAmount, clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  // We should ideally fetch the session details from Stripe here, 
  // but for now we'll use the cart state before it's cleared.
  // Actually, once they are on this page, the order is successful.
  
  useEffect(() => {
    if (sessionId) {
      // Clear cart after a short delay so we can still show the summary 
      // or we can just keep the summary in a local state if we had a backend.
      // For this demo, let's just clear it after 2 seconds or when they leave.
      const timer = setTimeout(() => {
        clearCart();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sessionId, clearCart]);

  const getMaxDeliveryDays = () => {
    if (cart.length === 0) return 15; // default for dropshipping
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

  if (!sessionId) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-primary">No order found.</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-secondary font-bold">Go Home</button>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-secondary p-12 text-center text-white">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-heading font-bold mb-2">Order Confirmed!</h1>
            <p className="text-white/80 text-lg">Order ID: {sessionId.slice(-10).toUpperCase()}</p>
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center">
                  <ShoppingBag className="h-6 w-6 mr-3 text-secondary" />
                  Order Summary
                </h2>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                        <div>
                          <p className="font-bold text-primary text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-slate-500 text-sm font-semibold">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    {donationAmount > 0 && (
                      <div className="flex justify-between text-secondary text-sm font-bold italic">
                        <span>Charity Donation</span>
                        <span>${donationAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-primary text-xl font-bold pt-2">
                      <span>Total Paid</span>
                      <span>${(cartTotal * 1.08 + donationAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center">
                  <Truck className="h-6 w-6 mr-3 text-secondary" />
                  Shipping Timeline
                </h2>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <p className="text-slate-500 mb-2 font-bold uppercase tracking-wider text-xs">Estimated Delivery</p>
                  <p className="text-3xl font-heading font-bold text-secondary mb-4">{getDeliveryDate()}</p>
                  <div className="space-y-4 relative pl-6 border-l-2 border-secondary/30">
                    <div className="relative">
                      <span className="absolute left-[-31px] top-1 w-4 h-4 rounded-full bg-secondary"></span>
                      <p className="font-bold text-primary text-sm">Order Processed</p>
                      <p className="text-xs text-slate-500">Today</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-[-31px] top-1 w-4 h-4 rounded-full bg-slate-300"></span>
                      <p className="font-bold text-slate-400 text-sm">International Shipping</p>
                      <p className="text-xs text-slate-500">2-3 days</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-[-31px] top-1 w-4 h-4 rounded-full bg-slate-300"></span>
                      <p className="font-bold text-slate-400 text-sm">Local Delivery</p>
                      <p className="text-xs text-slate-500">Final destination</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-secondary/10 rounded-2xl border border-secondary/10">
                  <p className="text-sm text-primary leading-relaxed font-semibold">
                    <span className="text-secondary mr-2">🐾</span>
                    We'll email you a tracking number as soon as your pet's treats are on the way!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center border-t border-slate-100 pt-12">
              <h3 className="text-xl font-bold text-primary mb-4">Thank you for supporting Man's Best Friend!</h3>
              <p className="text-slate-500 mb-10 max-w-lg mx-auto">Your purchase helps us donate to animal shelters across the country. Your pet (and many others) thank you!</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 active:scale-95 inline-flex items-center"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
