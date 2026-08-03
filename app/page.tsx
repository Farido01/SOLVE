import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import PromoBanner from '@/components/PromoBanner';
import NewArrivals from '@/components/NewArrivals';
import Recommended from '@/components/Recommended';
import Lookbook from '@/components/Lookbook';
import WeeklyPick from '@/components/WeeklyPick';
import PopularBrands from '@/components/PopularBrands';
import BrandFeatures from '@/components/BrandFeatures';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F6]">
      <Header />
      <main className="flex-1 pb-20 md:pb-8 space-y-6 md:space-y-12">
        <HeroSlider />
        <Categories />
        <PromoBanner />
        <NewArrivals />
        <Recommended />
        <Lookbook />
        <WeeklyPick />
        <PopularBrands />
        <BrandFeatures />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
