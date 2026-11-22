import React from 'react';
import { REVIEWS, GUARANTEES } from '../data/reviews';
import { Star, ShieldCheck, CheckCircle2, Sparkles, Layers, Truck, Heart } from 'lucide-react';

export default function ReviewsSection() {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
    Layers: Layers,
    Truck: Truck
  };

  return (
    <section id="reviews-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 4 CORE VALUE PILLARS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {GUARANTEES.map((g) => {
          const IconComponent = iconMap[g.icon] || ShieldCheck;
          return (
            <div 
              key={g.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/20 shadow-xl flex flex-col justify-between text-left group hover:border-amber-400/50 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {g.title}
                </h4>
                <p className="text-xs font-semibold text-amber-400 mb-2">
                  {g.tagline}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {g.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* REVIEWS HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Verified Household Ratings</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Loved by Over 12,000+ Pakistani Homes.
        </h2>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white font-bold text-lg">4.92 / 5.0</span>
          <span className="text-zinc-400 text-sm">(1,240+ verified buyer reviews)</span>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-stone-900/70 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between text-left space-y-4"
          >
            <div>
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </div>
              </div>

              {/* Title & Comment */}
              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                "{rev.title}"
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            {/* Reviewer & Product Details */}
            <div className="pt-3 border-t border-white/10 flex flex-col space-y-1">
              <span className="text-xs font-bold text-white">
                {rev.name}
              </span>
              <span className="text-[11px] text-zinc-400">
                {rev.city} • {rev.date}
              </span>
              <span className="text-[10px] text-amber-400/90 font-medium line-clamp-1">
                Ordered: {rev.product}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
