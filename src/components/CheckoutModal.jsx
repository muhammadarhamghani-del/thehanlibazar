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
  Printer,
  Percent,
  AlertCircle,
  HelpCircle,
  Check,
  FileText,
  Smartphone,
  Wallet
} from 'lucide-react';

const MAJOR_CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", 
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", 
  "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad", "Sukkur",
  "Mirpur (AJK)", "Gilgit", "Muzaffarabad", "Other City / International"
];

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  checkoutData, 
  onOrderPlaced,
  onOpenTerms
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Islamabad',
    notes: '',
    paymentMethod: 'online' // Default to 'online' to encourage 10% discount!
  });

  const [codOathChecked, setCodOathChecked] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedField, setCopiedField] = useState('');

  if (!isOpen) return null;

  // Copy helper
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2500);
  };

  // Pricing calculations
  const rawSubtotal = checkoutData?.subtotal || (checkoutData?.finalTotal ? checkoutData.finalTotal - (checkoutData.shipping || 0) : 3850);
  const shippingCharges = 250; // Shipping charges are on the customer
  const isOnline = formData.paymentMethod === 'online';
  const onlineDiscount = isOnline ? Math.round(rawSubtotal * 0.10) : 0;
  const netPayable = rawSubtotal - onlineDiscount + shippingCharges;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out your Name, Phone Number, and Complete Delivery Address.');
      return;
    }

    if (formData.paymentMethod === 'cod' && !codOathChecked) {
      alert('For Cash on Delivery, please confirm the solemn oath that you will try your best to receive the parcel and not ditch it.');
      return;
    }

    const generatedId = `HANLI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);

    // Fire Celebratory Gold & Emerald Confetti!
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#10B981', '#ffffff', '#F7E7A9']
    });

    if (onOrderPlaced) {
      onOrderPlaced();
    }
  };

  const getWhatsAppMessageUrl = () => {
    const itemsList = checkoutData?.cart?.map(i => `• ${i.name} (${i.selectedColor || 'Standard'}, ${i.selectedSize || 'King'}) x${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`).join('%0A') || '• Luxury Bed Spread (King Flat 92x94) x1';
    
    if (isOnline) {
      const text = `Salam The Hanli Bazar! I have placed an order with *10% Online Payment Discount*:%0A%0A*Order Reference:* ${orderId}%0A*Customer Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*City:* ${formData.city}%0A*Address:* ${formData.address}%0A%0A*Items Ordered:*%0A${itemsList}%0A%0A*Subtotal:* Rs. ${rawSubtotal.toLocaleString()}%0A*10% Online Discount:* -Rs. ${onlineDiscount.toLocaleString()}%0A*Shipping (Customer):* Rs. ${shippingCharges.toLocaleString()}%0A*Net Total:* Rs. ${netPayable.toLocaleString()}%0A*Paid To:* Muhammad Arham Ghani (UBL / Raast: 03340976900)%0A%0A📸 *I am attaching my payment transfer screenshot below. Please verify and dispatch with priority guarantee!*`;
      return `https://wa.me/923363326666?text=${text}`;
    } else {
      const text = `Salam The Hanli Bazar! I have placed a *Cash on Delivery (COD)* order:%0A%0A*Order Reference:* ${orderId}%0A*Customer Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*City:* ${formData.city}%0A*Address:* ${formData.address}%0A%0A*Items Ordered:*%0A${itemsList}%0A%0A*Total Due at Doorstep:* Rs. ${netPayable.toLocaleString()} (Includes Rs. ${shippingCharges} delivery)%0A*Payment Method:* Cash on Delivery (COD)%0A%0A*Solemn Pledge Confirmed:* "I swear by God that I will try my best to receive the parcel and not ditch it."%0A%0APlease confirm my booking!`;
      return `https://wa.me/923363326666?text=${text}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-white">
        {/* HEADER */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-stone-900/80">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {orderComplete ? 'Order Confirmed!' : 'Secure Checkout — The Hanli Bazar'}
              </h3>
              <p className="text-[11px] text-amber-300 font-serif">
                Dispatch Hub: Islamabad, Pakistan • WhatsApp: 0336 3326666
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {!orderComplete ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* PAYMENT METHOD SELECTOR (ONLINE 10% DISCOUNT PROMINENTLY FIRST) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                    Select Payment Method:
                  </label>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Save 10% with Online Payment
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* OPTION 1: ONLINE PAYMENT (RECOMMENDED / 10% OFF) */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'online' })}
                    className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isOnline
                        ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg'
                        : 'bg-stone-900/60 border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                      🔥 10% OFF
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={isOnline}
                        onChange={() => {}}
                        className="accent-emerald-500 mt-1"
                      />
                      <div>
                        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Online / Bank / Raast</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-0.5">
                          UBL Bank, Raast, Nayapay, Sadapay, JazzCash, Easypaisa
                        </p>
                        <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                          ✓ Save 10% on Subtotal (-Rs. {Math.round(rawSubtotal * 0.10).toLocaleString()})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OPTION 2: CASH ON DELIVERY (COD) */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      !isOnline
                        ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/30 text-white shadow-lg'
                        : 'bg-stone-900/60 border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={!isOnline}
                        onChange={() => {}}
                        className="accent-amber-500 mt-1"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Cash on Delivery (COD)</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Pay cash at doorstep to courier
                        </p>
                        <div className="text-[10px] text-zinc-500 mt-1">
                          Standard price (No 10% discount)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC ORDER SUMMARY PILL */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Bedding Subtotal:</span>
                  <span className="text-white font-medium">Rs. {rawSubtotal.toLocaleString()}</span>
                </div>

                {isOnline ? (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-xl border border-emerald-500/30">
                    <span className="flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5" />
                      Online Payment Incentive (10% Discount):
                    </span>
                    <span>- Rs. {onlineDiscount.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-xl border border-amber-500/20">
                    💡 <strong>Tip:</strong> Choose <strong>Online Payment</strong> above to save <strong>Rs. {Math.round(rawSubtotal * 0.10).toLocaleString()}</strong> instantly!
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Courier Delivery (Nationwide):</span>
                  <span className="text-zinc-300">Rs. {shippingCharges.toLocaleString()} (on customer)</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 block">Total Payable:</span>
                    <span className="text-2xl font-black text-amber-300">
                      Rs. {netPayable.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      isOnline 
                        ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300' 
                        : 'bg-amber-950 border-amber-500/40 text-amber-300'
                    }`}>
                      {isOnline ? 'Online (10% Off)' : 'Cash on Delivery'}
                    </span>
                  </div>
                </div>
              </div>

              {/* OFFICIAL ONLINE PAYMENT ACCOUNTS BOX */}
              {isOnline && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-stone-900 to-stone-900 border border-emerald-500/40 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white text-xs">
                        Official Payment Accounts
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 font-semibold">
                      Account Title: <strong>Muhammad Arham Ghani</strong>
                    </span>
                  </div>

                  {/* GRID OF ACCOUNTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 1. RAAST & DIGITAL WALLETS */}
                    <div className="p-3 rounded-xl bg-stone-950/80 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                          Raast / Wallets (0% Fee)
                        </span>
                        <span className="text-[9px] text-zinc-400">Nayapay • Sadapay • Easypaisa • Jazzcash</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-stone-900 p-2 rounded-lg border border-white/5">
                        <span className="font-mono font-bold text-white text-xs">03340976900</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('03340976900', 'wallet')}
                          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-emerald-600 hover:text-white text-[10px] font-bold text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedField === 'wallet' ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'wallet' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Title: <strong className="text-zinc-200">Muhammad Arham Ghani</strong>
                      </div>
                    </div>

                    {/* 2. UBL BANK ACCOUNT & IBAN */}
                    <div className="p-3 rounded-xl bg-stone-950/80 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-amber-400" />
                          UBL Bank (Direct Transfer)
                        </span>
                        <span className="text-[9px] text-zinc-400">United Bank Limited</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between bg-stone-900 px-2 py-1.5 rounded-lg border border-white/5">
                          <div className="text-[10px] text-zinc-400">
                            A/C: <span className="font-mono font-bold text-white text-xs">1132304778395</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('1132304778395', 'ubl-acc')}
                            className="px-2 py-0.5 rounded bg-stone-800 hover:bg-amber-600 hover:text-white text-[10px] font-bold text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedField === 'ubl-acc' ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'ubl-acc' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-stone-900 px-2 py-1.5 rounded-lg border border-white/5">
                          <div className="text-[10px] text-zinc-400 truncate max-w-[170px]">
                            IBAN: <span className="font-mono font-bold text-white text-[11px]">PK26UNIL0109000304778395</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('PK26UNIL0109000304778395', 'ubl-iban')}
                            className="px-2 py-0.5 rounded bg-stone-800 hover:bg-amber-600 hover:text-white text-[10px] font-bold text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                          >
                            {copiedField === 'ubl-iban' ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'ubl-iban' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Title: <strong className="text-zinc-200">Muhammad Arham Ghani</strong>
                      </div>
                    </div>
                  </div>

                  {/* WHATSAPP SCREENSHOT INSTRUCTION */}
                  <div className="p-2.5 rounded-xl bg-emerald-900/25 border border-emerald-500/30 text-[11px] text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      After transfer, send your receipt screenshot to our WhatsApp (<strong>0336 3326666</strong>). Your order will be sealed with a <strong>Priority Dispatch Guarantee</strong>!
                    </span>
                  </div>
                </div>
              )}

              {/* CASH ON DELIVERY SOLEMN OATH (MANDATORY WHEN COD SELECTED) */}
              {!isOnline && (
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/50 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Cash on Delivery Solemn Oath (خدا کی قسم حلف):</span>
                  </div>
                  
                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={codOathChecked}
                      onChange={(e) => setCodOathChecked(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 mt-0.5 shrink-0 rounded cursor-pointer"
                    />
                    <div className="text-xs text-zinc-200 leading-snug">
                      <strong className="text-amber-300">
                        "I swear by God that I will try my best to receive the parcel and not try to ditch it."
                      </strong>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        (خدا کی قسم میں پوری کوشش کروں گا/گی کہ پارسل موصول کروں اور بلاوجہ مسترد یا ڈچ نہ کروں۔)
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* CUSTOMER DELIVERY DETAILS FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    Full Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Bilal"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="space-y-1 sm:col-span-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-zinc-500">For dispatch verification & receipt</span>
                </div>

                {/* City Selection */}
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    Delivery City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {MAJOR_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    Complete Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House / Flat #, Street #, Sector / Area / Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* TERMS & CONDITIONS AGREEMENT */}
              <div className="flex items-center justify-between text-xs pt-1 text-zinc-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="accent-amber-500 w-3.5 h-3.5 rounded cursor-pointer"
                  />
                  <span>I agree to the ordering terms & conditions</span>
                </label>

                <button
                  type="button"
                  onClick={() => onOpenTerms && onOpenTerms()}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer text-[11px] flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  View Terms & Conditions
                </button>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                  isOnline
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-stone-950 shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 shadow-amber-500/25'
                }`}
              >
                {isOnline ? (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Online Order (Rs. {netPayable.toLocaleString()} • 10% Off)</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4" />
                    <span>Place Cash on Delivery Order (Rs. {netPayable.toLocaleString()})</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            // SUCCESS CONFIRMATION SCREEN WITH ACCOUNTS & WHATSAPP GUARANTEE
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Mubarak & Welcome to The Hanli Tribe!
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  Your Bedding Order is Booked.
                </h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-md mx-auto leading-relaxed">
                  {isOnline 
                    ? 'Send your payment transfer screenshot to our official WhatsApp below so we can immediately dispatch your order with priority guarantee!'
                    : 'Your Cash on Delivery order is logged. Please send confirmation on WhatsApp to secure rapid dispatch.'}
                </p>
              </div>

              {/* ORDER DETAILS BOX */}
              <div className="w-full p-3.5 rounded-2xl bg-stone-900 border border-amber-500/30 text-left space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs text-zinc-400">Order Reference ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-300">{orderId}</span>
                    <button
                      onClick={() => copyToClipboard(orderId, 'order-id')}
                      className="text-zinc-400 hover:text-white p-1"
                      title="Copy Order ID"
                    >
                      {copiedField === 'order-id' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {copiedField === 'order-id' && <span className="text-[10px] text-emerald-400">Copied!</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Deliver To:</span>
                    <strong>{formData.name}</strong> ({formData.city})
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Net Payable:</span>
                    <strong className="text-amber-300">Rs. {netPayable.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Payment Method:</span>
                    <strong className={isOnline ? 'text-emerald-400' : 'text-amber-300'}>
                      {isOnline ? 'Online (10% Discount Applied)' : 'Cash on Delivery (COD)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Estimated Delivery:</span>
                    <strong>2 to 4 Business Days</strong>
                  </div>
                </div>
              </div>

              {/* IF ONLINE: SHOW ACCOUNTS DIRECTLY ON CONFIRMATION FOR EASY TRANSFER */}
              {isOnline && (
                <div className="w-full p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
                      <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                      Transfer Rs. {netPayable.toLocaleString()} to:
                    </span>
                    <span className="text-[10px] text-zinc-300">Title: <strong>Muhammad Arham Ghani</strong></span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-stone-900 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-400 block">Raast / Wallets (Nayapay/Sadapay/JazzCash/Easypaisa):</span>
                        <span className="font-mono font-bold text-white">03340976900</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('03340976900', 'conf-wallet')}
                        className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-zinc-300 hover:text-white"
                      >
                        {copiedField === 'conf-wallet' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="p-2 rounded-lg bg-stone-900 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-400 block">UBL Account:</span>
                        <span className="font-mono font-bold text-white">1132304778395</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('1132304778395', 'conf-ubl')}
                        className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-zinc-300 hover:text-white"
                      >
                        {copiedField === 'conf-ubl' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PROMINENT WHATSAPP VERIFICATION CTA */}
              <div className="w-full space-y-2 pt-1">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all cursor-pointer transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {isOnline 
                      ? '📱 Send Payment Screenshot on WhatsApp (0336 3326666) to Guarantee Order' 
                      : '📱 Send COD Confirmation to WhatsApp (0336 3326666)'}
                  </span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Order Receipt</span>
                </button>
              </div>

              <div className="pt-1 text-[11px] text-zinc-500">
                Official store: <strong>THE HANLI BAZAR</strong> (thehanlibazar.com) • Islamabad, Pakistan • WhatsApp: 0336 3326666
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
