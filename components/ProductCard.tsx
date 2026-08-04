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
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onRemove?: () => void;
  className?: string;
}

export default function ProductCard({
  product,
  isFavorite: initialIsFavorite = false,
  onFavoriteToggle,
  onRemove,
  className = '',
}: ProductCardProps) {
  const [internalIsFavorite, setInternalIsFavorite] = useState(initialIsFavorite);
  const [isHovered, setIsHovered] = useState(false);

  const isFav = onFavoriteToggle ? initialIsFavorite : internalIsFavorite;

  const handleFavoriteClick = () => {
    if (onRemove) {
      onRemove();
    } else if (onFavoriteToggle) {
      onFavoriteToggle();
    } else {
      setInternalIsFavorite(!internalIsFavorite);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col gap-2.5 group select-none font-sans ${className || 'w-full'}`}
    >
      {/* Product Image Container 3:4 Aspect Ratio */}
      <div className="relative w-full aspect-[3/4] rounded-2xl bg-neutral-200/50 overflow-hidden border border-neutral-200/80 shadow-2xs">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge if exists */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md font-sans">
            {product.badge}
          </span>
        )}

        {/* Action Button: Remove or Favorite */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleFavoriteClick}
          aria-label={onRemove ? 'Удалить из избранного' : isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={`absolute top-2.5 right-2.5 min-w-[36px] min-h-[36px] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
            onRemove
              ? 'bg-white/95 text-neutral-500 hover:bg-red-500 hover:text-white border border-neutral-200'
              : isFav
              ? 'bg-black text-white'
              : 'bg-white/95 text-neutral-900 hover:bg-black hover:text-white border border-neutral-200'
          }`}
        >
          {onRemove ? (
            <Heart className="w-4 h-4 fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" />
          ) : (
            <Heart className={`w-4 h-4 ${isFav ? 'fill-white text-white' : ''}`} />
          )}
        </motion.button>
      </div>

      {/* Info & Add to Cart */}
      <div className="flex items-center justify-between px-1 gap-2">
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-sm md:text-base font-bold text-neutral-900 truncate leading-snug tracking-tight">
            {product.name}
          </h3>
          <span className="text-sm md:text-base font-black text-black leading-tight font-mono">
            {formatPrice(product.price)}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.88 }}
          aria-label="Добавить в корзину"
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-black text-white hover:bg-neutral-800 flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}
