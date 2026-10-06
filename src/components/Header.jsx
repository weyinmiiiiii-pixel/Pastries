import React from 'react';
import { Search, ShoppingBag, Sun, Moon, Sparkles, Clock, Compass, Heart } from 'lucide-react';

export function Header({
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  cartItems,
  setIsCartOpen,
  theme,
  setTheme,
  currency,
  setCurrency
}) {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-[var(--border-subtle)] transition-all duration-300">
      <div className="container">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--accent-gold)] via-[#F3D77B] to-[var(--accent-warm)] p-0.5 shadow-md group-hover:shadow-glow transition-all duration-300">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[14px] flex items-center justify-center text-2xl">
                🥐
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-gold)] transition-colors">
                  L'Étoile
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold bg-[var(--accent-gold-light)] text-[var(--accent-gold)] rounded-full border border-[var(--border-light)]">
                  Maison 1892
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] tracking-wide font-sans">
                Haute Pâtisserie & Boulangerie
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)] p-1.5 rounded-full border border-[var(--border-subtle)]">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'menu'
                  ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Pastry Menu
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'builder'
                  ? 'bg-[var(--accent-gold)] text-white shadow-md font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              Custom Tart Studio
            </button>
            <button
              onClick={() => setActiveTab('oven')}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'oven'
                  ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Clock className="w-4 h-4 text-[var(--accent-warm)]" />
              Warm Oven Schedule
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar */}
            <div className="relative hidden lg:block w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
              <input
                type="text"
                placeholder="Search croissants, tarts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] text-sm border border-[var(--border-subtle)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:border-[var(--accent-gold)] transition-all"
              />
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-xs font-semibold border border-[var(--border-subtle)] text-[var(--text-main)] cursor-pointer hover:border-[var(--accent-gold)] transition-colors"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] border border-[var(--border-subtle)] transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent-warm)] hover:bg-[#B34D28] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-white text-[var(--accent-warm)] rounded-full shadow-inner">
                  {totalCartCount}
                </span>
              )}
              {totalCartPrice > 0 && (
                <span className="hidden lg:inline border-l border-white/20 pl-2 font-semibold">
                  {formatPrice(totalCartPrice)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Submenu Nav */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[var(--border-subtle)] text-xs">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-1 px-3 rounded-full ${activeTab === 'menu' ? 'bg-[var(--accent-gold-light)] font-bold text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Pastries
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`py-1 px-3 rounded-full ${activeTab === 'builder' ? 'bg-[var(--accent-gold-light)] font-bold text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Custom Tart Studio
          </button>
          <button
            onClick={() => setActiveTab('oven')}
            className={`py-1 px-3 rounded-full ${activeTab === 'oven' ? 'bg-[var(--accent-gold-light)] font-bold text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Warm Oven
          </button>
        </div>

      </div>
    </header>
  );
}
