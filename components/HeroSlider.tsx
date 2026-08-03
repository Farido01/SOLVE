'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  image: string;
  title: string[];
  subtitle: string[];
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero-1.png',
    title: ['НОВАЯ', 'КОЛЛЕКЦИЯ'],
    subtitle: ['Минимализм. Качество.', 'Твой стиль.'],
    buttonText: 'СМОТРЕТЬ',
  },
  {
    id: 2,
    image: '/images/hero-2.png',
    title: ['КРОССОВКИ', '2026'],
    subtitle: ['Лучшие модели сезона.', 'Только оригинал.'],
    buttonText: 'ВЫБРАТЬ',
  },
  {
    id: 3,
    image: '/images/hero-3.png',
    title: ['АКСЕССУАРЫ', 'И СУМКИ'],
    subtitle: ['Дополни свой образ.', 'Премиум качество.'],
    buttonText: 'СМОТРЕТЬ',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[480px] md:h-[600px] mt-14 bg-black overflow-hidden select-none">
      {/* Background Image Carousel with Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title.join(' ')}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-20 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-white space-y-3"
          >
            <h1 className="font-display text-5xl md:text-7xl tracking-wider leading-none uppercase text-white">
              {slides[current].title[0]}
              <br />
              {slides[current].title[1]}
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 font-sans font-normal leading-relaxed">
              {slides[current].subtitle[0]}
              <br />
              {slides[current].subtitle[1]}
            </p>
            <div className="pt-2">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-neutral-200 rounded-xl font-bold tracking-wider group text-xs uppercase px-7 py-3 font-sans shadow-lg"
              >
                <span>{slides[current].buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
        <span className="text-white/80 text-xs font-semibold tracking-wider font-mono">
          0{current + 1} / 0{slides.length}
        </span>

        {/* Indicators */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="h-2 rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: idx === current ? '24px' : '8px',
                backgroundColor: idx === current ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
              }}
              aria-label={`Перейти к слайду ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
