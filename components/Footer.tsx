'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800/80 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1 text-left uppercase tracking-wider text-white font-mono font-extrabold text-xs"
      >
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0D0E10] text-white pt-12 pb-24 border-t border-neutral-800 font-sans">
      <div className="px-4 max-w-5xl mx-auto space-y-10">
        {/* Newsletter Subscription Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-md">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block font-sans">
              ЗАКРЫТЫЙ КЛУБ SOLVE
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-white">
              СКИДКА -10% НА ПЕРВЫЙ ЗАКАЗ
            </h3>
            <p className="text-xs text-neutral-400 font-normal">
              Подпишитесь на рассылку и получайте уведомления о лимитированных дропах раньше всех.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white rounded-xl text-xs font-bold border border-neutral-700">
                <Check className="w-4 h-4 text-white" />
                <span>Вы успешно подписаны! Скидка в e-mail.</span>
              </div>
            ) : (
              <div className="relative w-full sm:w-72 flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш e-mail"
                  required
                  className="w-full pl-4 pr-12 py-3 text-xs bg-neutral-950 text-white placeholder-neutral-500 rounded-xl border border-neutral-800 focus:outline-none focus:border-white font-sans"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 w-8 h-8 bg-white text-black hover:bg-neutral-200 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns (Grid for Desktop, Accordion for Mobile) */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 border-b border-neutral-800/80 pb-8 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <span className="font-display text-3xl tracking-widest text-white block">SOLVE</span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Интернет-магазин оригинальной уличной одежды, кроссовок, брелоков и аксессуаров.
            </p>
          </div>

          {/* Col 2: Catalog */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-white font-mono">КАТАЛОГ</h4>
            <ul className="space-y-2 text-neutral-400 font-medium">
              <li><a href="/catalog?category=clothing" className="hover:text-white transition-colors">Одежда</a></li>
              <li><a href="/catalog?category=sneakers" className="hover:text-white transition-colors">Кроссовки</a></li>
              <li><a href="/catalog?category=keychains" className="hover:text-white transition-colors">Брелоки</a></li>
              <li><a href="/catalog?category=accessories" className="hover:text-white transition-colors">Аксессуары</a></li>
              <li><a href="/catalog?category=bags" className="hover:text-white transition-colors">Сумки</a></li>
            </ul>
          </div>

          {/* Col 3: Information */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-white font-mono">ПОКУПАТЕЛЯМ</h4>
            <ul className="space-y-2 text-neutral-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Гарантия подлинности</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Обмен и возврат</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Таблица размеров</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </div>

          {/* Col 4: Social & Payment */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="font-extrabold uppercase tracking-wider text-white font-mono">МЫ В СОЦСЕТЯХ</h4>
            <div className="flex gap-2 text-neutral-400">
              <a href="#" className="p-2.5 bg-neutral-900 rounded-xl hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors font-bold text-[11px] font-mono">
                TELEGRAM
              </a>
              <a href="#" className="p-2.5 bg-neutral-900 rounded-xl hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors font-bold text-[11px] font-mono">
                VKONTAKTE
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1 font-mono">
                СПОСОБЫ ОПЛАТЫ
              </span>
              <div className="flex gap-1.5 text-[10px] font-bold text-neutral-400 font-mono">
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">СБП</span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">МИР</span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">ДОЛЯМИ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View (sm:hidden) */}
        <div className="sm:hidden space-y-3 border-b border-neutral-800/80 pb-6 text-xs">
          <div className="space-y-2 pb-2">
            <span className="font-display text-3xl tracking-widest text-white block">SOLVE</span>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Интернет-магазин оригинальной уличной одежды, кроссовок и аксессуаров.
            </p>
          </div>

          <FooterAccordion title="КАТАЛОГ">
            <ul className="space-y-2.5 text-neutral-400 font-medium py-2">
              <li><a href="/catalog?category=clothing" className="hover:text-white transition-colors">Одежда</a></li>
              <li><a href="/catalog?category=sneakers" className="hover:text-white transition-colors">Кроссовки</a></li>
              <li><a href="/catalog?category=keychains" className="hover:text-white transition-colors">Брелоки</a></li>
              <li><a href="/catalog?category=accessories" className="hover:text-white transition-colors">Аксессуары</a></li>
              <li><a href="/catalog?category=bags" className="hover:text-white transition-colors">Сумки</a></li>
            </ul>
          </FooterAccordion>

          <FooterAccordion title="ПОКУПАТЕЛЯМ">
            <ul className="space-y-2.5 text-neutral-400 font-medium py-2">
              <li><a href="#" className="hover:text-white transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Гарантия подлинности</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Обмен и возврат</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Таблица размеров</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </FooterAccordion>

          <div className="pt-3 space-y-2">
            <h4 className="font-extrabold uppercase tracking-wider text-white text-xs font-mono">СОЦСЕТИ И ОПЛАТА</h4>
            <div className="flex gap-2 text-neutral-400 pt-1">
              <a href="#" className="px-4 py-2 bg-neutral-900 rounded-xl hover:text-white border border-neutral-800 font-bold text-xs font-mono">
                TELEGRAM
              </a>
              <a href="#" className="px-4 py-2 bg-neutral-900 rounded-xl hover:text-white border border-neutral-800 font-bold text-xs font-mono">
                VKONTAKTE
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
          <span>© 2026 SOLVE STORE. Все права защищены.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
