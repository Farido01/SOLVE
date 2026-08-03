'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[175px] sm:w-[190px] md:w-[215px] flex flex-col gap-2.5 group select-none font-sans"
    >
      {/* Product Image Container 3:4 Aspect Ratio */}
      <div className="relative w-full aspect-[3/4] rounded-2xl bg-neutral-200/50 overflow-hidden border border-neutral-200/80">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge if exists */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black text-white text-[9px] font-extrabold uppercase tracking-wider rounded-md font-sans">
            {product.badge}
          </span>
        )}

        {/* High-Contrast Monochromatic Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={`absolute top-2.5 right-2.5 min-w-[36px] min-h-[36px] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
            isFavorite
              ? 'bg-black text-white'
              : 'bg-white/95 text-neutral-900 hover:bg-black hover:text-white border border-neutral-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
        </motion.button>
      </div>

      {/* Info & Add to Cart */}
      <div className="flex items-center justify-between px-1 gap-2">
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-xs md:text-sm font-semibold text-neutral-900 truncate leading-snug tracking-tight">
            {product.name}
          </h3>
          <span className="text-xs md:text-sm font-extrabold text-neutral-900 leading-tight">
            {formatPrice(product.price)}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.88 }}
          aria-label="Добавить в корзину"
          className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}
