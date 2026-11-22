import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-amber-500/25">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-stone-950 text-xs py-1.5 px-4 font-semibold tracking-wide text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Jahan Shopping Na Karna Bhi Jurm Hai! • 100% Export Cotton • Free Nationwide COD over Rs. 3,000</span>
        <span className="hidden md:inline px-2 py-0.5 rounded-full bg-black/15 text-[10px] font-bold uppercase tracking-wider">
          thehanlibazar.com
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* BRAND LOGO */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 p-0.5 bg-gradient-to-br from-amber-500/20 to-stone-900 group-hover:border-amber-400 transition-all shadow-md shadow-amber-500/10">
              <img 
                src="/assets/logo.png" 
                alt="The Hanli Bazar Logo" 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  The Hanli Bazar
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  3D Store
                </span>
              </div>
              <span className="text-[11px] text-amber-400/90 tracking-widest uppercase font-serif">
                A Bazaar Beyond Ordinary • thehanlibazar.com
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button 
              onClick={() => scrollToSection('bed-collections')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Bed Collections
            </button>
            <button 
              onClick={() => scrollToSection('3d-studio')}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Bed Studio</span>
            </button>
            <button 
              onClick={() => scrollToSection('fabric-lab')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Fabric Lab
            </button>
            <button 
              onClick={() => scrollToSection('hanli-tribe')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Hanli Tribe
            </button>
            <button 
              onClick={() => scrollToSection('reviews-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('unboxing-card')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Packaging Card
            </button>
            <button 
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              FAQ
            </button>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Support Button */}
            <a 
              href="https://wa.me/923363326666?text=Salam%20The%20Hanli%20Bazar!%20I%20want%20to%20order%20premium%20bed%20sheets."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp COD</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all cursor-pointer transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-300 text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-amber-500/30 px-6 py-6 space-y-4 animate-fadeIn">
          <button 
            onClick={() => scrollToSection('bed-collections')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            🛏️ Bed Collections
          </button>
          <button 
            onClick={() => scrollToSection('3d-studio')}
            className="block w-full text-left py-2 text-base font-medium text-amber-300 hover:text-amber-200"
          >
            ✨ Interactive 3D Bed Studio
          </button>
          <button 
            onClick={() => scrollToSection('fabric-lab')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            🔬 Fabric & Weave Lab
          </button>
          <button 
            onClick={() => scrollToSection('hanli-tribe')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            ⚔️ Hanli Tribe (Ertuğrul & Characters)
          </button>
          <button 
            onClick={() => scrollToSection('reviews-section')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            ⭐ Customer Reviews
          </button>
          <button 
            onClick={() => scrollToSection('unboxing-card')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            📦 Unboxing Packaging Card
          </button>
          <button 
            onClick={() => scrollToSection('faq-section')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-amber-400"
          >
            ❓ FAQs
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a 
              href="https://wa.me/923363326666?text=Salam%20The%20Hanli%20Bazar!%20I%20want%20to%20order%20premium%20bed%20sheets."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Order on WhatsApp (Fast COD)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
