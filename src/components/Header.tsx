import './Header.css';

export default function Header() {
  return (
    <header className="header" id="main-header">
      <button className="header__menu-btn" id="menu-toggle" aria-label="Открыть меню">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      <a href="/" className="header__logo" id="logo">
        SOLVE
      </a>

      <div className="header__actions">
        <button className="header__action-btn" id="search-btn" aria-label="Поиск">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="header__action-btn header__cart-btn" id="cart-btn" aria-label="Корзина">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span className="header__cart-badge" id="cart-badge">2</span>
        </button>
      </div>
    </header>
  );
}
