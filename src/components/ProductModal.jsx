import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles, 
  Package, 
  Layers,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Radio,
  Eye
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductModal({ 
  product: initialProduct, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onBuyNow,
  onOpenVideoReel
}) {
  if (!isOpen || !initialProduct) return null;

  const [product, setProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(initialProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(initialProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);

  // Sync state if initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setSelectedColor(initialProduct.colors[0]);
      setSelectedSize(initialProduct.sizes[0]);
      setActiveImageIndex(0);
      setIsVideoMode(false);
    }
  }, [initialProduct]);

  // Gallery images array
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [{ src: product.realImage, title: "Official Product Photo", badge: "Stock Photo", desc: product.name }];

  const totalSlides = gallery.length + (product.videoReel ? 1 : 0);

  const handleNext = () => {
    if (isVideoMode) {
      setIsVideoMode(false);
      setActiveImageIndex(0);
    } else if (activeImageIndex === gallery.length - 1 && product.videoReel) {
      setIsVideoMode(true);
    } else {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrev = () => {
    if (isVideoMode) {
      setIsVideoMode(false);
      setActiveImageIndex(gallery.length - 1);
    } else if (activeImageIndex === 0 && product.videoReel) {
      setIsVideoMode(true);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, isVideoMode, gallery.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-4xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-white">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-stone-900/90 text-zinc-400 hover:text-white border border-white/10 cursor-pointer shadow-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL BODY */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            
            {/* LEFT: MULTI-IMAGE GALLERY WITH TAP NEXT & VIDEO */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              
              {/* MAIN VISUAL VIEWER */}
              <div 
                className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-amber-500/30 flex items-center justify-center shadow-inner bg-stone-900 select-none group"
              >
                {isVideoMode ? (
                  /* VIDEO REEL EMBEDDED MODE */
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <img
                      src={product.videoReel.src}
                      alt={product.videoReel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 pointer-events-none" />
                    
                    {/* VIDEO REEL OVERLAYS */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-lg">
                      <Radio className="w-3 h-3 animate-pulse" />
                      4K AI Video Reel
                    </div>

                    <button
                      onClick={() => onOpenVideoReel && onOpenVideoReel(product)}
                      className="absolute bottom-4 inset-x-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-transform active:scale-95"
                    >
                      <Film className="w-4 h-4" />
                      Open Fullscreen Reel Player
                    </button>
                  </div>
                ) : (
                  /* IMAGE VIEWER MODE */
                  <div className="relative w-full h-full">
                    <img
                      src={gallery[activeImageIndex].src}
                      alt={gallery[activeImageIndex].title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/30 pointer-events-none" />

                    {/* Active Slide Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-stone-950/85 border border-amber-500/40 text-xs font-bold text-amber-300 shadow">
                        {gallery[activeImageIndex].badge || selectedColor.name}
                      </span>
                    </div>

                    {/* Counter Badge */}
                    <div className="absolute top-3 right-12 px-2.5 py-1 rounded-full bg-stone-950/80 border border-white/10 text-[11px] font-mono text-zinc-300 shadow">
                      {activeImageIndex + 1} / {gallery.length} Photos
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-white/10 text-xs">
                      <p className="font-bold text-amber-300">
                        {gallery[activeImageIndex].title}
                      </p>
                      <p className="text-[11px] text-zinc-300 line-clamp-1">
                        {gallery[activeImageIndex].desc}
                      </p>
                    </div>
                  </div>
                )}

                {/* PREV BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/20 transition-all cursor-pointer shadow-xl z-20"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* NEXT BUTTON WITH CLEAR "TAP NEXT" HINT */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pl-2.5 pr-2 py-1.5 rounded-full bg-stone-950/85 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-amber-500/40 transition-all cursor-pointer shadow-xl z-20 group/next"
                  title="Next Photo"
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-wider group-hover/next:text-stone-950">
                    Next
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* THUMBNAIL STRIP (Packaging, AI Lifestyle, Texture, AI Video) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                {gallery.map((img, idx) => {
                  const isActive = !isVideoMode && activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsVideoMode(false);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isActive 
                          ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105' 
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[8px] font-bold text-center text-zinc-300 truncate px-0.5">
                        {idx === 0 ? 'Package' : idx === 1 ? 'AI Suite' : idx === 2 ? 'Texture' : 'Angle'}
                      </span>
                    </button>
                  );
                })}

                {/* Video Reel Thumbnail Tab */}
                {product.videoReel && (
                  <button
                    onClick={() => setIsVideoMode(true)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col items-center justify-center ${
                      isVideoMode 
                        ? 'border-rose-400 ring-2 ring-rose-400/40 bg-rose-950/40 scale-105' 
                        : 'border-white/10 bg-stone-900 opacity-80 hover:opacity-100'
                    }`}
                    title="Watch 4K AI Video Reel"
                  >
                    <Play className="w-5 h-5 text-rose-400 fill-rose-400 mb-0.5" />
                    <span className="text-[9px] font-extrabold text-rose-300 uppercase tracking-tighter">
                      4K Reel
                    </span>
                  </button>
                )}
              </div>

              {/* Character Quote Box */}
              {product.characterQuote && (
                <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-zinc-300 italic flex items-center gap-2.5">
                  {product.characterImage && (
                    <img
                      src={product.characterImage}
                      alt={product.character}
                      className="w-7 h-7 rounded-full object-cover border border-amber-400 flex-shrink-0"
                    />
                  )}
                  <span>"{product.characterQuote}"</span>
                </div>
              )}
            </div>

            {/* RIGHT: DETAILS & PURCHASING CONTROLS */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 text-left">
              <div>
                {/* Category & Stock Hub */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                    {product.categoryName}
                  </span>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    In Stock (Islamabad Hub)
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-white leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-zinc-400">({product.reviewCount} verified reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-black text-amber-300">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="text-base text-zinc-500 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold">
                    {product.discount}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* LIVE COLORWAY SELECTOR */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Active Shade: <strong className="text-amber-300">{selectedColor.name}</strong>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedColor.name === c.name
                          ? 'border-amber-400 bg-amber-950/30 text-white shadow-md'
                          : 'border-white/10 bg-stone-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[11px]">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BED SIZE (KING FLAT) */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Bed Size Specification:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-stone-900 text-zinc-300 border border-white/10 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* WHAT'S IN THE BOX */}
              <div className="p-3 rounded-xl bg-stone-900/80 border border-white/5 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Package className="w-3.5 h-3.5" />
                  <span>Package Contains:</span>
                </div>
                <p className="text-zinc-300 text-[11px]">
                  {product.includes}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    onAddToCart({
                      ...product,
                      selectedColor: selectedColor.name,
                      selectedColorHex: selectedColor.hex,
                      selectedSize: selectedSize,
                      quantity: quantity
                    });
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => {
                    onBuyNow({
                      ...product,
                      selectedColor: selectedColor.name,
                      selectedColorHex: selectedColor.hex,
                      selectedSize: selectedSize,
                      quantity: 1
                    });
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Buy with COD</span>
                </button>
              </div>
            </div>
          </div>

          {/* OTHER LIVE BEDSHEETS SELECTOR ROW */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Browse Other Live Bedsheet Shades:
              </span>
              <span className="text-[11px] text-amber-400">
                Click any shade to switch view instantly
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {PRODUCTS.map((p) => {
                const isSelected = p.id === product.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setProduct(p);
                      setSelectedColor(p.colors[0]);
                      setActiveImageIndex(0);
                      setIsVideoMode(false);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/40 shadow'
                        : 'border-white/10 bg-stone-900/60 hover:border-white/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 mb-1">
                      <img src={p.realImage} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-200 line-clamp-1">
                      {p.colors[0].name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
