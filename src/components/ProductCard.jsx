import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Eye, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Heart,
  Truck,
  Play,
  Film
} from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onQuickView, onOpenVideoReel }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-stone-900/90 border border-white/10 hover:border-amber-500/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TOP BADGE & LIKE BUTTON */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md ${product.badgeColor || 'bg-amber-600'}`}>
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
            {product.discount}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="p-2 rounded-full bg-stone-950/70 backdrop-blur-md border border-white/10 text-white hover:text-rose-400 transition-colors pointer-events-auto cursor-pointer"
          title="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* PRODUCT IMAGE & COLOR PREVIEW CANVAS */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative h-64 w-full overflow-hidden bg-stone-950 cursor-pointer flex items-center justify-center"
      >
        {product.realImage ? (
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={product.realImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-950/85 border border-amber-500/30 text-[10px] font-bold text-amber-300 flex items-center gap-1 shadow">
              <span>King 92"x94" Flat</span>
              <span className="text-zinc-500">•</span>
              <span className="text-amber-200">📸 {product.gallery ? product.gallery.length : 1} + 🎬 Video</span>
            </div>
          </div>
        ) : (
          /* Dynamic Stylized Bed Texture Rendering */
          <div 
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundColor: selectedColor.hex,
              backgroundImage: `
                radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(45deg, rgba(0,0,0,0.4) 0%, transparent 70%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)
              `
            }}
          >
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        )}

        {/* Brand Watermark / Arch Crest Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-full border border-white/20 p-1 flex items-center justify-center bg-black/30 backdrop-blur-sm mb-2 shadow-lg">
            <span className="text-xl font-serif text-amber-300">IYI</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-white/90 font-bold drop-shadow-md">
            {selectedColor.name}
          </span>
          <span className="text-[11px] text-amber-200/80 drop-shadow">
            {product.threadCount}
          </span>
        </div>

        {/* Quick View & Watch Video Buttons on Hover */}
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-10 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-xl hover:bg-stone-800 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Quick View & Photos</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideoReel && onOpenVideoReel(product);
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-xl transition-all cursor-pointer"
          >
            <Film className="w-3.5 h-3.5" />
            <span>🎬 Watch 4K Video Reel</span>
          </button>
        </div>

        {/* Character Endorsement Corner Ribbon */}
        {product.characterImage && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/30">
            <img
              src={product.characterImage}
              alt={product.character}
              className="w-5 h-5 rounded-full object-cover border border-amber-400"
            />
            <span className="text-[10px] font-bold text-amber-300">
              {product.character}
            </span>
          </div>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="text-amber-400/90 font-medium">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle / Promise */}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatch Selector */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
            <span>Color: <strong className="text-zinc-200">{selectedColor.name}</strong></span>
            <span>{product.colors.length} shades</span>
          </div>
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-6 h-6 rounded-full border transition-all cursor-pointer relative ${
                  selectedColor.name === c.name 
                    ? 'border-amber-400 scale-110 shadow-md ring-2 ring-amber-400/40' 
                    : 'border-white/20 hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {selectedColor.name === c.name && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white drop-shadow" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Specs Pill */}
        <div className="py-2 px-3 rounded-xl bg-stone-950/60 border border-white/5 flex items-center justify-between text-[11px] text-zinc-300">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{product.guarantee.split('•')[0]}</span>
          </span>
          <span className="text-zinc-400 font-mono">
            {product.threadCount}
          </span>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Direct Mill Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-amber-300">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-500 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart({
              ...product,
              selectedColor: selectedColor.name,
              selectedColorHex: selectedColor.hex,
              selectedSize: product.sizes[0]
            })}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/25 transition-all cursor-pointer transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
