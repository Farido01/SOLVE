'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw,
  Tag, ChevronRight, ShoppingBag, PlusCircle, Check, X, Zap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CrossSellItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Худи SOLVE Chaos Dark Oversized',
    brand: 'Solve',
    price: 4990,
    originalPrice: 6290,
    size: 'L',
    color: 'Черный',
    quantity: 1,
    image: '/images/cat-clothing.png',
    inStock: true,
  },
  {
    id: 2,
    name: 'New Balance 530 Metallic Silver',
    brand: 'New Balance',
    price: 8990,
    size: '42',
    color: 'Серебристый',
    quantity: 1,
    image: '/images/cat-sneakers.png',
    inStock: true,
  },
];

const crossSellItems: CrossSellItem[] = [
  {
    id: 101,
    name: 'Брелок SOLVE Star Silver Chain',
    brand: 'Solve',
    price: 790,
    image: '/images/cat-keychains.png',
  },
  {
    id: 102,
    name: 'Кепка SOLVE Classic Streetwear',
    brand: 'Solve',
    price: 1690,
    image: '/images/cat-accessories.png',
  },
  {
    id: 103,
    name: 'Сумка SOLVE Tech Modular',
    brand: 'Solve',
    price: 3490,
    image: '/images/cat-bags.png',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [promoOpen, setPromoOpen] = useState(false);

  const handleIncrease = (id: number) =>
    setCartItems((p) => p.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));

  const handleDecrease = (id: number) =>
    setCartItems((p) =>
      p.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0)
    );

  const handleRemove = (id: number) =>
    setCartItems((p) => p.filter((i) => i.id !== id));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SOLVE2026' || code === 'SOLVE') {
      setAppliedDiscount(0.1);
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
    }
  };

  const handleAddCrossSell = (item: CrossSellItem) => {
    const existing = cartItems.find((ci) => ci.name === item.name);
    if (existing) {
      handleIncrease(existing.id);
    } else {
      setCartItems((p) => [
        ...p,
        {
          id: Date.now(),
          name: item.name,
          brand: item.brand,
          price: item.price,
          size: 'ONE SIZE',
          color: 'Стандартный',
          quantity: 1,
          image: item.image,
          inStock: true,
        },
      ]);
    }
  };

  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const deliveryFree = subtotal >= 10000;
  const deliveryCost = deliveryFree || subtotal === 0 ? 0 : 490;
  const total = Math.max(0, subtotal - discountAmount + deliveryCost);
  const totalQty = cartItems.reduce((a, b) => a + b.quantity, 0);
  const freeShipProgress = Math.min(100, Math.round((subtotal / 10000) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F0EE] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-32">

        {/* ── HERO HEADER ──────────────────────────────── */}
        <section className="bg-[#0D0E10] text-white px-4 md:px-8 pt-10 pb-8 relative overflow-hidden">
          {/* Subtle grid texture */}
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6 font-mono">
              <Link href="/" className="hover:text-white/70 transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/60">Корзина</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl xl:text-9xl uppercase tracking-tight leading-[0.85]">
                КОРЗИНА
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
                  <span className="font-mono text-xs font-bold text-white/80">{totalQty} {totalQty === 1 ? 'ТОВАР' : totalQty < 5 ? 'ТОВАРА' : 'ТОВАРОВ'}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-white/70">
                  <Truck className="w-3.5 h-3.5 text-white/50" />
                  {deliveryFree ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-extrabold">
                      <Check className="w-3.5 h-3.5" />
                      Бесплатная доставка активирована!
                    </span>
                  ) : (
                    <span>До бесплатной доставки: <span className="text-white font-extrabold font-mono">{(10000 - subtotal).toLocaleString('ru-RU')} ₽</span></span>
                  )}
                </div>
                <span className="font-mono text-white/30 text-[10px]">{freeShipProgress}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${deliveryFree ? 'bg-emerald-400' : 'bg-white'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShipProgress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ─────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
          {cartItems.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-9 h-9 text-neutral-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-4xl uppercase tracking-wide text-neutral-900">КОРЗИНА ПУСТА</h3>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Перейдите в каталог и выберите новинки и лимитированные дропы
                </p>
              </div>
              <Link href="/catalog">
                <button className="bg-black text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl uppercase tracking-wider hover:bg-neutral-800 transition-colors">
                  ПЕРЕЙТИ В КАТАЛОГ →
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

              {/* ── LEFT: ITEMS + PROMO + CROSS-SELL ─── */}
              <div className="space-y-3">

                {/* Cart Items */}
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.97 }}
                      transition={{ delay: idx * 0.04 }}
                      className="bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm"
                    >
                      <div className="flex gap-0">
                        {/* Image - tall, no padding */}
                        <div className="w-28 sm:w-36 shrink-0 bg-[#EBECEE] relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center absolute inset-0"
                          />
                          {item.originalPrice && (
                            <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase font-mono">
                              СКИДКА
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-h-[130px]">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 block font-mono mb-0.5">
                                {item.brand}
                              </span>
                              <h3 className="font-display text-lg sm:text-2xl text-[#0D0E10] uppercase tracking-wide leading-none">
                                {item.name}
                              </h3>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-neutral-400 transition-all shrink-0"
                              aria-label="Удалить"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Pills */}
                          <div className="flex flex-wrap gap-1.5 my-2">
                            <span className="text-[10px] font-bold bg-[#F0F0EE] text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-200">
                              {item.size}
                            </span>
                            <span className="text-[10px] font-bold bg-[#F0F0EE] text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-200">
                              {item.color}
                            </span>
                            {item.inStock && (
                              <span className="text-[10px] font-extrabold text-emerald-600 px-2 py-1">
                                ● В наличии
                              </span>
                            )}
                          </div>

                          {/* Qty + Price row */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 bg-[#F0F0EE] p-1 rounded-xl border border-neutral-200/60">
                              <button
                                onClick={() => handleDecrease(item.id)}
                                className="w-8 h-8 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center text-neutral-700 transition-all shadow-sm font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-extrabold font-mono">{item.quantity}</span>
                              <button
                                onClick={() => handleIncrease(item.id)}
                                className="w-8 h-8 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center text-neutral-700 transition-all shadow-sm font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              {item.originalPrice && (
                                <span className="text-[11px] text-neutral-400 line-through font-mono block leading-none">
                                  {(item.originalPrice * item.quantity).toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                              <span className="font-display text-2xl sm:text-3xl text-[#0D0E10] leading-none">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Promo Code */}
                <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setPromoOpen(!promoOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#0D0E10] flex items-center justify-center">
                        <Tag className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900">
                        {promoStatus === 'success' ? 'Промокод применён ✓' : 'Промокод / скидка'}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: promoOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="w-4 h-4 text-neutral-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {promoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 space-y-3 border-t border-neutral-100">
                          <form onSubmit={handleApplyPromo} className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => { setPromoCode(e.target.value); setPromoStatus('idle'); }}
                              placeholder="Введите промокод..."
                              className="flex-1 px-4 py-2.5 text-xs bg-[#F0F0EE] rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono font-bold uppercase placeholder:normal-case placeholder:font-normal placeholder:text-neutral-400"
                            />
                            <button
                              type="submit"
                              className="bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-colors uppercase tracking-wider"
                            >
                              Применить
                            </button>
                          </form>
                          {promoStatus !== 'idle' && (
                            <p className={`text-xs font-bold ${promoStatus === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                              {promoStatus === 'success'
                                ? '✓ Промокод применён! Скидка 10%'
                                : '✗ Неверный промокод. Попробуйте SOLVE2026'}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cross-Sell */}
                <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-sm p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-black" />
                    <h4 className="font-display text-xl uppercase tracking-wide text-[#0D0E10]">С ЭТИМ ЧАСТО БЕРУТ</h4>
                  </div>
                  <div className="space-y-2">
                    {crossSellItems.map((cs) => (
                      <div
                        key={cs.id}
                        className="flex items-center gap-3 p-3 bg-[#F0F0EE] rounded-2xl border border-neutral-200/60 hover:border-neutral-300 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-neutral-200/60 shrink-0">
                          <img src={cs.image} alt={cs.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-sm text-neutral-900 uppercase truncate leading-tight">
                            {cs.name}
                          </h5>
                          <span className="font-mono text-xs font-bold text-black">{cs.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <button
                          onClick={() => handleAddCrossSell(cs)}
                          className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shrink-0"
                          aria-label="Добавить"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: ORDER SUMMARY ─────────────── */}
              <div className="sticky top-20 space-y-4">

                {/* Summary card — dark editorial */}
                <div className="bg-[#0D0E10] text-white rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-6 border-b border-white/10">
                    <h3 className="font-display text-3xl uppercase tracking-wide">ВАШИ ТОВАРЫ</h3>
                    <p className="text-white/40 text-[11px] font-mono mt-1">{totalQty} позиции · SOLVE Store</p>
                  </div>

                  <div className="p-6 space-y-3.5 text-xs font-bold">
                    <div className="flex justify-between text-white/60">
                      <span>Сумма товаров</span>
                      <span className="font-mono text-white">{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Промокод (-10%)</span>
                        <span className="font-mono">−{discountAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/60">
                      <span>Доставка</span>
                      <span className={`font-mono ${deliveryFree ? 'text-emerald-400' : 'text-white'}`}>
                        {deliveryFree ? 'БЕСПЛАТНО' : `${deliveryCost} ₽`}
                      </span>
                    </div>
                  </div>

                  <div className="mx-6 border-t border-white/10" />

                  <div className="p-6 space-y-5">
                    <div className="flex items-end justify-between">
                      <span className="text-white/50 text-[11px] font-bold uppercase tracking-wider">ИТОГО</span>
                      <span className="font-display text-4xl sm:text-5xl text-white leading-none">
                        {total.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest transition-colors shadow-md"
                    >
                      <span>ОФОРМИТЬ ЗАКАЗ</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <p className="text-center text-white/25 text-[10px] font-mono">
                      НДС включён • Оплата картой или СБП
                    </p>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-sm p-5 space-y-3.5">
                  {[
                    { icon: ShieldCheck, text: '100% Гарантия подлинности товаров' },
                    { icon: Truck, text: 'Курьерская доставка с примеркой' },
                    { icon: RefreshCw, text: 'Возврат или обмен в 14 дней' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0D0E10] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-neutral-700">{text}</span>
                    </div>
                  ))}
                </div>

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
