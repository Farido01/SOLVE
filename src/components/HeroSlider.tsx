import { useState, useEffect, useCallback, useRef } from 'react';
import './HeroSlider.css';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero-1.png',
    title: 'НОВАЯ\nКОЛЛЕКЦИЯ',
    subtitle: 'Минимализм. Качество.\nТвой стиль.',
    buttonText: 'СМОТРЕТЬ',
  },
  {
    id: 2,
    image: '/images/hero-2.png',
    title: 'КРОССОВКИ\n2026',
    subtitle: 'Лучшие модели сезона.\nТолько оригинал.',
    buttonText: 'ВЫБРАТЬ',
  },
  {
    id: 3,
    image: '/images/hero-3.png',
    title: 'АКСЕССУАРЫ\nИ СУМКИ',
    subtitle: 'Дополни свой образ.\nПремиум качество.',
    buttonText: 'СМОТРЕТЬ',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide((currentSlide + 1) % slides.length);
      } else {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
      }
    }
  };

  return (
    <section
      className="hero"
      id="hero-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
        >
          <div className="hero__image-wrapper">
            <img
              src={slide.image}
              alt={slide.title.replace('\n', ' ')}
              className="hero__image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="hero__overlay" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="hero__content" key={currentSlide}>
        <h1 className="hero__title">
          {slides[currentSlide].title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < slides[currentSlide].title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hero__subtitle">
          {slides[currentSlide].subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < slides[currentSlide].subtitle.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        <button className="hero__cta" id="hero-cta">
          <span>{slides[currentSlide].buttonText}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="hero__nav">
        <span className="hero__counter">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <div className="hero__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero__dot ${index === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
