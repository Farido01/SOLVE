'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hotspot {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  name: string;
  price: string;
  category: string;
  image: string;
}

interface Look {
  id: number;
  title: string;
  tagline: string;
  image: string;
  hotspots: Hotspot[];
}

const looks: Look[] = [
  {
    id: 1,
    title: 'CHAOS URBAN LOOK #01',
    tagline: 'Оверсайз худи, металлический брелок и премиальные кроссовки',
    image: '/images/promo-banner.png',
    hotspots: [
      {
        id: 1,
        x: 35,
        y: 40,
        name: 'Худи SOLVE Chaos Dark',
        price: '4 990 ₽',
        category: 'Одежда',
        image: '/images/cat-clothing.png',
      },
      {
        id: 2,
        x: 65,
        y: 75,
        name: 'Кроссовки New Balance 530',
        price: '8 990 ₽',
        category: 'Обувь',
        image: '/images/cat-sneakers.png',
      },
      {
        id: 3,
        x: 50,
        y: 55,
        name: 'Брелок Silver Star',
        price: '790 ₽',
        category: 'Аксессуары',
        image: '/images/cat-keychains.png',
      },
    ],
  },
];

export default function Lookbook() {
  const [activeLookIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const currentLook = looks[activeLookIndex];

  return (
    <section className="py-6 md:py-8 bg-[#F9F9F8] border-b border-neutral-200/60">
      <div className="px-4 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 font-mono block mb-1">
              EDITORIAL LOOKBOOK 2026
            </span>
            <h2 className="text-2xl md:text-4xl font-display text-[#0D0E10] tracking-wider uppercase leading-none">
              ГОТОВЫЙ ОБРАЗ
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 font-sans bg-white px-3.5 py-2 rounded-full border border-neutral-200 shadow-2xs">
            <Tag className="w-4 h-4 text-black" />
            <span>Нажмите на интерактивные точки для просмотра вещей</span>
          </div>
        </div>

        {/* Lookbook Interactive Frame */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/10] bg-neutral-900 border border-neutral-200/80 shadow-xl">
          {/* Main Lookbook Photo */}
          <img
            src={currentLook.image}
            alt={currentLook.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

          {/* Top-Left Helper Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-extrabold font-mono uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Интерактивный образ · Нажмите на +</span>
          </div>

          {/* Interactive Hotspots */}
          {currentLook.hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                aria-label={`Просмотреть ${spot.name}`}
                className="relative group flex items-center justify-center min-h-[48px] min-w-[48px]"
              >
                {/* Double Pulsing Ripple Effect */}
                <span className="absolute w-10 h-10 rounded-full bg-white/50 animate-ping" />
                <span className="absolute w-8 h-8 rounded-full bg-white/30 animate-pulse" />
                <span className="relative w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-sm shadow-xl group-hover:scale-115 transition-transform duration-200">
                  +
                </span>
              </button>
            </div>
          ))}

          {/* Compact Hotspot Sheet / Drawer */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-84 z-30 bg-white/95 backdrop-blur-md border border-neutral-200 p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 font-sans"
              >
                <img
                  src={activeHotspot.image}
                  alt={activeHotspot.name}
                  className="w-16 h-16 rounded-xl object-contain bg-neutral-100 p-1 flex-shrink-0 border border-neutral-200"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block font-mono">
                    {activeHotspot.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 truncate leading-snug">
                    {activeHotspot.name}
                  </h4>
                  <span className="text-sm font-black text-black block mt-0.5 font-mono">
                    {activeHotspot.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-neutral-800 text-xs font-extrabold rounded-xl px-4 py-2.5 h-auto flex items-center gap-1.5 shadow-sm uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>В корзину</span>
                  </Button>

                  <button
                    onClick={() => setActiveHotspot(null)}
                    aria-label="Закрыть"
                    className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Info Title & CTA */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 font-sans">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-white/90 uppercase block font-mono">
                {currentLook.title}
              </span>
              <p className="text-xs font-normal text-neutral-300 max-w-sm">{currentLook.tagline}</p>
            </div>
            <a href="/catalog">
              <Button className="bg-white text-black hover:bg-neutral-200 font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 py-3 shadow-lg">
                СМОТРЕТЬ ОБРАЗ В КАТАЛОГЕ →
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
