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
    href: '/favorites',
    label: 'Избранное',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 'cart',
    href: '/cart',
    label: 'Корзина',
    icon: <ShoppingBag className="w-5 h-5" />,
    badge: 2,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#F9F9F8]/95 backdrop-blur-md border-t border-neutral-200/80 flex items-center justify-around px-3 pb-[env(safe-area-inset-bottom,0)] font-sans shadow-lg">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.label}
            className="relative flex items-center justify-center min-h-[48px] min-w-[64px]"
          >
            {/* Active Dark Capsule Background */}
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active-pill"
                className="absolute inset-x-1 inset-y-1 bg-black rounded-2xl shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}

            <div
              className={`relative z-10 flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-xs transition-colors ${
                isActive ? 'text-white font-extrabold' : 'text-neutral-500 hover:text-black font-semibold'
              }`}
            >
              <motion.div whileTap={{ scale: 0.85 }} className="relative flex items-center justify-center">
                {item.icon}
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 w-4 h-4 text-[9px] font-black rounded-full flex items-center justify-center border ${
                      isActive
                        ? 'bg-white text-black border-black'
                        : 'bg-black text-white border-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
