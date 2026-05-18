"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Battery, Zap, Sun, Wind, Shield, Truck, CheckCircle, ArrowRight, ArrowUpRight,
  ChevronDown, ChevronRight, ChevronLeft, Menu, X, Instagram, Facebook,
  Mail, Phone, MapPin, Clock as ClockIcon, Plus, Minus, Send, Cpu, Layers,
  Award, Wrench, Activity, Compass, Sliders, Gauge, Power, Coffee, AlertCircle,
  ArrowDown, Settings, Anchor, Aperture, Hexagon, Move, Search, Square,
  Layers3, Cog, Construction, Sparkles, FileText, ListChecks, Boxes,
  Tv, Refrigerator, Microwave, Laptop, Lightbulb, Flame, MessageSquare,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════════════
   VANTRIX — VAN METAL & POWER ARCHITECTURE
   ════════════════════════════════════════════════════════════════════════════ */

/* ─── IMAGE PATHS ─── */
const IMG = (key, i) => `/images/vantrix/${key}-${i}.webp`;
const imgs = (key, count) => Array.from({ length: count }, (_, i) => IMG(key, i + 1));

/* Use the flagship battery hero image (image 1) as the section background. 
   No more /images/v1.png — uses an image we know exists in /public/images/vantrix/. */
const HERO_IMAGE = '/images/vantrix/awning11.jpg';
const SECTION_BG_IMAGE = '/images/vantrix/battery-600ah-3.webp';
/* ─── LINKS ─── */
const SHOP_BASE = 'https://vanpartsoutlet.com';
const COLLECTION_PAGE = `${SHOP_BASE}/collections/vantrix`;
const productUrl = (handle) => `${SHOP_BASE}/products/${handle}`;

