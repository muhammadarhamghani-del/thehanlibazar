import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck,
  Truck
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'HANLI10' || code === 'BEYSWAG' || code === 'TURGUT10') {
      setDiscountPercent(10);
      setCouponMessage('🎉 10% Tribe Discount Applied Successfully!');
    } else if (code === 'ROYAL15') {
      setDiscountPercent(15);
      setCouponMessage('👑 15% Royal Sultan Discount Applied!');
    } else {
      setCouponMessage('❌ Invalid coupon code. Try HANLI10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* DRAWER PANEL */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-950 border-l border-amber-500/30 shadow-2xl flex flex-col justify-between">
          {/* HEADER */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black text-white">Your Shopping Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                {cart.reduce((total, i) => total + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* NATIONWIDE DELIVERY NOTICE */}
          <div className="px-6 py-3 bg-stone-900/80 border-b border-white/5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-zinc-300 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Nationwide Courier Delivery</span>
            </span>
            <span className="font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 text-[11px]">
              Rs. 250 (Flat Across Pakistan)
            </span>
          </div>

          {/* CART ITEMS LIST */}
          <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-zinc-300">Your bag is empty</p>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Discover our 100% Egypt cotton and ultrasonic quilted King flat bedspreads.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}-${idx}`}
                  className="p-4 rounded-xl bg-stone-900/70 border border-white/5 flex gap-3.5"
                >
                  {/* Color Swatch Indicator */}
                  <div 
                    className="w-14 h-14 rounded-xl border border-white/20 shrink-0 flex items-center justify-center shadow-inner relative"
                    style={{ backgroundColor: item.selectedColorHex || item.colorHex || '#6B1D2F' }}
                  >
                    <span className="text-[10px] font-bold text-white drop-shadow">
                      IYI
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                          <span>{item.selectedColor || item.color || 'Standard'}</span>
                          <span>•</span>
                          <span>{item.selectedSize || item.size || 'King'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 bg-stone-950 rounded-lg border border-white/10 px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-amber-300">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CHECKOUT SUMMARY */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-stone-950 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. HANLI10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-amber-300 border border-white/10 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              {/* ONLINE PAYMENT INCENTIVE CALLOUT */}
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-stone-900 border border-emerald-500/40 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Pay Online & Save 10%
                </span>
                <span className="text-[10px] text-zinc-300">Bank / Card / Raast</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Tribe Discount ({discountPercent}%)</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Courier Delivery</span>
                  <span className="text-zinc-300 font-medium">
                    Rs. 250 (on customer)
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total (Standard)</span>
                  <span className="text-amber-300">
                    Rs. {(finalTotal + 250).toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold text-right">
                  Pay Online Price: Rs. {(Math.round(subtotal * 0.90) + 250).toLocaleString()} (Save Rs. {Math.round(subtotal * 0.10).toLocaleString()})
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout({
                    cart,
                    subtotal,
                    discountAmount,
                    shipping: 250,
                    finalTotal: finalTotal + 250
                  });
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition-all transform hover:-translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
