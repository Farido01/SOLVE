'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#F7F7F6]/90 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-between px-4">
        {/* Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Открыть меню"
          className="text-neutral-900 hover:bg-neutral-200/60 min-h-[44px] min-w-[44px]"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Brand Logo */}
        <Link href="/" className="font-display text-2xl tracking-[0.2em] text-[#0D0E10] uppercase hover:opacity-80 transition-opacity">
          SOLVE
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Поиск"
            className="text-neutral-900 hover:bg-neutral-200/60 min-h-[44px] min-w-[44px]"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Корзина"
            className="relative text-neutral-900 hover:bg-neutral-200/60 min-h-[44px] min-w-[44px]"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans">
              2
            </span>
          </Button>
        </div>
      </header>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#F7F7F6] border-b border-neutral-200 p-3 shadow-md"
          >
            <div className="relative max-w-md mx-auto flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Поиск одежды, кроссовок, брелоков..."
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-sans"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-neutral-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer / Sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            />

            {/* Side Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-xs bg-[#F7F7F6] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-display text-3xl tracking-widest text-black">
                    SOLVE
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Закрыть меню"
                    className="min-h-[44px] min-w-[44px]"
                  >
                    <X className="w-6 h-6 text-neutral-800" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-3 text-sm font-semibold text-neutral-900 font-sans">
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    ВЕСЬ КАТАЛОГ
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    Одежда
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    Кроссовки
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    Брелоки
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    Аксессуары
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-neutral-200 hover:text-neutral-500 transition-colors">
                    Сумки
                  </Link>
                  <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="py-2.5 text-neutral-900 font-bold flex items-center justify-between">
                    <span>РАСПРОДАЖА</span>
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] rounded font-mono">-40%</span>
                  </Link>
                </nav>
              </div>

              <div className="text-[11px] text-neutral-400 font-medium font-sans">
                © 2026 SOLVE STORE. Все права защищены.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
