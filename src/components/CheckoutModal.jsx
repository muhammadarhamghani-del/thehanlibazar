import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Sparkles, 
  Building, 
  Phone, 
  MapPin, 
  User,
  CreditCard,
  Printer
} from 'lucide-react';

const MAJOR_CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", 
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", 
  "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad", "Sukkur",
  "Mirpur (AJK)", "Gilgit", "Muzaffarabad", "Other City / International"
];

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: '',
    paymentMethod: 'cod' // 'cod' | 'whatsapp' | 'bank'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out your Name, Phone Number, and Delivery Address.');
      return;
    }

    const generatedId = `HANLI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);

    // Fire Celebratory Gold & Burgundy Confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#6B1D2F', '#ffffff', '#F7E7A9']
    });

    if (onOrderPlaced) {
      onOrderPlaced();
    }
  };

  const getWhatsAppMessageUrl = () => {
    const itemsList = checkoutData?.cart?.map(i => `• ${i.name} (${i.selectedColor || 'Standard'}, ${i.selectedSize || 'King'}) x${i.quantity} = Rs. ${i.price * i.quantity}`).join('%0A') || '';
    const text = `Salam The Hanli Bazar! I placed an order:%0A%0A*Order ID:* ${orderId}%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*City:* ${formData.city}%0A*Address:* ${formData.address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* Rs. ${checkoutData?.finalTotal?.toLocaleString()}%0A*Payment Method:* Cash on Delivery (COD)%0A%0APlease confirm dispatch!`;
    return `https://wa.me/923363326666?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* HEADER */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">
              {orderComplete ? 'Order Confirmed!' : 'Cash on Delivery Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!orderComplete ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ORDER SUMMARY PILL */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400">Total Payable at Doorstep:</span>
                  <div className="text-2xl font-black text-amber-300">
                    Rs. {checkoutData?.finalTotal?.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    🇵🇰 Cash on Delivery
                  </span>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    {checkoutData?.shipping === 0 ? 'Free Shipping Included' : '+ Rs. 250 Delivery'}
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    Full Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Hamza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0336 3326666"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-zinc-500">For courier dispatch verification</span>
                </div>

                {/* City Selection */}
                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    Delivery City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {MAJOR_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    Complete Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House / Apartment #, Street #, Sector / Area / Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-stone-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-amber-950/40 border-amber-400 text-white'
                        : 'bg-stone-900/60 border-white/10 text-zinc-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => {}}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Cash on Delivery (COD)</div>
                      <div className="text-[10px] text-zinc-400">Pay cash when courier delivers</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'whatsapp'
                        ? 'bg-emerald-950/40 border-emerald-400 text-white'
                        : 'bg-stone-900/60 border-white/10 text-zinc-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'whatsapp'}
                      onChange={() => {}}
                      className="accent-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-emerald-300">1-Click WhatsApp Order</div>
                      <div className="text-[10px] text-zinc-400">Direct dispatch with manager</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* GUARANTEE BADGE */}
              <div className="p-3 rounded-xl bg-stone-900/60 border border-white/5 flex items-center gap-3 text-xs text-zinc-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Quality Inspection Guarantee:</strong> 100% Export-Grade Combed Cotton with fast reactive dyes. Inspect your parcel upon delivery.
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Place Cash on Delivery Order (Rs. {checkoutData?.finalTotal?.toLocaleString()})
              </button>
            </form>
          ) : (
            // SUCCESS CONFIRMATION SCREEN
            <div className="flex flex-col items-center text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Mubarak & Welcome to the Tribe!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Your Bedding Order is Placed.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                  We have received your order. Our team in the textile hub is packing your 
                  100% pure combed cotton set for swift dispatch.
                </p>
              </div>

              {/* ORDER DETAILS BOX */}
              <div className="w-full p-4 rounded-2xl bg-stone-900 border border-amber-500/30 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs text-zinc-400">Order Reference ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-300">{orderId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(orderId);
                        setCopiedId(true);
                        setTimeout(() => setCopiedId(false), 2000);
                      }}
                      className="text-zinc-400 hover:text-white p-1"
                      title="Copy Order ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedId && <span className="text-[10px] text-emerald-400">Copied!</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block">Deliver To:</span>
                    <strong>{formData.name}</strong> ({formData.city})
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Total Due at Doorstep:</span>
                    <strong className="text-amber-300">Rs. {checkoutData?.finalTotal?.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Estimated Delivery:</span>
                    <strong>2 to 4 Business Days</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Payment:</span>
                    <strong>Cash on Delivery (COD)</strong>
                  </div>
                </div>
              </div>

              {/* WHATSAPP CONFIRMATION BUTTON */}
              <div className="w-full space-y-3">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp (Recommended)</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice Receipt</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-zinc-500">
                Official store: <strong>The Hanli Bazar</strong> (thehanlibazar.com) • "Jahan shopping na karna bhi jurm hai!"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
