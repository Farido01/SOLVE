'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ChevronRight, ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ProductCard, { type Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface FavoriteProduct extends Product {
  category: string;
  brand: string;
  inStock: boolean;
}

const initialFavorites: FavoriteProduct[] = [
  {
    id: 1,
    name: 'Худи SOLVE Chaos Dark Oversized',
    price: 4990,
    category: 'clothing',
    brand: 'Solve',
    image: '/images/cat-clothing.png',
    secondaryImage: '/images/hero-1.png',
    badge: 'BESTSELLER',
    inStock: true,
  },
  {
    id: 2,
    name: 'New Balance 530 Metallic Silver',
    price: 8990,
    category: 'sneakers',
    brand: 'New Balance',
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'TOP DROP',
    inStock: true,
  },
  {
    id: 3,
    name: 'Звёздный Брелок SOLVE Star Silver Chain',
    price: 790,
    category: 'keychains',
    brand: 'Solve',
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
    badge: 'LIMITED',
    inStock: true,
  },
  {
    id: 7,
    name: 'Nike Air Jordan 1 High OG Chicago',
    price: 15990,
    category: 'sneakers',
    brand: 'Nike',
    image: '/images/hero-2.png',
    secondaryImage: '/images/cat-sneakers.png',
    badge: 'HOT',
    inStock: true,
  },
];

const categoryTabs = [
  { id: 'all', label: 'ВСЕ ИЗБРАННОЕ' },
  { id: 'clothing', label: 'ОДЕЖДА' },
  { id: 'sneakers', label: 'КРОССОВКИ' },
  { id: 'keychains', label: 'БРЕЛОКИ' },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(initialFavorites);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedItemsAlert, setAddedItemsAlert] = useState<string | null>(null);

  // Filter calculation
  const filteredFavorites = useMemo(() => {
    if (selectedCategory === 'all') return favorites;
    return favorites.filter((item) => item.category === selectedCategory);
  }, [favorites, selectedCategory]);

  // Handlers
  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setFavorites([]);
  };

  const handleMoveAllToCart = () => {
    setAddedItemsAlert('Все товары успешно добавлены в корзину!');
    setTimeout(() => setAddedItemsAlert(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F6] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        {/* Minimalist Editorial Banner */}
        <section className="bg-white border-b border-neutral-200/90 pt-8 pb-8 px-4 md:px-8 relative overflow-hidden bg-[radial-gradient(#e2e4e8_1px,transparent_1px)] [background-size:24px_24px]">
          <div className="max-w-6xl mx-auto space-y-4 relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest font-sans">
              <Link href="/" className="hover:text-black transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="text-black font-extrabold">Избранное</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0D0E10] uppercase tracking-[0.05em] leading-[0.9]">
                  ИЗБРАННОЕ SOLVE
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-600 font-mono bg-[#F7F7F6] px-4 py-2 rounded-full border border-neutral-200 shadow-2xs">
                  {favorites.length} СОХРАНЁННЫХ МОДЕЛЕЙ
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Workspace */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
          {favorites.length === 0 ? (
            /* Empty Favorites View */
            <div className="bg-white rounded-3xl p-12 md:p-16 text-center space-y-6 border border-neutral-200/80 shadow-2xs max-w-lg mx-auto my-12 font-sans">
              <div className="w-16 h-16 rounded-full bg-[#F7F7F6] flex items-center justify-center mx-auto text-neutral-400 border border-neutral-200">
                <Heart className="w-8 h-8 text-neutral-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl text-neutral-900 uppercase tracking-wider">СПИСОК ИЗБРАННОГО ПУСТ</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Сохраняйте понравившиеся товары, чтобы следить за скидками и быстро переходить к оформлению заказа!
                </p>
              </div>
              <Link href="/catalog" className="inline-block">
                <Button className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-md uppercase tracking-wider">
                  ПЕРЕЙТИ В КАТАЛОГ →
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6 font-sans">
              {/* Alert Notification */}
              {addedItemsAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{addedItemsAlert}</span>
                  </div>
                  <Link href="/cart" className="underline hover:text-neutral-100 font-mono">
                    Перейти в корзину →
                  </Link>
                </motion.div>
              )}

              {/* Controls Bar: Category Pills & Batch Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {categoryTabs.map((tab) => {
                    const isActive = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                          isActive
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-[#F7F7F6] text-neutral-700 hover:text-black border-neutral-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Batch Actions */}
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    onClick={handleMoveAllToCart}
                    className="bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-full px-5 py-2 shadow-2xs flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Переместить всё в корзину</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="text-xs font-bold text-neutral-500 hover:text-red-500 rounded-full px-4 border-neutral-200"
                  >
                    Очистить список
                  </Button>
                </div>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                <AnimatePresence>
                  {filteredFavorites.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group"
                    >
                      <ProductCard product={product} />

                      {/* Remove Button Overlay */}
                      <button
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-neutral-200 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Удалить из избранного"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
