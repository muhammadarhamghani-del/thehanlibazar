import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Film,
  Radio,
  Eye
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function BedsheetVideoModal({ 
  isOpen, 
  onClose, 
  initialProduct = null, 
  onAddToCart, 
  onBuyNow 
}) {
  if (!isOpen) return null;

  const [activeProduct, setActiveProduct] = useState(initialProduct || PRODUCTS[2]); // Default to Royal Sapphire Blue
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(25);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);

  // Sync when initialProduct changes on open
  useEffect(() => {
    if (initialProduct) {
      setActiveProduct(initialProduct);
    }
  }, [initialProduct]);

  // Video progress simulation loop (15 second reel)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Web Audio ambient sound synthesizer for luxury showroom atmosphere
  const toggleAudio = () => {
    if (isMuted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        // Play a warm harmonic chime
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz soothing healing tone
        osc.frequency.exponentialRampToValueAtTime(576, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.5);
        setIsMuted(false);
      } catch (e) {
        setIsMuted(false);
      }
    } else {
      setIsMuted(true);
    }
  };

  const currentSeconds = Math.floor((progress / 100) * 15);
  const formattedTime = `0:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / 0:15`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-5xl bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[95vh] flex flex-col my-auto text-white">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-stone-900/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-[11px] font-extrabold text-rose-400 uppercase tracking-widest animate-pulse">
              <Radio className="w-3 h-3 text-rose-400" /> Live Reel
            </span>
            <div className="hidden sm:block text-xs text-zinc-400 font-medium">
              THE HANLI BAZAR • 4K AI Showcase
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 hidden md:inline-block">
              {activeProduct.name}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-900 text-zinc-400 hover:text-white border border-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN VIDEO PLAYER BODY */}
        <div className="p-4 sm:p-6 flex flex-col space-y-5 overflow-y-auto">
          {/* VIDEO STAGE */}
          <div className="relative w-full h-80 sm:h-[430px] rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-2xl flex items-center justify-center group">
            {/* VIDEO REEL MEDIA */}
            <img
              src={activeProduct.videoReel?.src || activeProduct.realImage}
              alt={activeProduct.videoReel?.title || activeProduct.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-100' : 'scale-95 opacity-80'}`}
            />

            {/* CINEMATIC OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/40 pointer-events-none" />

            {/* TOP METADATA PILLS */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {activeProduct.videoReel?.fps || '60 FPS AI Reel'}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300">
                  {activeProduct.videoReel?.aspect || 'Cinematic Showcase'}
                </span>
              </div>

              <div className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                {formattedTime}
              </div>
            </div>

            {/* CENTER PLAY/PAUSE OVERLAY ON PAUSE */}
            {!isPlaying && (
              <div 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-10"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl transform scale-100 hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* BOTTOM CONTROLS BAR */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col space-y-2.5 z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
              {/* TIMELINE PROGRESS SCRUBBER */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress((clickX / rect.width) * 100);
                }}
                className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar"
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full relative transition-all duration-150"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100" />
                </div>
              </div>

              {/* CONTROLS ROW */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleAudio}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    title={isMuted ? 'Unmute Ambient Room Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    <span className="hidden sm:inline text-[11px] text-zinc-300">
                      {isMuted ? 'Muted' : 'Harmonic Chime'}
                    </span>
                  </button>

                  <span className="text-zinc-400 font-mono hidden sm:inline">
                    {formattedTime}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-zinc-300 text-xs hidden md:inline">
                    King 92"x94" Flat Sheet + 2 Pillows
                  </span>
                  <button
                    onClick={() => onBuyNow && onBuyNow(activeProduct)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Buy Now • Rs. 3,850
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* "SEE OTHER BEDSHEETS THAT ARE LIVE" SELECTOR RAIL */}
          <div className="flex flex-col space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <h4 className="text-sm font-bold text-zinc-200">
                  Switch Live Bedsheet Showcase:
                </h4>
              </div>
              <span className="text-xs text-amber-400/90 font-medium">
                Tap any shade to switch video reel & gallery
              </span>
            </div>

            {/* HORIZONTAL LIVE BEDSHEET CAROUSEL */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {PRODUCTS.map((prod) => {
                const isActive = prod.id === activeProduct.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setActiveProduct(prod);
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    className={`relative p-2.5 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer border ${
                      isActive 
                        ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/20 scale-105' 
                        : 'bg-stone-900/60 border-white/10 hover:border-white/30 hover:bg-stone-900'
                    }`}
                  >
                    {/* Active Pill */}
                    {isActive && (
                      <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[9px] font-extrabold uppercase tracking-wider shadow">
                        Live Now
                      </span>
                    )}

                    {/* Thumbnail Image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 mb-2 relative shadow-inner">
                      <img
                        src={prod.realImage}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0 opacity-40 mix-blend-color"
                        style={{ backgroundColor: prod.defaultColor }}
                      />
                    </div>

                    <span className="text-[11px] font-bold line-clamp-1 text-zinc-200">
                      {prod.colors[0].name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      Rs. 3,850
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
