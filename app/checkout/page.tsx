'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Zap,
  ArrowLeft,
  Store,
  QrCode,
  Check,
  ShoppingBag,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const router = useRouter();

  // Form states
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'split' | 'cash'>('sbp');
  
  const [recipientName, setRecipientName] = useState('Александр Варламов');
  const [recipientPhone, setRecipientPhone] = useState('+7 (999) 123-45-67');
  const [recipientEmail, setRecipientEmail] = useState('alex.varlamov@solve-studio.ru');
  const [deliveryAddress, setDeliveryAddress] = useState('г. Москва, ул. Новый Арбат, д. 24, кв. 15');
  const [deliveryComment, setDeliveryComment] = useState('Позвонить за 30 минут до приезда курьера');

  const [useBonuses, setUseBonuses] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user details if logged in
  useEffect(() => {
    const saved = localStorage.getItem('solve_user_session');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.name) setRecipientName(user.name);
      if (user.phone) setRecipientPhone(user.phone);
      if (user.email) setRecipientEmail(user.email);
    }
  }, []);

  // Price calculations
  const itemsPrice = 19980; // 2 items
  const shippingPrice = deliveryMethod === 'courier' ? 0 : 0; // Free local delivery
  const bonusDiscount = useBonuses ? 1450 : 0;
  const sbpDiscount = paymentMethod === 'sbp' ? Math.round((itemsPrice - bonusDiscount) * 0.03) : 0;
  const totalPrice = Math.max(0, itemsPrice - bonusDiscount - sbpDiscount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        {/* Header Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400">
              <Link href="/cart" className="hover:text-black transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Корзина</span>
              </Link>
              <span>/</span>
              <span className="text-black uppercase">Оформление заказа</span>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Безопасное SSL-соединение SOLVE Guard</span>
            </span>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Left Column: Form Controls (Col 7) */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact Details */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-4 font-sans">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-black flex items-center justify-center">
                  1
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#0D0E10]">
                  КОНТАКТНЫЕ ДАННЫЕ ПОЛУЧАТЕЛЯ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">ФИО Получателя</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Александр Варламов"
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-bold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">Телефон для связи</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">Электронная почта (для чека)</label>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Local Delivery Method Selector */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-4 font-sans">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-black flex items-center justify-center">
                  2
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#0D0E10]">
                  СПОСОБ ПОЛУЧЕНИЯ В ГОРОДЕ
                </h3>
              </div>

              {/* Delivery Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option 1: Courier */}
                <div
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative ${
                    deliveryMethod === 'courier'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 ${deliveryMethod === 'courier' ? 'text-amber-400' : 'text-black'}`} />
                      <span className="font-mono text-xs font-black uppercase">КУРЬЕР ДО ДВЕРИ</span>
                    </div>
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      deliveryMethod === 'courier' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      БЕСПЛАТНО
                    </span>
                  </div>
                  <p className={`text-xs ${deliveryMethod === 'courier' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Доставка до двери курьером в течение дня с примеркой 15 минут.
                  </p>
                </div>

                {/* Option 2: Showroom Pickup */}
                <div
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative ${
                    deliveryMethod === 'pickup'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className={`w-4 h-4 ${deliveryMethod === 'pickup' ? 'text-amber-400' : 'text-black'}`} />
                      <span className="font-mono text-xs font-black uppercase">САМОВЫВОЗ ИЗ ШОУРУМА</span>
                    </div>
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      deliveryMethod === 'pickup' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      СЕГОДНЯ
                    </span>
                  </div>
                  <p className={`text-xs ${deliveryMethod === 'pickup' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    г. Москва, ул. Тверская, 12 (Флагманский магазин SOLVE, 10:00 - 22:00).
                  </p>
                </div>

              </div>

              {/* Courier Address Inputs (If Courier Selected) */}
              {deliveryMethod === 'courier' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">Адрес курьерской доставки</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Улица, дом, корпус, квартира/офис..."
                      className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-bold focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">Комментарий для курьера</label>
                    <input
                      type="text"
                      value={deliveryComment}
                      onChange={(e) => setDeliveryComment(e.target.value)}
                      placeholder="Подъезд, код домофона, время приезда..."
                      className="w-full px-4 py-2.5 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Step 3: Payment Methods Selector */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-4 font-sans">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-black flex items-center justify-center">
                  3
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#0D0E10]">
                  СПОСОБ ОПЛАТЫ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Method 1: SBP */}
                <div
                  onClick={() => setPaymentMethod('sbp')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    paymentMethod === 'sbp'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>СБП (СКИДКА -3%)</span>
                    </span>
                    <span className="text-[9px] font-extrabold font-mono px-2 py-0.5 rounded bg-emerald-500 text-white">
                      ВЫГОДНО
                    </span>
                  </div>
                  <p className={`text-xs ${paymentMethod === 'sbp' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Мгновенная оплата по QR-коду любого банка. Дополнительная скидка 3%.
                  </p>
                </div>

                {/* Method 2: Bank Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      <span>БАНКОВСКАЯ КАРТА</span>
                    </span>
                    <span className="text-[9px] font-extrabold font-mono text-neutral-400">
                      МИР / VISA
                    </span>
                  </div>
                  <p className={`text-xs ${paymentMethod === 'card' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Оплата картой любого российского банка без комиссии.
                  </p>
                </div>

                {/* Method 3: Split / Dolyami */}
                <div
                  onClick={() => setPaymentMethod('split')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    paymentMethod === 'split'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>ДОЛЯМИ (4 ЧАСТИ)</span>
                    </span>
                    <span className="text-[9px] font-extrabold font-mono px-2 py-0.5 rounded bg-purple-600 text-white">
                      0% ПЕРЕПЛАТ
                    </span>
                  </div>
                  <p className={`text-xs ${paymentMethod === 'split' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    4 платежа по {Math.round(totalPrice / 4).toLocaleString('ru-RU')} ₽ каждые 2 недели.
                  </p>
                </div>

                {/* Method 4: Cash / Card on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    paymentMethod === 'cash'
                      ? 'bg-[#0D0E10] text-white border-black shadow-md'
                      : 'bg-[#F9F9F8] text-[#0D0E10] border-neutral-200/80 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>ПРИ ПОЛУЧЕНИИ</span>
                    </span>
                    <span className="text-[9px] font-extrabold font-mono text-neutral-400">
                      ПРИМЕРКА
                    </span>
                  </div>
                  <p className={`text-xs ${paymentMethod === 'cash' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Оплата наличными или картой курьеру после примерки.
                  </p>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-mono transition-all active:scale-[0.99]"
            >
              <span>{isSubmitting ? 'ОФОРМЛЕНИЕ...' : `ПОДТВЕРДИТЬ И ОПЛАТИТЬ • ${totalPrice.toLocaleString('ru-RU')} ₽`}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>

          </form>

          {/* Right Column: Order Summary Card (Col 5) */}
          <div className="lg:col-span-5 space-y-4 sticky top-20 font-sans">
            
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
              <h3 className="font-display text-xl uppercase tracking-wide text-[#0D0E10] border-b border-neutral-100 pb-3">
                ВАШ ЗАКАЗ (2 ТОВАРА)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                
                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                    <img src="/images/cat-clothing.png" alt="Худи SOLVE" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-neutral-900 truncate">
                      Худи SOLVE Chaos Dark Oversized
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono">Размер: L • 1 шт.</p>
                    <span className="font-mono text-xs font-black text-black">4 990 ₽</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                    <img src="/images/cat-sneakers.png" alt="Nike Jordan" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-neutral-900 truncate">
                      Кроссовки Nike Air Jordan 1 Retro
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono">Размер: 42 • 1 шт.</p>
                    <span className="font-mono text-xs font-black text-black">14 990 ₽</span>
                  </div>
                </div>

              </div>

              {/* Bonus Points Deduction Checkbox */}
              <div className="p-3 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-2">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useBonuses}
                      onChange={(e) => setUseBonuses(e.target.checked)}
                      className="w-4 h-4 accent-black rounded cursor-pointer"
                    />
                    <span className="text-xs font-bold text-neutral-900">Списать SOLVE Бонусы</span>
                  </div>
                  <span className="font-mono text-xs font-black text-emerald-600">- 1 450 ₽</span>
                </label>
                <span className="text-[10px] text-neutral-400 font-mono block pl-6">
                  Доступно 1 450 баллов на карте VIP
                </span>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Стоимость товаров</span>
                  <span className="font-bold text-black">{itemsPrice.toLocaleString('ru-RU')} ₽</span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Доставка по городу</span>
                  <span className="font-bold text-emerald-600">БЕСПЛАТНО</span>
                </div>

                {useBonuses && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Скидка по бонусам</span>
                    <span>- 1 450 ₽</span>
                  </div>
                )}

                {paymentMethod === 'sbp' && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Скидка за СБП (-3%)</span>
                    <span>- {sbpDiscount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200 text-sm">
                  <span className="font-extrabold uppercase font-sans">Итого к оплате</span>
                  <span className="text-2xl font-black text-black font-mono">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

            </div>

            {/* Value Guarantees */}
            <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 text-[11px] font-mono text-neutral-500 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                <span>100% Гарантия подлинности всех товаров</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-black shrink-0" />
                <span>Примерка перед оплатой при доставке курьером</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Success Order Modal Screen */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xl text-center space-y-6 font-sans"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 font-mono block">
                  СПАСИБО ЗА ЗАКАЗ!
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-[#0D0E10] uppercase tracking-wide">
                  ЗАКАЗ #SV-2026-9041
                </h2>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Заказ успешно оформлен и отправлен на сборку в наш городской магазин. Курьер свяжется с вами по номеру <strong className="text-black">{recipientPhone}</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#F9F9F8] rounded-2xl border border-neutral-200 text-xs font-mono space-y-1 text-left">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Способ получения:</span>
                  <span className="font-bold text-black">
                    {deliveryMethod === 'courier' ? 'Курьер до двери (Сегодня)' : 'Самовывоз из шоурума'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Способ оплаты:</span>
                  <span className="font-bold text-black uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-neutral-200">
                  <span className="text-neutral-500">Оплачено:</span>
                  <span className="font-black text-black">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/profile" className="flex-1">
                  <Button className="w-full bg-black text-white font-extrabold text-xs uppercase py-3.5 rounded-xl font-mono">
                    В ЛИЧНЫЙ КАБИНЕТ
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-neutral-300 text-neutral-900 font-extrabold text-xs uppercase py-3.5 rounded-xl font-mono">
                    НА ГЛАВНУЮ
                  </Button>
                </Link>
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
