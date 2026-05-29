import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = products.filter(p => [1, 2, 3, 4].includes(products.indexOf(p))).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-secondary opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-accent opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Everything your best friend needs, <span className="text-accent">delivered.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-lg mx-auto md:mx-0">
              Premium pet food, toys, and supplies delivered to your doorstep. Every purchase supports animal rescue.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/products" className="bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent-hover transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/products?category=dog food" className="bg-white/10 text-white backdrop-blur-sm border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
                Explore Dog Food
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="/hero-banner.png" 
                alt="Happy pet with delivery" 
                className="rounded-3xl shadow-2xl w-full max-w-lg object-cover border-4 border-white/10"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Truck className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Tracked Delivery</p>
                  <p className="text-xs text-slate-500">Straight to your door</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary">Fast Doorstep Delivery</h3>
              <p className="text-slate-600">No more heavy bags from the store. We bring the best straight to your door with real-time tracking.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary">Premium Selection</h3>
              <p className="text-slate-600">Every brand we stock is vetted for quality, nutrition, and safety by our team of pet experts.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary">Schedule & Save</h3>
              <p className="text-slate-600">Never run out of essentials. Set up recurring deliveries for food and litter and save 10%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Shop By Category</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                to={`/products?category=${cat}`}
                className="bg-white border border-slate-100 p-8 rounded-2xl text-center hover:border-secondary hover:shadow-lg transition-all group flex flex-col items-center"
              >
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                   <div className="text-2xl">🐾</div>
                </div>
                <span className="font-bold text-primary capitalize">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary">Our Best Sellers</h2>
              <p className="text-slate-500 mt-2">Highly rated by pets and their parents</p>
            </div>
            <Link to="/products" className="text-accent font-bold hover:text-accent-hover flex items-center transition-colors">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-slate-50 rounded-2xl overflow-hidden flex flex-col group border border-slate-100 hover:shadow-xl transition-all">
                <Link to={`/products/${product.id}`} className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-primary capitalize shadow-sm">
                    {product.category}
                  </div>
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-secondary font-bold flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Ships in {product.shippingEstimate} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-secondary opacity-5 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-[40px] p-12 md:p-20 border border-white/10 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-widest uppercase border border-secondary/30">
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                Every treat has <span className="text-secondary">a purpose.</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                At Man's Best Friend, we believe every animal deserves a loving home and a full belly. That's why 2% of every purchase goes directly to local animal shelters and community pet programs.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">$45k+</p>
                  <p className="text-sm text-white/50 font-bold uppercase tracking-wider">Donated in 2024</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">12,000</p>
                  <p className="text-sm text-white/50 font-bold uppercase tracking-wider">Meals Provided</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
               <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80" 
                alt="Shelter dog" 
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
