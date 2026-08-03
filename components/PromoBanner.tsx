'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="px-4 py-4 bg-[#F7F7F6]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full rounded-3xl overflow-hidden min-h-[220px] md:min-h-[280px] bg-neutral-900 shadow-md border border-neutral-200/60"
        >
          {/* Background Image */}
          <img
            src="/images/promo-banner.png"
            alt="Распродажа"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 filter brightness-90"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center items-start text-white max-w-md font-sans">
            <span className="text-[10px] font-extrabold tracking-widest text-neutral-300 uppercase mb-1">
              LIMITED TIME OFFER
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase leading-none tracking-wider mb-2 text-white">
              РАСПРОДАЖА
              <br />
              ДО <span className="text-white">-40%</span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-300 mb-5 font-normal">
              Эксклюзивные скидки на подборку одежды и обуви.
            </p>

            <Button
              size="sm"
              className="bg-white text-black hover:bg-neutral-200 font-bold tracking-wider text-[11px] uppercase rounded-xl px-6 py-3 group shadow-md"
            >
              <span>ПЕРЕЙТИ К ТОВАРАМ</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
