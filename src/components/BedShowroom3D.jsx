import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sun, 
  Moon, 
  Maximize2, 
  Sparkles, 
  Info, 
  Check, 
  Palette, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

const FABRIC_COLORS = [
  { name: 'Terracotta Burgundy', hex: '#984447', description: 'Rich Wine Quilted' },
  { name: 'Silver Slate Grey', hex: '#A6ACB5', description: 'Platinum Modern Quilted' },
  { name: 'Royal Sapphire Blue', hex: '#244FB2', description: 'Deep Cobalt Quilted' },
  { name: 'Pistachio Sage Olive', hex: '#8A9A4A', description: 'Earthy Botanical Olive' },
  { name: 'Ocean Mint Aqua Teal', hex: '#5CA8A6', description: 'Coastal Refresh Teal' },
  { name: 'Lilac Mauve', hex: '#B55B8E', description: 'Royal Orchid Charm' },
  { name: 'Dusty Peach Blossom', hex: '#D28682', description: 'Warm Aesthetic Pastel' }
];

const FABRIC_TEXTURES = [
  { id: 'quilted', name: 'Ultra Sonic Quilted', roughness: 0.75, metalness: 0.05, clearcoat: 0.1 },
  { id: 'cotton', name: 'Egypt Cotton Smooth', roughness: 0.85, metalness: 0.02, clearcoat: 0.0 },
  { id: 'velvet', name: 'Luxury Sheen', roughness: 0.45, metalness: 0.15, clearcoat: 0.3 }
];

const HOTSPOTS = [
  {
    id: 1,
    title: 'Generous King Flat Cut (92"x94")',
    text: 'Traditional wide flat sheet drapes gracefully over any mattress depth with ample, clean tuck-in.',
    position: [-1.4, 0.45, 1.8],
    normal: [0, 1, 0]
  },
  {
    id: 2,
    title: 'Ultra Sonic Quilted Texture',
    text: 'Diamond embossed pattern fused with ultrasonic soundwaves for lint-free, wrinkle-resistant texture.',
    position: [0.0, 0.65, 0.2],
    normal: [0, 1, 0]
  },
  {
    id: 3,
    title: '100% Micro Fabric Egypt Cotton',
    text: 'Ultra-soft handfeel with fast dyes guaranteed never to run in the wash.',
    position: [1.2, 0.9, -1.2],
    normal: [0, 1, 0]
  }
];

