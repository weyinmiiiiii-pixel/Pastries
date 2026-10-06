import React from 'react';
import { Search, ShoppingBag, Sun, Moon, Sparkles, Clock, Music, Heart, Award } from 'lucide-react';
import { useBoutiqueAudio } from './BoutiqueAudio';

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
  setCurrency,
  isAudioPlaying,
  setIsAudioPlaying,
  wishlistCount = 0
}) {
  useBoutiqueAudio(isAudioPlaying);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-[var(--border-light)] transition-all duration-300 shadow-md">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-900 via-[var(--accent-gold)] to-amber-950 text-white py-1 px-4 text-[11px] font-bold tracking-widest text-center flex items-center justify-center gap-3">
        <span className="hidden sm:inline">✨ HAUTE PÂTISSART DE PARIS — EXPRESS DELIVERY WITHIN 45 MINS</span>
        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase">100% ISIGNY AOP BUTTER</span>
        <span className="hidden md:inline">✨ COMPLIMENTARY LUXURY GIFT BOX ON ORDERS OVER $40</span>
      </div>

      <div className="container">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-13 h-13 rounded-2xl bg-[var(--gold-gradient)] p-0.5 shadow-lg group-hover:shadow-glow transition-all duration-500 transform group-hover:rotate-3">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[14px] flex items-center justify-center text-2xl shadow-inner">
                🥐
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl md:text-3xl font-black tracking-tight gold-gradient-text">
                  L'Étoile
                </span>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-[var(--accent-gold-light)] text-[var(--accent-gold)] rounded-full border border-[var(--border-light)] hidden sm:inline-block">
                  Maison 1892
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] tracking-wider font-sans font-medium uppercase">
                Artisanal Bakery & Pâtisserie • Paris
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[var(--bg-secondary)] p-1.5 rounded-full border border-[var(--border-light)] shadow-inner">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeTab === 'menu'
                  ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-md border border-[var(--border-light)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Pastry Catalog
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all ${
                activeTab === 'builder'
                  ? 'bg-[var(--gold-gradient)] text-white shadow-lg'
                  : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
              Custom Tart Studio
            </button>
            <button
              onClick={() => setActiveTab('oven')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all ${
                activeTab === 'oven'
                  ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-md border border-[var(--border-light)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[var(--accent-warm)]" />
              Warm Oven Live
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Search Input */}
            <div className="relative hidden xl:block w-52">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
              <input
                type="text"
                placeholder="Search croissants, tarts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-medium border border-[var(--border-light)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold-light)] transition-all"
              />
            </div>

            {/* Boutique Atmosphere Audio Ambient Toggle Button */}
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all border ${
                isAudioPlaying
                  ? 'bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border-[var(--accent-gold)] shadow-glow animate-pulse'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] border-[var(--border-subtle)]'
              }`}
              title="Toggle Parisian Bakery Ambience Sound"
            >
              <Music className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-[var(--accent-gold)]' : ''}`} />
              <span className="hidden lg:inline">{isAudioPlaying ? 'Ambience ON 🎷' : 'Paris Sound 🎵'}</span>
            </button>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-2.5 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-bold border border-[var(--border-light)] text-[var(--text-main)] cursor-pointer hover:border-[var(--accent-gold)] transition-colors"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] border border-[var(--border-light)] transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--gold-gradient)] text-white font-bold text-xs shadow-lg hover:shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-extrabold uppercase tracking-wide">Cart</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-black bg-white text-[var(--accent-gold-hover)] rounded-full shadow-md">
                  {totalCartCount}
                </span>
              )}
              {totalCartPrice > 0 && (
                <span className="hidden lg:inline border-l border-white/30 pl-2 font-black">
                  {formatPrice(totalCartPrice)}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Sub-bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[var(--border-subtle)] text-xs font-bold">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-1 px-3 rounded-full ${activeTab === 'menu' ? 'bg-[var(--accent-gold-light)] text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`py-1 px-3 rounded-full ${activeTab === 'builder' ? 'bg-[var(--accent-gold-light)] text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Custom Tart
          </button>
          <button
            onClick={() => setActiveTab('oven')}
            className={`py-1 px-3 rounded-full ${activeTab === 'oven' ? 'bg-[var(--accent-gold-light)] text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}
          >
            Warm Oven
          </button>
        </div>

      </div>
    </header>
  );
}
