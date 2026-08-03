import { useEffect, useRef } from 'react';
import ProductCard, { type Product } from './ProductCard';
import './NewArrivals.css';

const products: Product[] = [
  {
    id: 1,
    name: 'Худи Chaos',
    price: 4990,
    image: '/images/cat-clothing.png',
  },
  {
    id: 2,
    name: 'New Balance 530',
    price: 8990,
    image: '/images/cat-sneakers.png',
  },
  {
    id: 3,
    name: 'Брелок Star',
    price: 790,
    image: '/images/cat-keychains.png',
  },
  {
    id: 4,
    name: 'Кепка Classic',
    price: 1690,
    image: '/images/cat-accessories.png',
  },
];

export default function NewArrivals() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="new-arrivals" id="new-arrivals" ref={sectionRef}>
      <div className="new-arrivals__header">
        <h2 className="new-arrivals__title">НОВИНКИ</h2>
        <button className="new-arrivals__view-all" id="view-all-new">
          <span>Смотреть все</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
      <div className="new-arrivals__scroll hide-scrollbar">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
