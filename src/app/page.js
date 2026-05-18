"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Battery, Zap, Sun, Wind, Shield, Truck, RotateCcw, CheckCircle,
  ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, ChevronLeft,
  Menu, X, Instagram, Facebook, Mail, Phone, MapPin, Clock,
  Plus, Minus, Send, Cpu, Layers, Award, Wrench, Activity,
  Hash, Compass, Sliders, Gauge, Power, Coffee, Refrigerator,
  Microwave, Laptop, Tv, Lightbulb, Flame, AlertCircle, ArrowDown,
  Settings, Anchor, Aperture, Box, Circle, Construction, Cog,
  Hexagon, Move, Search, Square, Triangle, Layers3,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════════════
   VANTRIX — VAN METAL & POWER ARCHITECTURE
   ────────────────────────────────────────────────────────────────────────────
   Aesthetic: refined light editorial · frosted-glass panels · graphite/bronze
   Theme references: Lumexa (large typography), Lumibe (warm light), and
   ThemeForest light template (architectural spacing).
   Run images.js once → images populate /public/images/vantrix/
   ════════════════════════════════════════════════════════════════════════════ */

const IMG = (key, i) => `/images/vantrix/${key}-${i}.webp`;
const imgs = (key, count) => Array.from({ length: count }, (_, i) => IMG(key, i + 1));

const SHOP_BASE = 'https://vanpartsoutlet.com';
const productUrl = (handle) => `${SHOP_BASE}/products/${handle}`;

const LINKS = {
  shopAll: `${SHOP_BASE}/collections/all`,
  contact: `${SHOP_BASE}/pages/contact`,
  about: `${SHOP_BASE}/pages/about-us`,
  faq: `${SHOP_BASE}/pages/faqs`,
  warranty: `${SHOP_BASE}/pages/warranty`,
  terms: `${SHOP_BASE}/pages/terms-of-service`,
  privacy: `${SHOP_BASE}/pages/privacy-policy`,
  returns: `${SHOP_BASE}/pages/return-policy`,
  email: 'mailto:Vanpartsoutlet@gmail.com',
  facebook: 'https://www.facebook.com/VanPartsOutlet',
  instagram: 'https://www.instagram.com/vanpartsoutlet/',
};

const BUSINESS = {
  address: '413 West Big Bear Blvd, Big Bear City, CA 92314 US',
  hours: 'Mon–Fri: 9am–5pm · Sat–Sun: Closed',
  phone: '+1 (951) 441-9719',
  email: 'Vanpartsoutlet@gmail.com',
};

/* ────────────────────────────────────────────────────────────────────────────
   THEME — light editorial with glassy mid-tones + warm bronze accent
   ──────────────────────────────────────────────────────────────────────────── */

const COLORS = {
  // Base / ground
  bg:         '#f6f4ef',   // warm bone / ivory
  bgSoft:     '#ece8df',   // dusty linen
  bgDeep:     '#161413',   // near-black for inverse sections
  bgGlass:    '#fbfaf6',   // frosted paper
  bgPaper:    '#ffffff',

  // Ink
  ink:        '#181513',   // deep charcoal
  inkSoft:    '#3d3833',   // graphite
  inkMuted:   '#7a7268',   // warm grey

  // Accent — bronze / warm umber (very distinct from Cryonex teal)
  accent:     '#8b5a2b',   // warm bronze
  accentSoft: '#e8dcc8',   // pale bronze
  accentDeep: '#6b3f1d',

  // Hairlines + cool glass tints
  rule:       '#d9d2c5',   // warm beige hairline
  ruleSoft:   '#e8e3d8',
  glassEdge:  '#cfc8b9',

  // Cool neutrals used sparingly for industrial accents
  steel:      '#5a5e63',
  steelSoft:  '#a8abae',
};

/* ────────────────────────────────────────────────────────────────────────────
   PRODUCTS — all 5 Vantrix items with full live Shopify content
   ──────────────────────────────────────────────────────────────────────────── */

const FLAGSHIP = {
  id: 'battery',
  code: '01',
  category: 'Power Storage',
  name: 'VanTrix 12V 600Ah LiFePO4',
  fullName: 'VanTrix 12V 600Ah LiFePO4 Deep Cycle Battery',
  subtitle: 'The single 7.2 kWh unit that replaces a bank.',
  price: 3499.99,
  stock: 24,
  handle: 'vantrix-12v-600ah-lifepo4-deep-cycle-battery',
  images: imgs('battery', 6),
  badge: 'Flagship · Best Seller',
  summary:
    'Industrial-grade Lithium Iron Phosphate storage engineered for the serious off-gridder. One unit replaces an entire lead-acid bank, runs a 2000–3000W inverter system from cold start, and is rated for over a decade of daily-cycle use.',
  metrics: [
    { k: 'Capacity',  v: '7.2 kWh' },
    { k: 'Cycle Life', v: '24,000+' },
    { k: 'Discharge', v: '200A' },
    { k: 'Warranty',  v: '5 Years' },
  ],
  fullSpecs: [
    { label: 'Battery type',        v: 'LiFePO4 · Grade A cells' },
    { label: 'Nominal voltage',     v: '12V (10–14.6V operating)' },
    { label: 'Rated capacity',      v: '600Ah · 7,200 Wh' },
    { label: 'Max continuous discharge', v: '200A (customisable)' },
    { label: 'Standard charge current',  v: '150A' },
    { label: 'Cycle life',          v: '≥24,000 @ 25°C' },
    { label: 'Operating range',     v: '–30°C to 60°C (no heater)' },
    { label: 'Dimensions',          v: '17.7" × 13.0" × 9.1"' },
    { label: 'Weight',              v: '≤59 kg / ≤130 lbs' },
    { label: 'Protection',          v: 'Smart built-in BMS' },
    { label: 'Compliance',          v: 'CE · RoHS · UN38.3' },
  ],
  highlights: [
    'Grade A LiFePO4 cells with chemical stability and zero memory effect',
    'Native cold-weather operation to –30°C — no heating circuit required',
    'Integrated smart BMS handles cell balancing and protection automatically',
    'Supports 2000–3000W inverter systems directly from a single unit',
    '≥24,000 cycles — over six times the rated life of standard LiFePO4',
    'OEM/ODM available: custom discharge, charge current, and configuration',
  ],
};