export default function BedShowroom3D({ onAddToCart }) {
  const mountRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(FABRIC_COLORS[0]);
  const [selectedTexture, setSelectedTexture] = useState(FABRIC_TEXTURES[0]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[1]);
  const [zoomLevel, setZoomLevel] = useState(5.2);

  // Three.js scene refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialsRef = useRef({
    sheetMaterial: null,
    duvetMaterial: null,
    pillowMaterial: null
  });
  const lightsRef = useRef({
    ambient: null,
    directional: null,
    lantern1: null,
    lantern2: null
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x0a0908 : 0x141210);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x0a0908 : 0x141210, 0.08);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.8);
    camera.lookAt(0, 0.6, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff5ea, isNightMode ? 0.35 : 0.85);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xffedd5, isNightMode ? 0.4 : 1.4);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);
    lightsRef.current.directional = sunLight;

    // Golden palace lanterns
    const lantern1 = new THREE.PointLight(0xd4af37, isNightMode ? 2.2 : 0.8, 12, 1.2);
    lantern1.position.set(-3, 3, -1);
    scene.add(lantern1);
    lightsRef.current.lantern1 = lantern1;

    const lantern2 = new THREE.PointLight(0xff9944, isNightMode ? 2.0 : 0.6, 12, 1.2);
    lantern2.position.set(3, 2.5, 2);
    scene.add(lantern2);
    lightsRef.current.lantern2 = lantern2;

    // FLOOR / PLATFORM
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b18,
      roughness: 0.8,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // BED ROOT GROUP
    const bedGroup = new THREE.Group();
    scene.add(bedGroup);

    // 1. Bed Frame Base (Rich dark walnut with gold accents)
    const frameGeo = new THREE.BoxGeometry(3.1, 0.4, 4.3);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x241711,
      roughness: 0.45,
      metalness: 0.1
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(0, 0.2, 0);
    frame.castShadow = true;
    frame.receiveShadow = true;
    bedGroup.add(frame);

    // Gold trim around frame
    const goldTrimGeo = new THREE.BoxGeometry(3.14, 0.05, 4.34);
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.85
    });
    const goldTrim = new THREE.Mesh(goldTrimGeo, goldTrimMat);
    goldTrim.position.set(0, 0.4, 0);
    bedGroup.add(goldTrim);

    // 2. Headboard (Palace Arch Velvet with Ottoman Tufting)
    const headboardGeo = new THREE.BoxGeometry(3.2, 2.2, 0.25);
    const headboardMat = new THREE.MeshStandardMaterial({
      color: 0x36151e,
      roughness: 0.6,
      metalness: 0.2
    });
    const headboard = new THREE.Mesh(headboardGeo, headboardMat);
    headboard.position.set(0, 1.3, -2.15);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Headboard Gold Arch Crest
    const crestGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.26, 32, 1, false, 0, Math.PI);
    const crest = new THREE.Mesh(crestGeo, goldTrimMat);
    crest.rotation.z = Math.PI / 2;
    crest.rotation.y = Math.PI / 2;
    crest.position.set(0, 2.4, -2.15);
    bedGroup.add(crest);

    // 3. Mattress (12-inch luxury core)
    const mattressGeo = new THREE.BoxGeometry(2.9, 0.6, 4.0);
    const mattressMat = new THREE.MeshStandardMaterial({
      color: 0xf3eee5,
      roughness: 0.9,
      metalness: 0.02
    });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.7, 0);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // 4. Fitted Sheet (Hugs the mattress tightly)
    const sheetGeo = new THREE.BoxGeometry(2.94, 0.62, 4.04);
    const sheetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor.hex),
      roughness: selectedTexture.roughness,
      metalness: selectedTexture.metalness
    });
    materialsRef.current.sheetMaterial = sheetMat;
    const sheet = new THREE.Mesh(sheetGeo, sheetMat);
    sheet.position.set(0, 0.71, 0);
    sheet.castShadow = true;
    sheet.receiveShadow = true;
    bedGroup.add(sheet);

    // 5. Duvet / Comforter (Folded luxury quilt with soft drape)
    const duvetGeo = new THREE.BoxGeometry(3.02, 0.25, 2.7);
    const duvetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor.hex).clone().multiplyScalar(0.92),
      roughness: selectedTexture.roughness,
      metalness: selectedTexture.metalness
    });
    materialsRef.current.duvetMaterial = duvetMat;
    const duvet = new THREE.Mesh(duvetGeo, duvetMat);
    duvet.position.set(0, 1.05, 0.65);
    duvet.castShadow = true;
    duvet.receiveShadow = true;
    bedGroup.add(duvet);

    // Rolled Top Hem for Duvet Fold
    const foldGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.02, 24);
    const foldMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.8
    });
    const fold = new THREE.Mesh(foldGeo, foldMat);
    fold.rotation.z = Math.PI / 2;
    fold.position.set(0, 1.15, -0.7);
    fold.castShadow = true;
    bedGroup.add(fold);

    // 6. Pillows (2 Master Sleeping Pillows + 2 Accent Cushions)
    const pillowGeo = new THREE.BoxGeometry(1.2, 0.25, 0.75);
    const pillowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor.hex),
      roughness: selectedTexture.roughness,
      metalness: selectedTexture.metalness
    });
    materialsRef.current.pillowMaterial = pillowMat;

    // Pillow Left
    const pillowL = new THREE.Mesh(pillowGeo, pillowMat);
    pillowL.position.set(-0.75, 1.1, -1.45);
    pillowL.rotation.x = 0.25;
    pillowL.castShadow = true;
    bedGroup.add(pillowL);

    // Pillow Right
    const pillowR = new THREE.Mesh(pillowGeo, pillowMat);
    pillowR.position.set(0.75, 1.1, -1.45);
    pillowR.rotation.x = 0.25;
    pillowR.castShadow = true;
    bedGroup.add(pillowR);

    // Accent Pillows (Gold Trim Velvet)
    const accentGeo = new THREE.BoxGeometry(0.7, 0.2, 0.6);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.4,
      metalness: 0.7
    });
    const accentL = new THREE.Mesh(accentGeo, accentMat);
    accentL.position.set(-0.6, 1.18, -1.1);
    accentL.rotation.x = 0.35;
    accentL.rotation.z = -0.1;
    accentL.castShadow = true;
    bedGroup.add(accentL);

    const accentR = new THREE.Mesh(accentGeo, accentMat);
    accentR.position.set(0.6, 1.18, -1.1);
    accentR.rotation.x = 0.35;
    accentR.rotation.z = 0.1;
    accentR.castShadow = true;
    bedGroup.add(accentR);

    // FLOATING PARTICLES (Gold palace sparkles)
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 80;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = Math.random() * 4;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.7
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ORBIT / ROTATION INTERACTION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.55;
    let targetRotationX = 0.38;
    let currentRotationY = 0.55;
    let currentRotationX = 0.38;
    let orbitDistance = 6.8; // Stable orbit radius (fixes collapsing zoom bug)

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(0.12, Math.min(0.85, targetRotationX + deltaY * 0.005));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      orbitDistance = Math.max(4.5, Math.min(9.5, orbitDistance + e.deltaY * 0.005));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      // Smooth camera orbit interpolation
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      const radius = orbitDistance;
      camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
      camera.position.y = Math.max(1.6, radius * Math.sin(currentRotationX) + 1.0);
      camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
      camera.lookAt(0, 0.6, 0);

      // Floating particles rotation
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // UPDATE MATERIAL ON COLOR OR TEXTURE CHANGE
  useEffect(() => {
    const color = new THREE.Color(selectedColor.hex);
    const { sheetMaterial, duvetMaterial, pillowMaterial } = materialsRef.current;

    if (sheetMaterial) {
      sheetMaterial.color.set(color);
      sheetMaterial.roughness = selectedTexture.roughness;
      sheetMaterial.metalness = selectedTexture.metalness;
      sheetMaterial.needsUpdate = true;
    }
    if (duvetMaterial) {
      duvetMaterial.color.set(color.clone().multiplyScalar(0.92));
      duvetMaterial.roughness = selectedTexture.roughness;
      duvetMaterial.metalness = selectedTexture.metalness;
      duvetMaterial.needsUpdate = true;
    }
    if (pillowMaterial) {
      pillowMaterial.color.set(color);
      pillowMaterial.roughness = selectedTexture.roughness;
      pillowMaterial.metalness = selectedTexture.metalness;
      pillowMaterial.needsUpdate = true;
    }
  }, [selectedColor, selectedTexture]);

  // UPDATE LIGHTING ON DAY/NIGHT TOGGLE
  useEffect(() => {
    const { ambient, directional, lantern1, lantern2 } = lightsRef.current;
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(isNightMode ? 0x0a0908 : 0x141210);
      sceneRef.current.fog.color = new THREE.Color(isNightMode ? 0x0a0908 : 0x141210);
    }
    if (ambient) ambient.intensity = isNightMode ? 0.35 : 0.85;
    if (directional) directional.intensity = isNightMode ? 0.3 : 1.4;
    if (lantern1) lantern1.intensity = isNightMode ? 2.6 : 0.8;
    if (lantern2) lantern2.intensity = isNightMode ? 2.4 : 0.6;
  }, [isNightMode]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-950 via-[#181514] to-stone-950 border border-amber-500/25 shadow-2xl">
      {/* 3D WEBGL CANVAS MOUNT */}
      <div 
        ref={mountRef} 
        className="w-full h-[480px] md:h-[600px] cursor-grab active:cursor-grabbing relative"
      />

      {/* TOP FLOATING BADGE & CONTROLS */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide shadow-lg pointer-events-auto">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D Ottoman Bed Studio</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">Drag to 360° Rotate</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Day / Night Mood Toggle */}
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer shadow-md"
            title="Toggle Day / Night Lighting"
          >
            {isNightMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isNightMode ? 'Palace Lanterns' : 'Studio Daylight'}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs transition-all cursor-pointer shadow-md ${
              autoRotate 
                ? 'bg-amber-950/70 border-amber-500/40 text-amber-300' 
                : 'bg-black/70 border-white/10 text-zinc-400'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <span>360° Orbit</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE HOTSPOT CALLOUT */}
      {activeHotspot && (
        <div className="absolute top-16 left-4 max-w-xs p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/40 shadow-2xl transition-all animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {activeHotspot.title}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {activeHotspot.text}
          </p>
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/10 text-[10px] text-zinc-400">
            <span>Guaranteed by The Hanli Quality Standard</span>
          </div>
        </div>
      )}

      {/* BOTTOM CONTROLS DOCK: COLOR SWATCHES & FINISH SELECTION */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Color Palette Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Bed Sheet Color:</span>
              <span className="text-amber-300 font-semibold">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {FABRIC_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                    selectedColor.name === c.name 
                      ? 'border-amber-400 scale-110 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50' 
                      : 'border-white/20 hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} — ${c.description}`}
                >
                  {selectedColor.name === c.name && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Texture / Finish Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Fabric Finish / Weave:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {FABRIC_TEXTURES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTexture(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedTexture.id === t.id
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-white/5'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA to Configure & Order */}
          <div className="w-full lg:w-auto flex items-center justify-end">
            <button
              onClick={() => {
                if (onAddToCart) {
                  onAddToCart({
                    id: 'sultans-heritage-cotton',
                    name: `Customized 3D Suite — ${selectedColor.name} (${selectedTexture.name})`,
                    price: selectedTexture.id === 'velvet' ? 8950 : 3850,
                    color: selectedColor.name,
                    colorHex: selectedColor.hex,
                    texture: selectedTexture.name,
                    size: 'King (95x100")'
                  });
                }
              }}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order This 3D Set</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
