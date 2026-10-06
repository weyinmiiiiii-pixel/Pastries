import React from 'react';
import { CATEGORIES } from '../data/pastriesData';
import { ChevronRight, Sparkles } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    category: "Cakes",
    title: "Gourmet Celebration Cakes",
    subtitle: "Red Velvet & Valrhona Chocolate",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    badge: "Masterpieces"
  },
  {
    category: "Small Chops",
    title: "Party Small Chops & Savory",
    subtitle: "Crispy Samosas, Spring Rolls & Beef Puffs",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    badge: "Warm Oven"
  },
  {
    category: "Cupcakes",
    title: "Artisanal Swirl Cupcakes",
    subtitle: "Madagascan Vanilla & Salted Caramel",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
    badge: "Hand-crafted"
  },
  {
    category: "Viennoiserie",
    title: "81-Layer Butter Croissants",
    subtitle: "100% Isigny AOP Normandy Butter",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80",
    badge: "Paris Classic"
  }
];

export function PictorialCategoryGrid({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-black text-[var(--text-main)]">
            Explore Pictorial Menu Collections
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Click any collection to filter our daily baked selection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORY_CARDS.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedCategory(item.category)}
            className={`group relative h-48 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-md hover:shadow-glow transform hover:-translate-y-1 ${
              selectedCategory === item.category
                ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold-light)]'
                : 'border-[var(--border-light)]'
            }`}
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Badge Ribbon */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[var(--gold-gradient)] text-white shadow-sm">
                {item.badge}
              </span>
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
              <h4 className="font-serif font-bold text-base leading-tight group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-white/80 line-clamp-1 italic">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
