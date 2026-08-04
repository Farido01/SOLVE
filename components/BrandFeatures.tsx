'use client';

import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-black" />,
    title: '100% ОРИГИНАЛ',
    description: 'Каждый товар проходит двойную проверку на аутентичность.',
  },
  {
    icon: <Truck className="w-6 h-6 text-black" />,
    title: 'БЫСТРАЯ ДОСТАВКА',
    description: 'Отправка в день заказа. Доставка по РФ и СНГ от 2 дней.',
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-black" />,
    title: 'ЛЕГКИЙ ВОЗВРАТ',
    description: '14 дней на примерку и обмен без лишних вопросов.',
  },
  {
    icon: <CreditCard className="w-6 h-6 text-black" />,
    title: 'УДОБНАЯ ОПЛАТА',
    description: 'СБП, Оплата Долями частями или банковской картой.',
  },
];

export default function BrandFeatures() {
  return (
    <section className="py-6 md:py-8 bg-[#F9F9F8] border-b border-neutral-200/60">
      <div className="px-4 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start p-4 md:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-2.5 font-sans"
          >
            <div className="p-2.5 bg-[#F9F9F8] rounded-xl border border-neutral-200/80">
              {item.icon}
            </div>
            <h3 className="text-xs md:text-sm font-extrabold text-neutral-900 tracking-tight uppercase">
              {item.title}
            </h3>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
