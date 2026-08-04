'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard, { type Product } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface RecommendedProduct extends Product {
  category: string;
  badge?: string;
}

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 101,
    name: 'Оверсайз футболка SOLVE Raw',
    price: 3490,
    category: 'clothing',
    badge: 'HIT',
    image: '/images/hero-1.png',
    secondaryImage: '/images/cat-clothing.png',
  },
  {
    id: 102,
    name: 'Nike Air Jordan 1 Retro',
    price: 14990,
    category: 'sneakers',
    badge: 'HOT',
    image: '/images/hero-2.png',
    secondaryImage: '/images/cat-sneakers.png',
  },
  {
    id: 103,
    name: 'Сумка Crossbody SOLVE Tech',
    price: 4290,
    category: 'accessories',
    badge: 'NEW',
    image: '/images/hero-3.png',
    secondaryImage: '/images/cat-bags.png',
  },
  {
    id: 104,
    name: 'Звёздный Брелок Silver Star',
    price: 890,
    category: 'accessories',
    badge: 'TOP',
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
  },
];

const tabs = [
  { id: 'all', label: 'Все' },
  { id: 'clothing', label: 'Одежда' },
  { id: 'sneakers', label: 'Кроссовки' },
  { id: 'accessories', label: 'Аксессуары' },
];

export default function Recommended() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts =
    activeTab === 'all'
      ? recommendedProducts
      : recommendedProducts.filter((p) => p.category === activeTab);

  return (
    <section className="py-6 md:py-8 bg-[#F9F9F8] border-b border-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neutral-900" />
            <h2 className="text-2xl md:text-3xl font-display text-[#0D0E10] tracking-wider uppercase leading-none">
              РЕКОМЕНДУЕМ
            </h2>
          </div>

          {/* Tab Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 font-sans">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors min-h-[36px] ${
                    isActive ? 'text-white' : 'text-neutral-600 hover:text-black bg-neutral-200/70 border border-neutral-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="recommended-active-tab"
                      className="absolute inset-0 bg-neutral-900 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Recommended Products (2x2 on mobile, 4 columns on desktop) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="w-full"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
