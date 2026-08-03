'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw, Tag, ChevronRight, ShoppingBag, PlusCircle, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

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
    name: 'Звёздный Брелок SOLVE Star Silver Chain',
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
    name: 'Сумка Crossbody SOLVE Tech Modular',
    brand: 'Solve',
    price: 3490,
    image: '/images/cat-bags.png',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Quantity Handlers
  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Promo Code Handler
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'SOLVE2026' || cleanCode === 'SOLVE') {
      setAppliedDiscount(0.10); // 10% off
      setPromoMessage({ text: 'Промокод применён! Скидка 10%', type: 'success' });
    } else {
      setPromoMessage({ text: 'Неверный промокод (Попробуйте SOLVE2026)', type: 'error' });
    }
  };

  // Add Cross-Sell Item to Cart
  const handleAddCrossSell = (item: CrossSellItem) => {
    const existing = cartItems.find((ci) => ci.name === item.name);
    if (existing) {
      handleIncreaseQuantity(existing.id);
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        name: item.name,
        brand: item.brand,
        price: item.price,
        size: 'ONE SIZE',
        color: 'Стандартный',
        quantity: 1,
        image: item.image,
        inStock: true,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const deliveryCost = subtotal >= 5000 || subtotal === 0 ? 0 : 490;
  const totalPrice = Math.max(0, subtotal - discountAmount + deliveryCost);

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
              <span className="text-black font-extrabold">Корзина</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0D0E10] uppercase tracking-[0.05em] leading-[0.9]">
                  КОРЗИНА SOLVE
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-600 font-mono bg-[#F7F7F6] px-4 py-2 rounded-full border border-neutral-200 shadow-2xs">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} ТОВАРОВ В КОРЗИНЕ
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cart Main Content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
          {cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="bg-white rounded-3xl p-12 md:p-16 text-center space-y-6 border border-neutral-200/80 shadow-2xs max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-[#F7F7F6] flex items-center justify-center mx-auto text-neutral-400 border border-neutral-200">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl text-neutral-900 uppercase tracking-wider">ВАША КОРЗИНА ПУСТА</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Похоже, вы ещё не добавили товары. Перейдите в каталог, чтобы выбрать новинки и лимитированные дропы!
                </p>
              </div>
              <Link href="/catalog" className="inline-block">
                <Button className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-md uppercase tracking-wider">
                  ПЕРЕЙТИ В КАТАЛОГ →
                </Button>
              </Link>
            </div>
          ) : (
            /* Active Cart Items & Checkout Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-[#F7F7F6] border border-neutral-200/80 shrink-0 self-center sm:self-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block font-mono">
                              {item.brand}
                            </span>
                            <h3 className="font-display text-lg sm:text-2xl text-[#0D0E10] tracking-wider uppercase leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg transition-colors"
                            aria-label="Удалить из корзины"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Options Pills */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-0.5 bg-[#F7F7F6] text-neutral-800 font-bold rounded-lg border border-neutral-200 text-[11px]">
                            Размер: {item.size}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#F7F7F6] text-neutral-800 font-bold rounded-lg border border-neutral-200 text-[11px]">
                            Цвет: {item.color}
                          </span>
                          {item.inStock && (
                            <span className="text-[10px] font-extrabold text-emerald-600 font-mono uppercase">
                              • В наличии
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                          {/* Quantity Counter */}
                          <div className="flex items-center gap-2 bg-[#F7F7F6] p-1 rounded-xl border border-neutral-200">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-neutral-800 hover:bg-black hover:text-white transition-colors shadow-2xs font-bold"
                              aria-label="Уменьшить"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-extrabold font-mono text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-neutral-800 hover:bg-black hover:text-white transition-colors shadow-2xs font-bold"
                              aria-label="Увеличить"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <div className="text-right">
                            {item.originalPrice && (
                              <span className="text-xs text-neutral-400 line-through font-mono block">
                                {(item.originalPrice * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                            <span className="font-display text-xl sm:text-2xl text-[#0D0E10] font-mono leading-none">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="bg-white p-5 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-black" />
                    <span className="text-xs font-extrabold uppercase text-neutral-900">ПРОМОКОД ИЛИ СКИДКА</span>
                  </div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод (например SOLVE2026)..."
                      className="flex-1 px-4 py-2.5 text-xs bg-[#F7F7F6] rounded-xl focus:outline-none focus:ring-2 focus:ring-black uppercase font-mono font-bold"
                    />
                    <Button type="submit" variant="outline" className="text-xs font-bold rounded-xl px-5 border-neutral-300">
                      Применить
                    </Button>
                  </form>
                  {promoMessage && (
                    <p className={`text-xs font-bold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Cross-Sell Recommendations */}
                <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xl text-[#0D0E10] uppercase tracking-wider">С ЭТИМ ЧАСТО ПОКУПАЮТ</h4>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">АКСЕССУАРЫ</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {crossSellItems.map((cs) => (
                      <div
                        key={cs.id}
                        className="bg-[#F7F7F6] p-3 rounded-2xl border border-neutral-200/70 flex items-center gap-3 group hover:border-neutral-400 transition-colors"
                      >
                        <div className="w-14 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-neutral-200/80">
                          <img src={cs.image} alt={cs.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <h5 className="font-display text-sm text-neutral-900 truncate uppercase leading-tight">
                            {cs.name}
                          </h5>
                          <span className="font-mono text-xs font-bold text-black block">{cs.price} ₽</span>
                          <button
                            onClick={() => handleAddCrossSell(cs)}
                            className="flex items-center gap-1 text-[10px] font-extrabold text-neutral-800 hover:text-black uppercase transition-colors"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Добавить</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Summary & Checkout */}
              <div className="lg:col-span-4 space-y-4 sticky top-20">
                <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-6">
                  <div className="pb-4 border-b border-neutral-100">
                    <h3 className="font-display text-2xl text-[#0D0E10] uppercase tracking-wider">СУММА ЗАКАЗА</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Товары ({cartItems.reduce((a, b) => a + b.quantity, 0)} шт)</span>
                      <span className="font-mono font-bold text-neutral-900">{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Скидка по промокоду (-10%)</span>
                        <span className="font-mono">-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-600">
                      <span>Доставка по РФ</span>
                      <span className="font-mono font-bold text-emerald-600">
                        {deliveryCost === 0 ? 'БЕСПЛАТНО' : `${deliveryCost} ₽`}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-extrabold uppercase text-neutral-900">Итого к оплате:</span>
                      <span className="font-display text-3xl sm:text-4xl text-[#0D0E10] font-mono leading-none">
                        {totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400">НДС включен • Оплата картой или СБП</p>
                  </div>

                  <Button className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider">
                    <span>ОФОРМИТЬ ЗАКАЗ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Service Guarantees Card */}
                <div className="bg-white p-5 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                    <span>100% Гарантия аутентичности и подлинности</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
                    <Truck className="w-4 h-4 text-black shrink-0" />
                    <span>Быстрая курьерская доставка с примеркой</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
                    <RefreshCw className="w-4 h-4 text-black shrink-0" />
                    <span>Легкий возврат или обмен в течение 14 дней</span>
                  </div>
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
