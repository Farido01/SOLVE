'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  ChevronDown,
  Check,
  Zap,
  X,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ProductCard, { type Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

// Mock product details database
const mockProductDetails: Record<string, {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  brand: string;
  sku: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  images: string[];
  sizes: string[];
  description: string;
  material: string;
  fit: string;
  care: string;
}> = {
  '1': {
    id: 1,
    name: 'Худи SOLVE Chaos Dark Oversized',
    price: 4990,
    oldPrice: 6490,
    brand: 'SOLVE',
    sku: 'SV-2026-CH',
    rating: 4.9,
    reviewsCount: 42,
    badge: 'HIT DROP',
    images: [
      '/images/cat-clothing.png',
      '/images/hero-1.png',
      '/images/promo-banner.png',
      '/images/hero-3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Флагманское оверсайз худи из коллекции Chaos Urban. Плотный футер с начёсом премиум-качества. Объёмный капюшон, спущенная линия плеча и брендированная вышивка на груди.',
    material: '100% Плотный хлопковый флис (460 г/м²)',
    fit: 'Oversized Streetwear Fit',
    care: 'Машинная стирка при 30°C с изнанки. Не использовать отбеливатель.',
  },
  '2': {
    id: 2,
    name: 'Кроссовки Nike Air Jordan 1 Retro High',
    price: 14990,
    oldPrice: 17500,
    brand: 'NIKE',
    sku: 'AJ1-RET-01',
    rating: 5.0,
    reviewsCount: 88,
    badge: 'HOT RELEASE',
    images: [
      '/images/cat-sneakers.png',
      '/images/hero-2.png',
      '/images/cat-sneakers.png',
      '/images/hero-2.png',
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    description: 'Легендарные силуэтные кроссовки Air Jordan 1 в культовой расцветке. Натуральная кожа премиум-выделки, амортизирующая капсула Air в подошве.',
    material: 'Натуральная премиум-кожа, резина High-Traction',
    fit: 'True to size (Идёт размер в размер)',
    care: 'Чистка специальной пеной для кожи.',
  },
};

// Default fallback product
const defaultProduct = mockProductDetails['1'];

// Related products for "С этим покупают"
const relatedProducts: Product[] = [
  {
    id: 102,
    name: 'Nike Air Jordan 1 Retro',
    price: 14990,
    image: '/images/cat-sneakers.png',
    secondaryImage: '/images/hero-2.png',
    badge: 'HOT',
  },
  {
    id: 103,
    name: 'Сумка Crossbody SOLVE Tech',
    price: 4290,
    image: '/images/cat-bags.png',
    secondaryImage: '/images/hero-3.png',
    badge: 'NEW',
  },
  {
    id: 104,
    name: 'Звёздный Брелок Silver Star',
    price: 890,
    image: '/images/cat-keychains.png',
    secondaryImage: '/images/cat-accessories.png',
    badge: 'TOP',
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = mockProductDetails[productId] || defaultProduct;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCartAlert, setAddedToCartAlert] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  const handleAddToCart = () => {
    setAddedToCartAlert(true);
    setTimeout(() => setAddedToCartAlert(false), 3500);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Link href="/" className="hover:text-black transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-black transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-neutral-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Photo Frame */}
            <div className="relative aspect-[3/4] w-full rounded-3xl bg-neutral-200/50 overflow-hidden border border-neutral-200/80 shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Badge Overlay */}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest rounded-lg font-mono shadow-md">
                  {product.badge}
                </span>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all border ${
                  isFavorite
                    ? 'bg-black text-white border-black scale-105'
                    : 'bg-white/95 text-black border-neutral-200 hover:bg-black hover:text-white'
                }`}
                aria-label="Добавить в избранное"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-black ring-2 ring-black/10 shadow-sm scale-102'
                      : 'border-neutral-200 opacity-70 hover:opacity-100 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt={`Снимок ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Controls (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Details */}
            <div className="space-y-2 border-b border-neutral-200/80 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 font-mono">
                  {product.brand} OFFICIAL
                </span>
                <span className="text-xs text-neutral-400 font-mono">Арт: {product.sku}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-[#0D0E10] uppercase tracking-wide leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-neutral-900 font-mono">{product.rating}</span>
                </div>
                <span className="text-xs text-neutral-400">•</span>
                <span className="text-xs text-neutral-500 font-medium underline cursor-pointer hover:text-black">
                  {product.reviewsCount} отзывов покупателей
                </span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-black font-mono">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-sm sm:text-base text-neutral-400 line-through font-mono font-semibold">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-extrabold rounded-md font-mono uppercase">
                    СКИДКА -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 font-mono">
                  ВЫБЕРИТЕ РАЗМЕР
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-black underline font-mono"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Таблица размеров</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-xl text-xs font-extrabold transition-all border font-mono ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-md scale-105'
                          : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 shadow-2xs'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-amber-700 font-mono font-bold flex items-center gap-1.5 pt-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Размер {selectedSize} в наличии (Осталось 2 шт.)</span>
              </p>
            </div>

            {/* Add to Cart Alert Notification */}
            <AnimatePresence>
              {addedToCartAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0D0E10] text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xl border border-neutral-800"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Товар (размер {selectedSize}) добавлен в корзину!</span>
                  </div>
                  <Link href="/cart" className="underline hover:text-neutral-300 font-mono text-[11px]">
                    В корзину →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ДОБАВИТЬ В КОРЗИНУ • {product.price.toLocaleString('ru-RU')} ₽</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white hover:bg-neutral-100 text-neutral-900 border-neutral-300 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-2xs"
              >
                КУПИТЬ В 1 КЛИК
              </Button>
            </div>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-bold text-neutral-600 font-mono">
              <div className="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-black" />
                <span>Доставка сегодня</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>В наличии в городе</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-black" />
                <span>Примерка при вручении</span>
              </div>
            </div>

            {/* Info Accordions */}
            <div className="border-t border-neutral-200/80 pt-4 space-y-2 font-sans">
              
              {/* Accordion 1: Description */}
              <div className="border border-neutral-200/80 rounded-2xl bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full p-4 flex items-center justify-between text-left font-extrabold text-xs uppercase tracking-wider text-neutral-900 font-mono"
                >
                  <span>ОПИСАНИЕ И СОСТАВ</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'desc' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 text-xs text-neutral-600 space-y-2 border-t border-neutral-100 pt-3"
                    >
                      <p className="leading-relaxed">{product.description}</p>
                      <ul className="space-y-1 font-mono text-[11px] pt-1">
                        <li>• <strong>Состав:</strong> {product.material}</li>
                        <li>• <strong>Крой:</strong> {product.fit}</li>
                        <li>• <strong>Уход:</strong> {product.care}</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Shipping & Fitting */}
              <div className="border border-neutral-200/80 rounded-2xl bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex items-center justify-between text-left font-extrabold text-xs uppercase tracking-wider text-neutral-900 font-mono"
                >
                  <span>ДОСТАВКА И САМОВЫВОЗ</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 text-xs text-neutral-600 space-y-2 border-t border-neutral-100 pt-3"
                    >
                      <p>Все товары находятся в наличии в нашем городском шоуруме. Быстрая доставка курьером до двери в день заказа или бесплатный самовывоз сегодня.</p>
                      <p>При доставке курьером доступна примерка перед покупкой (15 минут).</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Authentication */}
              <div className="border border-neutral-200/80 rounded-2xl bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleAccordion('auth')}
                  className="w-full p-4 flex items-center justify-between text-left font-extrabold text-xs uppercase tracking-wider text-neutral-900 font-mono"
                >
                  <span>ГАРАНТИЯ ПОДЛИННОСТИ</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordion === 'auth' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'auth' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 text-xs text-neutral-600 space-y-2 border-t border-neutral-100 pt-3"
                    >
                      <p>Все товары в SOLVE проходят строгую многоэтапную легит-чек аутентификацию. Каждая вещь снабжена фирменной чипированной пломбой SOLVE Verification.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Section ("С ЭТИМ ПОКУПАЮТ") */}
        <section className="mt-16 py-10 bg-[#F9F9F8] border-t border-neutral-200/60 font-sans">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-neutral-900" />
              <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-[#0D0E10]">
                С ЭТИМ ПОКУПАЮТ
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Size Guide Modal Window */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-lg bg-[#F9F9F8] rounded-3xl p-6 border border-neutral-200 shadow-2xl space-y-4 font-sans"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-black" />
                  <h3 className="font-display text-2xl uppercase tracking-wider text-[#0D0E10]">
                    ТАБЛИЦА РАЗМЕРОВ
                  </h3>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-500 font-sans">
                Замеры сняты в сантиметрах в разложенном виде. Модель имеет Oversized крой.
              </p>

              <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-2xs font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-neutral-100 border-b border-neutral-200 text-[10px] font-extrabold uppercase text-neutral-600">
                    <tr>
                      <th className="p-3">Размер</th>
                      <th className="p-3">Грудь (см)</th>
                      <th className="p-3">Длина (см)</th>
                      <th className="p-3">Рукав (см)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-bold text-neutral-800">
                    <tr className={selectedSize === 'S' ? 'bg-neutral-200/50 font-black' : ''}>
                      <td className="p-3">S (46)</td>
                      <td className="p-3">118</td>
                      <td className="p-3">70</td>
                      <td className="p-3">62</td>
                    </tr>
                    <tr className={selectedSize === 'M' ? 'bg-neutral-200/50 font-black' : ''}>
                      <td className="p-3">M (48)</td>
                      <td className="p-3">124</td>
                      <td className="p-3">72</td>
                      <td className="p-3">64</td>
                    </tr>
                    <tr className={selectedSize === 'L' ? 'bg-neutral-200/50 font-black' : ''}>
                      <td className="p-3">L (50)</td>
                      <td className="p-3">130</td>
                      <td className="p-3">74</td>
                      <td className="p-3">66</td>
                    </tr>
                    <tr className={selectedSize === 'XL' ? 'bg-neutral-200/50 font-black' : ''}>
                      <td className="p-3">XL (52)</td>
                      <td className="p-3">136</td>
                      <td className="p-3">76</td>
                      <td className="p-3">68</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-full bg-black text-white font-extrabold text-xs uppercase py-3 rounded-xl"
                >
                  ПОНЯТНО, ЗАКРЫТЬ
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </div>
  );
}
