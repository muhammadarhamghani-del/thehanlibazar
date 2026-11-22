import React, { useState } from 'react';
import { Package, Sparkles, RefreshCw, Camera, Phone, Globe, CheckCircle } from 'lucide-react';

export default function UnboxingCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="unboxing-card" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT TEXT DESCRIPTION */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Package className="w-4 h-4 text-amber-400" />
            <span>The Unboxing Ritual</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Every Parcel Holds A Royal Welcome.
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            When your parcel arrives at your doorstep, you aren't just opening a bedsheet—you are unwrapping 
            a piece of Turkish-inspired heritage. Every package includes our signature 
            <strong className="text-amber-300"> Tribe Unboxing Card</strong> with fabric care instructions, 
            exclusive discount codes, and customer direct support.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/70 border border-white/5">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm text-zinc-200">
                Eco-friendly reusable cotton packaging tote bag included with every King set.
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/70 border border-white/5">
              <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm text-zinc-200">
                Tag <strong>@TheHanliBazar</strong> on Instagram stories for a 15% discount on your next order!
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Flip Packaging Card to {isFlipped ? 'Front' : 'Care Guide'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT 3D FLIPPABLE PACKAGING CARD */}
        <div className="lg:col-span-6 flex justify-center perspective-[1000px]">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full max-w-md min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-700 transform relative shadow-2xl border-2 ${
              isFlipped 
                ? 'bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-amber-500/50' 
                : 'bg-gradient-to-br from-[#1C1715] via-[#2A1E1B] to-[#14100E] border-amber-500/60'
            }`}
          >
            {/* INNER CARD BORDER ACCENTS */}
            <div className="border border-amber-500/30 rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />

              {!isFlipped ? (
                // FRONT OF CARD
                <div className="flex flex-col items-center text-center justify-between h-full space-y-6">
                  <div>
                    <div className="w-14 h-14 rounded-full border border-amber-400/40 p-1 flex items-center justify-center bg-black/40 mx-auto mb-3 shadow-lg">
                      <span className="text-xl font-serif text-amber-300 font-bold">IYI</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-amber-400/90 font-bold">
                      THE HANLI BAZAR
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      A Bazaar Beyond Ordinary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <p className="text-base text-amber-200 font-serif italic">
                      "Salam & Welcome to the Tribe!"
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                      You are now holding handcrafted, 100% export-grade bedding designed for unmatched comfort, 
                      warrior durability, and royal elegance.
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-amber-500/20 flex flex-col items-center gap-1.5">
                    <p className="text-xs font-bold text-amber-400 font-serif italic">
                      "Jahan shopping na karna bhi jurm hai!"
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      Tap card to view Washing & Care Instructions ↺
                    </span>
                  </div>
                </div>
              ) : (
                // BACK OF CARD (CARE INSTRUCTIONS)
                <div className="flex flex-col text-left justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                        Care & Longevity Protocol
                      </span>
                      <span className="text-[10px] text-zinc-400">The Hanli Standard</span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-xs text-zinc-200">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span><strong>First Wash:</strong> Wash before first use in cold or gentle lukewarm water.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span><strong>Detergent:</strong> Use mild liquid detergent; avoid harsh chlorine bleach.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span><strong>Drying:</strong> Tumble dry on low or line-dry in gentle shade to preserve cotton softness.</span>
                      </li>
                    </ul>
                  </div>

                  {/* UGC CTA */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Tag Your Bedroom Makeover</span>
                    </div>
                    <p className="text-[11px] text-zinc-300">
                      Tag <strong>@TheHanliBazar</strong> on Instagram to get featured and unlock 15% off your next set.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>thehanlibazar.com • The Hanli Bazar</span>
                    <span>Tap to flip ↺</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
