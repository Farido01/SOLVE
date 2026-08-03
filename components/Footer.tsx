'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 border-b border-neutral-800/80 pb-8 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <span className="font-display text-3xl tracking-widest text-white block">SOLVE</span>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Интернет-магазин оригинальной уличной одежды, кроссовок, брелоков и аксессуаров.
            </p>
          </div>

          {/* Col 2: Catalog */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-white">КАТАЛОГ</h4>
            <ul className="space-y-2 text-neutral-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Одежда</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Кроссовки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Брелоки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Аксессуары</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Сумки</a></li>
            </ul>
          </div>

          {/* Col 3: Information */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-white">ПОКУПАТЕЛЯМ</h4>
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
            <h4 className="font-extrabold uppercase tracking-wider text-white">МЫ В СОЦСЕТЯХ</h4>
            <div className="flex gap-2 text-neutral-400">
              <a href="#" className="p-2 bg-neutral-900 rounded-xl hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors font-bold text-[11px]">
                TELEGRAM
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-xl hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors font-bold text-[11px]">
                VKONTAKTE
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                СПОСОБЫ ОПЛАТЫ
              </span>
              <div className="flex gap-1.5 text-[10px] font-bold text-neutral-400">
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">СБП</span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">МИР</span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">ДОЛЯМИ</span>
              </div>
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
