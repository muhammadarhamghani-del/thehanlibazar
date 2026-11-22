import React, { useState } from 'react';
import { CHARACTERS } from '../data/characters';
import { 
  Sparkles, 
  Quote, 
  ShieldCheck, 
  Glasses, 
  ArrowRight,
  MessageSquare,
  Award
} from 'lucide-react';

export default function CharactersSection({ onSelectProduct }) {
  const [activeChar, setActiveChar] = useState(CHARACTERS[0]);

  return (
    <section id="hanli-tribe" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <Glasses className="w-4 h-4 text-amber-400" />
          <span>The Hanli Swag • Character Bible</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Meet the Guardians of Quality.
        </h2>
        <p className="text-base text-zinc-400 mt-3 leading-relaxed">
          Historical warriors and modern managers unite with dark sunglasses and zero tolerance 
          for poor-quality polyester. Each character rigorously inspects a specific bedding standard.
        </p>
      </div>

      {/* INTERACTIVE SPOTLIGHT SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 shadow-2xl">
        {/* CHARACTER PHOTO & SWAG BADGE */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 group">
            <img
              src={activeChar.image}
              alt={activeChar.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            
            {/* Sunglasses Swag Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-[11px] text-amber-300 font-bold">
              <Glasses className="w-3.5 h-3.5" />
              <span>Hanli Swag Shades</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-left">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                {activeChar.badge}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {activeChar.name}
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                {activeChar.title}
              </p>
            </div>
          </div>
        </div>

        {/* CHARACTER DIALOGUE & BEDDING ROLE */}
        <div className="lg:col-span-7 flex flex-col space-y-5 text-left">
          {/* Urdu / Roman Urdu Catchphrase */}
          <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 relative">
            <Quote className="absolute top-3 right-3 w-8 h-8 text-amber-500/20" />
            
            <p className="text-xl sm:text-2xl font-serif text-amber-200 font-semibold mb-2 leading-relaxed" dir="rtl">
              {activeChar.urduCatchphrase}
            </p>
            <p className="text-sm font-semibold text-amber-400 italic">
              "{activeChar.romanUrduQuote}"
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              — {activeChar.englishMeaning}
            </p>
          </div>

          {/* Bedding Specialty */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-stone-900 border border-white/10 text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Bedding Specialty:</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                  {activeChar.beddingSpecialty}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-stone-900 border border-white/10 text-emerald-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Quality Verdict:</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                  "{activeChar.verdict}"
                </p>
              </div>
            </div>
          </div>

          {/* Action to View Their Recommended Bed Sheet */}
          <div className="pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('bed-collections');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Explore {activeChar.name.split(' ')[0]}'s Top Pick</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CHARACTER THUMBNAIL ROSTER TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => setActiveChar(char)}
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${
              activeChar.id === char.id
                ? 'bg-amber-950/60 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-stone-900/60 border-white/5 hover:border-white/20 hover:bg-stone-900'
            }`}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 mb-2 relative">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-white line-clamp-1">
              {char.name}
            </span>
            <span className="text-[10px] text-amber-400/80 line-clamp-1">
              {char.badge}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