const LINKS = {
  shopAll: COLLECTION_PAGE,
  collection: COLLECTION_PAGE,
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

/* ════════════════════════════════════════════════════════════════════════════
   FLAGSHIP
   ════════════════════════════════════════════════════════════════════════════ */
const FLAGSHIP = {
  id: 'battery-600ah',
  series: 'VTX — Energy',
  name: 'VanTrix 600Ah LiFePO4 Deep Cycle',
  shortName: '600Ah Battery',
  tagline: 'Grade-A cells. 7.2 kWh. The last battery your build will ever need.',
  description:
    'Engineered for serious off-grid life — a single industrial-grade LiFePO4 unit that replaces an entire bank of lead-acid batteries. 24,000-cycle life, native -30°C cold-weather operation, integrated smart BMS, and enough headroom to drive 2000-3000W inverters from one block.',
  price: 3499.99,
  handle: 'vantrix-12v-600ah-lifepo4-deep-cycle-battery',
  inventory: 24,
  badge: 'Energy Core',
  images: imgs('battery-600ah', 6),
  metrics: [
    { k: 'Capacity', v: '600 Ah' },
    { k: 'Energy', v: '7.2 kWh' },
    { k: 'Cycle Life', v: '24,000+' },
    { k: 'Temp Range', v: '-30 / 60°C' },
  ],
  highlights: [
    'Grade-A LiFePO4 cells — 6× the cycle life of standard lithium',
    '24,000+ cycle life @ 25°C — engineered for daily use across 10+ years',
    'Native cold-weather operation down to -30°C — no heating pad required',
    '200A continuous discharge — drives 2000W–3000W inverters from one unit',
    'Integrated smart BMS — cell balancing, overcharge, over-discharge protection',
    'CE, RoHS, UN38.3 certified — safe for international vehicle installation',
    '5-year manufacturer warranty with free replacement parts',
    'OEM/ODM configurations available for custom builds',
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   LINEUP
   ════════════════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 'inverter-3000w',
    series: 'VTX — Power',
    name: '3000W Pure Sine Inverter/Charger',
    shortName: '3000W Inverter',
    tagline: '12V → 110V AC · Built-in charger · 6000W surge',
    blurb:
      'A combined inverter and charger that converts native 12V DC into clean 110V pure sine wave AC — under 3% THD — and seamlessly transitions to shore power or generator input. Drives induction cooktops, professional workstations, and heavy AC loads from your battery bank without compromise.',
    price: 899.99,
    handle: '3000w-pure-sine-wave-inverter-charger-12v-dc-to-110v-ac',
    inventory: 3,
    badge: 'Power Stage',
    images: imgs('inverter-3000w', 1),
    keyMetric: { k: 'Continuous', v: '3000 W' },
    metrics: [
      { k: 'Peak Surge', v: '6000 W' },
      { k: 'Efficiency', v: 'Up to 95%' },
      { k: 'Transfer', v: '≤10 ms' },
    ],
    highlights: [
      'Pure sine wave output — THD under 3%, safe for any sensitive electronics',
      '6000W peak surge handles motor inrush, induction cooktops, power tools',
      'Integrated AC-DC charger — auto-transitions to shore or generator',
      'Compatible with LiFePO4, AGM, Gel, and lead-acid battery chemistries',
      '≤10 ms transfer time — uninterrupted operation through source changes',
      'Forced-air cooling — sustained high-load operation in any climate',
      'Auxiliary remote control panel for cabin-side monitoring',
      'Full protection: overload, over-temp, over/under voltage, short-circuit',
    ],
  },
  {
    id: 'awning-electric',
    series: 'VTX — Shelter',
    name: 'Automated Electric Awning',
    shortName: 'Electric Awning',
    tagline: 'Legless · Wind-sensor auto-retract · 12V motorized',
    blurb:
      'A premium powered shade system with an architectural-grade aluminum cassette and a legless cantilever design. The integrated vibration sensor auto-stows the awning during sudden gusts — even when you are away from the van — protecting hardware investment without manual intervention.',
    price: 3226.00,
    handle: 'vantrix-automated-wind-sensor-legless-electric-side-mounted-awning',
    inventory: 3,
    badge: 'Smart Shelter',
    images: imgs('awning-electric', 5),
    keyMetric: { k: 'Sizes', v: '118" or 157"' },
    metrics: [
      { k: 'Projection', v: '8.2 ft / 2.5 m' },
      { k: 'Motor', v: '12V DC high-torque' },
      { k: 'Housing', v: 'Aluminum cassette' },
    ],
    highlights: [
      'Vibration-triggered auto-retraction — 24/7 protection while you are away',
      'Legless cantilever design — unobstructed 360° entry, no trip hazards',
      'UV-resistant PVC-coated vinyl, waterproof and flame retardant',
      'Architectural-grade powder-coated aluminum cassette housing',
      'Stealth black aerodynamic profile — matches modern van exterior trim',
      'Wireless remote + hardwired wall-switch control included',
      'Emergency manual override port for off-grid power loss',
      'Available in 118" (3m) or 157" (4m) lengths',
    ],
  },
  {
    id: 'awning-manual',
    series: 'VTX — Shelter',
    name: 'Manual Side-Mounted Awning',
    shortName: 'Manual Awning',
    tagline: 'Crank-deployed · Telescoping legs · 280 g/m² PVC fabric',
    blurb:
      'A heavy-duty mechanical shade system for builders who want maximum reliability without electrical complexity. The 280 g/m² PVC-coated polyester fabric blocks UV 50+, deploys in under three minutes, and locks into adjustable telescoping legs for pitched rain runoff.',
    price: 1418.00,
    handle: 'vantrix-manual-side-mounted-awning-with-leg-supports-118-or-157',
    inventory: 2,
    badge: 'Built Simple',
    images: imgs('awning-manual', 4),
    keyMetric: { k: 'Sizes', v: '118" or 157"' },
    metrics: [
      { k: 'Projection', v: '8.2 ft / 2.5 m' },
      { k: 'Fabric', v: '280 g/m² PVC' },
      { k: 'UV Rating', v: 'UV 50+' },
    ],
    highlights: [
      'No motors, no wiring, no sensors — bulletproof mechanical reliability',
      '280 g/m² PVC-coated polyester — waterproof, UV 50+, mildew resistant',
      'Adjustable telescoping legs — proper pitch for rain runoff',
      'Quick-lock ground stabilization for uneven campsites',
      'Slim-line matte black aluminum cassette housing',
      'Aerodynamic profile preserves highway fuel economy',
      'Deploys in under three minutes from stowed position',
      'Available in 118" (3m) or 157" (4m) lengths',
    ],
  },
  {
    id: 'swivel-table',
    series: 'VTX — Interior',
    name: 'Swivel Table Hardware Kit',
    shortName: 'Swivel Table',
    tagline: '360° rotation · 50 lb load · Steel construction',
    blurb:
      'A modular hardware-only mount that transforms your van interior between dining room, lounge, and workspace in seconds. Heavy-duty steel construction with three tool-free adjustment handles, vibration-resistant M10/M8 fasteners, and an anti-scratch base plate engineered for van bulkhead installation.',
    price: 185.00,
    handle: 'vantrix-swivel-table-hardware-kit',
    inventory: 34,
    badge: 'Layout Hack',
    images: imgs('swivel-table', 8),
    keyMetric: { k: 'Load', v: '50 lb · 22.7 kg' },
    metrics: [
      { k: 'Rotation', v: '360°' },
      { k: 'Material', v: 'Powder-coated steel' },
      { k: 'Finishes', v: 'Black · Silver' },
    ],
    highlights: [
      'Full 360° swivel — use from driver seat, sofa, galley, or doorway',
      'Three tool-free adjustment handles for quick repositioning',
      'High-strength steel with corrosion-resistant powder coating',
      'Vibration-resistant M10/M8 industrial fasteners',
      'Adjustable height column for different seating configurations',
      'Anti-scratch plastic backing protects van wall paneling',
      'Modular swing-out design — open the hallway when not in use',
      'Hardware-only kit — bring your own DIY tabletop for full aesthetic control',
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   PILLARS
   ════════════════════════════════════════════════════════════════════════════ */
const PILLARS = [
  {
    n: '01',
    title: 'Industrial Grade, Mobile Form',
    desc: 'Every Vantrix component starts at industrial spec — then gets dimensioned, vibration-tested, and certified for full-time vehicle travel.',
    icon: <Construction className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    n: '02',
    title: 'One Architecture',
    desc: 'Battery, inverter, and accessories engineered as a single system. Wire it once with confidence — the whole stack already speaks the same language.',
    icon: <Layers3 className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    n: '03',
    title: 'Mechanically Honest',
    desc: 'Steel where it matters. Aluminum where it counts. No plastic where vibration lives. Hardware engineered to outlive the van it is bolted to.',
    icon: <Cog className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    n: '04',
    title: 'Certifiably Safe',
    desc: 'CE · RoHS · UN38.3. Smart BMS on every cell. Auto-retract on every motor. Protection thought through before it leaves the factory floor.',
    icon: <Shield className="w-4 h-4" strokeWidth={1.5} />,
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   PLATFORM COMPATIBILITY
   ════════════════════════════════════════════════════════════════════════════ */
const PLATFORMS = [
  { name: 'Mercedes Sprinter', sub: '144" · 170" · 170" Ext', mod: 'All wheelbases' },
  { name: 'Ford Transit', sub: 'Mid & High Roof', mod: '148" / 148" Ext' },
  { name: 'Ram ProMaster', sub: '136" · 159" · 159" Ext', mod: 'All wheelbases' },
  { name: 'Custom Conversions', sub: 'Tiny homes · Mobile workshops', mod: 'OEM/ODM available' },
];

/* ════════════════════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════════════════════ */
const FAQ = [
  {
    q: 'Does the 600Ah battery really replace a full lead-acid bank?',
    a: 'Yes — a single Vantrix 600Ah LiFePO4 unit delivers 7.2 kWh of usable energy storage, which is roughly equivalent to four 200Ah lead-acid batteries (after accounting for the 50% safe depth-of-discharge limit on lead-acid). One block, one wiring run, one terminal pair.',
  },
  {
    q: 'Can I pair the 3000W inverter with the 600Ah battery?',
    a: 'They are designed together. The 600Ah battery supports 200A continuous discharge, which gives the 3000W inverter all the headroom it needs at full load. The integrated charger on the inverter also speaks LiFePO4 natively at 14.6V, so no separate charge controller is required for shore-power operation.',
  },
  {
    q: 'What is the difference between the electric and manual awning?',
    a: 'The Electric Awning is motorized, legless, and includes a wind-vibration sensor that auto-retracts during gusts even when you are away from the van. The Manual Awning is hand-cranked with telescoping support legs — simpler, lighter, and significantly more affordable, with no electrical wiring required.',
  },
  {
    q: 'Does the swivel table kit include a tabletop?',
    a: 'No — the kit is hardware only (steel column, base plate, bracket, fasteners, three adjustment handles). This is intentional: it lets you bring your own DIY tabletop in any wood, laminate, or finish that matches your interior aesthetic.',
  },
  {
    q: 'Are these products warrantied?',
    a: 'The 600Ah battery carries a five-year manufacturer warranty with free replacement parts. All other Vantrix products carry a one-year manufacturing warranty against defects. Damage from improper installation or non-LiFePO4 charge profiles is not covered.',
  },
  {
    q: 'Can I order custom configurations?',
    a: 'Yes — Vantrix accepts OEM/ODM orders. Custom discharge currents above 200A, custom charging currents above 150A, and custom battery configurations are all available. Email vanpartsoutlet@gmail.com with your spec.',
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   APPLIANCES
   ════════════════════════════════════════════════════════════════════════════ */
const APPLIANCES = [
  { id: 'fridge',     name: 'DC Compressor Fridge',  watts: 50,   hours: 24, icon: <Refrigerator className="w-4 h-4" /> },
  { id: 'induction',  name: 'Induction Cooktop',     watts: 1800, hours: 1,  icon: <Flame className="w-4 h-4" /> },
  { id: 'microwave',  name: 'Microwave',             watts: 1200, hours: 0.5, icon: <Microwave className="w-4 h-4" /> },
  { id: 'kettle',     name: 'Electric Kettle',       watts: 1500, hours: 0.3, icon: <Coffee className="w-4 h-4" /> },
  { id: 'laptop',     name: 'Laptop / Workstation',  watts: 65,   hours: 8,  icon: <Laptop className="w-4 h-4" /> },
  { id: 'tv',         name: 'TV / Monitor',          watts: 80,   hours: 4,  icon: <Tv className="w-4 h-4" /> },
  { id: 'lights',     name: 'LED Lighting',          watts: 20,   hours: 6,  icon: <Lightbulb className="w-4 h-4" /> },
  { id: 'ac',         name: 'Rooftop AC',            watts: 420,  hours: 6,  icon: <Wind className="w-4 h-4" /> },
];

/* ════════════════════════════════════════════════════════════════════════════
   THEME — Unified warm cream + bronze
   ════════════════════════════════════════════════════════════════════════════ */
const COLORS = {
  /* light surfaces */
  bg:        '#f6f4f0',
  bgSoft:    '#ecebe5',
  bgPaper:   '#fdfcfa',
  bgGlass:   'rgba(246, 244, 240, 0.92)',

  /* ink */
  ink:       '#191919',
  inkSoft:   '#3d3a36',
  inkMuted:  '#7a766f',
  rule:      '#dedbd3',

  /* accent — warm bronze */
  bronze:    '#a06236',
  bronzeSoft:'#e8d5c4',
  bronzeInk: '#5e3a20',

  /* dark surfaces */
  dark:        '#1a1916',
  darkSoft:    '#262420',
  darkPaper:   '#0f0e0c',
  darkInk:     '#f6f4f0',
  darkMuted:   '#9c958a',
  darkRule:    'rgba(246,244,240,0.12)',
  bronzeOnDark:'#d4a274',

  /* configurator dark */
  cfgBg:        '#15120e',
  cfgSurface:   '#1f1a14',
  cfgSurface2:  '#2a221a',
  cfgInk:       '#f6f0e6',
  cfgMuted:     '#a89d8c',
  cfgRule:      'rgba(212, 162, 116, 0.18)',
  cfgRuleSoft:  'rgba(212, 162, 116, 0.08)',
};

/* ════════════════════════════════════════════════════════════════════════════
   ANIMATION
   ════════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ════════════════════════════════════════════════════════════════════════════
   COUNTER
   ════════════════════════════════════════════════════════════════════════════ */
function Counter({ to, suffix = '', duration = 1.6 }) {
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

  const display = to >= 1000
    ? Math.round(val).toLocaleString()
    : Number.isInteger(to) ? Math.round(val) : val.toFixed(1);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ════════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ════════════════════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[1.5px] origin-left"
      style={{ scaleX, background: COLORS.bronze }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   GALLERY — FIXED: Pre-loads all images, swaps via opacity instead of mount/unmount
   This eliminates the blinking/lag on scroll because:
   1. All images are rendered as siblings (no mount/unmount thrashing)
   2. Only opacity toggles between them (compositor-only, GPU-accelerated)
   3. No AnimatePresence remounting on every active-index change
   ════════════════════════════════════════════════════════════════════════════ */
function Gallery({ images, name, dark = false }) {
  const [i, setI] = useState(0);
  const safe = images.length > 0 ? images : [HERO_IMAGE];
  const next = () => setI((p) => (p + 1) % safe.length);
  const prev = () => setI((p) => (p - 1 + safe.length) % safe.length);

  const surface = dark ? 'rgba(255,255,255,0.04)' : COLORS.bgPaper;
  const border = dark ? COLORS.darkRule : COLORS.rule;
  const chipBg = dark ? 'rgba(0,0,0,0.65)' : 'rgba(253,252,250,0.92)';
  const chipText = dark ? COLORS.darkInk : COLORS.ink;

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden group"
        style={{ background: surface, border: `1px solid ${border}` }}
      >
        {/* ALL images stacked — only opacity toggles (no remount, no lag) */}
        {safe.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${name} — view ${idx + 1}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
            style={{
              opacity: idx === i ? 1 : 0,
              willChange: 'opacity',
              pointerEvents: idx === i ? 'auto' : 'none',
            }}
          />
        ))}

        {safe.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 backdrop-blur z-10"
              style={{ background: chipBg, color: chipText, border: `1px solid ${border}` }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 backdrop-blur z-10"
              style={{ background: chipBg, color: chipText, border: `1px solid ${border}` }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div
              className="absolute bottom-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.2em] backdrop-blur z-10"
              style={{ background: chipBg, color: chipText, border: `1px solid ${border}`, fontFamily: 'var(--font-mono)' }}
            >
              {String(i + 1).padStart(2, '0')} · {String(safe.length).padStart(2, '0')}
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
              className={`flex-shrink-0 w-14 h-14 overflow-hidden transition-opacity ${
                idx === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
              style={{
                border: `1px solid ${idx === i ? (dark ? COLORS.bronzeOnDark : COLORS.bronze) : border}`,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   BUILD CONFIGURATOR — DARK THEME, BRONZE ACCENTS
   ════════════════════════════════════════════════════════════════════════════ */
function BuildConfigurator() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ fridge: true, lights: true });
  const [autonomyDays, setAutonomyDays] = useState(2);
  const [solarW, setSolarW] = useState(400);

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const result = useMemo(() => {
    let dailyWh = 0;
    let peakW = 0;
    const breakdown = [];

    APPLIANCES.forEach((a) => {
      if (!selected[a.id]) return;
      const wh = a.watts * a.hours;
      dailyWh += wh;
      peakW = Math.max(peakW, a.watts);
      breakdown.push({ id: a.id, name: a.name, wh, watts: a.watts });
    });

    const solarWhPerDay = solarW * 4.5 * 0.75;
    const netDailyWh = Math.max(0, dailyWh - solarWhPerDay);
    const requiredWh = netDailyWh * autonomyDays;
    const requiredAh = requiredWh / 12 / 0.8;
    const batteriesNeeded = Math.max(1, Math.ceil(requiredAh / 600));

    let recommendedInverter = 'None required';
    let inverterNeeded = false;
    const hasACLoad = breakdown.some(b => ['induction', 'microwave', 'kettle', 'tv', 'laptop'].includes(b.id));
    if (hasACLoad) {
      inverterNeeded = true;
      recommendedInverter = '3000W Pure Sine Inverter/Charger';
    }

    return {
      dailyWh: Math.round(dailyWh),
      peakW: Math.round(peakW),
      solarWhPerDay: Math.round(solarWhPerDay),
      netDailyWh: Math.round(netDailyWh),
      requiredWh: Math.round(requiredWh),
      requiredAh: Math.round(requiredAh),
      batteriesNeeded,
      recommendedInverter,
      inverterNeeded,
      breakdown,
    };
  }, [selected, autonomyDays, solarW]);

  const anySelected = Object.values(selected).some(Boolean);
  const canProceed1 = anySelected;

  const totalBuildCost = (result.batteriesNeeded * FLAGSHIP.price) +
                         (result.inverterNeeded ? PRODUCTS[0].price : 0);

  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-12 flex-wrap">
        {[
          { n: 1, label: 'Load Profile' },
          { n: 2, label: 'Autonomy & Solar' },
          { n: 3, label: 'Your Build' },
        ].map((s, idx) => (
          <React.Fragment key={s.n}>
            <button
              onClick={() => (idx === 0 || step > idx) && setStep(s.n)}
              disabled={s.n > 1 && !canProceed1}
              className="flex items-center gap-3 px-4 py-2 transition-all"
              style={{
                background: step === s.n ? COLORS.bronzeOnDark : 'transparent',
                border: `1px solid ${step === s.n ? COLORS.bronzeOnDark : COLORS.cfgRule}`,
                color: step === s.n ? COLORS.cfgBg : (s.n > step ? COLORS.cfgMuted : COLORS.cfgInk),
                opacity: s.n > step ? 0.5 : 1,
                cursor: s.n > 1 && !canProceed1 ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="vx-mono text-[11px]">{String(s.n).padStart(2, '0')}</span>
              <span className="text-[12px] tracking-[0.08em]" style={{ fontWeight: 600 }}>
                {s.label}
              </span>
            </button>
            {idx < 2 && (
              <span className="hidden md:inline h-px w-8" style={{ background: COLORS.cfgRule }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1 — Appliances */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8">
              <div className="vx-label mb-3" style={{ color: COLORS.bronzeOnDark }}>STEP 01 — Load Profile</div>
              <h3 className="text-[clamp(1.5rem,2.5vw,2.25rem)] mb-3 leading-tight" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                What runs in your build?
              </h3>
              <p className="text-[14px] leading-[1.7] max-w-[520px]" style={{ color: COLORS.cfgMuted }}>
                Select every appliance you plan to power off your battery bank. We will compute the daily energy footprint from real wattage and use profiles.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {APPLIANCES.map((a) => {
                const on = selected[a.id];
                return (
                  <button
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    className="text-left p-5 transition-all relative overflow-hidden"
                    style={{
                      background: on ? 'rgba(212, 162, 116, 0.12)' : COLORS.cfgSurface,
                      border: `1px solid ${on ? COLORS.bronzeOnDark : COLORS.cfgRule}`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center"
                        style={{
                          background: on ? COLORS.bronzeOnDark : COLORS.cfgSurface2,
                          color: on ? COLORS.cfgBg : COLORS.cfgInk,
                        }}
                      >
                        {a.icon}
                      </div>
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{
                          background: on ? COLORS.bronzeOnDark : 'transparent',
                          border: `1.5px solid ${on ? COLORS.bronzeOnDark : COLORS.cfgRule}`,
                        }}
                      >
                        {on && <CheckCircle className="w-3 h-3" style={{ color: COLORS.cfgBg }} strokeWidth={2.5} />}
                      </div>
                    </div>
                    <div className="text-[14px] mb-1" style={{ color: COLORS.cfgInk, fontWeight: 600, lineHeight: 1.25 }}>
                      {a.name}
                    </div>
                    <div className="vx-mono text-[10px]" style={{ color: COLORS.cfgMuted }}>
                      {a.watts}W · {a.hours}h/day
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: `1px solid ${COLORS.cfgRule}` }}>
              <div>
                <div className="vx-mono text-[10px] mb-1" style={{ color: COLORS.cfgMuted }}>RUNNING TOTAL</div>
                <div className="text-[24px]" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {result.dailyWh.toLocaleString()} Wh<span className="vx-mono text-[12px] ml-2" style={{ color: COLORS.cfgMuted }}>per day</span>
                </div>
              </div>
              <button
                onClick={() => canProceed1 && setStep(2)}
                disabled={!canProceed1}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[13px] transition disabled:opacity-30"
                style={{ background: COLORS.bronzeOnDark, color: COLORS.cfgBg, fontWeight: 700 }}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 — Autonomy & Solar */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8">
              <div className="vx-label mb-3" style={{ color: COLORS.bronzeOnDark }}>STEP 02 — Autonomy & Solar</div>
              <h3 className="text-[clamp(1.5rem,2.5vw,2.25rem)] mb-3 leading-tight" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                How long off the grid?
              </h3>
              <p className="text-[14px] leading-[1.7] max-w-[520px]" style={{ color: COLORS.cfgMuted }}>
                Set how many cloudy or unplugged days your bank should cover, plus the size of your solar array. We will size the battery accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="vx-label flex items-center gap-2" style={{ color: COLORS.cfgMuted }}>
                    <ClockIcon className="w-3.5 h-3.5" />
                    Autonomy
                  </div>
                  <div className="vx-mono text-[16px]" style={{ color: COLORS.cfgInk, fontWeight: 700 }}>
                    {autonomyDays} {autonomyDays === 1 ? 'day' : 'days'}
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={autonomyDays}
                  onChange={(e) => setAutonomyDays(Number(e.target.value))}
                  className="vx-slider-dark w-full"
                />
                <div className="flex justify-between mt-2 vx-mono text-[10px]" style={{ color: COLORS.cfgMuted }}>
                  <span>1 day</span>
                  <span>4 days</span>
                  <span>7 days</span>
                </div>
                <p className="text-[12px] mt-4 leading-[1.6]" style={{ color: COLORS.cfgMuted }}>
                  Cloudy-weather buffer. The bank covers your load for this many days even with zero solar harvest.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="vx-label flex items-center gap-2" style={{ color: COLORS.cfgMuted }}>
                    <Sun className="w-3.5 h-3.5" />
                    Solar Array
                  </div>
                  <div className="vx-mono text-[16px]" style={{ color: COLORS.cfgInk, fontWeight: 700 }}>
                    {solarW} W
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1200}
                  step={100}
                  value={solarW}
                  onChange={(e) => setSolarW(Number(e.target.value))}
                  className="vx-slider-dark w-full"
                />
                <div className="flex justify-between mt-2 vx-mono text-[10px]" style={{ color: COLORS.cfgMuted }}>
                  <span>0 W</span>
                  <span>600 W</span>
                  <span>1200 W</span>
                </div>
                <p className="text-[12px] mt-4 leading-[1.6]" style={{ color: COLORS.cfgMuted }}>
                  Daily harvest estimate at 4.5 peak-sun-hours, 75% system efficiency.
                </p>
              </div>
            </div>

            {/* Preview */}
            <div
              className="mt-10 p-6 grid grid-cols-2 md:grid-cols-4 gap-px"
              style={{ background: COLORS.cfgRule, border: `1px solid ${COLORS.cfgRule}` }}
            >
              {[
                { k: 'Daily Load', v: `${result.dailyWh.toLocaleString()} Wh` },
                { k: 'Solar Harvest', v: `${result.solarWhPerDay.toLocaleString()} Wh` },
                { k: 'Net Need', v: `${result.netDailyWh.toLocaleString()} Wh` },
                { k: `Bank Required`, v: `${result.requiredAh.toLocaleString()} Ah` },
              ].map((m) => (
                <div key={m.k} className="px-5 py-4" style={{ background: COLORS.cfgSurface }}>
                  <div className="vx-mono text-[10px] mb-1.5" style={{ color: COLORS.cfgMuted }}>{m.k.toUpperCase()}</div>
                  <div className="text-[18px]" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>{m.v}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: `1px solid ${COLORS.cfgRule}` }}>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] transition"
                style={{ border: `1px solid ${COLORS.cfgInk}`, color: COLORS.cfgInk, fontWeight: 600 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[13px] transition"
                style={{ background: COLORS.bronzeOnDark, color: COLORS.cfgBg, fontWeight: 700 }}
              >
                Get my build
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 — Recommendation */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8">
              <div className="vx-label mb-3" style={{ color: COLORS.bronzeOnDark }}>STEP 03 — Recommended Build</div>
              <h3 className="text-[clamp(1.5rem,2.5vw,2.25rem)] mb-3 leading-tight" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Your Vantrix configuration.
              </h3>
              <p className="text-[14px] leading-[1.7] max-w-[560px]" style={{ color: COLORS.cfgMuted }}>
                Based on a {result.dailyWh.toLocaleString()} Wh/day load profile, {autonomyDays}-day autonomy buffer, and {solarW}W of solar harvest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Battery card */}
              <div
                className="p-7 flex flex-col"
                style={{ background: COLORS.cfgSurface, border: `1px solid ${COLORS.cfgRule}` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <Battery className="w-5 h-5" style={{ color: COLORS.bronzeOnDark }} />
                  <span className="vx-mono text-[10px]" style={{ color: COLORS.cfgMuted }}>ENERGY CORE</span>
                </div>
                <div className="text-[26px] leading-[1.1] mb-2" style={{ color: COLORS.cfgInk, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {result.batteriesNeeded}×
                </div>
                <div className="text-[14px] mb-4" style={{ color: COLORS.cfgInk, fontWeight: 600 }}>
                  VanTrix 600Ah LiFePO4
                </div>
                <div className="text-[12px] leading-[1.6] mb-6 flex-1" style={{ color: COLORS.cfgMuted }}>
                  Total bank: {(result.batteriesNeeded * 600).toLocaleString()} Ah · {(result.batteriesNeeded * 7.2).toFixed(1)} kWh
                </div>
                <div className="vx-mono text-[10px] mb-1" style={{ color: COLORS.cfgMuted }}>SUBTOTAL</div>
                <div className="text-[20px]" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  ${(result.batteriesNeeded * FLAGSHIP.price).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>

              {/* Inverter card */}
              <div
                className="p-7 flex flex-col"
                style={{
                  background: result.inverterNeeded ? COLORS.cfgSurface : COLORS.cfgSurface2,
                  border: `1px solid ${COLORS.cfgRule}`,
                  opacity: result.inverterNeeded ? 1 : 0.65,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <Zap className="w-5 h-5" style={{ color: result.inverterNeeded ? COLORS.bronzeOnDark : COLORS.cfgMuted }} />
                  <span className="vx-mono text-[10px]" style={{ color: COLORS.cfgMuted }}>POWER STAGE</span>
                </div>
                <div className="text-[26px] leading-[1.1] mb-2" style={{ color: COLORS.cfgInk, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {result.inverterNeeded ? '1×' : '0×'}
                </div>
                <div className="text-[14px] mb-4" style={{ color: COLORS.cfgInk, fontWeight: 600 }}>
                  {result.inverterNeeded ? '3000W Pure Sine Inverter' : 'No AC loads detected'}
                </div>
                <div className="text-[12px] leading-[1.6] mb-6 flex-1" style={{ color: COLORS.cfgMuted }}>
                  {result.inverterNeeded
                    ? `Peak load: ${result.peakW}W · 6000W surge headroom`
                    : 'Skip the inverter — your battery powers all DC loads directly.'}
                </div>
                <div className="vx-mono text-[10px] mb-1" style={{ color: COLORS.cfgMuted }}>SUBTOTAL</div>
                <div className="text-[20px]" style={{ color: COLORS.cfgInk, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  ${result.inverterNeeded ? PRODUCTS[0].price.toLocaleString() : '0'}
                </div>
              </div>

              {/* Summary card */}
              <div
                className="p-7 flex flex-col"
                style={{ background: COLORS.bronzeOnDark, color: COLORS.cfgBg }}
              >
                <div className="flex items-center justify-between mb-5">
                  <Sparkles className="w-5 h-5" style={{ color: COLORS.cfgBg }} />
                  <span className="vx-mono text-[10px]" style={{ color: COLORS.cfgBg, opacity: 0.7 }}>BUILD TOTAL</span>
                </div>
                <div className="text-[12px] mb-2" style={{ color: COLORS.cfgBg, opacity: 0.7, letterSpacing: '0.15em', fontWeight: 600 }}>
                  ESTIMATE
                </div>
                <div className="text-[34px] leading-[1.05] mb-4" style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
                  ${totalBuildCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-[12px] leading-[1.6] mb-6 flex-1" style={{ color: COLORS.cfgBg, opacity: 0.8 }}>
                  Add awning + interior hardware after to complete your build. Free U.S. shipping on every Vantrix order.
                </div>
                <a
                  href={LINKS.contact}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[12px] transition"
                  style={{ background: COLORS.cfgBg, color: COLORS.bronzeOnDark, fontWeight: 700 }}
                >
                  Talk to a builder
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-8 flex items-start gap-3 text-[12px] leading-[1.6]" style={{ color: COLORS.cfgMuted }}>
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                Estimate assumes LiFePO4 chemistry at 80% depth-of-discharge, 4.5 peak-sun-hours, and 75% solar efficiency. For precise sizing — including DC-DC chargers, busbars, and cabling — email{' '}
                <a href={LINKS.email} className="underline" style={{ color: COLORS.bronzeOnDark }}>
                  {BUSINESS.email}
                </a>{' '}
                with your van platform and intended use case.
              </span>
            </div>

            <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: `1px solid ${COLORS.cfgRule}` }}>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] transition"
                style={{ border: `1px solid ${COLORS.cfgInk}`, color: COLORS.cfgInk, fontWeight: 600 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => { setStep(1); setSelected({ fridge: true, lights: true }); setAutonomyDays(2); setSolarW(400); }}
                className="vx-mono text-[11px] uppercase tracking-[0.15em] transition hover:opacity-70"
                style={{ color: COLORS.cfgMuted }}
              >
                Reset configurator ↻
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PRODUCT INDEX RAIL
   ════════════════════════════════════════════════════════════════════════════ */
function ProductIndexRail({ activeIdx, items, onJump }) {
  return (
    <div className="hidden xl:block sticky top-32 self-start" style={{ minWidth: 180 }}>
      <div className="vx-label mb-5" style={{ color: COLORS.bronze }}>The Catalog</div>
      <ul className="space-y-0">
        {items.map((it, idx) => (
          <li key={it.id}>
            <button
              onClick={() => onJump(it.id)}
              className="block w-full text-left py-3 transition group"
              style={{
                borderTop: idx === 0 ? `1px solid ${COLORS.rule}` : 'none',
                borderBottom: `1px solid ${COLORS.rule}`,
              }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="vx-mono text-[10px] transition"
                  style={{ color: activeIdx === idx ? COLORS.bronze : COLORS.inkMuted }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[13px] truncate transition"
                    style={{
                      color: activeIdx === idx ? COLORS.ink : COLORS.inkSoft,
                      fontWeight: activeIdx === idx ? 600 : 400,
                    }}
                  >
                    {it.shortName}
                  </div>
                </div>
                {activeIdx === idx && (
                  <motion.span
                    layoutId="rail-dot"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: COLORS.bronze }}
                  />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════════════════ */
export default function VantrixPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  // ─── Hero parallax refs ───
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const openExt = (url) => window.open(url, '_blank', 'noopener');
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const productItems = [
    { id: FLAGSHIP.id, shortName: FLAGSHIP.shortName },
    ...PRODUCTS.map((p) => ({ id: p.id, shortName: p.shortName })),
  ];

  /* Nav scrollspy */
  useEffect(() => {
    const sections = ['hero', 'manifesto', 'flagship', 'lineup', 'configurator', 'platforms', 'faq'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Detect scroll past hero to switch navbar style */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Product rail spy */
  useEffect(() => {
    const ids = [FLAGSHIP.id, ...PRODUCTS.map((p) => p.id)].map((id) => `product-${id}`);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = ids.indexOf(e.target.id);
            if (idx !== -1) setActiveProductIdx(idx);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent('Vantrix newsletter subscription');
    const body = encodeURIComponent(`Please subscribe me to Vantrix updates.\n\nMy email: ${email}`);
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setEmailSent(true);
    setEmail('');
    setTimeout(() => setEmailSent(false), 3500);
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: COLORS.bg, color: COLORS.ink, fontFamily: 'var(--font-body)' }}
    >
      {/* ─── Fonts + base styles ─── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --font-body: 'Inter', system-ui, -apple-system, sans-serif;
          --font-display: 'Inter', system-ui, -apple-system, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: 'cv11', 'ss01';
        }
        ::selection { background: ${COLORS.bronze}; color: ${COLORS.bgPaper}; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bgSoft}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.inkMuted}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.ink}; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        .vx-display {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        .vx-mono {
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }
        .vx-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Slider — light */
        .vx-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: ${COLORS.rule};
          outline: none;
          cursor: pointer;
        }
        .vx-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: ${COLORS.bronze};
          border: 3px solid ${COLORS.bgPaper};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 0 1px ${COLORS.bronze};
          transition: transform 0.15s;
        }
        .vx-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .vx-slider::-webkit-slider-thumb:active { cursor: grabbing; }
        .vx-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: ${COLORS.bronze};
          border: 3px solid ${COLORS.bgPaper};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 0 1px ${COLORS.bronze};
        }

        /* Slider — dark (for configurator) */
        .vx-slider-dark {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: ${COLORS.cfgRule};
          outline: none;
          cursor: pointer;
        }
        .vx-slider-dark::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: ${COLORS.bronzeOnDark};
          border: 3px solid ${COLORS.cfgBg};
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 0 1px ${COLORS.bronzeOnDark};
          transition: transform 0.15s;
        }
        .vx-slider-dark::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .vx-slider-dark::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: ${COLORS.bronzeOnDark};
          border: 3px solid ${COLORS.cfgBg};
          border-radius: 50%;
          cursor: grab;
        }

        /* Subtle grain */
        .vx-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        /* Cream nav surface */
        .vx-nav-cream {
          background: ${COLORS.bg};
          backdrop-filter: none;
        }
        .vx-nav-cream-scrolled {
          background: ${COLORS.bgGlass};
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
        }

        /* Marquee pause on hover */
        .vx-marquee:hover .vx-marquee-track { animation-play-state: paused; }
      `}</style>

      <ScrollBar />
      <div className="vx-grain" />

      {/* ════════════════════════════════════════════════════════════════════
          NAVIGATION — CREAM THEME (matches site, no dark glass)
          ════════════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors ${navScrolled ? 'vx-nav-cream-scrolled' : 'vx-nav-cream'}`}
        style={{ borderBottom: `1px solid ${navScrolled ? COLORS.rule : 'transparent'}` }}
      >
        <div className="max-w-[1480px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <div
              className="w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: COLORS.bronze, color: COLORS.bgPaper }}
            >
              <span className="vx-mono text-[12px]" style={{ fontWeight: 700 }}>V</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] leading-none" style={{ color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.02em' }}>
                Vantrix
              </span>
              <span className="vx-mono text-[9px] hidden sm:inline" style={{ color: COLORS.inkMuted }}>
                — VPO HOUSE BRAND
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-9">
            {[
              ['Manifesto', 'manifesto'],
              ['Catalog', 'lineup'],
              ['Configurator', 'configurator'],
              ['Platforms', 'platforms'],
              ['FAQ', 'faq'],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-[12.5px] py-1 transition-colors vx-mono uppercase tracking-[0.12em]"
                style={{
                  color: activeNav === id ? COLORS.ink : COLORS.inkSoft,
                  fontWeight: activeNav === id ? 600 : 400,
                }}
              >
                {label}
                {activeNav === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px"
                    style={{ background: COLORS.bronze }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openExt(LINKS.contact)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[12px] transition-all hover:opacity-90"
              style={{ background: COLORS.ink, color: COLORS.bgPaper, fontWeight: 600 }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Contact Us
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              style={{ border: `1px solid ${COLORS.rule}`, color: COLORS.ink }}
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
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
              style={{ background: COLORS.bgPaper, borderTop: `1px solid ${COLORS.rule}` }}
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {[
                  ['Manifesto', 'manifesto'],
                  ['Catalog', 'lineup'],
                  ['Configurator', 'configurator'],
                  ['Platforms', 'platforms'],
                  ['FAQ', 'faq'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left py-3 text-[20px]"
                    style={{ color: COLORS.ink, fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => openExt(LINKS.contact)}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-[12px]"
                  style={{ background: COLORS.ink, color: COLORS.bgPaper, fontWeight: 600 }}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — REDESIGNED
          - Light cream background (matches site theme)
          - Asymmetric editorial split: text LEFT, large hero image RIGHT
          - No overlapping content, no dark vignette tunnel
          - Hero image is a real product (battery), not the missing v1.png
          - Stats sit on a clean stripe below, not stacked on the image
          ════════════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════════════
    HERO — Full-bleed background image (NovaLux style, Vantrix branding)
    ════════════════════════════════════════════════════════════════════ */}
<section
  ref={heroRef}
  id="hero"
  className="relative h-[67vh] min-h-[520px] mt-16 overflow-hidden"
  style={{ background: COLORS.darkPaper }}
>
  {/* Parallax background image */}
  <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
 <img
  src={HERO_IMAGE}
  alt="Vantrix — industrial-grade van architecture"
  className="w-full h-full object-cover"
  style={{
    objectPosition: 'center 3%',
    filter: 'brightness(0.6) contrast(1.05)',
  }}
  loading="eager"
  decoding="async"
/>
    {/* Dark gradient overlays for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
  </motion.div>

  {/* Top-right coordinate badge */}
  <div className="absolute top-24 right-6 lg:right-12 z-10 hidden lg:block">
    <div className="w-40 px-4 py-3 border-l-2" style={{ borderColor: COLORS.bronzeOnDark }}>
      <div className="vx-label mb-1" style={{ color: COLORS.darkMuted, letterSpacing: '0.25em' }}>
        Engineered In
      </div>
      <div className="vx-mono text-[12px]" style={{ color: COLORS.darkInk }}>Big Bear, CA</div>
      <div className="vx-mono text-[12px]" style={{ color: COLORS.darkInk }}>34.26° N</div>
    </div>
  </div>

  {/* Main hero content — bottom-left aligned, NovaLux style */}
  <div className="relative z-10 h-full max-w-[1480px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 lg:pb-28">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-5">
  <div
    className="w-2 h-2 rounded-full animate-pulse"
    style={{ background: COLORS.bronzeOnDark }}
  />
  <span
    className="vx-mono text-[10px] tracking-[0.3em] uppercase"
    style={{ color: COLORS.darkMuted }}
  >
    A VPO House Brand · VTX Catalog 2025
  </span>
</div>

      {/* Headline */}
    <h1
  className="leading-[0.95] tracking-[-0.04em] mb-5"
  style={{
    fontSize: 'clamp(1.75rem, 5vw, 3.75rem)',
    color: COLORS.darkInk,
    fontWeight: 800,
  }}
>
        Industrial
        <br />
        <span style={{ color: COLORS.bronzeOnDark }}>architecture,</span>
        <br />
        for vans.
      </h1>

      {/* Subhead */}
      <p
  className="text-sm lg:text-base leading-relaxed max-w-lg mb-7"
  style={{ color: COLORS.darkInk, opacity: 0.85, fontWeight: 300 }}
>
        Five components engineered as one system — the battery you bolt to the floor, the inverter you wire once, the shelter that holds against wind, and the hardware dimensioned to outlive the van it's bolted to.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
  <button
    onClick={() => scrollTo('flagship')}
    className="group inline-flex items-center gap-2.5 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all hover:opacity-90"
    style={{ background: COLORS.bronzeOnDark, color: COLORS.darkPaper, fontWeight: 700 }}
  >
    Explore the Catalog
    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
  </button>
  <button
    onClick={() => scrollTo('configurator')}
    className="inline-flex items-center gap-2.5 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-white/10"
    style={{ border: `1px solid ${COLORS.darkInk}40`, color: COLORS.darkInk, fontWeight: 600 }}
  >
    <Sliders className="w-3 h-3" />
    Configure My Build
  </button>
</div>
    
    </motion.div>
  </div>

  {/* Bottom stat strip */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="absolute bottom-0 inset-x-0 z-10 backdrop-blur-md"
    style={{
      background: 'rgba(0,0,0,0.55)',
      borderTop: `1px solid ${COLORS.darkRule}`,
    }}
  >
    <div className="max-w-[1480px] mx-auto px-6 lg:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
      {[
        { num: '7.2', suf: ' kWh', label: 'Single Block' },
        { num: '24K', suf: '+', label: 'Cycle Life' },
        { num: '5', suf: ' yr', label: 'Warranty' },
        { num: 'CE', suf: ' · UN38.3', label: 'Certified' },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            className="text-2xl lg:text-3xl leading-none"
            style={{
              color: COLORS.bronzeOnDark,
              fontWeight: 800,
              letterSpacing: '-0.025em',
            }}
          >
            {s.num}
            <span className="text-base ml-0.5" style={{ opacity: 0.8 }}>{s.suf}</span>
          </div>
          <div
            className="vx-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: COLORS.darkInk, opacity: 0.7 }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-3 overflow-hidden vx-marquee"
        style={{ borderTop: `1px solid ${COLORS.rule}`, borderBottom: `1px solid ${COLORS.rule}`, background: COLORS.bgPaper }}
      >
        <motion.div
          className="vx-marquee-track flex gap-10 whitespace-nowrap vx-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: COLORS.inkSoft }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].flatMap((_, j) =>
            [
              'Industrial Grade · Mobile Form',
              'Five Year LiFePO4 Warranty',
              'CE · RoHS · UN38.3 Certified',
              'Free U.S. Shipping',
              'Sprinter · Transit · ProMaster',
              'California Tech Support',
              'OEM / ODM Available',
              'Built for the Road',
            ].map((t, i) => (
              <span key={`${j}-${i}`} className="flex items-center gap-10">
                {t}
                <span style={{ color: COLORS.bronze }}>◆</span>
              </span>
            ))
          )}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MANIFESTO
          ════════════════════════════════════════════════════════════════════ */}
      <section id="manifesto" className="py-24 lg:py-36 px-6 lg:px-12" style={{ background: COLORS.bg }}>
        <div className="max-w-[1480px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-12 gap-x-8 gap-y-12"
          >
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-3">
              <div className="vx-label mb-4 lg:sticky lg:top-32" style={{ color: COLORS.bronze }}>
                002 — The Manifesto
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-9">
              <h2
                className="leading-[1.05] mb-10"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
              >
                Most van parts are <span style={{ color: COLORS.bronze }}>retail goods</span> with a roof rack glued on.
                Vantrix begins on the factory floor.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-3 lg:col-start-4">
              <div className="vx-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: COLORS.bronze }}>
                Built for full-time travel
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-9 lg:col-start-7">
              <p className="text-[16px] leading-[1.85]" style={{ color: COLORS.inkSoft, fontWeight: 400, maxWidth: 660 }}>
                Every Vantrix component starts at industrial spec — Grade-A LiFePO4 cells, architectural-grade aluminum cassettes, M10 vibration-resistant fasteners — and then gets dimensioned, vibration-tested, and certified for vehicle installation. The brand exists because consumer-grade hardware was never built for a thousand miles of washboard road and ten years of daily cycling.
              </p>
            </motion.div>
          </motion.div>

          {/* Pillars grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.n}
                variants={fadeUp}
                className="p-8 transition-all"
                style={{ background: COLORS.bgPaper }}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="vx-mono text-[11px]" style={{ color: COLORS.bronze }}>{p.n}</span>
                  <div style={{ color: COLORS.bronze }}>{p.icon}</div>
                </div>
                <h3
                  className="text-[22px] leading-[1.2] mb-3"
                  style={{ color: COLORS.ink, fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  {p.title}
                </h3>
                <p className="text-[13px] leading-[1.7]" style={{ color: COLORS.inkSoft }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FLAGSHIP
          ════════════════════════════════════════════════════════════════════ */}
      <section id="flagship" className="py-24 lg:py-32 px-6 lg:px-12 relative" style={{ background: COLORS.bgPaper }}>
        <div className="max-w-[1480px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-16 lg:mb-20"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="vx-label" style={{ color: COLORS.bronze }}>003 — Flagship</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="vx-mono text-[11px]" style={{ color: COLORS.inkMuted }}>{FLAGSHIP.series}</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="leading-[1.02] max-w-5xl"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
            >
              The <span style={{ color: COLORS.bronze }}>{FLAGSHIP.shortName}.</span>{' '}
              {FLAGSHIP.tagline.split('.')[0]}.
            </motion.h2>
          </motion.div>

          <div id={`product-${FLAGSHIP.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <Gallery images={FLAGSHIP.images} name={FLAGSHIP.name} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-5 lg:pt-4"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <span
                  className="px-2.5 py-1 vx-mono text-[10px]"
                  style={{ background: COLORS.bronze, color: COLORS.bgPaper, fontWeight: 600 }}
                >
                  {FLAGSHIP.badge.toUpperCase()}
                </span>
                <span className="vx-mono text-[10px] flex items-center gap-1.5" style={{ color: COLORS.inkMuted }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.bronze }} />
                  {FLAGSHIP.inventory} in stock
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[15px] leading-[1.75] mb-8" style={{ color: COLORS.inkSoft }}>
                {FLAGSHIP.description}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 gap-px mb-10"
                style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
              >
                {FLAGSHIP.metrics.map((m) => (
                  <div key={m.k} className="p-5" style={{ background: COLORS.bgPaper }}>
                    <div className="vx-mono text-[10px] mb-2" style={{ color: COLORS.inkMuted }}>
                      {m.k.toUpperCase()}
                    </div>
                    <div className="text-[22px] leading-none" style={{ color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.025em' }}>
                      {m.v}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.ul variants={fadeUp} className="space-y-3 mb-10">
                {FLAGSHIP.highlights.slice(0, 6).map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13.5px]" style={{ color: COLORS.inkSoft }}>
                    <span className="vx-mono text-[10px] mt-1 flex-shrink-0 w-5" style={{ color: COLORS.bronze }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="pt-6" style={{ borderTop: `1px solid ${COLORS.rule}` }}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="vx-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>USD</div>
                    <div className="text-[40px] leading-none" style={{ color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}>
                      ${FLAGSHIP.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:opacity-90 w-full"
                    style={{ background: COLORS.ink, color: COLORS.bgPaper, fontWeight: 600 }}
                  >
                    Add to cart
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openExt(productUrl(FLAGSHIP.handle))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:bg-stone-100"
                    style={{ border: `1px solid ${COLORS.ink}`, color: COLORS.ink, fontWeight: 600 }}
                  >
                    Full spec sheet
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BUILD CONFIGURATOR — DARK PROMINENT SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="configurator"
        className="py-28 lg:py-40 px-6 lg:px-12 relative overflow-hidden"
        style={{ background: COLORS.cfgBg, color: COLORS.cfgInk }}
      >
        {/* Decorative bronze grid pattern */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${COLORS.bronzeOnDark} 1px, transparent 1px), linear-gradient(45deg, ${COLORS.bronzeOnDark} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Bronze radial glows */}
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, rgba(212,162,116,0.18), transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, rgba(160,98,54,0.12), transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-[1480px] mx-auto relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-8">
              <span className="vx-label flex items-center gap-2" style={{ color: COLORS.bronzeOnDark }}>
                <Sliders className="w-3.5 h-3.5" />
                004 — Build Configurator
              </span>
              <span className="h-px flex-1" style={{ background: COLORS.cfgRule }} />
              <span className="vx-mono text-[11px] hidden md:inline" style={{ color: COLORS.cfgMuted }}>
                3 STEPS · LIVE PRICING
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="leading-[1.02] max-w-5xl mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', color: COLORS.cfgInk, fontWeight: 800, letterSpacing: '-0.035em' }}
            >
              Tell us what you run.
              <br />
              <span style={{ color: COLORS.bronzeOnDark }}>We will size the build.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[16px] leading-[1.75] max-w-[680px]"
              style={{ color: COLORS.cfgMuted }}
            >
              The Vantrix Configurator walks through your load profile, off-grid autonomy, and solar harvest in three short steps — then returns a fully-priced build with the exact number of batteries and inverters you need.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-7 lg:p-12 relative"
            style={{
              background: `linear-gradient(180deg, ${COLORS.cfgSurface} 0%, ${COLORS.cfgBg} 100%)`,
              border: `1px solid ${COLORS.cfgRule}`,
              boxShadow: '0 30px 100px rgba(0,0,0,0.5), 0 0 60px rgba(212,162,116,0.05)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none" style={{ borderTop: `2px solid ${COLORS.bronzeOnDark}`, borderLeft: `2px solid ${COLORS.bronzeOnDark}` }} />
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{ borderTop: `2px solid ${COLORS.bronzeOnDark}`, borderRight: `2px solid ${COLORS.bronzeOnDark}` }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" style={{ borderBottom: `2px solid ${COLORS.bronzeOnDark}`, borderLeft: `2px solid ${COLORS.bronzeOnDark}` }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none" style={{ borderBottom: `2px solid ${COLORS.bronzeOnDark}`, borderRight: `2px solid ${COLORS.bronzeOnDark}` }} />

            <BuildConfigurator />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE CATALOG
          ════════════════════════════════════════════════════════════════════ */}
      <section id="lineup" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: COLORS.bg }}>
        <div className="max-w-[1480px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-5 mb-6">
              <span className="vx-label" style={{ color: COLORS.bronze }}>005 — The Catalog</span>
              <span className="h-px flex-1" style={{ background: COLORS.rule }} />
              <span className="vx-mono text-[11px]" style={{ color: COLORS.inkMuted }}>
                {PRODUCTS.length + 1} components
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="leading-[1.02] max-w-4xl mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
            >
              Beyond the battery — <span style={{ color: COLORS.bronze }}>the structural moments.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[15px] max-w-[620px] leading-[1.75]"
              style={{ color: COLORS.inkSoft }}
            >
              Energy is one component. The full Vantrix lineup covers the four structural moments of a van build: power conversion, weather shelter, and interior architecture.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-12 gap-x-8">
            <div className="hidden xl:block xl:col-span-2">
              <ProductIndexRail
                activeIdx={activeProductIdx}
                items={productItems}
                onJump={(id) => scrollTo(`product-${id}`)}
              />
            </div>

            <div className="col-span-12 xl:col-span-10 space-y-24 lg:space-y-32">
              {PRODUCTS.map((p, idx) => {
                const isReverse = idx % 2 === 1;
                return (
                  <article
                    key={p.id}
                    id={`product-${p.id}`}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7 }}
                      className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : ''}`}
                    >
                      <Gallery images={p.images} name={p.name} />
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-80px' }}
                      variants={stagger}
                      className={`lg:col-span-5 lg:pt-2 ${isReverse ? 'lg:order-1' : ''}`}
                    >
                      <motion.div variants={fadeUp} className="vx-mono text-[10px] mb-3" style={{ color: COLORS.bronze }}>
                        {p.series.toUpperCase()} · {String(idx + 2).padStart(2, '0')}/{String(PRODUCTS.length + 1).padStart(2, '0')}
                      </motion.div>

                      <motion.h3
                        variants={fadeUp}
                        className="leading-[1.1] mb-3"
                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.03em' }}
                      >
                        {p.name}
                      </motion.h3>

                      <motion.p
                        variants={fadeUp}
                        className="text-[14px] leading-[1.55] mb-5"
                        style={{ color: COLORS.bronze, fontWeight: 600 }}
                      >
                        {p.tagline}
                      </motion.p>

                      <motion.p variants={fadeUp} className="text-[14px] leading-[1.75] mb-7" style={{ color: COLORS.inkSoft }}>
                        {p.blurb}
                      </motion.p>

                      <motion.div
                        variants={fadeUp}
                        className="grid grid-cols-2 gap-px mb-7"
                        style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
                      >
                        <div className="px-4 py-3.5" style={{ background: COLORS.bgPaper }}>
                          <div className="vx-mono text-[9.5px] mb-1.5" style={{ color: COLORS.inkMuted }}>
                            {p.keyMetric.k.toUpperCase()}
                          </div>
                          <div className="text-[18px] leading-none" style={{ color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.025em' }}>
                            {p.keyMetric.v}
                          </div>
                        </div>
                        {p.metrics.slice(0, 3).map((m) => (
                          <div key={m.k} className="px-4 py-3.5" style={{ background: COLORS.bgPaper }}>
                            <div className="vx-mono text-[9.5px] mb-1.5" style={{ color: COLORS.inkMuted }}>
                              {m.k.toUpperCase()}
                            </div>
                            <div className="vx-mono text-[12px]" style={{ color: COLORS.ink, fontWeight: 600 }}>
                              {m.v}
                            </div>
                          </div>
                        ))}
                      </motion.div>

                      <motion.ul variants={fadeUp} className="space-y-2.5 mb-8">
                        {p.highlights.slice(0, 5).map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-[13px] leading-[1.6]" style={{ color: COLORS.inkSoft }}>
                            <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: COLORS.bronze }} strokeWidth={1.5} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </motion.ul>

                      <motion.div variants={fadeUp} className="pt-5 flex items-end justify-between mb-5" style={{ borderTop: `1px solid ${COLORS.rule}` }}>
                        <div>
                          <div className="vx-mono text-[10px] mb-1" style={{ color: COLORS.inkMuted }}>USD</div>
                          <div className="text-[30px] leading-none" style={{ color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.03em' }}>
                            ${p.price.toLocaleString()}
                          </div>
                        </div>
                        <span className="vx-mono text-[10px] flex items-center gap-1.5" style={{ color: COLORS.inkMuted }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.bronze }} />
                          {p.inventory} in stock
                        </span>
                      </motion.div>

                      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => openExt(productUrl(p.handle))}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:opacity-90 w-full"
                          style={{ background: COLORS.ink, color: COLORS.bgPaper, fontWeight: 600 }}
                        >
                          Add to cart
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openExt(productUrl(p.handle))}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] transition hover:bg-stone-100"
                          style={{ border: `1px solid ${COLORS.ink}`, color: COLORS.ink, fontWeight: 600 }}
                        >
                          Details
                        </button>
                      </motion.div>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DARK QUOTE BAND — solid color, no missing image
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden"
        style={{ background: COLORS.dark, color: COLORS.darkInk }}
      >
        {/* Subtle bronze pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(${COLORS.bronzeOnDark} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, rgba(212,162,116,0.1), transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-[1100px] mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="vx-label mb-8" style={{ color: COLORS.bronzeOnDark }}>
              — A note from the workshop
            </div>
            <p
              className="leading-[1.25] mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              "We chose <span style={{ color: COLORS.bronzeOnDark }}>industrial-grade</span>{' '}
              hardware because the people building these vans bet a decade of their lives on the parts inside them.
              <br /><br />
              Anything less <span style={{ color: COLORS.bronzeOnDark }}>is not a brand.</span> It's a markup."
            </p>
            <div className="vx-mono text-[11px] tracking-[0.2em]" style={{ color: COLORS.darkMuted }}>
              — VPO BUILD TEAM · BIG BEAR, CALIFORNIA
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PLATFORMS
          ════════════════════════════════════════════════════════════════════ */}
      <section id="platforms" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: COLORS.bgPaper }}>
        <div className="max-w-[1480px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-14 grid grid-cols-12 gap-x-8"
          >
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-5">
              <div className="vx-label mb-6" style={{ color: COLORS.bronze }}>006 — Platform Compatibility</div>
              <h2
                className="leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
              >
                <span style={{ color: COLORS.bronze }}>Drop-in</span> dimensioned for the platforms you build on.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
              <p className="text-[15px] leading-[1.75]" style={{ color: COLORS.inkSoft }}>
                Vantrix products are designed against the dominant high-roof van platforms in North America — including weight tolerances, mounting hole patterns, and roof curvature profiles. For custom platforms or tiny-home installations, OEM/ODM specs are available on request.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}
          >
            {PLATFORMS.map((p, idx) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className="p-7 transition-all"
                style={{ background: COLORS.bgPaper }}
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="vx-mono text-[11px]" style={{ color: COLORS.bronze }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Compass className="w-4 h-4" style={{ color: COLORS.bronze }} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-[20px] leading-tight mb-2"
                  style={{ color: COLORS.ink, fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  {p.name}
                </h3>
                <div className="vx-mono text-[10.5px] mb-4 uppercase tracking-[0.1em]" style={{ color: COLORS.inkMuted }}>
                  {p.sub}
                </div>
                <div className="pt-4 vx-mono text-[11px]" style={{ borderTop: `1px solid ${COLORS.rule}`, color: COLORS.bronze }}>
                  {p.mod}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: COLORS.bg }}>
        <div className="max-w-[1480px] mx-auto grid grid-cols-12 gap-x-8 gap-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="col-span-12 lg:col-span-4"
          >
            <motion.div variants={fadeUp} className="vx-label mb-6 lg:sticky lg:top-32" style={{ color: COLORS.bronze }}>
              007 — Frequently Asked
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="leading-[1.05] mb-6 lg:sticky lg:top-44"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
            >
              The <span style={{ color: COLORS.bronze }}>technical</span>
              <br />
              questions, answered.
            </motion.h2>
          </motion.div>

          <div className="col-span-12 lg:col-span-8">
            <div style={{ borderTop: `1px solid ${COLORS.rule}` }}>
              {FAQ.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    style={{ borderBottom: `1px solid ${COLORS.rule}` }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="w-full text-left py-6 flex items-start justify-between gap-8 group"
                    >
                      <div className="flex items-start gap-5">
                        <span className="vx-mono text-[10px] mt-1.5 flex-shrink-0" style={{ color: COLORS.bronze }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="text-[18px] leading-[1.4] transition-colors"
                          style={{ color: open ? COLORS.bronze : COLORS.ink, fontWeight: 600, letterSpacing: '-0.015em' }}
                        >
                          {item.q}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 mt-1.5"
                        style={{ color: open ? COLORS.bronze : COLORS.inkMuted }}
                      >
                        <Plus className="w-4 h-4" strokeWidth={1.5} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-12 pr-8 text-[14.5px] leading-[1.75]" style={{ color: COLORS.inkSoft }}>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GUARANTEES
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{ background: COLORS.dark, color: COLORS.darkInk }}>
        <div className="max-w-[1480px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Shield className="w-5 h-5" strokeWidth={1.5} />,
              t: 'Multi-Year Warranty',
              d: 'The 600Ah carries a 5-year warranty with free replacement parts. Every other Vantrix unit ships with a 1-year manufacturing warranty.',
            },
            {
              icon: <Truck className="w-5 h-5" strokeWidth={1.5} />,
              t: 'Free U.S. Shipping',
              d: 'All Vantrix orders ship free across the lower 48 — most leave our Big Bear, California warehouse within two business days.',
            },
            {
              icon: <Wrench className="w-5 h-5" strokeWidth={1.5} />,
              t: 'Builders Answer the Phone',
              d: 'Direct access to the same California team that installs these systems professionally. Not a generic support desk.',
            },
          ].map((g, idx) => (
            <motion.div
              key={g.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-start gap-5"
            >
              <div
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center"
                style={{
                  border: `1px solid ${COLORS.darkRule}`,
                  color: COLORS.bronzeOnDark,
                }}
              >
                {g.icon}
              </div>
              <div>
                <div className="text-[20px] mb-2" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>{g.t}</div>
                <div className="text-[13.5px] leading-[1.7]" style={{ color: COLORS.darkMuted }}>
                  {g.d}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 px-6 lg:px-12 text-center relative overflow-hidden" style={{ background: COLORS.bgPaper }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 30%, ${COLORS.bronze}0d, transparent 60%)` }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto relative"
        >
          <motion.div variants={fadeUp} className="vx-label mb-6" style={{ color: COLORS.bronze }}>
            — Begin the build
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', color: COLORS.ink, fontWeight: 800, letterSpacing: '-0.035em' }}
          >
            Industrial spec.
            <br />
            <span style={{ color: COLORS.bronze }}>Mobile form.</span>
            <br />
            One Vantrix.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-[1.75] mb-10 max-w-xl mx-auto"
            style={{ color: COLORS.inkSoft, fontWeight: 400 }}
          >
            Five components. One architecture. The complete Vantrix lineup is in stock and ready to ship from Big Bear, California.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center">
            <button
              onClick={() => openExt(LINKS.contact)}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-[13px] transition hover:opacity-90"
              style={{ background: COLORS.ink, color: COLORS.bgPaper, fontWeight: 600 }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Talk to a builder
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer
        className="px-6 lg:px-12 pt-20 pb-10 relative overflow-hidden"
        style={{ background: COLORS.darkPaper, color: COLORS.darkInk }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(${COLORS.darkInk} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-[1480px] mx-auto relative">
          {/* Top */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12" style={{ borderBottom: `1px solid ${COLORS.darkRule}` }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center" style={{ background: COLORS.bronzeOnDark, color: COLORS.darkPaper }}>
                  <span className="vx-mono text-[14px]" style={{ fontWeight: 700 }}>V</span>
                </div>
                <div>
                  <div className="text-[24px] leading-none" style={{ color: COLORS.darkInk, fontWeight: 800, letterSpacing: '-0.025em' }}>
                    Vantrix
                  </div>
                  <div className="vx-mono text-[10px] mt-1.5 tracking-[0.15em]" style={{ color: COLORS.darkMuted }}>
                    VAN ARCHITECTURE — A VPO HOUSE BRAND
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[1.75] max-w-md" style={{ color: COLORS.darkMuted, fontWeight: 400 }}>
                Industrial-grade batteries, inverters, awnings, and interior hardware for the people who live full-time in the vehicles they build.
              </p>
            </div>

            <form onSubmit={handleEmail} className="w-full lg:w-auto">
              <div className="vx-label mb-3" style={{ color: COLORS.bronzeOnDark }}>
                Build updates from VPO
              </div>
              <div className="flex" style={{ border: `1px solid ${COLORS.bronzeOnDark}` }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="px-4 py-3 text-[13px] outline-none flex-1 lg:w-72 bg-transparent"
                  style={{ color: COLORS.darkInk }}
                />
                <button
                  type="submit"
                  className="px-5 text-[12px] transition flex items-center gap-2 hover:opacity-90"
                  style={{ background: COLORS.bronzeOnDark, color: COLORS.darkPaper, fontWeight: 700 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </div>
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="vx-mono text-[11px] mt-3"
                  style={{ color: COLORS.bronzeOnDark }}
                >
                  ✓ Email client opened — finish from your mail app.
                </motion.div>
              )}
            </form>
          </div>

          {/* Mid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12">
            <div>
              <div className="vx-label mb-5" style={{ color: COLORS.bronzeOnDark }}>The Catalog</div>
              <ul className="space-y-3 text-[13px]">
                {[
                  ['600Ah LiFePO4 Battery', productUrl(FLAGSHIP.handle)],
                  ['3000W Pure Sine Inverter', productUrl(PRODUCTS[0].handle)],
                  ['Electric Awning', productUrl(PRODUCTS[1].handle)],
                  ['Manual Awning', productUrl(PRODUCTS[2].handle)],
                  ['Swivel Table Kit', productUrl(PRODUCTS[3].handle)],
                  ['All Vantrix products', LINKS.shopAll],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); openExt(href); }}
                      className="transition hover:opacity-60"
                      style={{ color: COLORS.darkInk }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="vx-label mb-5" style={{ color: COLORS.bronzeOnDark }}>Support</div>
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
                      className="transition hover:opacity-60"
                      style={{ color: COLORS.darkInk }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="vx-label mb-5" style={{ color: COLORS.bronzeOnDark }}>Company</div>
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
                      className="transition hover:opacity-60"
                      style={{ color: COLORS.darkInk }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <div className="vx-label mb-5" style={{ color: COLORS.bronzeOnDark }}>Headquarters</div>
              <ul className="space-y-3 text-[13px]" style={{ color: COLORS.darkInk }}>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.bronzeOnDark }} />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.bronzeOnDark }} />
                  <span>{BUSINESS.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.bronzeOnDark }} />
                  <a href={`tel:${BUSINESS.phone}`} className="hover:opacity-60">{BUSINESS.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: COLORS.bronzeOnDark }} />
                  <a href={LINKS.email} className="hover:opacity-60">{BUSINESS.email}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ borderTop: `1px solid ${COLORS.darkRule}` }}>
            <div className="vx-mono text-[11px] tracking-[0.1em]" style={{ color: COLORS.darkMuted }}>
              © {new Date().getFullYear()} VAN PARTS OUTLET · VANTRIX IS A VPO HOUSE BRAND
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: <Facebook className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.facebook, label: 'Facebook' },
                { icon: <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.instagram, label: 'Instagram' },
                { icon: <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />, href: LINKS.email, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => { e.preventDefault(); openExt(s.href); }}
                  className="w-9 h-9 flex items-center justify-center transition"
                  style={{ border: `1px solid ${COLORS.darkRule}`, color: COLORS.darkInk }}
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
