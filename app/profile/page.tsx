'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  PackageCheck,
  Truck,
  ChevronRight,
  Plus,
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Copy,
  Check,
  Sparkles,
  CreditCard,
  Heart,
  HelpCircle,
  FileText,
  Clock,
  Ruler,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

interface SavedAddress {
  id: string;
  title: string;
  type: 'pickup' | 'courier';
  address: string;
  details?: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'vip' | 'addresses' | 'sizes' | 'settings'>('orders');
  const [userSession, setUserSession] = useState<{
    isLoggedIn: boolean;
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [activeOrderTracking, setActiveOrderTracking] = useState<string | null>(null);

  const [newAddressInput, setNewAddressInput] = useState('');
  const [newAddressTitle, setNewAddressTitle] = useState('');

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: '1',
      title: 'Шоурум SOLVE (Самовывоз)',
      type: 'pickup',
      address: 'г. Москва, ул. Тверская, д. 12, стр. 1',
      details: 'Флагманский магазин SOLVE • Режим: 10:00 - 22:00 ежедневно',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Домашний адрес (Курьер)',
      type: 'courier',
      address: 'г. Москва, ул. Новый Арбат, д. 24, кв. 15',
      details: 'Домофон 15K • Подъезд 2, этаж 4',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('solve_user_session');
    if (saved) {
      setUserSession(JSON.parse(saved));
    } else {
      const demoUser = {
        isLoggedIn: true,
        name: 'Александр Варламов',
        phone: '+7 (999) 123-45-67',
        email: 'alex.varlamov@solve-studio.ru',
      };
      setUserSession(demoUser);
      localStorage.setItem('solve_user_session', JSON.stringify(demoUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('solve_user_session');
    setUserSession(null);
    router.push('/login');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('SOLVE-ALEX-2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    const newAddr: SavedAddress = {
      id: Date.now().toString(),
      title: newAddressTitle.trim() || 'Новый адрес',
      type: 'courier',
      address: newAddressInput.trim(),
      details: 'Добавлено вручную',
      isDefault: false,
    };
    setAddresses([...addresses, newAddr]);
    setNewAddressInput('');
    setNewAddressTitle('');
    setIsAddAddressOpen(false);
  };

  if (!userSession) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 pb-28">
        
        {/* Top Hero Section */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          
          {/* Main User Profile Header Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
              {/* User Avatar & Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black text-white font-mono text-xl sm:text-2xl font-black flex items-center justify-center shrink-0 shadow-md">
                    {userSession.name.split(' ').map((n) => n[0]).join('') || 'SLV'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-2xl sm:text-4xl uppercase tracking-wide leading-none text-[#0D0E10]">
                      {userSession.name}
                    </h1>
                    <span className="px-2.5 py-0.5 bg-black text-white font-extrabold font-mono text-[9px] uppercase tracking-widest rounded-md shadow-2xs">
                      BLACK TIER VIP
                    </span>
                  </div>

                  <p className="text-xs font-mono text-neutral-500">
                    {userSession.phone} • {userSession.email}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-mono font-bold text-neutral-400">
                    <span>ID: SLV-2026-8809</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-extrabold">Аккаунт верифицирован</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setActiveTab('vip')}
                  className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-2xl flex items-center gap-2 font-mono shadow-md"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Карта VIP • 1 450 ₽ бонусов</span>
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-xs font-bold text-red-600 hover:bg-red-50 border-neutral-200 rounded-2xl px-4 py-2.5 flex items-center gap-1.5 font-mono"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Выйти</span>
                </Button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-0.5">
                <span className="text-[10px] font-extrabold text-neutral-400 uppercase">ВСЕГО ЗАКАЗОВ</span>
                <span className="text-xl font-black text-black block">12 покупок</span>
              </div>
              <div className="p-3.5 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-0.5">
                <span className="text-[10px] font-extrabold text-neutral-400 uppercase">БОНУСНЫЙ БАЛАНС</span>
                <span className="text-xl font-black text-emerald-600 block">1 450 ₽</span>
              </div>
              <div className="p-3.5 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-0.5">
                <span className="text-[10px] font-extrabold text-neutral-400 uppercase">ЛИЧНАЯ СКИДКА</span>
                <span className="text-xl font-black text-black block">10% VIP</span>
              </div>
              <div className="p-3.5 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-0.5">
                <span className="text-[10px] font-extrabold text-neutral-400 uppercase">РАЗМЕР ОДЕЖДЫ</span>
                <span className="text-xl font-black text-black block">Oversized L</span>
              </div>
            </div>

          </div>

          {/* Luxury Tab Navigation Bar */}
          <div className="flex items-center gap-2 mt-6 border-b border-neutral-200/80 pb-3 overflow-x-auto no-scrollbar font-mono text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'orders'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>МОИ ЗАКАЗЫ (2)</span>
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'vip'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>КАРТА УЧАСТНИКА VIP</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'addresses'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>АДРЕСА ДОСТАВКИ ({addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sizes')}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'sizes'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>ПАСПОРТ РАЗМЕРОВ</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>НАСТРОЙКИ</span>
            </button>
          </div>

          {/* TAB 1: RICH ORDERS HISTORY WITH TIMELINE */}
          {activeTab === 'orders' && (
            <div className="mt-6 space-y-6">
              
              {/* Order Card 1: Active In-Transit Order */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-5">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-black">ЗАКАЗ #SV-2026-104</span>
                      <span className="px-2.5 py-0.5 bg-[#0D0E10] text-white text-[10px] font-mono font-extrabold rounded-md uppercase tracking-wider">
                        КУРЬЕР В ПУТИ • ДОСТАВКА СЕГОДНЯ
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono">Оформлен: 3 августа 2026 • Оплачен СБП</span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs text-neutral-400 block">Итого к оплате</span>
                    <span className="text-xl font-black text-black">4 990 ₽</span>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="py-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono block mb-3">
                    ЭТАП ДОСТАВКИ ПО ГОРОДУ
                  </span>
                  
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="space-y-1 text-center">
                      <div className="h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono font-bold text-neutral-900 block">Принят</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono font-bold text-neutral-900 block">Собран в магазине</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-2 rounded-full bg-black animate-pulse" />
                      <span className="text-[10px] font-mono font-black text-black block">Курьер в пути</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-2 rounded-full bg-neutral-200" />
                      <span className="text-[10px] font-mono font-bold text-neutral-400 block">Доставлен</span>
                    </div>
                  </div>
                </div>

                {/* Purchased Items List */}
                <div className="flex items-center gap-4 bg-[#F9F9F8] p-4 rounded-2xl border border-neutral-200/80">
                  <div className="w-16 h-20 rounded-xl bg-white border border-neutral-200 overflow-hidden shrink-0">
                    <img src="/images/cat-clothing.png" alt="Худи SOLVE" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 font-sans">
                    <h4 className="font-extrabold text-sm sm:text-base text-neutral-900 truncate">
                      Худи SOLVE Chaos Dark Oversized
                    </h4>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      Артикул: SV-2026-CH • В наличии в шоуруме • Размер: Oversized L
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono font-bold rounded">
                        100% COTTON 460G
                      </span>
                      <span className="text-xs font-black font-mono text-black">4 990 ₽</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-600">
                    <MapPin className="w-4 h-4 text-black shrink-0" />
                    <span>Доставка курьером: г. Москва, ул. Арбат, 24</span>
                  </div>
                </div>

              </div>

              {/* Order Card 2: Completed Order */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-5 opacity-95">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-black">ЗАКАЗ #SV-2025-982</span>
                      <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-mono font-extrabold rounded-md uppercase tracking-wider">
                        ДОСТАВЛЕН И ВРУЧЕН ✓
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono">Выполнен: 15 июля 2026</span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs text-neutral-400 block">Итого</span>
                    <span className="text-xl font-black text-black">14 990 ₽</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F9F9F8] p-4 rounded-2xl border border-neutral-200/80">
                  <div className="w-16 h-20 rounded-xl bg-white border border-neutral-200 overflow-hidden shrink-0">
                    <img src="/images/cat-sneakers.png" alt="Nike Jordan" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 font-sans">
                    <h4 className="font-extrabold text-sm sm:text-base text-neutral-900 truncate">
                      Кроссовки Nike Air Jordan 1 Retro High
                    </h4>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      Размер: 42 EU • Аутентифицировано SOLVE LegitCheck
                    </p>
                    <span className="text-xs font-black font-mono text-black block mt-1">14 990 ₽</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Сертификат подлинности #LC-9901 подтверждён</span>
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-300 text-black font-mono text-xs font-extrabold rounded-xl"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    <span>Повторить заказ</span>
                  </Button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: VIP DIGITAL MEMBERSHIP CARD */}
          {activeTab === 'vip' && (
            <div className="mt-6 space-y-6">
              
              {/* Metallic Glassmorphic VIP Pass */}
              <div className="relative w-full max-w-xl mx-auto bg-[#0D0E10] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-800 space-y-8 overflow-hidden font-mono">
                
                {/* Background Foil Lighting Accent */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="font-display text-2xl tracking-[0.2em] uppercase">SOLVE VIP</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                    BLACK TIER PASS
                  </span>
                </div>

                {/* Card Center: Chip & QR */}
                <div className="flex items-center justify-between relative z-10 py-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Имя участника</span>
                    <span className="text-lg sm:text-xl font-black uppercase tracking-wider text-white font-sans">
                      {userSession.name}
                    </span>
                  </div>

                  <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 p-2 flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-amber-400" />
                  </div>
                </div>

                {/* Card Footer Balance & ID */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10 text-xs">
                  <div>
                    <span className="text-[9px] text-neutral-400 block uppercase">Бонусный баланс</span>
                    <span className="text-lg font-black text-amber-400">1 450 ₽</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-neutral-400 block uppercase">ID Карты</span>
                    <span className="font-extrabold tracking-widest text-neutral-200">SLV-8809-2026</span>
                  </div>
                </div>

              </div>

              {/* Referral Code Share Box */}
              <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-3 font-sans">
                <h4 className="font-display text-xl uppercase tracking-wide text-[#0D0E10]">
                  ПРИГЛАШАЙ ДРУЗЕЙ И ПОЛУЧАЙ 500 ₽
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Поделись своим промокодом с друзьями. Они получат скидку 500 ₽ на первый заказ, а ты — 500 бонусов на карту!
                </p>

                <div className="flex items-center gap-2 pt-1 font-mono">
                  <div className="flex-1 bg-[#F9F9F8] px-4 py-3 rounded-2xl border border-neutral-200 font-extrabold text-sm text-black flex items-center justify-between">
                    <span>SOLVE-ALEX-2026</span>
                    <span className="text-[10px] text-neutral-400">Скидка 500 ₽</span>
                  </div>

                  <Button
                    onClick={handleCopyReferral}
                    className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase px-5 py-3.5 rounded-2xl font-mono flex items-center gap-1.5 shrink-0"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'СКОПИРОВАНО!' : 'КОПИРОВАТЬ'}</span>
                  </Button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES & CDEK PVZ */}
          {activeTab === 'addresses' && (
            <div className="mt-6 space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl uppercase tracking-wide text-[#0D0E10]">
                  СОХРАНЁННЫЕ АДРЕСА ДОСТАВКИ
                </h3>
                <Button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase py-2.5 px-4 rounded-2xl flex items-center gap-1.5 font-mono shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить адрес</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-2xs space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono">
                        <MapPin className="w-4 h-4 text-black" />
                        <span className="text-xs font-black uppercase text-black">{addr.title}</span>
                      </div>
                      {addr.isDefault && (
                        <span className="px-2.5 py-0.5 bg-black text-white text-[9px] font-mono font-extrabold rounded uppercase">
                          ОСНОВНОЙ
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs font-bold text-neutral-900 leading-snug">{addr.address}</p>
                    {addr.details && <p className="text-[11px] text-neutral-400 font-mono">{addr.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PASSPORT OF SIZES & PREFERENCES */}
          {activeTab === 'sizes' && (
            <div className="mt-6 max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6 font-sans">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="font-display text-2xl uppercase tracking-wide text-[#0D0E10]">
                  ПАСПОРТ РАЗМЕРОВ И ПРЕДПОЧТЕНИЙ
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Сохраните свои параметры, чтобы мы автоматически подбирали идеальный крой вещи.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-4 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-1">
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase block">ВЕРХ (ХУДИ / ФУТБОЛКИ)</span>
                  <span className="text-lg font-black text-black block">Oversized L (50)</span>
                </div>

                <div className="p-4 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-1">
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase block">НИЗ (ШТАНЫ / ДЖИНСЫ)</span>
                  <span className="text-lg font-black text-black block">32 / M (48)</span>
                </div>

                <div className="p-4 bg-[#F9F9F8] rounded-2xl border border-neutral-200/80 space-y-1">
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase block">ОБУВЬ (КРОССОВКИ)</span>
                  <span className="text-lg font-black text-black block">42 EU (27 см)</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 font-mono block">
                  ЛЮБИМЫЕ БРЕНДЫ
                </span>
                <div className="flex flex-wrap gap-2">
                  {['SOLVE', 'NIKE', 'STUSSY', 'NEW BALANCE', 'SUPREME', 'OFF-WHITE'].map((brand) => (
                    <span key={brand} className="px-3 py-1 bg-black text-white text-xs font-bold font-mono rounded-xl">
                      ✓ {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="mt-6 max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5 font-sans">
              <h3 className="font-display text-2xl uppercase tracking-wide text-[#0D0E10]">
                НАСТРОЙКИ ПРОФИЛЯ
              </h3>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">ФИО</label>
                  <input
                    type="text"
                    defaultValue={userSession.name}
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">Номер телефона</label>
                  <input
                    type="text"
                    defaultValue={userSession.phone}
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono block">E-mail</label>
                  <input
                    type="email"
                    defaultValue={userSession.email}
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 font-mono font-bold"
                  />
                </div>

                <Button className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl font-mono shadow-md">
                  СОХРАНИТЬ ИЗМЕНЕНИЯ
                </Button>
              </div>
            </div>
          )}

        </div>
      </main>



      {/* Add Address Modal */}
      <AnimatePresence>
        {isAddAddressOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddAddressOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#F9F9F8] rounded-3xl p-6 border border-neutral-200 shadow-2xl space-y-4 font-sans"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-display text-2xl uppercase tracking-wider text-[#0D0E10]">
                  НОВЫЙ АДРЕС
                </h3>
                <button
                  onClick={() => setIsAddAddressOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-3 font-sans">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">Название адреса</label>
                  <input
                    type="text"
                    placeholder="Например: Работа / Дом"
                    value={newAddressTitle}
                    onChange={(e) => setNewAddressTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white rounded-xl border border-neutral-200 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">Полный адрес</label>
                  <input
                    type="text"
                    required
                    placeholder="г. Москва, ул. Ленина, д. 10..."
                    value={newAddressInput}
                    onChange={(e) => setNewAddressInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white rounded-xl border border-neutral-200 font-bold"
                  />
                </div>

                <Button type="submit" className="w-full bg-black text-white font-extrabold text-xs uppercase py-3 rounded-xl font-mono">
                  СОХРАНИТЬ АДРЕС
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </div>
  );
}
