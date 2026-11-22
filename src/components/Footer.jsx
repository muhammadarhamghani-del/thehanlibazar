import React, { useState } from 'react';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Camera,
  Share2,
  Send,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-amber-500/20 text-zinc-400 text-xs">
      {/* NEWSLETTER BANNER */}
      <div className="border-b border-white/5 bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Join The Hanli Tribe</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Unlock 10% Off Your First Luxury Bed Set.
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Receive VIP drop alerts, limited-edition bridal discounts, and bedroom decor advice.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md"
            >
              {subscribed ? 'Subscribed!' : 'Join Tribe'}
            </button>
          </form>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 p-0.5 bg-gradient-to-br from-amber-500/20 to-stone-900">
                <img 
                  src="/assets/logo.png" 
                  alt="The Hanli Bazar Logo" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-white">
                  The Hanli Bazar
                </span>
                <span className="block text-[10px] text-amber-400 font-serif uppercase tracking-widest">
                  A Bazaar Beyond Ordinary
                </span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs pr-4">
              Inspired by the historic Ottoman bazaar and crafted from premium Egypt cotton micro fabric. 
              We eliminate middlemen to bring you luxury King flat bedspreads (92"x94"), ultrasonic quilted sets, 
              and vibrant bedroom collections at honest mill pricing.
            </p>

            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 text-xs">
              <span className="text-amber-400 font-bold block mb-1">Official Website:</span>
              <a 
                href="https://thehanlibazar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 font-mono underline"
              >
                thehanlibazar.com
              </a>
              <span className="text-zinc-500 mx-1.5">•</span>
              <span className="text-amber-300 font-serif font-bold tracking-wide">The Hanli Bazar</span>
            </div>

            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a 
                href="https://instagram.com/TheHanliBazar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-900 hover:text-amber-400 border border-white/5 transition-colors flex items-center gap-1.5"
                title="Instagram"
              >
                <Camera className="w-4 h-4" />
                <span className="text-[10px]">Instagram</span>
              </a>
              <a 
                href="https://facebook.com/TheHanliBazar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-900 hover:text-amber-400 border border-white/5 transition-colors flex items-center gap-1.5"
                title="Facebook"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[10px]">Community</span>
              </a>
              <a 
                href="https://wa.me/923363326666" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-900 hover:text-emerald-400 border border-white/5 transition-colors"
                title="WhatsApp Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SHOPPING CATEGORIES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bedding Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  100% Export Cotton
                </a>
              </li>
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  Ultra Sonic Quilted Sets
                </a>
              </li>
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  Royal Velvet Bridal Sets
                </a>
              </li>
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  5-Star Hotel Stripe Percale
                </a>
              </li>
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  Turgut Tear-Tested Twill
                </a>
              </li>
              <li>
                <a href="#bed-collections" className="hover:text-amber-400 transition-colors">
                  Cozy Winter Flannel
                </a>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors">
                  Nationwide Cash on Delivery (COD)
                </a>
              </li>
              <li>
                <a href="#unboxing-card" className="hover:text-amber-400 transition-colors">
                  Washing & Care Instructions
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors">
                  Mattress Size & Depth Guide
                </a>
              </li>
              <li>
                <a href="https://wa.me/923363326666" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Track Your Dispatch Parcel
                </a>
              </li>
            </ul>
          </div>

          {/* HEADQUARTERS & CONTACT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Location & Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: 0336 3326666</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>support@thehanlibazar.com</span>
              </div>
              <div className="pt-2">
                <div className="p-2.5 rounded-lg bg-stone-900 border border-white/5 text-[11px] text-zinc-300">
                  <span className="font-serif italic text-amber-300">
                    "Jahan Shopping Na Karna Bhi Jurm Hai!"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            © {new Date().getFullYear()} THE HANLI BAZAR (thehanlibazar.com). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>100% Export-Quality Bedding</span>
            <span>•</span>
            <span>Cash on Delivery Pakistan</span>
            <span>•</span>
            <span>King Flat Bedspreads (92x94")</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
