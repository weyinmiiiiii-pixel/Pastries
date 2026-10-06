import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Award, Sparkles, ChevronRight, Plus, ArrowRight, Check } from 'lucide-react';
import { PASTRIES_DATA } from '../data/pastriesData';
import { playCartChime } from './BoutiqueAudio';

export function RightSidebar({
  cartItems,
  setIsCartOpen,
  onQuickAdd,
  currency,
  setActiveTab
}) {
  const [secondsLeft, setSecondsLeft] = useState(680);
  const [addedItem, setAddedItem] = useState(null);

  // Countdown timer for active oven batch
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Chef signature picks for right sidebar
  const chefPicks = PASTRIES_DATA.slice(0, 3);

  const handleAddPick = (pastry) => {
    playCartChime();
    onQuickAdd(pastry, 1);
    setAddedItem(pastry.id);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 shrink-0 sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-1">
      
      {/* Widget 1: Live Oven Baking Countdown Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/90 via-amber-900/80 to-amber-950 text-white shadow-xl border border-amber-500/30 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-200">
              Live Oven #1
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white uppercase backdrop-blur-md">
            Baking Now
          </span>
        </div>

        <div className="space-y-1 mb-4">
          <h3 className="font-serif font-extrabold text-lg text-white">
            Golden Butter Croissants
          </h3>
          <p className="text-xs text-amber-200/80 italic">
            81 Butter Lamination Layers • Batch #4
          </p>
        </div>

        {/* Live Timer Display */}
        <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/10 mb-4 backdrop-blur-sm">
          <span className="text-xs text-amber-200 font-medium">Ready in approx:</span>
          <span className="font-mono text-xl font-black text-amber-400 gold-gradient-text">
            {formatTimer(secondsLeft)}
          </span>
        </div>

        <button
          onClick={() => setActiveTab('oven')}
          className="w-full py-2.5 rounded-2xl bg-[var(--gold-gradient)] hover:brightness-110 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wide"
        >
          <span>Watch Live Oven Stream</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Widget 2: Quick Cart Summary Snapshot */}
      <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-light)] shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--accent-gold)]" />
            <h3 className="font-serif font-bold text-sm text-[var(--text-main)]">
              Your Order Basket
            </h3>
          </div>
          <span className="px-2 py-0.5 text-xs font-extrabold bg-[var(--accent-gold-light)] text-[var(--accent-gold)] rounded-full">
            {totalCartCount} items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <span className="text-3xl">🥐</span>
            <p className="text-xs font-semibold text-[var(--text-muted)]">Your basket is currently empty.</p>
            <p className="text-[11px] text-[var(--text-light)]">Add fresh baked pastries from our catalog!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-[var(--text-main)] truncate">{item.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)] font-mono">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[var(--text-main)] shrink-0 font-sans">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-bold">
              <span className="text-[var(--text-muted)]">Subtotal</span>
              <span className="text-base text-[var(--text-main)] gold-gradient-text font-black">
                {formatPrice(totalCartPrice)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3 rounded-2xl bg-[var(--gold-gradient)] text-white font-extrabold text-xs shadow-lg hover:shadow-glow transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Widget 3: Chef's Daily Pictorial Recommendations */}
      <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-light)] shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
            <h3 className="font-serif font-bold text-sm text-[var(--text-main)]">
              Chef Signature Picks
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase text-[var(--accent-gold)]">Top 3</span>
        </div>

        <div className="space-y-3">
          {chefPicks.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-[var(--text-main)] truncate leading-tight">{item.name}</h4>
                <p className="text-[10px] text-[var(--accent-gold)] font-mono font-bold">{formatPrice(item.price)}</p>
              </div>
              <button
                onClick={() => handleAddPick(item)}
                className={`p-2 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 ${
                  addedItem === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[var(--gold-gradient)] text-white hover:scale-105'
                }`}
                title="Add to order"
              >
                {addedItem === item.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Widget 4: Loyalty Rewards Card */}
      <div className="p-4 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-light)] space-y-3 shadow-inner">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-bold text-[var(--text-main)]">Gourmet Crumb Loyalty</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-[var(--text-muted)] font-mono">240 Crumb Pts</span>
            <span className="text-[var(--accent-gold)] font-mono">60 pts to free tart</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--bg-card)] overflow-hidden border border-[var(--border-subtle)]">
            <div className="h-full w-[80%] bg-[var(--gold-gradient)] rounded-full" />
          </div>
        </div>
      </div>

    </aside>
  );
}
