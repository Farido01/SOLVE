'use client';

import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WeeklyPick() {
  return (
    <section className="py-12 md:py-14 px-4 bg-[#E8E8E4]">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Dark Capsule Card (Compact height) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-neutral-900 text-white rounded-3xl p-5 md:p-6 border border-neutral-800 shadow-xl overflow-hidden font-sans"
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-neutral-800/80 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white text-black rounded-lg shadow-xs flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 fill-black text-black" />
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 block font-mono">
                  LIMITED DROP #04
                </span>
                <h2 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white leading-none">
                  ПОДБОРКА НЕДЕЛИ
                </h2>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800/80 border border-neutral-700/60 rounded-full text-[11px] font-medium text-neutral-300 self-start sm:self-auto">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>До конца: <strong className="text-white font-mono tracking-wider font-bold">02д 14ч 32м</strong></span>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Column: Info & Pricing */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-white text-black text-[9px] font-extrabold uppercase tracking-wider rounded-md font-mono">
                  СЕТ «CHAOS URBAN»
                </span>
                <span className="text-[10px] font-bold text-white bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-700 font-mono">
                  ВЫГОДА 15%
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-4xl uppercase tracking-wider leading-none text-white">
                3 ТОВАРА В ОДНОМ СЕТЕ
              </h3>

              <p className="text-xs text-neutral-300 font-normal leading-relaxed max-w-lg">
                Худи Chaos + Кроссовки New Balance 530 + Брелок Star. Готовый образ со скидкой комплектом.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 font-medium pt-0.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Экономия 2 220 ₽</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Бесплатная доставка</span>
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono">12 550 ₽</span>
                    <span className="text-xs text-neutral-400 line-through font-semibold font-mono">14 770 ₽</span>
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block font-mono">Спеццена за комплект</span>
                </div>

                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-neutral-200 font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 py-3 flex items-center justify-center gap-2 shadow-xl group transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ЗАБРАТЬ СЕТ</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Right Column: Combo Products Cards */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2">
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-2 flex flex-col items-center text-center">
                <span className="text-[9px] font-bold uppercase text-neutral-400 mb-0.5 font-mono">Худи</span>
                <img src="/images/cat-clothing.png" alt="Худи" className="w-12 h-12 object-contain my-0.5" />
                <span className="text-[11px] font-bold text-white font-mono">4 990 ₽</span>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-2 flex flex-col items-center text-center">
                <span className="text-[9px] font-bold uppercase text-neutral-400 mb-0.5 font-mono">Обувь</span>
                <img src="/images/cat-sneakers.png" alt="Кроссовки" className="w-12 h-12 object-contain my-0.5" />
                <span className="text-[11px] font-bold text-white font-mono">8 990 ₽</span>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-2 flex flex-col items-center text-center">
                <span className="text-[9px] font-bold uppercase text-neutral-400 mb-0.5 font-mono">Брелок</span>
                <img src="/images/cat-keychains.png" alt="Брелок" className="w-12 h-12 object-contain my-0.5" />
                <span className="text-[11px] font-bold text-white font-mono">790 ₽</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
