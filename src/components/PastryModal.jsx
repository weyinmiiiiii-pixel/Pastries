import React, { useState } from 'react';
import { X, Star, Coffee, ShieldAlert, Clock, Plus, Minus, ShoppingBag, Flame, Sparkles, Award } from 'lucide-react';
import { playCartChime } from './BoutiqueAudio';

export function PastryModal({ pastry, onClose, onAddToCart, currency }) {
  const [quantity, setQuantity] = useState(1);

  if (!pastry) return null;

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92 * quantity).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79 * quantity).toFixed(2)}`;
    return `$${(amount * quantity).toFixed(2)}`;
  };

  const handleAdd = () => {
    playCartChime();
    onAddToCart(pastry, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--border-light)] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 shadow-lg backdrop-blur-md transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Header Image */}
          <div className="relative h-72 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] shadow-inner">
            <img
              src={pastry.image}
              alt={pastry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              {pastry.tags.map((t, i) => (
                <span key={i} className="px-3.5 py-1 rounded-full bg-[var(--gold-gradient)] text-white text-xs font-black uppercase tracking-wider shadow-md">
                  {t}
                </span>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Artisanal Specification</span>
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight">{pastry.name}</h2>
              <p className="font-serif italic text-xs text-amber-100/90">{pastry.frenchTitle}</p>
            </div>
          </div>

          {/* Ratings & Category */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-gold)]">
              Category: {pastry.category}
            </span>
            <div className="flex items-center gap-1.5 bg-[var(--accent-gold-light)] px-3 py-1 rounded-full border border-[var(--border-light)] text-xs font-black text-[var(--text-main)]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{pastry.rating}</span>
              <span className="text-[var(--text-muted)]">({pastry.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {pastry.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] text-xs border border-[var(--border-light)]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[var(--accent-warm)]" />
              <div>
                <p className="font-bold text-[var(--text-main)]">Fresh Baking</p>
                <p className="text-[11px] text-[var(--text-muted)]">{pastry.bakingSchedule || "Baked Fresh Daily"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Coffee className="w-4 h-4 text-[var(--accent-gold)]" />
              <div>
                <p className="font-bold text-[var(--text-main)]">Pairing</p>
                <p className="text-[11px] text-[var(--text-muted)]">{pastry.coffeePairing || "Double Espresso"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <div>
                <p className="font-bold text-[var(--text-main)]">Calories</p>
                <p className="text-[11px] text-[var(--text-muted)]">{pastry.calories || "320 kcal"}</p>
              </div>
            </div>
          </div>

          {/* Ingredients & Allergens */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Crafted From Pure Ingredients</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {pastry.detailedIngredients.map((ing, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] text-xs text-[var(--text-main)] font-semibold border border-[var(--border-subtle)]">
                  {ing}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-700 dark:text-amber-300 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Contains Allergens: {pastry.allergens.join(', ')}</span>
            </div>
          </div>

        </div>

        {/* Footer Quantity & Add CTA */}
        <div className="p-4 md:p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-light)] flex items-center justify-between gap-4">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-[var(--bg-card)] px-4 py-2 rounded-full border border-[var(--border-light)] shadow-inner">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-black text-base text-[var(--text-main)] min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price & Add CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-6 rounded-full bg-[var(--gold-gradient)] hover:brightness-110 text-white font-extrabold text-sm shadow-xl hover:shadow-glow flex items-center justify-between transition-all transform active:scale-95 uppercase tracking-wide"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Order</span>
            </span>
            <span className="font-black text-lg">
              {formatPrice(pastry.price)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
