import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck, Star, Info, Heart } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="py-32 text-center bg-slate-50 min-h-screen">
        <div className="text-6xl mb-6">🙀</div>
        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Product not found</h2>
        <Link to="/products" className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-primary mb-10 transition-colors font-bold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Results
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image */}
          <div className="bg-slate-50 rounded-[40px] overflow-hidden aspect-square border border-slate-100 flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-6 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  <span className="ml-2 text-primary font-bold">4.9</span>
                </div>
                <span className="text-sm text-slate-500 font-semibold border-l border-slate-200 pl-6">128 Happy Pet Parents</span>
              </div>
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            <div className="prose prose-slate mb-10">
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features/Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-secondary transition-colors">
                <Truck className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Estimated Delivery</p>
                  <p className="text-sm text-slate-600 font-semibold">{product.shippingEstimate} days</p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-secondary transition-colors">
                <ShieldCheck className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Quality Guaranteed</p>
                  <p className="text-sm text-slate-600 font-semibold">100% Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-grow py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 shadow-lg active:scale-95 ${
                    isAdded 
                    ? 'bg-secondary text-white' 
                    : 'bg-accent text-white hover:bg-accent-hover shadow-accent/20'
                  }`}
                >
                  {isAdded ? (
                    <><span>Added to Cart!</span></>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                <button className="p-5 bg-slate-100 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex items-center justify-center text-xs text-slate-400 font-bold bg-slate-50 py-3 rounded-xl">
                <Info className="h-4 w-4 mr-2 text-secondary" />
                FREE SHIPPING ON ALL ORDERS TODAY!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
