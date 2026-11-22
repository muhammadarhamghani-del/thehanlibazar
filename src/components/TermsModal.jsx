import React from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Percent, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  PhoneCall, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-3xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto text-white">
        {/* HEADER */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-stone-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Terms & Conditions of Ordering
              </h3>
              <p className="text-xs text-amber-400 font-serif">
                THE HANLI BAZAR • thehanlibazar.com • Islamabad
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 text-zinc-400 hover:text-white border border-white/10 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-zinc-300 leading-relaxed">
          
          {/* NOTICE CALLOUT: 10% ONLINE DISCOUNT INCENTIVE */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-stone-900 border border-emerald-500/40 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Percent className="w-4 h-4" />
              <span>10% Instant Online Payment Discount Incentive</span>
            </div>
            <p className="text-zinc-300 text-xs">
              We strongly encourage customers to pay online using <strong>UBL Bank Transfer, Raast ID, Nayapay, Sadapay, JazzCash, or Easypaisa</strong>. Customers who pay online receive an instant <strong>10% DISCOUNT</strong> on their subtotal.
            </p>
            <div className="p-3 rounded-xl bg-stone-950/80 border border-white/10 space-y-1 text-[11px]">
              <div><strong>Account Title:</strong> <span className="text-emerald-300">Muhammad Arham Ghani</span></div>
              <div><strong>Raast ID / Nayapay / Sadapay / Easypaisa / Jazzcash:</strong> <span className="font-mono text-white font-bold">03340976900</span></div>
              <div><strong>UBL Account No:</strong> <span className="font-mono text-white font-bold">1132304778395</span> | <strong>IBAN:</strong> <span className="font-mono text-white font-bold">PK26UNIL0109000304778395</span></div>
            </div>
            <p className="text-emerald-300 font-semibold text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Send payment screenshot to WhatsApp (<strong>0336 3326666</strong>) for guaranteed priority queue dispatch.
            </p>
          </div>

          {/* SECTION 1: SHIPPING & TRANSFER CHARGES */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>1. Shipping & Bank Transfer Charges</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>
                <strong>Shipping / Courier Charges:</strong> A flat courier shipping fee of <strong>Rs. 250</strong> applies nationwide across Pakistan and is payable by the customer.
              </li>
              <li>
                <strong>Transfer Charges:</strong> Any interbank fund transfer (IBFT) charges or gateway processing fees charged by your sending bank are borne by the customer.
              </li>
            </ul>
          </div>

          {/* SECTION 2: CASH ON DELIVERY (COD) SOLEMN OATH & DITCHING POLICY */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>2. Cash on Delivery (COD) Solemn Pledge & Policy</span>
            </div>
            <p className="text-zinc-200 font-medium">
              When placing an order via Cash on Delivery, the customer explicitly makes a solemn promise:
            </p>
            <div className="p-3.5 rounded-xl bg-stone-950/90 border border-amber-500/50 text-amber-200 text-xs italic font-semibold">
              "I swear by God that I will try my best to receive the parcel when the courier arrives and will not try to ditch or reject it."
              <span className="block text-[11px] text-zinc-400 mt-1 not-italic font-normal">
                (خدا کی قسم میں پوری کوشش کروں گا/گی کہ پارسل موصول کروں اور بلاوجہ مسترد یا ڈچ نہ کروں۔)
              </span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Every unreceived or ditched COD parcel costs us double courier return charges, packaging waste, and stock lockup. We honor every customer with honest mill pricing, and in return, we ask for complete honesty and commitment upon arrival of your parcel.
            </p>
          </div>

          {/* SECTION 3: WHATSAPP SCREENSHOT VERIFICATION & GUARANTEE */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>3. WhatsApp Screenshot Guarantee Flow</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>
                Once you complete your payment via Bank Transfer, Raast, or Card, you must send a clear screenshot of the transfer receipt to our official WhatsApp: <strong>0336 3326666</strong>.
              </li>
              <li>
                Upon receipt of the screenshot, our dispatch manager assigns a <strong>Guaranteed Priority Dispatch Seal</strong> to your order, packaging your items immediately for the earliest courier pickup.
              </li>
            </ul>
          </div>

          {/* SECTION 4: DISPATCH & DELIVERY TIMELINES */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>4. Dispatch & Order Verification</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>
                All orders are dispatched directly from our <strong>Islamabad Textile Hub</strong> within 24 to 48 business hours.
              </li>
              <li>
                Estimated delivery time is <strong>2 to 4 working days</strong> across all major and minor cities of Pakistan (including Punjab, Sindh, KPK, Balochistan, AJK, and Gilgit-Baltistan).
              </li>
              <li>
                Our verification team may contact you via WhatsApp or phone call to confirm your delivery address before booking with TCS / Leopard / Trax / Call Courier.
              </li>
            </ul>
          </div>

          {/* SECTION 5: PRODUCT SPECIFICATIONS & SIZING */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>5. Product Quality & Sizing</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>
                All bedspread sets are <strong>generous King Flat Bed Sheets (92"x94")</strong> accompanied by <strong>2 Quilted Pillowcases (19"x29")</strong> crafted from 100% Micro Fabric Egypt Cotton with ultrasonic diamond-embossed quilting.
              </li>
              <li>
                Sheets are normal flat sheets with ample drop to tuck deeply under any King or Queen mattress. We do not sell elastic fitted sheets.
              </li>
            </ul>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-stone-900/60 flex items-center justify-between">
          <div className="text-[11px] text-zinc-400">
            For support & verification: <strong className="text-amber-300">WhatsApp 0336 3326666</strong>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-md"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
