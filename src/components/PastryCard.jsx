import React from 'react';
import { Star, Plus, Eye, Flame, Coffee, Heart } from 'lucide-react';

export function PastryCard({ pastry, onQuickAdd, onViewDetails, currency }) {
  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="group relative bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image Container with Badges */}
      <div className="relative h-56 overflow-hidden bg-[var(--bg-secondary)]">
        <img
          src={pastry.image}
          alt={pastry.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {pastry.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                tag === 'Warm Oven'
                  ? 'bg-amber-500 text-white animate-pulse'
                  : tag === 'Bestseller'
                  ? 'bg-[var(--accent-warm)] text-white'
                  : tag === 'Chef Special'
                  ? 'bg-[var(--accent-berry)] text-white'
                  : 'bg-[var(--glass-bg)] text-[var(--text-main)] backdrop-blur-md'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={() => onViewDetails(pastry)}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--bg-card)] text-[var(--text-main)] backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4 text-[var(--text-main)]" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* French Title & Category */}
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <span>{pastry.category}</span>
            <div className="flex items-center gap-1 text-[var(--text-main)]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{pastry.rating}</span>
              <span className="text-[var(--text-light)]">({pastry.reviewsCount})</span>
            </div>
          </div>

          {/* Main Title */}
          <h3 
            onClick={() => onViewDetails(pastry)}
            className="font-serif text-lg font-bold text-[var(--text-main)] hover:text-[var(--accent-gold)] cursor-pointer line-clamp-1 transition-colors"
          >
            {pastry.name}
          </h3>

          <p className="text-xs italic text-[var(--text-muted)] font-serif mb-2">
            {pastry.frenchTitle}
          </p>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {pastry.description}
          </p>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--text-light)] block font-sans">Price</span>
            <span className="font-sans text-xl font-extrabold text-[var(--text-main)]">
              {formatPrice(pastry.price)}
            </span>
          </div>

          <button
            onClick={() => onQuickAdd(pastry)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-gold-light)] hover:bg-[var(--accent-gold)] text-[var(--accent-gold)] hover:text-white font-bold text-xs border border-[var(--border-light)] transition-all duration-200 transform active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}
