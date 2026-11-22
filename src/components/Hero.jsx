import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Truck, 
  Layers, 
  CheckCircle,
  Eye
} from 'lucide-react';

export default function Hero({ onExplore3D, onShopNow }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 pt-8 pb-16">
      {/* BACKGROUND IMAGE WITH CINEMATIC LIGHTING */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/cover.png"
          alt="The Hanli Bazar Royal Bedroom Suite"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform hover:scale-100 transition-transform duration-1000"
          onError={(e) => {
            // fallback if cover image fails
            e.target.style.display = 'none';
          }}
        />
        {/* Gradients to blend smoothly into the dark royal aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-stone-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>THE HANLI BAZAR • thehanlibazar.com</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                🇵🇰 Nationwide Cash on Delivery
              </span>
            </div>

            {/* Slogan & Main Headline */}
            <div>
              <p className="text-amber-400 font-serif italic text-lg sm:text-xl tracking-wide mb-2">
                "Jahan Shopping Na Karna Bhi Jurm Hai!"
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Ottoman Royalty Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Pure Cotton Comfort.
                </span>
              </h1>
            </div>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Say goodbye to rough fabrics and cheap synthetic blends. 
              We bring you <strong className="text-white">100% Micro Fabric Egypt Cotton</strong>, 
              <strong className="text-white"> generous 92"x94" King flat bedspreads</strong>, and 
              advanced ultrasonic quilted sets in 7 vibrant shades at honest mill prices.
            </p>

            {/* 4 Quick Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full py-2">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-white/5 flex flex-col gap-1">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white">Egypt Cotton Touch</span>
                <span className="text-[11px] text-zinc-400">100% Micro Fabric</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-900/80 border border-white/5 flex flex-col gap-1">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">King Flat Bed Sheet</span>
                <span className="text-[11px] text-zinc-400">Generous 92"x94" Cut</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-900/80 border border-white/5 flex flex-col gap-1">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-bold text-white">Fast Reactive Dyes</span>
                <span className="text-[11px] text-zinc-400">Never bleeds in wash</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-900/80 border border-white/5 flex flex-col gap-1">
                <Truck className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-bold text-white">Nationwide COD</span>
                <span className="text-[11px] text-zinc-400">200+ cities in Pakistan</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onShopNow}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <span>Shop Bedding Collections</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={onExplore3D}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Launch 3D Bed Studio</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9 / 5</span>
                <span>(1,240+ Reviews)</span>
              </div>

              <span className="text-zinc-600">|</span>

              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>12,000+ Pakistani Beds Upgraded</span>
              </div>
            </div>
          </div>

          {/* RIGHT HERO CARD / 3D TEASER PREVIEW */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-stone-900/90 to-stone-950/90 shadow-2xl p-4 sm:p-6 backdrop-blur-xl group">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Interactive 3D Preview
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                  Ottoman Palace Bed Suite
                </span>
              </div>

              {/* Visual Bed Showcase Image */}
              <div 
                onClick={onExplore3D}
                className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 group-hover:border-amber-500/50 transition-all"
              >
                <img
                  src="/assets/cover.jpg"
                  alt="3D Bedding Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-Time 3D Color & Texture Switcher</span>
                  </span>
                  <p className="text-sm font-bold text-white">
                    Customize Sheets in Burgundy, Emerald, Navy & Gold
                  </p>
                </div>
              </div>

              {/* Ertuğrul Bey Endorsement Banner */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3">
                <img
                  src="/assets/characters/ertugrul.jpg"
                  alt="Ertugrul Bey"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-300">
                    Ertuğrul Gazi — Supreme Bey
                  </span>
                  <span className="text-xs text-zinc-300 italic">
                    "Only 100% pure export combed cotton is worthy of our tribe."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
