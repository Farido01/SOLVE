'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 'clothing', name: 'Одежда', image: '/images/cat-clothing.png' },
  { id: 'sneakers', name: 'Кроссовки', image: '/images/cat-sneakers.png' },
  { id: 'keychains', name: 'Брелоки', image: '/images/cat-keychains.png' },
  { id: 'accessories', name: 'Аксессуары', image: '/images/cat-accessories.png' },
  { id: 'bags', name: 'Сумки', image: '/images/cat-bags.png' },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 bg-[#F7F7F6] relative group">
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Scroll Control Arrows for Desktop */}
        <button
          onClick={() => scroll('left')}
          aria-label="Прокрутить влево"
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-black shadow-md border border-neutral-200 items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          aria-label="Прокрутить вправо"
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-black shadow-md border border-neutral-200 items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 md:justify-center"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileTap={{ scale: 0.93 }}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group/item font-sans"
            >
              <div className="w-[80px] h-[80px] md:w-24 md:h-24 rounded-2xl bg-white border border-neutral-200/90 p-3 flex items-center justify-center shadow-xs transition-all duration-300 group-hover/item:border-neutral-900 group-hover/item:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover/item:scale-110"
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
