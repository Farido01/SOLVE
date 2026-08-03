'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw, ChevronRight, LayoutGrid, Grid2X2, Check, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ProductCard, { type Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface CatalogProduct extends Product {
  category: string; // clothing, sneakers, keychains, accessories, bags
  brand: string;    // Nike, New Balance, Stussy, Supreme, Solve, Off-White
  sizes: string[];
  color: string;
  isSale?: boolean;
  rating: number;
}

const mockProducts: CatalogProduct[] = [
  {
    id: 1,
    name: 'Худи SOLVE Chaos Dark Oversized',
    price: 4990,
    category: 'clothing',
    brand: 'Solve',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Черный',
    isSale: true,
    rating: 4.9,
    image: '/images/cat-clothing.png',
    secondaryImage: '/images/hero-1.png',
    badge: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'New Balance 530 Metallic Silver',
    price: 8990,
    category: 'sneakers',
    brand: 'New Balance',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'Серебристый',
    rating: 4.8,
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'TOP DROP',
  },
  {
    id: 3,
    name: 'Звёздный Брелок SOLVE Star Silver Chain',
    price: 790,
    category: 'keychains',
    brand: 'Solve',
    sizes: ['ONE SIZE'],
    color: 'Серебристый',
    rating: 5.0,
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
    badge: 'LIMITED',
  },
  {
    id: 4,
    name: 'Кепка SOLVE Classic Streetwear',
    price: 1690,
    category: 'accessories',
    brand: 'Solve',
    sizes: ['ONE SIZE'],
    color: 'Черный',
    rating: 4.7,
    image: '/images/cat-accessories.png',
    secondaryImage: '/images/cat-bags.png',
  },
  {
    id: 5,
    name: 'Сумка Crossbody SOLVE Tech Modular',
    price: 3490,
    category: 'bags',
    brand: 'Solve',
    sizes: ['ONE SIZE'],
    color: 'Черный',
    isSale: true,
    rating: 4.9,
    image: '/images/cat-bags.png',
    secondaryImage: '/images/hero-3.png',
    badge: '-25%',
  },
  {
    id: 6,
    name: 'Футболка Stüssy Basic Logo Oversized',
    price: 4290,
    category: 'clothing',
    brand: 'Stussy',
    sizes: ['M', 'L', 'XL'],
    color: 'Белый',
    rating: 4.9,
    image: '/images/hero-1.png',
    secondaryImage: '/images/cat-clothing.png',
    badge: 'NEW',
  },
  {
    id: 7,
    name: 'Nike Air Jordan 1 High OG Chicago',
    price: 15990,
    category: 'sneakers',
    brand: 'Nike',
    sizes: ['40', '41', '42', '43', '44'],
    color: 'Красный',
    rating: 5.0,
    image: '/images/hero-2.png',
    secondaryImage: '/images/cat-sneakers.png',
    badge: 'HOT',
  },
  {
    id: 8,
    name: 'Рюкзак Supreme Box Logo Heavyweight',
    price: 11490,
    category: 'bags',
    brand: 'Supreme',
    sizes: ['ONE SIZE'],
    color: 'Черный',
    rating: 4.8,
    image: '/images/hero-3.png',
    secondaryImage: '/images/cat-bags.png',
    badge: 'RARE',
  },
  {
    id: 9,
    name: 'Худи Off-White Caravaggio Arrows',
    price: 18990,
    category: 'clothing',
    brand: 'Off-White',
    sizes: ['S', 'M', 'L'],
    color: 'Черный',
    rating: 4.9,
    image: '/images/cat-clothing.png',
    secondaryImage: '/images/hero-1.png',
    badge: 'EXCLUSIVE',
  },
  {
    id: 10,
    name: 'Кроссовки New Balance 1906R Protection Pack',
    price: 13490,
    category: 'sneakers',
    brand: 'New Balance',
    sizes: ['41', '42', '43', '44'],
    color: 'Серый',
    rating: 4.9,
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'NEW',
  },
];

