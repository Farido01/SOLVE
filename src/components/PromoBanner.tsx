import { useEffect, useRef } from 'react';
import './PromoBanner.css';

export default function PromoBanner() {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="promo" id="promo-banner" ref={bannerRef}>
      <div className="promo__card">
        <img
          src="/images/promo-banner.png"
          alt="Распродажа"
          className="promo__bg-image"
          loading="lazy"
        />
        <div className="promo__overlay" />
        <div className="promo__content">
          <span className="promo__label">Ограниченное предложение</span>
          <h2 className="promo__title">
            РАСПРОДАЖА<br />ДО <span className="promo__highlight">-40%</span>
          </h2>
          <p className="promo__subtitle">На избранные товары</p>
          <button className="promo__cta" id="promo-cta">
            <span>ПЕРЕЙТИ К ТОВАРАМ</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
