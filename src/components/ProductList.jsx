import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, Filter } from 'lucide-react';

export default function ProductList({ onAddToCart, onQuickView, onOpenVideoReel }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Size match
      const matchSize = 
        selectedSize === 'all' || 
        product.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase()));

      // Search match
      const matchSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.character.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSize && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended default
    });
  }, [selectedCategory, selectedSize, searchQuery, sortBy]);

  return (
    <section id="bed-collections" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Bedding Collections</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Engineered for Deep, Restful Sleep.
        </h2>
        <p className="text-base text-zinc-400 mt-3">
          100% Egypt Cotton Touch, King Flat Sheets (92"x94") & Ultrasonic Quilted Texture. 
          Tested and approved by the Hanli Tribe.
        </p>
      </div>

      {/* FILTER BAR & SEARCH CONTROLS */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-stone-900/60 border border-white/5 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search bed sheets, colors (e.g. Terracotta, Grey, Sapphire, Olive)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950/80 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Size Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-semibold text-zinc-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            Size:
          </span>
          {['all', 'King', 'Queen', 'Single'].map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSize === sz
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-950/60 text-zinc-300 hover:text-white border border-white/5'
              }`}
            >
              {sz === 'all' ? 'All Sizes' : sz}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950/80 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="recommended">Featured / Tribe Choice</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Customer Rated</option>
          </select>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpenVideoReel={onOpenVideoReel}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-stone-900/40 border border-white/10">
          <p className="text-lg text-zinc-300 font-bold mb-2">No bed sheets found</p>
          <p className="text-sm text-zinc-500 mb-4">
            Try clearing your search query or choosing another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSize('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
