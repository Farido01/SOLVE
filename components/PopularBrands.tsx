'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface BrandCard {
  id: string;
  name: string;
  count: string;
  image: string;
}

const brands: BrandCard[] = [
  {
    id: 'nike',
    name: 'NIKE',
    count: '140+ товаров',
    image: '/images/hero-2.png',
  },
  {
    id: 'nb',
    name: 'NEW BALANCE',
    count: '85+ товаров',
    image: '/images/cat-sneakers.png',
  },
  {
    id: 'stussy',
    name: 'STÜSSY',
    count: '45+ товаров',
    image: '/images/cat-clothing.png',
  },
  {
    id: 'supreme',
    name: 'SUPREME',
    count: '30+ товаров',
    image: '/images/hero-1.png',
  },
  {
    id: 'offwhite',
    name: 'OFF-WHITE',
    count: '25+ товаров',
    image: '/images/hero-3.png',
  },
  {
    id: 'carhartt',
    name: 'CARHARTT WIP',
    count: '50+ товаров',
    image: '/images/cat-bags.png',
  },
];

export default function PopularBrands() {
  return (
    <section className="py-10 bg-[#E8E8E6]">
      <div className="px-4 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-sans block">
              OFFICIAL BRANDS
            </span>
            <h2 className="text-2xl md:text-4xl font-display text-[#0D0E10] tracking-wider uppercase leading-none">
              ПОПУЛЯРНЫЕ БРЕНДЫ
            </h2>
          </div>
          <span className="text-xs font-semibold text-neutral-500 font-sans hidden sm:block">
            100% Аутентичная продукция
          </span>
        </div>

        {/* Brand Photo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 md:gap-4">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 group cursor-pointer shadow-sm hover:shadow-lg transition-all border border-neutral-200/60"
            >
              {/* Background Photo */}
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Top Right Arrow */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex flex-col font-sans">
                <span className="font-display text-lg md:text-xl tracking-wider uppercase text-white leading-tight">
                  {brand.name}
                </span>
                <span className="text-[10px] font-semibold text-neutral-300">
                  {brand.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
