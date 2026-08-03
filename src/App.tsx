import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import Categories from './components/Categories';
import PromoBanner from './components/PromoBanner';
import NewArrivals from './components/NewArrivals';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSlider />
        <Categories />
        <PromoBanner />
        <NewArrivals />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
