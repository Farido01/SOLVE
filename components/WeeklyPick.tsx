'use client';

import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WeeklyPick() {
  return (
    <section className="py-8 px-4 bg-[#F7F7F6]">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Dark Capsule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-neutral-900 text-white rounded-3xl p-6 md:p-9 border border-neutral-800 shadow-xl overflow-hidden font-sans"
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white text-black rounded-xl shadow-xs flex items-center justify-center">
                <Flame className="w-4 h-4 fill-black text-black" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block font-sans">
                  LIMITED DROP #04
                </span>
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-white leading-none">
                  ПОДБОРКА НЕДЕЛИ
                </h2>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-800/80 border border-neutral-700/60 rounded-full text-xs font-medium text-neutral-300 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>До конца дропа: <strong className="text-white font-mono tracking-wider font-bold">02д 14ч 32м</strong></span>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Info & Pricing */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-white text-black text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                  СЕТ «CHAOS URBAN»
                </span>
                <span className="text-xs font-bold text-white bg-neutral-800 px-2.5 py-0.5 rounded-md border border-neutral-700">
                  ВЫГОДА 15%
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl uppercase tracking-wider leading-none text-white">
                3 ТОВАРА В ОДНОМ СЕТЕ
              </h3>

              <p className="text-xs md:text-sm text-neutral-300 font-normal leading-relaxed">
                Худи Chaos + Кроссовки New Balance 530 + Брелок Star. Готовый стильный образ со скидкой при покупке комплектом.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-medium pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                  <span>Экономия 2 220 ₽</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                  <span>Бесплатная доставка</span>
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-sans">12 550 ₽</span>
                    <span className="text-xs text-neutral-400 line-through font-semibold">14 770 ₽</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Спеццена за комплект</span>
                </div>

                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-neutral-200 font-extrabold text-xs uppercase tracking-wider rounded-xl px-7 py-3.5 flex items-center justify-center gap-2 shadow-xl group transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ЗАБРАТЬ СЕТ</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Right Column: Combo Products Cards */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2.5">
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-2.5 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase text-neutral-400 mb-1">Худи</span>
                <img src="/images/cat-clothing.png" alt="Худи" className="w-14 h-14 object-contain my-1" />
                <span className="text-xs font-bold text-white">4 990 ₽</span>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-2.5 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase text-neutral-400 mb-1">Обувь</span>
                <img src="/images/cat-sneakers.png" alt="Кроссовки" className="w-14 h-14 object-contain my-1" />
                <span className="text-xs font-bold text-white">8 990 ₽</span>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-2.5 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase text-neutral-400 mb-1">Брелок</span>
                <img src="/images/cat-keychains.png" alt="Брелок" className="w-14 h-14 object-contain my-1" />
                <span className="text-xs font-bold text-white">790 ₽</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
