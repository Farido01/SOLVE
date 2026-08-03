import { useEffect, useRef } from 'react';
import './Categories.css';

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 'clothing', name: 'Одежда', image: '/images/cat-clothing.png' },
  { id: 'sneakers', name: 'Кроссовки', image: '/images/cat-sneakers.png' },
  { id: 'keychains', name: 'Брелоки', image: '/images/cat-keychains.png' },
  { id: 'accessories', name: 'Аксессуары', image: '/images/cat-accessories.png' },
  { id: 'bags', name: 'Сумки', image: '/images/cat-bags.png' },
];

export default function Categories() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="categories" id="categories" ref={sectionRef}>
      <div className="categories__scroll hide-scrollbar">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className={`categories__item delay-${index + 1}`}
            id={`category-${cat.id}`}
          >
            <div className="categories__image-wrapper">
              <img src={cat.image} alt={cat.name} className="categories__image" loading="lazy" />
            </div>
            <span className="categories__name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
