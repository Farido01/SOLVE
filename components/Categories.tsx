'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  label: string;
  image: string;
  count: string;
  accent: string;
}

const categories: Category[] = [
  {
    id: 'clothing',
    name: 'Одежда',
    label: 'CLOTHING',
    image: '/images/cat-clothing.png',
    count: '120+ моделей',
    accent: '#EBECEE',
  },
  {
    id: 'sneakers',
    name: 'Кроссовки',
    label: 'SNEAKERS',
    image: '/images/cat-sneakers.png',
    count: '80+ моделей',
    accent: '#E8EAF0',
  },
  {
    id: 'keychains',
    name: 'Брелоки',
    label: 'KEYCHAINS',
    image: '/images/cat-keychains.png',
    count: '40+ моделей',
    accent: '#EDF0EA',
  },
  {
    id: 'accessories',
    name: 'Аксессуары',
    label: 'ACCESSORIES',
    image: '/images/cat-accessories.png',
    count: '60+ моделей',
    accent: '#EBECEE',
  },
  {
    id: 'bags',
    name: 'Сумки',
    label: 'BAGS',
    image: '/images/cat-bags.png',
    count: '30+ моделей',
    accent: '#F0EEEA',
  },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 md:py-8 bg-[#F9F9F8] border-b border-neutral-200/60 font-sans">
      <div className="max-w-5xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 font-mono mb-1">
              BROWSE BY CATEGORY
            </p>
            <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-[#0D0E10]">
              КАТЕГОРИИ
            </h2>
          </div>

          {/* Desktop Scroll Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-[#0D0E10] hover:text-white hover:border-[#0D0E10] transition-all shadow-sm"
              aria-label="Прокрутить влево"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-[#0D0E10] hover:text-white hover:border-[#0D0E10] transition-all shadow-sm"
              aria-label="Прокрутить вправо"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="flex-shrink-0"
            >
              <Link href={`/catalog?category=${cat.id}`} className="block group">
                <div
                  className="relative w-[180px] sm:w-[220px] h-[260px] sm:h-[295px] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1.5"
                  style={{ backgroundColor: cat.accent }}
                >
                  {/* Product Image - larger fit */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 pt-8">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-[155px] sm:h-[185px] object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Label top-left */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-neutral-500 font-mono">
                      {cat.label}
                    </span>
                  </div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-neutral-200/60 px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg sm:text-2xl text-[#0D0E10] uppercase tracking-wide leading-none">
                        {cat.name}
                      </p>
                      <p className="text-xs text-neutral-500 font-bold font-mono mt-1">
                        {cat.count}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[#0D0E10] flex items-center justify-center group-hover:bg-neutral-800 transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
