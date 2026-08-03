'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, X, Check, Search, RotateCcw, ChevronRight } from 'lucide-react';
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
    name: 'Худи SOLVE Chaos Dark',
    price: 4990,
    category: 'clothing',
    brand: 'Solve',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Черный',
    isSale: true,
    rating: 4.9,
    image: '/images/cat-clothing.png',
    secondaryImage: '/images/hero-1.png',
    badge: '-20%',
  },
  {
    id: 2,
    name: 'New Balance 530 White Gold',
    price: 8990,
    category: 'sneakers',
    brand: 'New Balance',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'Белый',
    rating: 4.8,
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'TOP',
  },
  {
    id: 3,
    name: 'Звёздный Брелок Silver Star',
    price: 790,
    category: 'keychains',
    brand: 'Solve',
    sizes: ['ONE SIZE'],
    color: 'Серебристый',
    rating: 5.0,
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
  },
  {
    id: 4,
    name: 'Кепка Classic SOLVE Cap',
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
    name: 'Сумка Crossbody SOLVE Tech Bag',
    price: 3490,
    category: 'bags',
    brand: 'Solve',
    sizes: ['ONE SIZE'],
    color: 'Черный',
    isSale: true,
    rating: 4.9,
    image: '/images/cat-bags.png',
    secondaryImage: '/images/hero-3.png',
    badge: 'SALE',
  },
  {
    id: 6,
    name: 'Футболка Stüssy Basic Logo White',
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
    name: 'Nike Air Jordan 1 Retro High',
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
    name: 'Рюкзак Supreme Canvas Backpack',
    price: 11490,
    category: 'bags',
    brand: 'Supreme',
    sizes: ['ONE SIZE'],
    color: 'Черный',
    rating: 4.8,
    image: '/images/hero-3.png',
    secondaryImage: '/images/cat-bags.png',
  },
];

const categoryTabs = [
  { id: 'all', label: 'Все товары' },
  { id: 'clothing', label: 'Одежда' },
  { id: 'sneakers', label: 'Кроссовки' },
  { id: 'keychains', label: 'Брелоки' },
  { id: 'accessories', label: 'Аксессуары' },
  { id: 'bags', label: 'Сумки' },
];

const brandsList = ['All', 'Nike', 'New Balance', 'Stussy', 'Supreme', 'Solve'];
const sizesList = ['S', 'M', 'L', 'XL', '39', '40', '41', '42', '43', '44'];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [onlySale, setOnlySale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
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
    <div className="min-h-screen flex flex-col bg-[#F7F7F6]">
      <Header />

      <main className="flex-1 mt-14 pb-24 font-sans">
        {/* Breadcrumb & Hero Header */}
        <section className="bg-white border-b border-neutral-200/80 py-8 px-4">
          <div className="max-w-6xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 font-sans">
              <Link href="/" className="hover:text-black transition-colors">Главная</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-black">Каталог</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
              <div>
                <h1 className="font-display text-4xl md:text-6xl text-[#0D0E10] uppercase tracking-wider leading-none">
                  КАТАЛОГ SOLVE
                </h1>
                <p className="text-xs md:text-sm text-neutral-500 font-sans mt-1">
                  Оригинальная уличная одежда, обувь и брелоки с гарантией подлинности
                </p>
              </div>
              <span className="text-xs font-bold text-neutral-500 font-mono bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200 self-start sm:self-auto">
                Найдено: {filteredProducts.length} товаров
              </span>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-700 hover:text-black border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Controls Bar (Search, Mobile Filter Trigger, Sort) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по каталогу..."
                className="w-full pl-10 pr-8 py-2 text-xs bg-neutral-100/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-sans"
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

            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-bold bg-neutral-100 hover:bg-neutral-200 border-neutral-200 rounded-xl min-h-[40px]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Фильтры</span>
              </Button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent focus:outline-none cursor-pointer font-sans text-xs font-bold"
                  >
                    <option value="popular">По популярности</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid & Desktop Filters Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-6 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="font-display text-lg tracking-wider text-black uppercase">ФИЛЬТРЫ</span>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] font-bold text-neutral-400 hover:text-black transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Сбросить</span>
                </button>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold uppercase text-neutral-900 block">Бренд</span>
                <div className="flex flex-wrap gap-1.5">
                  {brandsList.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedBrand === brand
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold uppercase text-neutral-900">До цены</span>
                  <span className="font-bold text-black font-mono">{priceRange.toLocaleString('ru-RU')} ₽</span>
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
              </div>

              {/* Size Filter */}
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold uppercase text-neutral-900 block">Размер</span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => setSelectedSize('All')}
                    className={`py-1 rounded-lg text-xs font-semibold text-center ${
                      selectedSize === 'All'
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Все
                  </button>
                  {sizesList.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-1 rounded-lg text-xs font-semibold text-center ${
                        selectedSize === sz
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sale Only Toggle */}
              <div className="pt-2 border-t border-neutral-100">
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
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-9 space-y-6">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-neutral-200/80">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 uppercase">Товары не найдены</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Попробуйте изменит параметры поиска или сбросить фильтры.
                  </p>
                  <Button onClick={resetFilters} variant="outline" className="text-xs font-bold rounded-xl">
                    Сбросить фильтры
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 sm:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto font-sans"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="font-display text-2xl tracking-wider text-black">ФИЛЬТРЫ</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Brands */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase text-neutral-900 block">Бренд</span>
                <div className="flex flex-wrap gap-2">
                  {brandsList.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                        selectedBrand === brand ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-extrabold uppercase text-neutral-900">До цены</span>
                  <span className="font-bold text-black font-mono">{priceRange.toLocaleString('ru-RU')} ₽</span>
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
              </div>

              {/* Apply & Reset Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1 py-3 text-xs font-bold rounded-xl"
                >
                  Сбросить
                </Button>
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-black text-white text-xs font-bold rounded-xl"
                >
                  Применить ({filteredProducts.length})
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
