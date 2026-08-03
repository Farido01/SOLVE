'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Grid, Heart, ShoppingBag } from 'lucide-react';

interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    href: '/',
    label: 'Главная',
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 'catalog',
    href: '/catalog',
    label: 'Каталог',
    icon: <Grid className="w-5 h-5" />,
  },
  {
    id: 'favorites',
    href: '#',
    label: 'Избранное',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 'cart',
    href: '#',
    label: 'Корзина',
    icon: <ShoppingBag className="w-5 h-5" />,
    badge: 2,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#F7F7F6]/95 backdrop-blur-md border-t border-neutral-200/80 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0)] font-sans">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.label}
            className={`relative flex flex-col items-center justify-center gap-0.5 py-1 px-4 text-xs font-medium transition-colors min-h-[48px] min-w-[56px] ${
              isActive ? 'text-black font-bold' : 'text-neutral-400 hover:text-neutral-800'
            }`}
          >
            {/* Active Top Indicator Bar */}
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active"
                className="absolute top-0 w-8 h-[2px] bg-black rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            <motion.div whileTap={{ scale: 0.85 }} className="relative flex items-center justify-center p-1">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-black text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </motion.div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
