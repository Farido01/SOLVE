'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { type Product } from './ProductCard';

const products: Product[] = [
  {
    id: 1,
    name: 'Худи SOLVE Chaos Dark',
    price: 4990,
    image: '/images/cat-clothing.png',
    secondaryImage: '/images/hero-1.png',
    badge: 'NEW',
  },
  {
    id: 2,
    name: 'New Balance 530 White',
    price: 8990,
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'TOP',
  },
  {
    id: 3,
    name: 'Брелок Silver Star',
    price: 790,
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
  },
  {
    id: 4,
    name: 'Кепка Classic Black',
    price: 1690,
    image: '/images/cat-accessories.png',
    secondaryImage: '/images/cat-bags.png',
  },
];

export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-[#F7F7F6] border-b border-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-sans block">
              DROP 2026
            </span>
            <h2 className="text-2xl md:text-3xl font-display text-[#0D0E10] tracking-wider uppercase leading-none">
              НОВИНКИ
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Scroll Controls */}
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                aria-label="Прокрутить влево"
                className="w-8 h-8 rounded-full bg-white text-black border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Прокрутить вправо"
                className="w-8 h-8 rounded-full bg-white text-black border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-neutral-800 hover:text-black transition-colors group font-sans">
              <span>Смотреть все</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Product List */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-1 md:justify-start"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
