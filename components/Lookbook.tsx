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
    <section className="py-10 bg-[#E8E8E6]">
      <div className="px-4 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-sans block">
              EDITORIAL LOOKBOOK 2026
            </span>
            <h2 className="text-2xl md:text-4xl font-display text-[#0D0E10] tracking-wider uppercase leading-none">
              ГОТОВЫЙ ОБРАЗ
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-600 font-sans bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
            <Tag className="w-3.5 h-3.5 text-black" />
            <span>Нажмите на точку, чтобы посмотреть деталь</span>
          </div>
        </div>

        {/* Lookbook Interactive Frame */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/10] bg-neutral-900 border border-neutral-200/80 shadow-lg">
          {/* Main Lookbook Photo */}
          <img
            src={currentLook.image}
            alt={currentLook.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
                className="relative group flex items-center justify-center min-h-[44px] min-w-[44px]"
              >
                {/* Pulsing Ripple Effect */}
                <span className="absolute w-8 h-8 rounded-full bg-white/40 animate-ping" />
                <span className="relative w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs shadow-lg group-hover:scale-110 transition-transform duration-200">
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
                className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 z-30 bg-white/95 backdrop-blur-md border border-neutral-200 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-sans"
              >
                <img
                  src={activeHotspot.image}
                  alt={activeHotspot.name}
                  className="w-14 h-14 rounded-xl object-contain bg-neutral-100 p-1 flex-shrink-0 border border-neutral-200"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                    {activeHotspot.category}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 truncate leading-snug">
                    {activeHotspot.name}
                  </h4>
                  <span className="text-xs font-extrabold text-neutral-900 block mt-0.5">
                    {activeHotspot.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-neutral-800 text-[11px] font-bold rounded-xl px-3 py-2 h-auto flex items-center gap-1 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Купить</span>
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

          {/* Bottom Info Title */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:block font-sans">
            <span className="text-xs font-extrabold tracking-widest text-white/90 uppercase block">
              {currentLook.title}
            </span>
            <p className="text-xs font-normal text-neutral-300">{currentLook.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
