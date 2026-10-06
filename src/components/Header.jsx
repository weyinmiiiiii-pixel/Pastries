import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Sun, Moon, 
  Menu, X, Sparkles, Bell
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

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] shadow-sm transition-all duration-300">
      
      {/* Announcement Bar */}
      <div className="bg-[#E53935] text-white py-1.5 px-4 text-xs font-bold tracking-wider text-center flex items-center justify-center gap-3">
        <span>✨ PASTRIES BAKERY — EXPRESS 45-MINUTE DOORSTEP DELIVERY</span>
        <span className="hidden md:inline px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase text-[10px]">
          100% FRESH DAILY
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Pastries Logo & Emblem */}
          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-2 border-[#E53935] bg-red-50/60 hover:bg-red-100/60 transition-all shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#E53935] text-white flex items-center justify-center text-base shadow-sm font-bold">
                🥐
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-extrabold text-[#E53935] leading-none tracking-tight">
                  Pastries
                </span>
                <span className="text-[9px] font-extrabold text-stone-700 tracking-wider font-sans uppercase">
                  Bakery & Snacks
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search cakes, croissants, small chops, cupcakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-semibold border border-[var(--border-subtle)] text-[var(--text-main)] placeholder-stone-400 focus:border-[#E53935] focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-2.5 py-1.5 rounded-full bg-[var(--bg-secondary)] text-xs font-bold border border-[var(--border-subtle)] text-[var(--text-main)] cursor-pointer"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full bg-[var(--bg-secondary)] text-stone-600 hover:text-[#E53935] border border-[var(--border-subtle)] transition-colors"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Shopping Cart Basket Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[var(--bg-secondary)] hover:bg-red-50 text-stone-800 hover:text-[#E53935] border border-[var(--border-subtle)] transition-colors"
              title="View Cart Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-black bg-[#E53935] text-white rounded-full shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle (≡) */}
            <button
              onClick={() => setIsOpenMobile(!isOpenMobile)}
              className="p-2.5 rounded-full bg-[var(--bg-secondary)] text-stone-800 hover:text-[#E53935] border border-[var(--border-subtle)] transition-colors"
              title="Toggle Menu Navigation"
            >
              {isOpenMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search bakes, small chops, cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] text-xs font-semibold border border-[var(--border-subtle)] text-[var(--text-main)] placeholder-stone-400"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
