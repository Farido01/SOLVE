'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw, ChevronRight, LayoutGrid, Grid2X2, Sparkles, Check, Tag } from 'lucide-react';
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

const categoryTiles = [
  { id: 'all', name: 'ВСЕ ТОВАРЫ', count: '10 моделей', image: '/images/hero-1.png' },
  { id: 'clothing', name: 'ОДЕЖДА', count: '3 модели', image: '/images/cat-clothing.png' },
  { id: 'sneakers', name: 'КРОССОВКИ', count: '3 модели', image: '/images/cat-sneakers.png' },
  { id: 'keychains', name: 'БРЕЛОКИ', count: '1 модель', image: '/images/cat-keychains.png' },
  { id: 'accessories', name: 'АКСЕССУАРЫ', count: '1 модель', image: '/images/cat-accessories.png' },
  { id: 'bags', name: 'СУМКИ', count: '2 модели', image: '/images/cat-bags.png' },
];

const brandsList = ['All', 'Solve', 'Nike', 'New Balance', 'Stussy', 'Supreme', 'Off-White'];

const pricePresets = [
  { id: 'all', label: 'Все цены', min: 0, max: 20000 },
  { id: 'under5k', label: 'До 5 000 ₽', min: 0, max: 5000 },
  { id: '5k-10k', label: '5 000 – 10 000 ₽', min: 5000, max: 10000 },
  { id: 'over10k', label: 'От 10 000 ₽', min: 10000, max: 20000 },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPricePreset, setSelectedPricePreset] = useState('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [onlySale, setOnlySale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  // Price preset handler
  const handlePricePresetSelect = (preset: typeof pricePresets[0]) => {
    setSelectedPricePreset(preset.id);
    setMinPrice(preset.min);
    setPriceRange(preset.max);
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrand !== 'All') count++;
    if (minPrice > 0 || priceRange < 20000) count++;
    if (onlySale) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, selectedBrand, minPrice, priceRange, onlySale, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('All');
    setSelectedPricePreset('all');
    setMinPrice(0);
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
        if (p.price < minPrice) return false;
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
  }, [selectedCategory, selectedBrand, minPrice, priceRange, onlySale, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        {/* Editorial Top Banner */}
        <section className="bg-white border-b border-neutral-200/90 pt-8 pb-6 px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Top Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
              <Link href="/" className="hover:text-black transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="text-black font-extrabold">Каталог</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0D0E10] uppercase tracking-[0.04em] leading-[0.85]">
                  КАТАЛОГ SOLVE
                </h1>
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по названию..."
                  className="w-full pl-10 pr-8 py-2.5 text-xs bg-[#F9F9F8] rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black font-sans font-medium"
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
          </div>
        </section>

        {/* ── VISUAL CATEGORY TILES (Таблички категорий) ── */}
        <section className="py-6 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-neutral-400 font-mono">
              ВЫБЕРИТЕ КАТЕГОРИЮ
            </span>
            <span className="text-xs font-bold font-mono text-neutral-500">
              {filteredProducts.length} позиций доступно
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryTiles.map((tile) => {
              const isSelected = selectedCategory === tile.id;
              return (
                <button
                  key={tile.id}
                  onClick={() => setSelectedCategory(tile.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-28 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md scale-[1.02]'
                      : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between z-10">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-400'
                    }`}>
                      {tile.count}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-extrabold">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Tile Product Thumbnail */}
                  <img
                    src={tile.image}
                    alt={tile.name}
                    className="w-12 h-12 object-contain absolute right-2 bottom-2 opacity-85 group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="z-10">
                    <h3 className={`font-display text-lg uppercase tracking-wide leading-none ${
                      isSelected ? 'text-white' : 'text-[#0D0E10]'
                    }`}>
                      {tile.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SECONDARY QUICK FILTER CHIPS (Удобные таблицы фильтров) ── */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-neutral-200/90 shadow-2xs space-y-4 font-sans">
            {/* Row 1: Brand & Price Preset Pills */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Brands Selector Pills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block font-mono">БРЕНД:</span>
                <div className="flex flex-wrap gap-1.5">
                  {brandsList.map((brand) => {
                    const isSelected = selectedBrand === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-[#F9F9F8] text-neutral-700 hover:text-black border-neutral-200'
                        }`}
                      >
                        {brand === 'All' ? 'Все бренды' : brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Preset Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block font-mono">ЦЕНОВОЙ ДИАПАЗОН:</span>
                <div className="flex flex-wrap gap-1.5">
                  {pricePresets.map((preset) => {
                    const isSelected = selectedPricePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handlePricePresetSelect(preset)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-[#F9F9F8] text-neutral-700 hover:text-black border-neutral-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 2: Controls, Toggles, Reset & Grid Mode */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
              {/* Left: Discount Toggle & Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOnlySale(!onlySale)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                    onlySale
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-[#F9F9F8] text-neutral-700 hover:text-black border-neutral-200'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Только со скидкой</span>
                </button>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs font-extrabold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Сбросить ({activeFilterCount})</span>
                  </button>
                )}
              </div>

              {/* Right: Sort Dropdown & Grid View Toggle */}
              <div className="flex items-center gap-3">
                {/* Sort Selector */}
                <div className="flex items-center gap-2 bg-[#F9F9F8] px-3.5 py-1.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-900">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent focus:outline-none cursor-pointer text-xs font-bold uppercase font-mono"
                  >
                    <option value="popular">По популярности</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>

                {/* Grid Cols Buttons */}
                <div className="hidden sm:flex items-center bg-[#F9F9F8] p-1 rounded-xl border border-neutral-200">
                  <button
                    onClick={() => setGridCols(2)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                      gridCols === 2 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    2x
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                      gridCols === 3 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    3x
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                      gridCols === 4 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    4x
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN PRODUCTS GRID ── */}
        <section className="pt-6 px-4 md:px-8 max-w-6xl mx-auto">
          {filteredProducts.length === 0 ? (
            /* Empty Filter Results */
            <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-neutral-200/80 max-w-md mx-auto my-8">
              <div className="w-14 h-14 rounded-full bg-[#F9F9F8] flex items-center justify-center mx-auto text-neutral-400 border border-neutral-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-neutral-900">НИЧЕГО НЕ НАЙДЕНО</h3>
              <p className="text-xs text-neutral-500">
                Попробуйте изменить ценовой диапазон или сбросить фильтры.
              </p>
              <Button onClick={resetFilters} variant="outline" className="text-xs font-bold rounded-xl px-5">
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${
              gridCols === 2
                ? 'grid-cols-2'
                : gridCols === 3
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} className="w-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
