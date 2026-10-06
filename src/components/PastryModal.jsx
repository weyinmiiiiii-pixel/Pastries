import React, { useState } from 'react';
import { X, Star, Coffee, ShieldAlert, Clock, Plus, Minus, ShoppingBag, Flame, Sparkles } from 'lucide-react';

export function PastryModal({ pastry, onClose, onAddToCart, currency }) {
  const [quantity, setQuantity] = useState(1);

  if (!pastry) return null;

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92 * quantity).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79 * quantity).toFixed(2)}`;
    return `$${(amount * quantity).toFixed(2)}`;
  };

  const handleAdd = () => {
    onAddToCart(pastry, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--glass-bg)] hover:bg-white text-[var(--text-main)] shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Header Image Showcase */}
          <div className="relative h-64 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] shadow-inner">
            <img
              src={pastry.image}
              alt={pastry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {pastry.tags.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold shadow-md">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Title & Ratings */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--accent-gold)]">
                {pastry.category}
              </span>
              <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{pastry.rating}</span>
                <span className="text-[var(--text-light)]">({pastry.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)] mt-1">
              {pastry.name}
            </h2>
            <p className="font-serif italic text-sm text-[var(--accent-gold)] mt-0.5">
              {pastry.frenchTitle}
            </p>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {pastry.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-warm)]" />
              <div>
                <p className="font-semibold text-[var(--text-main)]">Fresh Baking</p>
                <p className="text-[var(--text-light)]">{pastry.bakingSchedule || "Baked Daily"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[var(--accent-gold)]" />
              <div>
                <p className="font-semibold text-[var(--text-main)]">Coffee Pairing</p>
                <p className="text-[var(--text-light)]">{pastry.coffeePairing || "Espresso"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <div>
                <p className="font-semibold text-[var(--text-main)]">Calories</p>
                <p className="text-[var(--text-light)]">{pastry.calories || "300 kcal"}</p>
              </div>
            </div>
          </div>

          {/* Ingredients & Allergens */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Artisanal Ingredients</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {pastry.detailedIngredients.map((ing, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-xs text-[var(--text-main)] font-medium border border-[var(--border-subtle)]">
                  {ing}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-700 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Contains Allergens: {pastry.allergens.join(', ')}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-[var(--bg-card)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)] shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-secondary)]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-[var(--text-main)] min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-secondary)]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price & Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-bold text-sm shadow-md flex items-center justify-between transition-all transform active:scale-95"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order</span>
            </span>
            <span className="font-extrabold text-base">
              {formatPrice(pastry.price)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
