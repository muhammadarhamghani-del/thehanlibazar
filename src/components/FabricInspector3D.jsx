import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, CheckCircle2, XCircle, Wind, ShieldCheck, Sparkles } from 'lucide-react';

export default function FabricInspector3D() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(65); // 0 to 100
  const [fabricType, setFabricType] = useState('cotton'); // 'cotton' vs 'polyester'
  const [showAirflow, setShowAirflow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Initialize airflow particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: -0.8 - Math.random() * 1.2,
        radius: 1.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Dark background
      ctx.fillStyle = '#0f0e0d';
      ctx.fillRect(0, 0, width, height);

      // Thread weave simulation based on zoom and fabric type
      const normalizedZoom = zoom / 100;
      const gridSpacing = 8 + normalizedZoom * 32;
      const threadWidth = 3 + normalizedZoom * 14;

      // Draw Warp & Weft Threads
      if (fabricType === 'cotton') {
        // Natural breathable combed cotton weave
        ctx.strokeStyle = '#6B1D2F'; // Burgundy yarn
        ctx.lineWidth = threadWidth;
        ctx.lineCap = 'round';

        // Vertical Warp Threads
        for (let x = 0; x < width + gridSpacing; x += gridSpacing) {
          ctx.beginPath();
          ctx.strokeStyle = (Math.floor(x / gridSpacing) % 2 === 0) ? '#7E2337' : '#5C1727';
          ctx.moveTo(x, 0);
          // slight natural wavy curve of natural organic cotton
          for (let y = 0; y < height; y += 20) {
            const wave = Math.sin((y + x) * 0.05) * (normalizedZoom * 3);
            ctx.lineTo(x + wave, y);
          }
          ctx.stroke();
        }

        // Horizontal Weft Threads (interlaced)
        for (let y = 0; y < height + gridSpacing; y += gridSpacing) {
          ctx.beginPath();
          ctx.strokeStyle = (Math.floor(y / gridSpacing) % 2 === 0) ? '#D4AF37' : '#8C233B';
          ctx.moveTo(0, y);
          for (let x = 0; x < width; x += 20) {
            const wave = Math.cos((x + y) * 0.05) * (normalizedZoom * 3);
            ctx.lineTo(x, y + wave);
          }
          ctx.stroke();
        }

        // Natural cotton fiber microscopic fuzz at high zoom
        if (zoom > 50) {
          ctx.strokeStyle = 'rgba(253, 251, 247, 0.25)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 50; i++) {
            const fx = (i * 37) % width;
            const fy = (i * 73) % height;
            ctx.beginPath();
            ctx.arc(fx, fy, 4 * normalizedZoom, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      } else {
        // Cheap plastic polyester - suffocating synthetic mesh
        ctx.fillStyle = '#1c1c20';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = '#44444e';
        ctx.lineWidth = threadWidth * 1.2;
        // Rigid synthetic uniform lines
        for (let x = 0; x < width + gridSpacing; x += gridSpacing * 0.7) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height + gridSpacing; y += gridSpacing * 0.7) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Synthetic sheen plastic film
        ctx.fillStyle = 'rgba(100, 100, 130, 0.35)';
        ctx.fillRect(0, 0, width, height);
      }

      // Airflow Simulation Particles
      if (showAirflow) {
        if (fabricType === 'cotton') {
          // Air easily flows through cotton channels
          particles.forEach((p) => {
            p.y += p.vy;
            if (p.y < 0) p.y = height;

            ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        } else {
          // Trapped heat / sweat in polyester
          particles.forEach((p) => {
            // Trapped particles bounce at the surface
            p.y += Math.sin(Date.now() * 0.005 + p.x) * 0.5;
            ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.beginPath();
            ctx.arc(p.x, p.y % (height * 0.3) + height * 0.65, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      // Microscope crosshair & vignette at high zoom
      const grad = ctx.createRadialGradient(width / 2, height / 2, width * 0.2, width / 2, height / 2, width * 0.5);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Measurement Scale
      ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.font = '11px monospace';
      ctx.fillText(`${Math.round(400 * (zoom / 100))}X Micro-Zoom • 400 TC`, 16, 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [zoom, fabricType, showAirflow]);

  return (
    <div className="w-full bg-gradient-to-b from-stone-900 to-black p-6 md:p-8 rounded-2xl border border-amber-500/20 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Fabric Laboratory</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Microscopic Weave & Breathability Inspector
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Compare The Hanli 100% Export Pure Combed Cotton vs Cheap Synthetic Polyester Blends.
          </p>
        </div>

        {/* Fabric Type Selector */}
        <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-white/10">
          <button
            onClick={() => setFabricType('cotton')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              fabricType === 'cotton'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Pure Export Cotton</span>
          </button>
          <button
            onClick={() => setFabricType('polyester')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              fabricType === 'polyester'
                ? 'bg-rose-900 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Market Polyester Blend</span>
          </button>
        </div>
      </div>

      {/* CANVAS & INTERACTIVE ZOOM SLIDER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Canvas Visualizer */}
        <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-amber-500/30 shadow-inner">
          <canvas
            ref={canvasRef}
            width={580}
            height={360}
            className="w-full h-auto block"
          />

          {/* Floating Zoom overlay badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs text-zinc-300">
            <Wind className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {fabricType === 'cotton' ? 'Airflow: 100% Breathable Micro-Vents' : 'Airflow: Blocked Heat & Trapped Sweat'}
            </span>
          </div>

          <button
            onClick={() => setShowAirflow(!showAirflow)}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs text-amber-300 hover:bg-black cursor-pointer"
          >
            {showAirflow ? 'Hide Airflow' : 'Show Airflow'}
          </button>
        </div>

        {/* Controls & Comparison Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Zoom Slider */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-white/10">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <ZoomIn className="w-4 h-4" />
                Microscope Magnification:
              </span>
              <span className="font-mono text-amber-300">{zoom}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1.5">
              <span>Macro Surface (20%)</span>
              <span>Ultra Fiber Thread (100%)</span>
            </div>
          </div>

          {/* Key Fabric Highlights */}
          {fabricType === 'cotton' ? (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>The Hanli Pure Combed Cotton Guarantee</span>
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Long-Staple Fibers:</strong> Extracted from premium Pakistani cotton, eliminating fiber roughness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Fast Reactive Dye:</strong> Chemically bonds to individual yarns. Zero color bleeding in the wash.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Cooling Breathability:</strong> Keeps body temperature regulated through natural porous gaps.</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <XCircle className="w-4 h-4" />
                <span>Cheap Market Polyester Warnings</span>
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Traps Body Heat:</strong> Synthetic plastic acts like cellophane wrap, causing night sweats and restless turns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Surface Bleed:</strong> Cheap surface dyes wash off on first laundry, ruining pillow covers and other clothes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Static & Pilling:</strong> Develops annoying bobbles and lint within 3 to 4 washes.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
