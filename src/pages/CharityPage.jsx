import React from 'react';
import { Heart, ShieldCheck, Users, PawPrint } from 'lucide-react';

const CharityPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <PawPrint className="w-full h-full text-white rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
              Every Purchase <span className="text-secondary">Gives Back</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              At Man's Best Friend, we believe every pet deserves a loving home. That's why a portion of every sale goes directly to animal shelters and rescue organizations across the country.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We started Man's Best Friend with a simple goal: to make high-quality pet supplies accessible to everyone while helping the pets who haven't found their forever families yet.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              When you shop with us, you're not just buying food or toys for your pet—you're providing medical care, food, and shelter for a pet in need.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <Heart className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">2% Donated</h3>
              <p className="text-sm text-slate-500">Of every single purchase goes to charity.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <ShieldCheck className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">Verified Partners</h3>
              <p className="text-sm text-slate-500">We work with local no-kill shelters.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">Community Driven</h3>
              <p className="text-sm text-slate-500">Your suggestions help us pick partners.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <PawPrint className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">Thousands Helped</h3>
              <p className="text-sm text-slate-500">Impact across 50 states.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-16">How Your Purchase Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="bg-white w-20 h-20 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-secondary">1</div>
              <h3 className="font-heading font-bold text-xl text-primary mb-4">You Order</h3>
              <p className="text-slate-500 leading-relaxed">Shop our selection of premium pet supplies. We handle the rest.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-secondary">2</div>
              <h3 className="font-heading font-bold text-xl text-primary mb-4">We Donate</h3>
              <p className="text-slate-500 leading-relaxed">2% of your subtotal is set aside for our quarterly donation fund.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-secondary">3</div>
              <h3 className="font-heading font-bold text-xl text-primary mb-4">Pets Thrive</h3>
              <p className="text-slate-500 leading-relaxed">Funds are distributed to shelters to provide medical care, warm beds, and food.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Ready to make an impact?</h2>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">Browse our collection and find something your pet will love, knowing you're helping another pet in need.</p>
        <button 
          onClick={() => window.location.href = '/products'}
          className="bg-secondary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
        >
          Shop Now & Give Back
        </button>
      </div>
    </div>
  );
};

export default CharityPage;
