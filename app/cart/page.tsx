'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw,
  Tag, ChevronRight, ShoppingBag, PlusCircle, Check, X, Zap, Lock
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
  { id: 101, name: 'Брелок SOLVE Star Silver Chain', brand: 'Solve', price: 790, image: '/images/cat-keychains.png' },
  { id: 102, name: 'Кепка SOLVE Classic Streetwear', brand: 'Solve', price: 1690, image: '/images/cat-accessories.png' },
  { id: 103, name: 'Сумка SOLVE Tech Modular', brand: 'Solve', price: 3490, image: '/images/cat-bags.png' },
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
        { id: Date.now(), name: item.name, brand: item.brand, price: item.price, size: 'ONE SIZE', color: 'Стандартный', quantity: 1, image: item.image, inStock: true },
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
    <div className="min-h-screen flex flex-col bg-[#F7F7F6] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-32">

        {/* ── PAGE HEADER ─────────────────────────────────── */}
        <section className="bg-white border-b border-neutral-200 px-4 md:px-8 pt-8 pb-7 relative overflow-hidden">
          {/* dot grid */}
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="max-w-6xl mx-auto relative z-10">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-neutral-400 uppercase tracking-[0.18em] mb-5 font-mono">
              <Link href="/" className="hover:text-neutral-700 transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="text-neutral-900">Корзина</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] uppercase leading-[0.85] tracking-tight text-[#0D0E10]">
                КОРЗИНА<br className="sm:hidden" />
                <span className="text-neutral-300"> /</span>
              </h1>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <span className="inline-flex items-center gap-2 bg-[#EBECEE] border border-neutral-200 rounded-full px-4 py-2 text-[11px] font-extrabold font-mono text-neutral-700 uppercase">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {totalQty} {totalQty === 1 ? 'товар' : totalQty < 5 ? 'товара' : 'товаров'}
                </span>
                <Link href="/catalog" className="text-[10px] font-bold text-neutral-400 hover:text-neutral-700 transition-colors underline underline-offset-2">
                  Продолжить покупки →
                </Link>
              </div>
            </div>

            {/* Free Shipping Bar */}
            <div className="mt-6 p-3.5 bg-[#F7F7F6] rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Truck className="w-3.5 h-3.5 text-neutral-500" />
                  {deliveryFree ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Бесплатная доставка активирована!
                    </span>
                  ) : (
                    <span>
                      До бесплатной доставки:{' '}
                      <span className="text-[#0D0E10] font-extrabold font-mono">{(10000 - subtotal).toLocaleString('ru-RU')} ₽</span>
                    </span>
                  )}
                </div>
                <span className="font-mono text-neutral-400">{freeShipProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${deliveryFree ? 'bg-emerald-500' : 'bg-[#0D0E10]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShipProgress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENT ─────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto shadow-sm">
                <ShoppingBag className="w-9 h-9 text-neutral-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-5xl uppercase tracking-wide">КОРЗИНА ПУСТА</h3>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Перейдите в каталог, чтобы выбрать новинки и лимитированные дропы
                </p>
              </div>
              <Link href="/catalog">
                <button className="bg-[#0D0E10] text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md">
                  ПЕРЕЙТИ В КАТАЛОГ →
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

              {/* ── LEFT COLUMN ───────────────────────────── */}
              <div className="space-y-3">

                {/* Cart Items */}
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16, scale: 0.97 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm flex"
                    >
                      {/* Product Image — flush, no padding */}
                      <div className="w-28 sm:w-36 shrink-0 bg-[#EBECEE] relative self-stretch overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {item.originalPrice && (
                          <span className="absolute top-2.5 left-2.5 bg-[#0D0E10] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md font-mono uppercase tracking-wider">
                            −{Math.round((1 - item.price / item.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-h-[140px]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-neutral-400 block font-mono mb-0.5">
                              {item.brand}
                            </span>
                            <h3 className="font-display text-xl sm:text-2xl text-[#0D0E10] uppercase tracking-wide leading-none">
                              {item.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-neutral-400 transition-all shrink-0 mt-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Option Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 my-2.5">
                          <span className="text-[10px] font-bold bg-[#F7F7F6] text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-200">
                            Размер: {item.size}
                          </span>
                          <span className="text-[10px] font-bold bg-[#F7F7F6] text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-200">
                            {item.color}
                          </span>
                          {item.inStock && (
                            <span className="text-[10px] font-extrabold text-emerald-600 ml-1">● В наличии</span>
                          )}
                        </div>

                        {/* Qty + Price */}
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                          <div className="flex items-center gap-1 bg-[#F7F7F6] p-1 rounded-xl border border-neutral-200">
                            <button
                              onClick={() => handleDecrease(item.id)}
                              className="w-8 h-8 rounded-lg bg-white hover:bg-[#0D0E10] hover:text-white flex items-center justify-center text-neutral-700 transition-all shadow-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-extrabold font-mono">{item.quantity}</span>
                            <button
                              onClick={() => handleIncrease(item.id)}
                              className="w-8 h-8 rounded-lg bg-white hover:bg-[#0D0E10] hover:text-white flex items-center justify-center text-neutral-700 transition-all shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            {item.originalPrice && (
                              <span className="text-[11px] text-neutral-400 line-through font-mono block leading-none mb-0.5">
                                {(item.originalPrice * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                            <span className="font-display text-2xl sm:text-3xl text-[#0D0E10] leading-none">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Promo Code — collapsible */}
                <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setPromoOpen(!promoOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#EBECEE] flex items-center justify-center">
                        <Tag className="w-3.5 h-3.5 text-neutral-600" />
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                        {promoStatus === 'success' ? '✓ Промокод применён · −10%' : 'Есть промокод?'}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: promoOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-400"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {promoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-3 border-t border-neutral-100 pt-3">
                          <form onSubmit={handleApplyPromo} className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => { setPromoCode(e.target.value); setPromoStatus('idle'); }}
                              placeholder="Введите промокод..."
                              className="flex-1 px-4 py-2.5 text-xs bg-[#F7F7F6] border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D0E10] font-mono font-bold uppercase placeholder:normal-case placeholder:font-normal placeholder:text-neutral-400"
                            />
                            <button
                              type="submit"
                              className="bg-[#0D0E10] hover:bg-neutral-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-colors uppercase tracking-wide"
                            >
                              Применить
                            </button>
                          </form>
                          {promoStatus !== 'idle' && (
                            <p className={`text-xs font-bold ${promoStatus === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                              {promoStatus === 'success'
                                ? '✓ Скидка 10% применена!'
                                : '✗ Неверный промокод. Попробуйте SOLVE2026'}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cross-Sell */}
                <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#EBECEE] flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-neutral-700" />
                    </span>
                    <h4 className="font-display text-xl uppercase tracking-wide text-[#0D0E10]">С ЭТИМ ЧАСТО БЕРУТ</h4>
                  </div>
                  <div className="space-y-2">
                    {crossSellItems.map((cs) => (
                      <div
                        key={cs.id}
                        className="flex items-center gap-3 p-3 bg-[#F7F7F6] rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#EBECEE] border border-neutral-200 shrink-0">
                          <img src={cs.image} alt={cs.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-sm text-[#0D0E10] uppercase truncate leading-tight">
                            {cs.name}
                          </h5>
                          <span className="font-mono text-xs font-bold text-neutral-900">{cs.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <button
                          onClick={() => handleAddCrossSell(cs)}
                          className="w-9 h-9 rounded-xl bg-[#0D0E10] text-white flex items-center justify-center hover:bg-neutral-700 transition-colors shrink-0"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: SUMMARY ─────────────────── */}
              <div className="sticky top-20 space-y-3">

                {/* Order Summary */}
                <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
                  {/* Header strip */}
                  <div className="bg-[#EBECEE] border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-[#0D0E10]">СУММА ЗАКАЗА</h3>
                    <span className="text-[10px] font-extrabold font-mono text-neutral-500 uppercase">{totalQty} поз.</span>
                  </div>

                  <div className="p-6 space-y-3 text-xs font-bold">
                    <div className="flex justify-between text-neutral-500">
                      <span>Стоимость товаров</span>
                      <span className="font-mono text-neutral-900">{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Промокод (−10%)</span>
                        <span className="font-mono">−{discountAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-500">
                      <span>Доставка</span>
                      <span className={`font-mono ${deliveryFree ? 'text-emerald-600' : 'text-neutral-900'}`}>
                        {deliveryFree ? 'БЕСПЛАТНО' : `${deliveryCost} ₽`}
                      </span>
                    </div>
                  </div>

                  <div className="mx-6 border-t border-neutral-100" />

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-neutral-500 tracking-wider">Итого</span>
                      <span className="font-display text-4xl sm:text-5xl text-[#0D0E10] leading-none">
                        {total.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#0D0E10] hover:bg-neutral-800 text-white font-extrabold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-[0.12em] transition-colors shadow-md"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>ОФОРМИТЬ ЗАКАЗ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>

                    <p className="text-center text-neutral-400 text-[10px] font-mono">
                      НДС включён • Картой, СБП или Рассрочка
                    </p>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5 space-y-3">
                  {[
                    { Icon: ShieldCheck, text: '100% Гарантия подлинности' },
                    { Icon: Truck, text: 'Курьер с примеркой перед оплатой' },
                    { Icon: RefreshCw, text: 'Возврат или обмен за 14 дней' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#EBECEE] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-neutral-600" />
                      </span>
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
