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
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

interface SavedAddress {
  id: string;
  title: string;
  type: 'cdek' | 'courier';
  address: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');
  const [userSession, setUserSession] = useState<{
    isLoggedIn: boolean;
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState('');
  const [newAddressTitle, setNewAddressTitle] = useState('');

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: '1',
      title: 'ПВЗ СДЭК (Основной)',
      type: 'cdek',
      address: 'г. Москва, ул. Тверская, д. 12 (ПВЗ #MSK42)',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Домашний (Курьер)',
      type: 'courier',
      address: 'г. Москва, ул. Арбат, д. 24, кв. 15',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('solve_user_session');
    if (saved) {
      setUserSession(JSON.parse(saved));
    } else {
      // Default demo user session if none exists
      const demoUser = {
        isLoggedIn: true,
        name: 'Александр В.',
        phone: '+7 (999) 123-45-67',
        email: 'alex.v@solve-studio.ru',
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

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    const newAddr: SavedAddress = {
      id: Date.now().toString(),
      title: newAddressTitle.trim() || 'Новый адрес',
      type: 'cdek',
      address: newAddressInput.trim(),
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
        {/* Profile Banner */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* User Info Header Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Avatar Initials */}
              <div className="w-16 h-16 rounded-full bg-black text-white font-mono text-xl font-black flex items-center justify-center shrink-0 shadow-md">
                {userSession.name.split(' ').map((n) => n[0]).join('') || 'SOL'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide leading-none text-[#0D0E10]">
                    {userSession.name}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-black font-extrabold font-mono text-[9px] uppercase tracking-wider rounded">
                    GOLD MEMBER
                  </span>
                </div>
                <p className="text-xs font-mono text-neutral-500">
                  {userSession.phone} • {userSession.email}
                </p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-xs font-bold text-red-600 hover:bg-red-50 border-neutral-200 rounded-xl px-4 py-2 flex items-center gap-1.5 font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти из аккаунта</span>
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-neutral-200/80 pb-3 overflow-x-auto no-scrollbar font-mono text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Мои заказы (2)</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 ${
                activeTab === 'addresses'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Сохранённые адреса ({addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Личные данные</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            
            {/* Tab 1: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                
                {/* Order Item 1 */}
                <div className="bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-2xs space-y-4 font-sans">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-extrabold text-black">ЗАКАЗ #SV-2026-104</span>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-mono font-extrabold rounded-md uppercase">
                        В ПУТИ (СДЭК #1489201)
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono">Дата: 3 августа 2026</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                      <img src="/images/cat-clothing.png" alt="Худи SOLVE" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-neutral-900 truncate">
                        Худи SOLVE Chaos Dark Oversized
                      </h4>
                      <p className="text-xs text-neutral-500 font-mono">Размер: L • 1 шт.</p>
                      <span className="font-mono text-sm font-black text-black block mt-0.5">4 990 ₽</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">Адрес доставки: СДЭК, г. Москва, ул. Тверская, 12</span>
                    <button className="text-black font-extrabold underline hover:text-neutral-600">
                      Отследить посылку →
                    </button>
                  </div>
                </div>

                {/* Order Item 2 */}
                <div className="bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-2xs space-y-4 font-sans opacity-90">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-extrabold text-black">ЗАКАЗ #SV-2025-982</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-extrabold rounded-md uppercase">
                        ДОСТАВЛЕН
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono">Дата: 15 июля 2026</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                      <img src="/images/cat-sneakers.png" alt="Nike Jordan" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-neutral-900 truncate">
                        Кроссовки Nike Air Jordan 1 Retro High
                      </h4>
                      <p className="text-xs text-neutral-500 font-mono">Размер: 42 • 1 шт.</p>
                      <span className="font-mono text-sm font-black text-black block mt-0.5">14 990 ₽</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase py-2.5 px-4 rounded-2xl flex items-center gap-1.5 font-mono"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить новый адрес</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white p-5 rounded-3xl border border-neutral-200/90 shadow-2xs space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                          {addr.title}
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[9px] font-mono font-extrabold rounded">
                            ОСНОВНОЙ
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-sans">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-2xs max-w-xl space-y-4 font-sans">
                <h3 className="font-display text-xl uppercase tracking-wide text-[#0D0E10]">
                  ЛИЧНЫЕ НАСТРОЙКИ
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">ФИО</label>
                    <input
                      type="text"
                      defaultValue={userSession.name}
                      className="w-full px-4 py-2.5 text-xs bg-[#F9F9F8] rounded-xl border border-neutral-200 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">Телефон</label>
                    <input
                      type="text"
                      defaultValue={userSession.phone}
                      className="w-full px-4 py-2.5 text-xs bg-[#F9F9F8] rounded-xl border border-neutral-200 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">Предпочтительный размер одежды</label>
                    <input
                      type="text"
                      defaultValue="Oversized L"
                      className="w-full px-4 py-2.5 text-xs bg-[#F9F9F8] rounded-xl border border-neutral-200 font-mono font-bold"
                    />
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-black text-white font-extrabold text-xs uppercase py-3 rounded-xl">
                      СОХРАНИТЬ ИЗМЕНЕНИЯ
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>

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
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
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

              <form onSubmit={handleAddAddress} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-neutral-400 font-mono">Название адреса</label>
                  <input
                    type="text"
                    placeholder="Например: Работа / ПВЗ СДЭК"
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

                <Button type="submit" className="w-full bg-black text-white font-extrabold text-xs uppercase py-3 rounded-xl">
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
