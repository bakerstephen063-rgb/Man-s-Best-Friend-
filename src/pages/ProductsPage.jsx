import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Filter, ChevronDown, Clock } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { addToCart } = useCart();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState(categoryFilter || 'all');

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
  }, [categoryFilter]);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2 capitalize">
              {activeCategory === 'all' ? 'All Pet Essentials' : activeCategory}
            </h1>
            <p className="text-slate-500">Showing {filteredProducts.length} premium products</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center text-sm font-semibold text-slate-700">
              <Filter className="h-4 w-4 mr-2 text-secondary" />
              <span>Filter By Category</span>
            </div>
            <div className="relative w-full sm:w-64">
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="appearance-none w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-bold text-primary cursor-pointer shadow-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group border border-slate-100">
                <Link to={`/products/${product.id}`} className="relative overflow-hidden aspect-square bg-slate-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary capitalize shadow-sm">
                    {product.category}
                  </div>
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  
                  <div className="flex items-center text-xs text-secondary font-bold mb-4">
                    <Clock className="h-3 w-3 mr-1" /> Ships in {product.shippingEstimate} days
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-accent text-white p-3 rounded-xl hover:bg-accent-hover transition-all shadow-md active:scale-95"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-3xl shadow-sm">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-slate-500 text-xl font-heading mb-6">No products found in this category.</p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
