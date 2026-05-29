import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Calendar } from 'lucide-react';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    isDonating,
    setIsDonating,
    donationAmount
  } = useCart();

  const getMaxDeliveryDays = () => {
    if (cart.length === 0) return 0;
    return Math.max(...cart.map(item => {
      const parts = item.shippingEstimate.split('-');
      return parseInt(parts[parts.length - 1]);
    }));
  };

  const getEstimatedArrival = () => {
    const days = getMaxDeliveryDays();
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  if (cart.length === 0) {
    return (
      <div className="py-32 bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-16 rounded-[40px] shadow-sm text-center max-w-xl w-full border border-slate-100">
          <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-12 w-12 text-secondary" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Your cart is empty</h2>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">Looks like your best friend is waiting for some treats! Browse our catalog to find something special.</p>
          <Link to="/products" className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-secondary/90 transition-all inline-block shadow-lg shadow-secondary/20 active:scale-95">
            Explore Pet Supplies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary">Shopping Cart</h1>
          <p className="text-slate-500 mt-2 font-semibold">{cart.length} items for your pet</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col sm:flex-row items-center border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 mb-6 sm:mb-0 p-4 border border-slate-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="sm:ml-8 flex-grow text-center sm:text-left mb-6 sm:mb-0">
                  <h3 className="font-bold text-primary text-xl mb-1">{item.name}</h3>
                  <p className="text-slate-400 text-sm capitalize mb-3 font-bold">{item.category}</p>
                  <div className="inline-flex items-center text-xs text-secondary font-bold bg-secondary/5 px-3 py-1.5 rounded-full">
                    <Truck className="h-3 w-3 mr-2" /> Ships in {item.shippingEstimate} days
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end space-y-6">
                  <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-primary"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-primary text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-primary"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <span className="font-bold text-primary text-2xl">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[40px] shadow-sm sticky top-32 border border-slate-100">
              <h2 className="text-2xl font-heading font-bold text-primary mb-8">Order Summary</h2>
              
              <div className="bg-secondary/5 p-4 rounded-2xl mb-8 border border-secondary/10 flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Estimated Arrival</p>
                  <p className="text-sm font-bold text-primary">{getEstimatedArrival()}</p>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Subtotal</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Standard Shipping</span>
                  <span className="text-secondary font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500 font-semibold">
                  <span>Estimated Tax</span>
                  <span className="text-primary">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                {donationAmount > 0 && (
                  <div className="flex justify-between text-secondary font-bold">
                    <span>❤️ Round Up for Shelters</span>
                    <span>${donationAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-6 border-t border-slate-50 flex justify-between items-end">
                  <span className="text-xl font-heading font-bold text-primary">Order Total</span>
                  <span className="text-3xl font-heading font-bold text-accent">${(cartTotal * 1.08 + donationAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isDonating} 
                    onChange={(e) => setIsDonating(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm font-bold text-primary">Round up my total to donate to animal shelters</span>
                </label>
              </div>

              <Link 
                to="/checkout" 
                className="bg-primary text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-primary/95 transition-all flex items-center justify-center w-full shadow-lg shadow-primary/20 active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
              
              <div className="mt-8 text-center">
                <Link to="/products" className="text-sm font-bold text-slate-400 hover:text-secondary transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