const PRODUCTS = [
  {
    id: 'awning-electric',
    code: '02',
    category: 'Exterior · Awnings',
    name: 'Automated Wind Sensor Awning',
    fullName: 'Vantrix Automated Wind Sensor Legless Electric Side-Mounted Awning',
    subtitle: 'Legless cantilever shade with 24/7 vibration sensor.',
    price: 3226.0,
    stock: 3,
    handle: 'vantrix-automated-wind-sensor-legless-electric-side-mounted-awning',
    images: imgs('awning-electric', 5),
    badge: 'Best Seller',
    variants: ['118" (3M)', '157" (4M)'],
    summary:
      'A powered shade system for high-end conversions. The built-in vibration sensor automatically stows the awning during sudden gusts — a 24/7 guard for when you’re off the grid or away from the vehicle. The legless cantilever design preserves a clean 360° entry to the side door.',
    metrics: [
      { k: 'Power',     v: '12V DC' },
      { k: 'Reach',     v: '8.2 ft (2.5m)' },
      { k: 'Lengths',   v: '118" / 157"' },
      { k: 'Sensor',    v: 'Auto-retract' },
    ],
    highlights: [
      'Intelligent vibration sensor auto-retracts during gusts — 24/7 protection',
      'Legless cantilever — no poles, no trip hazards, full 360° entryway',
      'High-torque 12V motor with single-touch wall switch or remote control',
      'Architectural-grade aluminum cassette in stealth matte black',
      'UV-resistant PVC-coated vinyl, waterproof and flame retardant',
      'Manual override port included for power-loss retraction',
    ],
  },
  {
    id: 'awning-manual',
    code: '03',
    category: 'Exterior · Awnings',
    name: 'Manual Side-Mounted Awning',
    fullName: 'Vantrix Manual Side-Mounted Awning with Leg Supports',
    subtitle: 'Mechanical reliability with integrated tension legs.',
    price: 1418.0,
    stock: 2,
    handle: 'vantrix-manual-side-mounted-awning-with-leg-supports-118-or-157',
    images: imgs('awning-manual', 4),
    badge: 'Limited',
    variants: ['3M (118")', '4M (157")'],
    summary:
      'A mechanical shade system for the builder who wants massive coverage without electrical complexity. Three-minute setup, integrated telescoping leg stabilization, and a 280 g/m² PVC-coated polyester canopy rated UV 50+ and fully waterproof.',
    metrics: [
      { k: 'Operation', v: 'Manual crank' },
      { k: 'Reach',     v: '8.2 ft (2.5m)' },
      { k: 'Fabric',    v: '280 g/m² PVC' },
      { k: 'UV Rating', v: 'UV 50+' },
    ],
    highlights: [
      'Bulletproof mechanical system — no motors, no sensors, no wiring',
      'High-density 280 g/m² PVC-coated polyester · UV 50+ · waterproof',
      'Integrated telescoping legs with quick-lock ground stabilization',
      'Heavy-duty powder-coated aluminum cassette · rust-proof finish',
      'Adjustable pitch for proper rain runoff and storm protection',
      'Stealth slim-line profile preserves vehicle aerodynamics',
    ],
  },
  {
    id: 'inverter-3000w',
    code: '04',
    category: 'Power Electronics',
    name: '3000W Pure Sine Wave Inverter/Charger',
    fullName: '3000W Pure Sine Wave Inverter/Charger — 12V DC to 110V AC',
    subtitle: 'Stable AC and shore-power charging in one chassis.',
    price: 899.99,
    stock: 3,
    handle: '3000w-pure-sine-wave-inverter-charger-12v-dc-to-110v-ac',
    images: imgs('inverter-3000w', 1),
    badge: 'Active',
    summary:
      'A combined inverter and battery charger that delivers 3000W continuous (6000W surge) of pure sine wave power and accepts shore power or generator input for fast battery replenishment. Designed to pair directly with the VanTrix 600Ah bank.',
    metrics: [
      { k: 'Continuous', v: '3000W' },
      { k: 'Surge Peak', v: '6000W' },
      { k: 'Efficiency', v: '95%' },
      { k: 'Waveform',   v: 'Pure sine' },
    ],
    highlights: [
      '3000W continuous · 6000W peak surge for high-draw appliances',
      'Pure sine wave output (THD <3%) — safe for sensitive electronics',
      'Integrated AC-to-DC charger with up to 50A configurable charge current',
      'Compatible with LiFePO4, AGM, GEL, and lead-acid battery profiles',
      '≤10 ms transfer time between battery and shore-power modes',
      'Includes auxiliary remote inverter control panel',
      'Full protection suite: overload, over-temp, voltage, short-circuit',
    ],
  },
  {
    id: 'swivel',
    code: '05',
    category: 'Interior Hardware',
    name: 'VanTrix Swivel Table Kit',
    fullName: 'VanTrix Swivel Table Hardware Kit',
    subtitle: '360° rotating mount engineered to stay rock-solid.',
    price: 185.0,
    stock: 34,
    handle: 'vantrix-swivel-table-hardware-kit',
    images: imgs('swivel', 8),
    badge: 'Best Seller',
    variants: ['Black', 'Silver'],
    summary:
      'A modular hardware-only kit that transforms a fixed dining area into a workstation, lounge table, or stowable footprint in seconds. High-strength powder-coated steel with industrial-grade M10 and M8 vibration-resistant fasteners. Bring your own tabletop.',
    metrics: [
      { k: 'Load Cap.', v: '50 lbs (22.7 kg)' },
      { k: 'Rotation', v: '360°' },
      { k: 'Material', v: 'Powder steel' },
      { k: 'Finish',   v: 'Black / Silver' },
    ],
    highlights: [
      '360° rotation — usable from the cab, sofa, or out the side door',
      'Three tool-free handles for quick locked positioning',
      'High-strength steel with corrosion-resistant powder coat finish',
      'M10 + M8 vibration-resistant industrial-grade fasteners',
      'Anti-scratch backed base plate protects van wall paneling',
      'Modular design — swing or remove entirely to reclaim floor space',
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   ENGINEERING PILLARS — different copy than Cryonex
   ──────────────────────────────────────────────────────────────────────────── */

const PILLARS = [
  {
    n: 'I',
    icon: <Cpu className="w-5 h-5" strokeWidth={1.4} />,
    title: 'Industrial-Grade Cells',
    desc: 'Factory-direct Grade A LiFePO4 architecture. Higher energy density. Chemical stability across full temperature range. Zero memory effect.',
  },
  {
    n: 'II',
    icon: <Layers className="w-5 h-5" strokeWidth={1.4} />,
    title: 'Single-Unit Architecture',
    desc: 'One 600Ah unit replaces an entire bank. Simpler wiring, less floor area lost, lower cumulative failure points across the build.',
  },
  {
    n: 'III',
    icon: <Shield className="w-5 h-5" strokeWidth={1.4} />,
    title: 'All-Season Protection',
    desc: '–30°C native cold operation. Integrated BMS handles cell balancing, over-discharge, over-temp, and short-circuit response automatically.',
  },
  {
    n: 'IV',
    icon: <Wrench className="w-5 h-5" strokeWidth={1.4} />,
    title: 'Builder-Friendly',
    desc: 'Compatible with LiFePO4-profile solar controllers, DC-DC chargers, and AC-DC chargers. Five-year warranty with free replacement parts.',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   APPLIANCE LIBRARY — for the Power System Builder
   ──────────────────────────────────────────────────────────────────────────── */

const APPLIANCES = [
  { id: 'fridge', label: 'Compressor fridge', icon: <Refrigerator className="w-4 h-4" strokeWidth={1.5} />, hours: 24, watts: 50,  peak: 80 },
  { id: 'rooftop_ac', label: 'Rooftop AC',    icon: <Wind className="w-4 h-4" strokeWidth={1.5} />,         hours: 6,  watts: 420, peak: 840 },
  { id: 'induction', label: 'Induction cooktop', icon: <Flame className="w-4 h-4" strokeWidth={1.5} />,     hours: 0.5, watts: 1800, peak: 2400 },
  { id: 'kettle', label: 'Electric kettle',    icon: <Coffee className="w-4 h-4" strokeWidth={1.5} />,      hours: 0.25, watts: 1500, peak: 1800 },
  { id: 'microwave', label: 'Microwave',       icon: <Microwave className="w-4 h-4" strokeWidth={1.5} />,   hours: 0.25, watts: 1200, peak: 1600 },
  { id: 'laptop',    label: 'Laptop / monitor', icon: <Laptop className="w-4 h-4" strokeWidth={1.5} />,     hours: 8,  watts: 65,  peak: 100 },
  { id: 'tv',        label: 'TV / projector',   icon: <Tv className="w-4 h-4" strokeWidth={1.5} />,         hours: 3,  watts: 80,  peak: 120 },
  { id: 'lights',    label: 'LED interior lights', icon: <Lightbulb className="w-4 h-4" strokeWidth={1.5} />, hours: 5, watts: 15,  peak: 20 },
  { id: 'vent_fan',  label: 'Roof vent fan',    icon: <Wind className="w-4 h-4" strokeWidth={1.5} />,       hours: 8,  watts: 18,  peak: 35 },
  { id: 'heater',    label: 'Diesel heater (12V)', icon: <Flame className="w-4 h-4" strokeWidth={1.5} />,   hours: 4,  watts: 30,  peak: 110 },
];

/* ════════════════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════════════════ */

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ─── Animated counter ─── */
function Counter({ to, suffix = '', prefix = '', duration = 1.6 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStart(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  const display = Number.isInteger(to) ? Math.round(val).toLocaleString() : val.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Gallery with thumbnails ─── */
function Gallery({ images, name }) {
  const [i, setI] = useState(0);
  const safe = images.length > 0 ? images : ['/images/c3.png'];
  const next = () => setI((p) => (p + 1) % safe.length);
  const prev = () => setI((p) => (p - 1 + safe.length) % safe.length);

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[5/4] overflow-hidden group"
        style={{
          background: COLORS.bgSoft,
          border: `1px solid ${COLORS.rule}`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={i}
            src={safe[i]}
            alt={`${name} — view ${i + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        {safe.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/95 transition-all opacity-0 group-hover:opacity-100 backdrop-blur"
              style={{ border: `1px solid ${COLORS.rule}` }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/95 transition-all opacity-0 group-hover:opacity-100 backdrop-blur"
              style={{ border: `1px solid ${COLORS.rule}` }}
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div
              className="absolute bottom-4 left-4 px-2.5 py-1 bg-white/95 text-[10px] vt-mono backdrop-blur"
              style={{ border: `1px solid ${COLORS.rule}`, color: COLORS.inkSoft }}
            >
              {String(i + 1).padStart(2, '0')} / {String(safe.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {safe.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {safe.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`flex-shrink-0 w-14 h-14 overflow-hidden transition-all ${
                idx === i ? 'opacity-100' : 'opacity-50 hover:opacity-90'
              }`}
              style={{
                border: `1px solid ${idx === i ? COLORS.ink : COLORS.rule}`,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   POWER SYSTEM BUILDER — signature interactive widget
   Pick appliances → see daily Wh demand, peak surge, recommended battery
   count + which inverter (3000W is the only one listed; we show match status)
   ════════════════════════════════════════════════════════════════════════════ */

function PowerSystemBuilder() {
  const [counts, setCounts] = useState({
    fridge: 1, rooftop_ac: 0, induction: 0, kettle: 1, microwave: 0,
    laptop: 1, tv: 0, lights: 1, vent_fan: 1, heater: 0,
  });
  const [days, setDays] = useState(2);
  const [solarW, setSolarW] = useState(400);

  const inc = (id) => setCounts((c) => ({ ...c, [id]: Math.min(5, (c[id] || 0) + 1) }));
  const dec = (id) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));

  const result = useMemo(() => {
    let dailyWh = 0;
    let peakW = 0;
    let continuousW = 0;
    const lineItems = [];

    APPLIANCES.forEach((a) => {
      const n = counts[a.id] || 0;
      if (n === 0) return;
      const wh = a.watts * a.hours * n;
      dailyWh += wh;
      peakW += a.peak * n;
      continuousW = Math.max(continuousW, a.watts * n);
      lineItems.push({ id: a.id, label: a.label, n, wh: Math.round(wh) });
    });

    const totalWhNeeded = dailyWh * days;
    const usablePerBattery = 7200 * 0.9; // 90% DoD for LiFePO4
    const batteriesNeeded = totalWhNeeded > 0 ? Math.max(1, Math.ceil(totalWhNeeded / usablePerBattery)) : 0;
    const solarDailyWh = solarW * 4.5 * 0.75;
    const netDaily = dailyWh - solarDailyWh;

    // Inverter sizing logic
    const inverterPick =
      peakW === 0 ? null :
      peakW <= 1500 ? { name: '1500W class', ok: false } :
      peakW <= 3000 && continuousW <= 3000 ? { name: '3000W Pure Sine', ok: true, surge: peakW <= 6000 } :
      peakW <= 6000 ? { name: '3000W Pure Sine (surge load)', ok: true, surge: true, note: 'Peak at upper limit — stagger heavy loads' } :
      { name: 'Higher capacity required', ok: false };

    return {
      dailyWh: Math.round(dailyWh),
      peakW: Math.round(peakW),
      continuousW: Math.round(continuousW),
      totalWhNeeded: Math.round(totalWhNeeded),
      batteriesNeeded,
      solarDailyWh: Math.round(solarDailyWh),
      netDaily: Math.round(netDaily),
      lineItems,
      inverterPick,
    };
  }, [counts, days, solarW]);

  const anySelected = result.dailyWh > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* LEFT — appliance selector */}
      <div className="lg:col-span-7">
        <div
          className="vt-glass p-6 lg:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="vt-label" style={{ color: COLORS.accent }}>
                Step 01 — Choose your loads
              </div>
              <div className="vt-mono text-[10px] mt-1" style={{ color: COLORS.inkMuted }}>
                TAP +/− TO ADD UNITS
              </div>
            </div>
            <button
              onClick={() => setCounts(Object.fromEntries(APPLIANCES.map(a => [a.id, 0])))}
              className="vt-mono text-[10px] underline-offset-4 hover:underline transition"
              style={{ color: COLORS.inkMuted }}
            >
              RESET
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
            {APPLIANCES.map((a) => {
              const n = counts[a.id] || 0;
              const active = n > 0;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 p-3.5 transition-colors"
                  style={{ background: active ? '#fffdf8' : COLORS.bgPaper }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background: active ? COLORS.accent : COLORS.bgSoft,
                      color: active ? '#fff' : COLORS.inkSoft,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="vt-display text-[13px] leading-tight" style={{ color: COLORS.ink, fontWeight: 500 }}>
                      {a.label}
                    </div>
                    <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>
                      {a.watts}W · {a.hours}h/day
                    </div>
                  </div>
                  <div className="flex items-center" style={{ border: `1px solid ${COLORS.rule}` }}>
                    <button
                      onClick={() => dec(a.id)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 transition disabled:opacity-30"
                      disabled={n === 0}
                      aria-label={`Decrease ${a.label}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span
                      className="w-7 text-center vt-mono text-[11px] tabular-nums"
                      style={{ color: COLORS.ink, fontWeight: 600 }}
                    >
                      {n}
                    </span>
                    <button
                      onClick={() => inc(a.id)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 transition"
                      aria-label={`Increase ${a.label}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-7">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="vt-label" style={{ color: COLORS.inkMuted }}>
                  Days of autonomy
                </span>
                <span className="vt-mono text-[13px]" style={{ color: COLORS.ink, fontWeight: 600 }}>
                  {days}d
                </span>
              </div>
              <input
                type="range" min={1} max={7} step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="vt-slider w-full"
              />
              <div className="flex justify-between vt-mono text-[10px] mt-1" style={{ color: COLORS.inkMuted }}>
                <span>1d</span><span>4d</span><span>7d</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="vt-label" style={{ color: COLORS.inkMuted }}>
                  Solar wattage
                </span>
                <span className="vt-mono text-[13px]" style={{ color: COLORS.ink, fontWeight: 600 }}>
                  {solarW}W
                </span>
              </div>
              <input
                type="range" min={0} max={1200} step={50}
                value={solarW}
                onChange={(e) => setSolarW(Number(e.target.value))}
                className="vt-slider w-full"
              />
              <div className="flex justify-between vt-mono text-[10px] mt-1" style={{ color: COLORS.inkMuted }}>
                <span>0W</span><span>600W</span><span>1200W</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — recommendation panel */}
      <div className="lg:col-span-5">
        <div className="vt-glass p-6 lg:p-8 h-full">
          <div className="vt-label mb-5 flex items-center gap-2" style={{ color: COLORS.accent }}>
            <Activity className="w-3.5 h-3.5" />
            Step 02 — Your spec
          </div>

          {!anySelected ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="w-8 h-8 mb-4" style={{ color: COLORS.inkMuted }} strokeWidth={1.4} />
              <div className="vt-display text-[16px] mb-1.5" style={{ color: COLORS.ink, fontWeight: 600 }}>
                Add at least one load
              </div>
              <div className="text-[12.5px]" style={{ color: COLORS.inkMuted }}>
                Pick appliances on the left to see the recommendation.
              </div>
            </div>
          ) : (
            <>
              {/* Top stats */}
              <div className="grid grid-cols-2 gap-px mb-6" style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
                <div className="p-4" style={{ background: COLORS.bgPaper }}>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>DAILY DRAW</div>
                  <motion.div
                    key={result.dailyWh}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="vt-display text-[26px] leading-none mt-1.5"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    {result.dailyWh.toLocaleString()}
                    <span className="text-[13px] ml-1" style={{ color: COLORS.inkMuted, fontWeight: 400 }}>Wh</span>
                  </motion.div>
                </div>
                <div className="p-4" style={{ background: COLORS.bgPaper }}>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>PEAK SURGE</div>
                  <motion.div
                    key={result.peakW}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="vt-display text-[26px] leading-none mt-1.5"
                    style={{ color: COLORS.ink, fontWeight: 700 }}
                  >
                    {result.peakW.toLocaleString()}
                    <span className="text-[13px] ml-1" style={{ color: COLORS.inkMuted, fontWeight: 400 }}>W</span>
                  </motion.div>
                </div>
              </div>

              {/* Battery recommendation */}
              <div
                className="p-5 mb-4"
                style={{
                  background: '#fffaf0',
                  border: `1px solid ${COLORS.accentSoft}`,
                }}
              >
                <div className="vt-mono text-[10px] mb-3" style={{ color: COLORS.accent }}>
                  RECOMMENDED BANK
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="vt-display text-[40px] leading-none" style={{ color: COLORS.accentDeep, fontWeight: 700 }}>
                    {result.batteriesNeeded}
                  </span>
                  <span className="vt-display text-[15px]" style={{ color: COLORS.ink, fontWeight: 500 }}>
                    × VanTrix 600Ah
                  </span>
                </div>
                <div className="text-[12px] leading-[1.55] mb-3" style={{ color: COLORS.inkSoft }}>
                  Sized for {days} day{days > 1 ? 's' : ''} of autonomy at 90% depth-of-discharge.
                  Total usable: <span className="vt-mono">{(result.batteriesNeeded * 7200 * 0.9 / 1000).toFixed(1)} kWh</span>.
                </div>
                <div className="flex items-baseline justify-between pt-3" style={{ borderTop: `1px solid ${COLORS.accentSoft}` }}>
                  <span className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>BANK INVESTMENT</span>
                  <span className="vt-display text-[16px]" style={{ color: COLORS.ink, fontWeight: 700 }}>
                    ${(result.batteriesNeeded * 3499.99).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Inverter recommendation */}
              {result.inverterPick && (
                <div
                  className="p-5 mb-4"
                  style={{
                    background: result.inverterPick.ok ? '#f3f7f0' : '#fef4f0',
                    border: `1px solid ${result.inverterPick.ok ? '#c8d5b9' : '#f5cba7'}`,
                  }}
                >
                  <div className="vt-mono text-[10px] mb-2" style={{ color: result.inverterPick.ok ? '#5b7a3a' : COLORS.accentDeep }}>
                    RECOMMENDED INVERTER
                  </div>
                  <div className="vt-display text-[16px] mb-1.5" style={{ color: COLORS.ink, fontWeight: 700 }}>
                    {result.inverterPick.name}
                  </div>
                  <div className="text-[12px] leading-[1.55]" style={{ color: COLORS.inkSoft }}>
                    {result.inverterPick.ok
                      ? `Handles your ${result.peakW.toLocaleString()}W peak surge.${result.inverterPick.note ? ' ' + result.inverterPick.note + '.' : ''}`
                      : `Your ${result.peakW.toLocaleString()}W peak exceeds typical van inverter capacity. Stagger heavy loads or contact us.`}
                  </div>
                </div>
              )}

              {/* Solar + autonomy summary */}
              <div className="grid grid-cols-3 gap-px" style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
                <div className="p-3" style={{ background: COLORS.bgPaper }}>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>SOLAR/DAY</div>
                  <div className="vt-display text-[14px] mt-1" style={{ color: COLORS.ink, fontWeight: 600 }}>
                    {result.solarDailyWh.toLocaleString()}Wh
                  </div>
                </div>
                <div className="p-3" style={{ background: COLORS.bgPaper }}>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>NET/DAY</div>
                  <div className="vt-display text-[14px] mt-1" style={{ color: result.netDaily <= 0 ? '#5b7a3a' : COLORS.ink, fontWeight: 600 }}>
                    {result.netDaily <= 0 ? '+' : '−'}{Math.abs(result.netDaily).toLocaleString()}Wh
                  </div>
                </div>
                <div className="p-3" style={{ background: COLORS.bgPaper }}>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>RESERVE</div>
                  <div className="vt-display text-[14px] mt-1" style={{ color: COLORS.ink, fontWeight: 600 }}>
                    {(result.totalWhNeeded / 1000).toFixed(1)}kWh
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${COLORS.rule}` }}>
                <a
                  href={productUrl(FLAGSHIP.handle)}
                  target="_blank"
                  rel="noopener"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-white text-[12px] transition hover:opacity-90"
                  style={{ background: COLORS.ink, fontWeight: 600 }}
                >
                  Shop the battery
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */

export default function VantrixPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  const openExt = (url) => window.open(url, '_blank', 'noopener');
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Track active nav section
  useEffect(() => {
    const sections = ['hero', 'flagship', 'catalogue', 'engineering', 'builder', 'specs'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }),
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent('Vantrix updates');
    const body = encodeURIComponent(`Please subscribe me to Vantrix updates.\n\nMy email: ${email}`);
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setEmailSent(true);
    setEmail('');
    setTimeout(() => setEmailSent(false), 3500);
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─── Fonts + base styles ─── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
          --font-body: 'Geist', -apple-system, system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection { background: ${COLORS.accent}; color: ${COLORS.bg}; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bgSoft}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.inkMuted}; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.ink}; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .vt-display {
          font-family: var(--font-display);
          font-weight: 500;
          letter-spacing: -0.02em;
          font-feature-settings: 'ss01';
        }
        .vt-mono {
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }
        .vt-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .vt-link-underline {
          background-image: linear-gradient(transparent calc(100% - 1px), currentColor 1px);
          background-repeat: no-repeat;
          background-size: 0% 100%;
          transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vt-link-underline:hover {
          background-size: 100% 100%;
        }

        /* Frosted-glass surface treatment used throughout */
        .vt-glass {
          background: linear-gradient(160deg,
            rgba(255,255,255,0.85) 0%,
            rgba(251,250,246,0.78) 50%,
            rgba(236,232,223,0.55) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${COLORS.glassEdge};
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.7),
            0 1px 2px rgba(24,21,19,0.04),
            0 8px 30px rgba(24,21,19,0.06);
        }
        .vt-glass-dark {
          background: linear-gradient(160deg,
            rgba(38,32,28,0.85) 0%,
            rgba(22,20,19,0.92) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(217,210,197,0.12);
        }

        /* Custom range slider */
        .vt-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: ${COLORS.rule};
          outline: none;
          cursor: pointer;
        }
        .vt-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: ${COLORS.accent};
          border: 2px solid ${COLORS.bg};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 2px 6px rgba(139,90,43,0.3);
        }
        .vt-slider::-webkit-slider-thumb:hover { background: ${COLORS.accentDeep}; }
        .vt-slider::-moz-range-thumb {
          width: 18px; height: 18px;
          background: ${COLORS.accent};
          border: 2px solid ${COLORS.bg};
          border-radius: 50%;
          cursor: grab;
        }

        /* Quiet grain for atmospheric depth */
        .vt-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        /* Sectional running display number */
        .vt-section-num {
          font-family: var(--font-display);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(8rem, 22vw, 22rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: ${COLORS.accentSoft};
          opacity: 0.55;
        }
      `}</style>

      <div className="vt-grain" />

      {/* ════════════════════════════════════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(246, 244, 239, 0.78)',
          borderBottom: `1px solid ${COLORS.rule}`,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: COLORS.ink, color: COLORS.bg }}
            >
              <Hexagon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="vt-display text-[20px] tracking-tight"
                style={{ color: COLORS.ink, fontWeight: 600 }}
              >
                Vantrix
              </span>
              <span
                className="vt-mono text-[9px] mt-1"
                style={{ color: COLORS.inkMuted }}
              >
                METAL · POWER · VAN PARTS OUTLET
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-9">
            {[
              ['Flagship', 'flagship'],
              ['Catalogue', 'catalogue'],
              ['Engineering', 'engineering'],
              ['Power Builder', 'builder'],
              ['Specs', 'specs'],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-[13px] py-1 transition-colors"
                style={{
                  color: activeNav === id ? COLORS.ink : COLORS.inkSoft,
                  fontWeight: activeNav === id ? 600 : 400,
                }}
              >
                {label}
                {activeNav === id && (
                  <motion.span
                    layoutId="vt-nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px"
                    style={{ background: COLORS.accent }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openExt(LINKS.shopAll)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[12px] transition-all hover:opacity-90"
              style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
            >
              Shop all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              style={{ border: `1px solid ${COLORS.rule}` }}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
              style={{ background: COLORS.bgPaper, borderTop: `1px solid ${COLORS.rule}` }}
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {[
                  ['Flagship', 'flagship'],
                  ['Catalogue', 'catalogue'],
                  ['Engineering', 'engineering'],
                  ['Power Builder', 'builder'],
                  ['Specs', 'specs'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left py-3 vt-display text-[18px]"
                    style={{ color: COLORS.ink }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => openExt(LINKS.shopAll)}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-[12px]"
                  style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
                >
                  Shop all
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — split editorial with floating spec card
          Structure: large oversize headline left, stat ribbon, glass spec card right
          ════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background ornament: large faded section number */}
        <div className="absolute -top-8 right-0 hidden lg:block pointer-events-none select-none">
          <span className="vt-section-num">00</span>
        </div>
        {/* Soft accent glow */}
        <div
          className="absolute -bottom-40 -left-40 w-[640px] h-[640px] pointer-events-none opacity-40 z-0"
          style={{
            background: `radial-gradient(circle, ${COLORS.accentSoft}, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end"
          >
            {/* LEFT — editorial headline */}
            <div className="lg:col-span-8">
              <motion.div variants={fade} className="flex items-center gap-5 mb-10">
                <span className="vt-label" style={{ color: COLORS.accent }}>
                  Vantrix · Established 2024
                </span>
                <span className="h-px w-16" style={{ background: COLORS.rule }} />
                <span className="vt-label" style={{ color: COLORS.inkMuted }}>
                  Big Bear, California
                </span>
              </motion.div>

              <motion.h1
                variants={fade}
                className="vt-display leading-[0.95]"
                style={{
                  fontSize: 'clamp(3rem, 9.5vw, 8rem)',
                  color: COLORS.ink,
                  fontWeight: 400,
                }}
              >
                Steel,
                <br />
                power and
                <br />
                <em style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: COLORS.accent,
                }}>
                  the long road.
                </em>
              </motion.h1>

              <motion.p
                variants={fade}
                className="text-[16px] leading-[1.7] mt-10 max-w-[520px]"
                style={{ color: COLORS.inkSoft }}
              >
                Vantrix builds the architectural metal and high-output power systems behind serious
                van conversions — industrial-grade LiFePO4 storage, electric and manual awnings,
                pure sine inverters, and the swivel hardware that holds it all together.
              </motion.p>

              {/* Stat ribbon — counters */}
              <motion.div
                variants={fade}
                className="mt-12 grid grid-cols-3 gap-px max-w-[640px]"
                style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
              >
                {[
                  { v: 7.2, suf: ' kWh', label: 'PER UNIT' },
                  { v: 24000, suf: '+', label: 'CYCLE LIFE' },
                  { v: 30, suf: '°C', pre: '−', label: 'COLD-RATED' },
                ].map((m) => (
                  <div key={m.label} className="px-5 py-5" style={{ background: COLORS.bgPaper }}>
                    <div className="vt-display text-[28px] leading-none" style={{ color: COLORS.ink, fontWeight: 600 }}>
                      <Counter to={m.v} suffix={m.suf} prefix={m.pre || ''} />
                    </div>
                    <div className="vt-mono text-[10px] mt-2" style={{ color: COLORS.inkMuted }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => scrollTo('flagship')}
                  className="inline-flex items-center gap-3 px-7 py-3.5 text-[13px] transition hover:opacity-90 group"
                  style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
                >
                  Meet the 600Ah
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo('builder')}
                  className="vt-link-underline inline-flex items-center gap-1.5 text-[13px]"
                  style={{ color: COLORS.ink, fontWeight: 600 }}
                >
                  Try the Power Builder
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>

            {/* RIGHT — glass flagship card */}
            <motion.div
              variants={fade}
              className="lg:col-span-4"
            >
              <div className="vt-glass p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="px-2 py-0.5 vt-mono text-[10px]"
                    style={{ background: COLORS.accent, color: COLORS.bg }}
                  >
                    FLAGSHIP
                  </span>
                  <span className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>
                    {FLAGSHIP.stock} IN STOCK
                  </span>
                </div>

                <div className="vt-display text-[20px] leading-tight mb-1" style={{ color: COLORS.ink, fontWeight: 600 }}>
                  {FLAGSHIP.name}
                </div>
                <div className="vt-mono text-[10px] mb-5" style={{ color: COLORS.inkMuted }}>
                  GRADE A LiFePO4 · 7.2 kWh
                </div>

                <div
                  className="aspect-[5/4] w-full overflow-hidden mb-5"
                  style={{ border: `1px solid ${COLORS.rule}` }}
                >
                  <img
                    src={FLAGSHIP.images[0]}
                    alt={FLAGSHIP.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>USD</div>
                    <div className="vt-display text-[24px] leading-none" style={{ color: COLORS.ink, fontWeight: 700 }}>
                      ${FLAGSHIP.price.toLocaleString()}
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>

                <button
                  onClick={() => scrollTo('flagship')}
                  className="w-full py-2.5 text-[12px] transition hover:opacity-90"
                  style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
                >
                  View flagship
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE / RIBBON
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-4 overflow-hidden"
        style={{
          background: COLORS.bgDeep,
          color: COLORS.bg,
          borderTop: `1px solid ${COLORS.ink}`,
          borderBottom: `1px solid ${COLORS.ink}`,
        }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap vt-mono text-[12px]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].flatMap((_, j) =>
            [
              'INDUSTRIAL LiFePO4',
              'BUILT FOR SPRINTER · TRANSIT · PROMASTER',
              'NATIVE −30°C OPERATION',
              '5-YEAR WARRANTY',
              'GRADE A CELLS',
              'POWDER-COATED ALUMINUM',
              'CALIFORNIA-BASED SUPPORT',
              '24,000+ CYCLES',
            ].map((t, i) => (
              <span key={`${j}-${i}`} className="flex items-center gap-12">
                {t}
                <span style={{ color: COLORS.accent }}>◆</span>
              </span>
            ))
          )}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FLAGSHIP — full-bleed editorial spread on dark
          Structure: dark inverse of the page, oversized gallery left, spec column right
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="flagship"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: COLORS.bgDeep, color: COLORS.bg }}
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.accent}40, transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fade} className="flex items-baseline gap-5 mb-6">
              <span className="vt-label" style={{ color: COLORS.accent }}>01 — The Flagship</span>
              <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.16)' }} />
              <span className="vt-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                ${FLAGSHIP.price.toLocaleString()} USD
              </span>
            </motion.div>
            <motion.h2
              variants={fade}
              className="vt-display max-w-5xl"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
                lineHeight: 1.05,
                color: COLORS.bg,
                fontWeight: 400,
              }}
            >
              One unit, an entire bank{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.accentSoft, fontWeight: 300 }}>
                — retired.
              </em>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <Gallery images={FLAGSHIP.images} name={FLAGSHIP.fullName} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-5"
            >
              <motion.p
                variants={fade}
                className="text-[15px] leading-[1.7] mb-10"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                {FLAGSHIP.summary}
              </motion.p>

              <motion.div
                variants={fade}
                className="grid grid-cols-2 gap-px mb-10"
                style={{ background: 'rgba(255,255,255,0.12)', border: `1px solid rgba(255,255,255,0.12)` }}
              >
                {FLAGSHIP.metrics.map((m) => (
                  <div key={m.k} className="p-5" style={{ background: COLORS.bgDeep }}>
                    <div className="vt-mono text-[10px] mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {m.k.toUpperCase()}
                    </div>
                    <div className="vt-display text-[24px] leading-none" style={{ color: COLORS.bg, fontWeight: 600 }}>
                      {m.v}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.ul variants={fade} className="space-y-3 mb-10">
                {FLAGSHIP.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13.5px]" style={{ color: 'rgba(255,255,255,0.82)' }}>
                    <span
                      className="vt-mono text-[10px] mt-1 flex-shrink-0 w-6"
                      style={{ color: COLORS.accentSoft }}
                    >
                      0{idx + 1}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fade}
                className="pt-7"
                style={{ borderTop: `1px solid rgba(255,255,255,0.16)` }}
              >
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="vt-mono text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      PRICE · USD
                    </div>
                    <div className="vt-display text-[36px] leading-none" style={{ color: COLORS.bg, fontWeight: 700 }}>
                      ${FLAGSHIP.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="vt-mono text-[10px]" style={{ color: COLORS.accentSoft }}>
                    {FLAGSHIP.stock} IN STOCK
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] w-full transition hover:opacity-90"
                    style={{ background: COLORS.accent, color: COLORS.bg, fontWeight: 600 }}
                  >
                    Add to cart
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:bg-white/10"
                    style={{ border: `1px solid rgba(255,255,255,0.25)`, color: COLORS.bg, fontWeight: 600 }}
                  >
                    Full spec
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CATALOGUE — alternating editorial product blocks
          Structure: large running number watermark + asymmetric image/text
          ════════════════════════════════════════════════════════════════════ */}
      <section id="catalogue" className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-20"
          >
            <motion.div variants={fade} className="flex items-baseline gap-5 mb-6">
              <span className="vt-label" style={{ color: COLORS.accent }}>02 — The Catalogue</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="vt-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
                {PRODUCTS.length + 1} ITEMS · ALL SHIPPING
              </span>
            </motion.div>
            <motion.h2
              variants={fade}
              className="vt-display max-w-4xl mb-4"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                lineHeight: 1.05,
                color: COLORS.ink,
                fontWeight: 400,
              }}
            >
              Five systems,{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 400 }}>
                one architecture.
              </em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="text-[15px] max-w-[600px] leading-[1.7]"
              style={{ color: COLORS.inkSoft }}
            >
              Power storage, motorised shade, mechanical shade, AC conversion, and the swivel
              hardware that pivots your day from work to dinner. Every product engineered for
              the same operating envelope.
            </motion.p>
          </motion.div>

          <div className="space-y-28 lg:space-y-36">
            {PRODUCTS.map((p, idx) => {
              const isReverse = idx % 2 === 1;
              return (
                <motion.article
                  key={p.id}
                  id={`product-${p.id}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={stagger}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
                >
                  {/* Floating section number */}
                  <div
                    className={`absolute pointer-events-none select-none hidden lg:block ${
                      isReverse ? '-right-4 -top-20' : '-left-4 -top-20'
                    }`}
                  >
                    <span className="vt-section-num" style={{ fontSize: 'clamp(8rem, 14vw, 14rem)' }}>
                      {p.code}
                    </span>
                  </div>

                  <motion.div
                    variants={fade}
                    className={`relative z-10 lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <Gallery images={p.images} name={p.fullName} />
                  </motion.div>

                  <motion.div
                    variants={fade}
                    className={`relative z-10 lg:col-span-5 lg:pt-8 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="vt-mono text-[10px]"
                        style={{ color: COLORS.inkMuted }}
                      >
                        {p.category.toUpperCase()}
                      </span>
                      <span className="h-px flex-1" style={{ background: COLORS.rule }} />
                      <span
                        className="px-2 py-0.5 vt-mono text-[10px]"
                        style={{ background: COLORS.accentSoft, color: COLORS.accentDeep }}
                      >
                        {p.badge.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      className="vt-display leading-[1.1] mb-3"
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        color: COLORS.ink,
                        fontWeight: 500,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="vt-display text-[18px] leading-[1.4] mb-6"
                      style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 400 }}
                    >
                      {p.subtitle}
                    </p>

                    <p
                      className="text-[14.5px] leading-[1.7] mb-7"
                      style={{ color: COLORS.inkSoft }}
                    >
                      {p.summary}
                    </p>

                    {/* Metric strip */}
                    <div
                      className="flex flex-wrap gap-px mb-7"
                      style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
                    >
                      {p.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="px-4 py-3 flex-1 min-w-[110px]"
                          style={{ background: COLORS.bgPaper }}
                        >
                          <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>
                            {m.k.toUpperCase()}
                          </div>
                          <div className="vt-display text-[15px] leading-tight mt-1" style={{ color: COLORS.ink, fontWeight: 600 }}>
                            {m.v}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-8">
                      {p.highlights.slice(0, 5).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[13px] leading-[1.6]"
                          style={{ color: COLORS.inkSoft }}
                        >
                          <CheckCircle
                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                            style={{ color: COLORS.accent }}
                            strokeWidth={1.5}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Variants if present */}
                    {p.variants && (
                      <div className="mb-7">
                        <div className="vt-mono text-[10px] mb-2" style={{ color: COLORS.inkMuted }}>
                          AVAILABLE OPTIONS
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.variants.map((v) => (
                            <span
                              key={v}
                              className="px-2.5 py-1 vt-mono text-[10px]"
                              style={{
                                border: `1px solid ${COLORS.rule}`,
                                color: COLORS.inkSoft,
                              }}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price + actions */}
                    <div
                      className="pt-6 mb-5 flex items-end justify-between"
                      style={{ borderTop: `1px solid ${COLORS.rule}` }}
                    >
                      <div>
                        <div className="vt-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>
                          FROM · USD
                        </div>
                        <div className="vt-display text-[28px] leading-none" style={{ color: COLORS.ink, fontWeight: 700 }}>
                          ${p.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="vt-mono text-[10px]" style={{ color: COLORS.inkMuted }}>
                        {p.stock} IN STOCK
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => openExt(productUrl(p.handle))}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] w-full transition hover:opacity-90"
                        style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
                      >
                        Add to cart
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openExt(productUrl(p.handle))}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] transition hover:bg-stone-100"
                        style={{
                          border: `1px solid ${COLORS.ink}`,
                          color: COLORS.ink,
                          fontWeight: 600,
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ENGINEERING PILLARS — bronze-tinted glass cards
          Structure: large numbered title + 4 quietly-different cards
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="engineering"
        className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: COLORS.bgSoft }}
      >
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle, ${COLORS.accentSoft}, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        <div className="relative max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16"
          >
            <motion.div variants={fade} className="lg:col-span-5">
              <div className="flex items-baseline gap-5 mb-6">
                <span className="vt-label" style={{ color: COLORS.accent }}>03 — Engineering</span>
                <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              </div>
              <h2
                className="vt-display leading-[1.05]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  color: COLORS.ink,
                  fontWeight: 400,
                }}
              >
                Four principles{' '}
                <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 400 }}>
                  every Vantrix system follows.
                </em>
              </h2>
            </motion.div>
            <motion.p
              variants={fade}
              className="lg:col-span-7 text-[15px] leading-[1.75] lg:pt-7"
              style={{ color: COLORS.inkSoft }}
            >
              Vantrix products are not built to fill a price point. They are built to retire the
              lead-acid bank, replace the cranked awning that warped in the sun, and let your
              kitchen table become your office in ten seconds flat. The principles below are
              the ones we will not compromise on.
            </motion.p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
          >
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="p-7 lg:p-9 group transition-all relative"
                style={{ background: COLORS.bgPaper }}
              >
                <div className="flex items-start justify-between mb-7">
                  <span
                    className="vt-display text-[13px]"
                    style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 400 }}
                  >
                    {p.n}
                  </span>
                  <div style={{ color: COLORS.accent }}>
                    {p.icon}
                  </div>
                </div>
                <h3
                  className="vt-display text-[20px] leading-tight mb-3"
                  style={{ color: COLORS.ink, fontWeight: 600 }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.65]"
                  style={{ color: COLORS.inkSoft }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          POWER SYSTEM BUILDER — signature functional widget
          ════════════════════════════════════════════════════════════════════ */}
      <section id="builder" className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden">
        <div
          className="absolute -top-40 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.accentSoft}, transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-14"
          >
            <motion.div variants={fade} className="flex items-baseline gap-5 mb-6">
              <span className="vt-label flex items-center gap-2" style={{ color: COLORS.accent }}>
                <Sliders className="w-3.5 h-3.5" />
                04 — Power System Builder
              </span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="vt-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
                LIVE · INTERACTIVE
              </span>
            </motion.div>
            <motion.h2
              variants={fade}
              className="vt-display max-w-4xl mb-5"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                lineHeight: 1.05,
                color: COLORS.ink,
                fontWeight: 400,
              }}
            >
              Size your build{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 400 }}>
                in under a minute.
              </em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="text-[15px] max-w-[700px] leading-[1.7]"
              style={{ color: COLORS.inkSoft }}
            >
              Drop in the appliances you actually plan to run. Set days of autonomy and your roof
              solar capacity. The builder calculates daily Wh demand, peak surge load, and tells
              you exactly how many 600Ah batteries — plus which inverter — you need.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <PowerSystemBuilder />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SPECS COMPARISON TABLE
          ════════════════════════════════════════════════════════════════════ */}
      <section id="specs" className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: COLORS.bgPaper }}>
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fade} className="flex items-baseline gap-5 mb-6">
              <span className="vt-label" style={{ color: COLORS.accent }}>05 — Specifications</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
            </motion.div>
            <motion.h2
              variants={fade}
              className="vt-display max-w-3xl"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.05,
                color: COLORS.ink,
                fontWeight: 400,
              }}
            >
              The 600Ah,{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.inkSoft, fontWeight: 400 }}>
                line by line.
              </em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="text-[14px] max-w-[640px] mt-5 leading-[1.7]"
              style={{ color: COLORS.inkMuted }}
            >
              Every value below is straight from the manufacturer datasheet. OEM/ODM variants
              available — contact us for custom discharge currents above 200A, charge currents
              above 150A, or different physical configurations.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
            style={{ border: `1px solid ${COLORS.rule}` }}
          >
            <table className="w-full min-w-[640px]">
              <tbody>
                {FLAGSHIP.fullSpecs.map((row, idx) => (
                  <tr
                    key={row.label}
                    style={{
                      borderBottom: idx === FLAGSHIP.fullSpecs.length - 1 ? 'none' : `1px solid ${COLORS.rule}`,
                      background: idx % 2 === 0 ? COLORS.bgPaper : COLORS.bgGlass,
                    }}
                  >
                    <td
                      className="px-6 py-4 vt-mono text-[11px]"
                      style={{ color: COLORS.inkMuted, width: '40%' }}
                    >
                      {row.label.toUpperCase()}
                    </td>
                    <td
                      className="px-6 py-4 text-[14px]"
                      style={{ color: COLORS.ink, fontWeight: 500 }}
                    >
                      {row.v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GUARANTEES — dark band
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-10" style={{ background: COLORS.bgDeep, color: COLORS.bg }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Shield className="w-5 h-5" strokeWidth={1.4} />,
              t: '5-Year Warranty',
              d: 'On the 600Ah battery. Free replacement parts, online technical support throughout the term.',
            },
            {
              icon: <Truck className="w-5 h-5" strokeWidth={1.4} />,
              t: 'Free U.S. Shipping',
              d: 'Most lower-48 orders ship from California within two business days. Lead times vary on awnings.',
            },
            {
              icon: <Wrench className="w-5 h-5" strokeWidth={1.4} />,
              t: 'California Build Team',
              d: 'Talk to builders, not script-readers. We can spec your bank, sizing, and integration directly.',
            },
          ].map((g) => (
            <div key={g.t} className="flex items-start gap-5">
              <div
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center"
                style={{
                  border: `1px solid rgba(255,255,255,0.2)`,
                  color: COLORS.bg,
                }}
              >
                {g.icon}
              </div>
              <div>
                <div className="vt-display text-[20px] mb-2" style={{ fontWeight: 600 }}>{g.t}</div>
                <div className="text-[13.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {g.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING CTA — large editorial outro
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 px-6 lg:px-10 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${COLORS.accentSoft}55, transparent 60%)`,
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto relative"
        >
          <motion.div variants={fade} className="vt-label mb-6" style={{ color: COLORS.accent }}>
            — Begin your build
          </motion.div>
          <motion.h2
            variants={fade}
            className="vt-display mb-8"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              color: COLORS.ink,
              fontWeight: 400,
            }}
          >
            The last bank{' '}
            <em style={{ fontStyle: 'italic', color: COLORS.accent, fontWeight: 400 }}>
              you’ll ever buy.
            </em>
          </motion.h2>
          <motion.p
            variants={fade}
            className="text-[16px] leading-[1.7] mb-10 max-w-xl mx-auto"
            style={{ color: COLORS.inkSoft }}
          >
            Five systems, in stock and ready to ship from Big Bear, California. Free domestic
            shipping. Five-year warranty on the battery.
          </motion.p>
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openExt(LINKS.shopAll)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[13px] transition hover:opacity-90"
              style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
            >
              Shop all Vantrix
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openExt(LINKS.contact)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[13px] transition hover:bg-stone-100"
              style={{ border: `1px solid ${COLORS.ink}`, color: COLORS.ink, fontWeight: 600 }}
            >
              Talk to a builder
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer
        className="px-6 lg:px-10 pt-20 pb-10"
        style={{ background: COLORS.bgSoft, borderTop: `1px solid ${COLORS.rule}` }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12"
            style={{ borderBottom: `1px solid ${COLORS.rule}` }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: COLORS.ink, color: COLORS.bg }}
                >
                  <Hexagon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="vt-display text-[22px] leading-none" style={{ color: COLORS.ink, fontWeight: 600 }}>
                    Vantrix
                  </div>
                  <div className="vt-mono text-[10px] mt-1" style={{ color: COLORS.inkMuted }}>
                    METAL · POWER · VAN PARTS OUTLET
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[1.7] max-w-md" style={{ color: COLORS.inkSoft }}>
                Industrial-grade LiFePO4 storage, electric and manual awnings, pure sine inverters,
                and swivel hardware for serious van builds.
              </p>
            </div>

            <form onSubmit={handleEmail} className="w-full lg:w-auto">
              <div className="vt-label mb-3" style={{ color: COLORS.inkMuted }}>
                Build updates
              </div>
              <div className="flex" style={{ border: `1px solid ${COLORS.ink}` }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="px-4 py-3 text-[13px] outline-none flex-1 lg:w-72 bg-transparent"
                  style={{ color: COLORS.ink }}
                />
                <button
                  type="submit"
                  className="px-5 text-[12px] transition hover:opacity-90 flex items-center gap-2"
                  style={{ background: COLORS.ink, color: COLORS.bg, fontWeight: 600 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </div>
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="vt-mono text-[11px] mt-3"
                  style={{ color: COLORS.accent }}
                >
                  ✓ Email client opened — finish from your mail app.
                </motion.div>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12">
            <div>
              <div className="vt-label mb-5" style={{ color: COLORS.inkMuted }}>
                Catalogue
              </div>
              <ul className="space-y-3 text-[13px]">
                <li>
                  <a
                    href={productUrl(FLAGSHIP.handle)}
                    onClick={(e) => { e.preventDefault(); openExt(productUrl(FLAGSHIP.handle)); }}
                    className="vt-link-underline"
                    style={{ color: COLORS.ink }}
                  >
                    600Ah Battery
                  </a>
                </li>
                {PRODUCTS.map((p) => (
                  <li key={p.id}>
                    <a
                      href={productUrl(p.handle)}
                      onClick={(e) => { e.preventDefault(); openExt(productUrl(p.handle)); }}
                      className="vt-link-underline"
                      style={{ color: COLORS.ink }}
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="vt-label mb-5" style={{ color: COLORS.inkMuted }}>
                Support
              </div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['Contact', LINKS.contact],
                  ['FAQ', LINKS.faq],
                  ['Warranty', LINKS.warranty],
                  ['Returns', LINKS.returns],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="vt-link-underline"
                      style={{ color: COLORS.ink }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="vt-label mb-5" style={{ color: COLORS.inkMuted }}>
                Company
              </div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['About VPO', LINKS.about],
                  ['Terms', LINKS.terms],
                  ['Privacy', LINKS.privacy],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="vt-link-underline"
                      style={{ color: COLORS.ink }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <div className="vt-label mb-5" style={{ color: COLORS.inkMuted }}>
                Headquarters
              </div>
              <ul className="space-y-3 text-[13px]" style={{ color: COLORS.ink }}>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.4} style={{ color: COLORS.accent }} />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.4} style={{ color: COLORS.accent }} />
                  <span>{BUSINESS.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.4} style={{ color: COLORS.accent }} />
                  <a href={`tel:${BUSINESS.phone}`} className="vt-link-underline">
                    {BUSINESS.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.4} style={{ color: COLORS.accent }} />
                  <a href={LINKS.email} className="vt-link-underline">
                    {BUSINESS.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${COLORS.rule}` }}
          >
            <div className="vt-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
              © {new Date().getFullYear()} VAN PARTS OUTLET · VANTRIX IS A VPO HOUSE BRAND
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: <Facebook className="w-3.5 h-3.5" strokeWidth={1.4} />, href: LINKS.facebook, label: 'Facebook' },
                { icon: <Instagram className="w-3.5 h-3.5" strokeWidth={1.4} />, href: LINKS.instagram, label: 'Instagram' },
                { icon: <Mail className="w-3.5 h-3.5" strokeWidth={1.4} />, href: LINKS.email, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => { e.preventDefault(); openExt(s.href); }}
                  className="w-9 h-9 flex items-center justify-center transition hover:bg-stone-200"
                  style={{ border: `1px solid ${COLORS.rule}`, color: COLORS.ink }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}