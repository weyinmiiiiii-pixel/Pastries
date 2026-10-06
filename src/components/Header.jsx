import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Sun, Moon, Sparkles, Clock, Music, 
  Menu, Bell, CheckCircle2, ChevronRight, Award, Flame 
} from 'lucide-react';
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
  isOpenMobile,
  setIsOpenMobile
}) {
  useBoutiqueAudio(isAudioPlaying);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const mockNotifications = [
    { id: 1, text: "🥐 Oven #1: Fresh batch of Normandy Croissants ready!", time: "2 mins ago", icon: "🔥" },
    { id: 2, text: "🍓 Chef Signature Raspberry Tarts just baked!", time: "15 mins ago", icon: "✨" },
    { id: 3, text: "🎁 Free Parisian Gift Box unlocked on orders over $40", time: "1 hour ago", icon: "🎁" }
  ];

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
      <div className="bg-gradient-to-r from-amber-950 via-[var(--accent-gold)] to-amber-900 text-white py-1 px-4 text-[11px] font-bold tracking-widest text-center flex items-center justify-center gap-3 shadow-inner">
        <span className="hidden sm:inline flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          HAUTE PÂTISSERIE DE PARIS — EXPRESS DELIVERY WITHIN 45 MINS
        </span>
        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase text-[10px]">
          100% ISIGNY AOP BUTTER
        </span>
        <span className="hidden md:inline">
          ✨ COMPLIMENTARY LUXURY GIFT BOX ON ORDERS OVER $40
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Mobile Toggle & Brand Emblem */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpenMobile(!isOpenMobile)}
              className="lg:hidden p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors"
              title="Toggle Menu Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div 
              onClick={() => setActiveTab('menu')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--gold-gradient)] p-0.5 shadow-lg group-hover:shadow-glow transition-all duration-500 transform group-hover:rotate-3">
                <div className="w-full h-full bg-[var(--bg-card)] rounded-[14px] flex items-center justify-center text-2xl shadow-inner">
                  🥐
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-black tracking-tight gold-gradient-text">
                    L'Étoile
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-[var(--accent-gold-light)] text-[var(--accent-gold)] rounded-full border border-[var(--border-light)]">
                    Maison 1892
                  </span>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider font-sans font-semibold uppercase">
                  Artisanal Bakery • Paris
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar Center (Desktop & Tablet) */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
              <input
                type="text"
                placeholder="Search red velvet cakes, samosas, butter croissants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--bg-secondary)] text-xs font-semibold border border-[var(--border-light)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold-light)] transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Notifications Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] border border-[var(--border-light)] transition-colors"
                title="Baking Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[var(--bg-card)] animate-ping" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[var(--bg-card)]" />
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] shadow-2xl p-4 z-50 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                    <span className="text-xs font-bold text-[var(--text-main)]">Live Bakery Alerts</span>
                    <span className="text-[10px] text-[var(--accent-gold)] font-semibold">3 New</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {mockNotifications.map(n => (
                      <div key={n.id} className="flex items-start gap-2.5 p-2 rounded-xl bg-[var(--bg-secondary)] text-xs">
                        <span className="text-base">{n.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-[var(--text-main)] leading-tight">{n.text}</p>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-bold border border-[var(--border-light)] text-[var(--text-main)] cursor-pointer hover:border-[var(--accent-gold)] transition-colors shadow-sm"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] border border-[var(--border-light)] transition-colors shadow-sm"
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
                <span className="hidden xl:inline border-l border-white/30 pl-2 font-black font-sans">
                  {formatPrice(totalCartPrice)}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
            <input
              type="text"
              placeholder="Search pastries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-semibold border border-[var(--border-light)] text-[var(--text-main)] placeholder-[var(--text-light)]"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
