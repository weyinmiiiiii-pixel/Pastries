import React, { useState } from 'react';
import { Star, Plus, Eye, Flame, Heart, Sparkles, Check } from 'lucide-react';
import { playCartChime } from './BoutiqueAudio';

export function PastryCard({ pastry, onQuickAdd, onViewDetails, currency, isWishlisted, onToggleWishlist }) {
  const [addedAnim, setAddedAnim] = useState(false);

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    playCartChime();
    onQuickAdd(pastry);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div className="group relative bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-md hover:shadow-glow transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5">
      
      {/* Image Container with Badges */}
      <div className="relative h-60 overflow-hidden bg-[var(--bg-secondary)]">
        <img
          src={pastry.image}
          alt={pastry.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Tag Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {pastry.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm uppercase tracking-wider ${
                tag === 'Warm Oven'
                  ? 'bg-amber-500 text-white animate-pulse'
                  : tag === 'Bestseller'
                  ? 'bg-[var(--gold-gradient)] text-white'
                  : tag === 'Chef Special'
                  ? 'bg-[var(--accent-warm)] text-white'
                  : tag === 'AOP Butter'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[var(--glass-bg)] text-[var(--text-main)] backdrop-blur-md border border-white/20'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Wishlist Heart Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(pastry.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/80 dark:bg-black/40 text-[var(--text-main)] hover:text-rose-500 hover:scale-105'
          }`}
          title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(pastry)}
          className="absolute bottom-3 right-3 z-10 p-2.5 rounded-full bg-white/90 dark:bg-black/60 text-[var(--text-main)] backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4 text-[var(--accent-gold)]" />
        </button>

        {/* Coffee / Drink Pairing Badge */}
        {pastry.coffeePairing && (
          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-amber-200 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>☕ Pairs with {pastry.coffeePairing}</span>
          </div>
        )}

      </div>

      {/* Card Body Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <span>{pastry.category}</span>
            <div className="flex items-center gap-1 text-[var(--text-main)] bg-[var(--accent-gold-light)] px-2 py-0.5 rounded-full border border-[var(--border-light)]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-xs">{pastry.rating}</span>
              <span className="text-[10px] text-[var(--text-muted)]">({pastry.reviewsCount})</span>
            </div>
          </div>

          {/* Pastry Name */}
          <h3 
            onClick={() => onViewDetails(pastry)}
            className="font-serif text-lg font-extrabold text-[var(--text-main)] hover:text-[var(--accent-gold)] cursor-pointer line-clamp-1 transition-colors leading-snug"
          >
            {pastry.name}
          </h3>

          {/* French Subtitle */}
          <p className="text-xs italic text-[var(--text-muted)] font-serif mb-2">
            {pastry.frenchTitle}
          </p>

          {/* Description */}
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {pastry.description}
          </p>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-light)] block">Price</span>
            <span className="font-sans text-xl font-black text-[var(--text-main)]">
              {formatPrice(pastry.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs shadow-md transition-all transform active:scale-95 ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--accent-gold-light)] hover:bg-[var(--gold-gradient)] text-[var(--accent-gold-hover)] hover:text-white border border-[var(--border-light)]'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
