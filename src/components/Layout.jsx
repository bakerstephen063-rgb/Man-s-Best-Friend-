import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout = () => {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-bg-light flex flex-col font-sans">
      <header className="bg-primary shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Man's Best Friend Logo" className="h-12 w-auto" />
              <span className="text-2xl font-heading font-bold text-white tracking-tight hidden sm:block">Man's Best Friend</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-white hover:text-accent transition-colors font-semibold">Home</Link>
              <Link to="/products" className="text-white hover:text-accent transition-colors font-semibold">Shop All</Link>
              <Link to="/charity" className="text-white hover:text-accent transition-colors font-semibold">Our Mission</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search pet supplies..."
                  className="bg-white/10 text-white placeholder-white/60 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-accent w-64 text-sm border border-white/20"
                />
                <Search className="h-4 w-4 text-white/60 absolute left-3 top-2.5" />
              </div>
              <Link to="/cart" className="relative p-2 text-white hover:text-accent transition-colors">
                <ShoppingCart className="h-7 w-7" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary text-white/80 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 text-white mb-6">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-xl font-heading font-bold">Man's Best Friend</span>
            </div>
            <p className="text-sm leading-relaxed">Premium pet supplies delivered straight to your door. We're committed to making pet care effortless and joyful for every pet parent.</p>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold mb-6 uppercase text-xs tracking-widest">Shop By Category</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products?category=dog food" className="hover:text-accent transition-colors">Dog Food</Link></li>
              <li><Link to="/products?category=cat food" className="hover:text-accent transition-colors">Cat Food</Link></li>
              <li><Link to="/products?category=dog toys" className="hover:text-accent transition-colors">Dog Toys</Link></li>
              <li><Link to="/products?category=pet bedding" className="hover:text-accent transition-colors">Pet Bedding</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold mb-6 uppercase text-xs tracking-widest">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/charity" className="hover:text-accent transition-colors font-bold text-secondary">Our Mission & Giving</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold mb-6 uppercase text-xs tracking-widest">Stay Connected</h3>
            <p className="text-sm mb-4">Get 10% off your first order!</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm focus:outline-none w-full text-white" />
              <button className="bg-accent text-white px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-accent-hover transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Man's Best Friend. All rights reserved. Built with love for pets.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