const categoryTabs = [
  { id: 'all', label: 'ВЕСЬ КАТАЛОГ' },
  { id: 'clothing', label: 'ОДЕЖДА' },
  { id: 'sneakers', label: 'КРОССОВКИ' },
  { id: 'keychains', label: 'БРЕЛОКИ' },
  { id: 'accessories', label: 'АКСЕССУАРЫ' },
  { id: 'bags', label: 'СУМКИ' },
];

const brandsList = ['All', 'Solve', 'Nike', 'New Balance', 'Stussy', 'Supreme', 'Off-White'];
const sizesList = ['S', 'M', 'L', 'XL', '39', '40', '41', '42', '43', '44'];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [onlySale, setOnlySale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrand !== 'All') count++;
    if (selectedSize !== 'All') count++;
    if (priceRange < 20000) count++;
    if (onlySale) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedSize, priceRange, onlySale, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('All');
    setSelectedSize('All');
    setPriceRange(20000);
    setOnlySale(false);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedBrand !== 'All' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) return false;
        if (p.price > priceRange) return false;
        if (onlySale && !p.isSale) return false;
        if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.id - a.id;
      });
  }, [selectedCategory, selectedBrand, selectedSize, priceRange, onlySale, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F6] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        {/* Minimalist Header Banner */}
        <section className="bg-white border-b border-neutral-200/90 pt-8 pb-8 px-4 md:px-8 relative overflow-hidden bg-[radial-gradient(#e2e4e8_1px,transparent_1px)] [background-size:24px_24px]">
          <div className="max-w-6xl mx-auto space-y-4 relative z-10">
            {/* Top Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-sans">
              <Link href="/" className="hover:text-black transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="text-black font-extrabold">Каталог</span>
            </div>

            {/* Main Header & Highlight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
              {/* Left Column: Pure Title Only */}
              <div className="lg:col-span-7">
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0D0E10] uppercase tracking-[0.05em] leading-[0.9]">
                  КАТАЛОГ SOLVE
                </h1>
              </div>

              {/* Right Column: Lighter Featured Drop Hero Highlight Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#EBECEE] text-neutral-900 p-5 rounded-3xl relative overflow-hidden border border-neutral-300/80 shadow-2xs group hover:border-neutral-400 transition-all">
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-white border border-neutral-300/80 shrink-0">
                      <img
                        src="/images/cat-clothing.png"
                        alt="Featured Drop"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-800 font-mono bg-white px-2.5 py-0.5 rounded-full border border-neutral-300/80">
                        ФЛАГМАН ДРОПА
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl text-[#0D0E10] tracking-wider uppercase leading-none">
                        SOLVE CHAOS HOODIE
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-sans line-clamp-1">
                        Oversized фит • Плотный флис 460г
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-extrabold text-[#0D0E10] font-mono">4 990 ₽</span>
                        <span className="text-[10px] font-bold text-neutral-900 underline group-hover:text-black transition-colors">
                          Смотреть →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refined Sticky Category & Controls Bar */}
        <div className="sticky top-14 z-30 bg-[#F7F7F6]/95 backdrop-blur-md border-b border-neutral-200/80 py-3.5 px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Category Quick Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-neutral-700 hover:text-black border-neutral-200 hover:border-neutral-400 shadow-2xs'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Controls Bar: Filter Drawer Trigger, Sort Dropdown, Grid Switcher */}
            <div className="flex items-center gap-2 justify-between md:justify-end">
              {/* Universal Filter Button (Desktop & Mobile) */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-extrabold hover:bg-neutral-800 transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>ФИЛЬТРЫ</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Selector Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 text-xs font-bold text-neutral-900 shadow-2xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent focus:outline-none cursor-pointer font-sans text-xs font-bold uppercase"
                  >
                    <option value="popular">По популярности</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>

              {/* Grid Layout Switcher (Desktop) */}
              <div className="hidden lg:flex items-center bg-white p-1 rounded-full border border-neutral-200 shadow-2xs">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-full transition-colors ${
                    gridCols === 3 ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'
                  }`}
                  aria-label="3 колонки"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-full transition-colors ${
                    gridCols === 4 ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'
                  }`}
                  aria-label="4 колонки"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Workspace (Full Width Grid) */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-neutral-200/80">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Активные фильтры:</span>

              {selectedCategory !== 'all' && (
                <span className="px-3.5 py-1 bg-white text-black text-xs font-bold rounded-full border border-neutral-300 flex items-center gap-1.5 shadow-2xs">
                  Категория: {categoryTabs.find((t) => t.id === selectedCategory)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelectedCategory('all')} />
                </span>
              )}

              {selectedBrand !== 'All' && (
                <span className="px-3.5 py-1 bg-white text-black text-xs font-bold rounded-full border border-neutral-300 flex items-center gap-1.5 shadow-2xs">
                  Бренд: {selectedBrand}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelectedBrand('All')} />
                </span>
              )}

              {selectedSize !== 'All' && (
                <span className="px-3.5 py-1 bg-white text-black text-xs font-bold rounded-full border border-neutral-300 flex items-center gap-1.5 shadow-2xs">
                  Размер: {selectedSize}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelectedSize('All')} />
                </span>
              )}

              {onlySale && (
                <span className="px-3.5 py-1 bg-white text-black text-xs font-bold rounded-full border border-neutral-300 flex items-center gap-1.5 shadow-2xs">
                  Только скидки
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setOnlySale(false)} />
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs font-bold text-neutral-500 hover:text-black underline ml-2 transition-colors"
              >
                Сбросить всё
              </button>
            </div>
          )}

          {/* Full-Bleed Products Grid */}
          <div>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-neutral-200/80 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 uppercase">Товары не найдены</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  К сожалению, по выбранным критериям ничего не найдено. Попробуйте сбросить параметры.
                </p>
                <Button onClick={resetFilters} variant="outline" className="text-xs font-bold rounded-xl px-6 py-2.5">
                  Сбросить все фильтры
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  gridCols === 4
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Ultra-Sleek Slide-Over Filter Panel Drawer (Desktop & Mobile) */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            />

            {/* Right Slide-Over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between font-sans border-l border-neutral-200"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl tracking-wider text-black uppercase">ФИЛЬТРЫ ТОВАРОВ</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold font-mono">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Scrollable Content */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Search Input */}
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase text-neutral-900 block">Поиск по названию</span>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Худи, кроссовки, кепка..."
                      className="w-full pl-10 pr-8 py-2.5 text-xs bg-neutral-100/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-sans"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Brands Selection */}
                <div className="space-y-2.5">
                  <span className="text-xs font-extrabold uppercase text-neutral-900 block">Бренды</span>
                  <div className="flex flex-wrap gap-2">
                    {brandsList.map((brand) => {
                      const isSelected = selectedBrand === brand;
                      return (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? 'bg-black text-white border-black shadow-xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200'
                          }`}
                        >
                          {brand}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase text-neutral-900">Максимальная цена</span>
                    <span className="font-extrabold text-black font-mono">{priceRange.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>1 000 ₽</span>
                    <span>20 000 ₽</span>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2.5">
                  <span className="text-xs font-extrabold uppercase text-neutral-900 block">Размер</span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedSize('All')}
                      className={`py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        selectedSize === 'All'
                          ? 'bg-black text-white border-black'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                      }`}
                    >
                      Все
                    </button>
                    {sizesList.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                          selectedSize === sz
                            ? 'bg-black text-white border-black'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Discount Switch */}
                <div className="pt-3 border-t border-neutral-100">
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-xs font-extrabold uppercase text-neutral-900">Только со скидкой</span>
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                      className="w-4 h-4 accent-black rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-neutral-100 bg-[#F7F7F6] flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1 py-3 text-xs font-bold rounded-xl border-neutral-300"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Сбросить
                </Button>
                <Button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 bg-black text-white text-xs font-bold rounded-xl shadow-md hover:bg-neutral-800"
                >
                  Показать ({filteredProducts.length})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </div>
  );
}
