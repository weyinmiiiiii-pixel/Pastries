import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Star, Coffee } from 'lucide-react';

export function Hero({ onExploreClick, onBuilderClick }) {
  return (
    <div className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      
      {/* Decorative background glow ambient shapes */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold-light)] border border-[var(--border-light)] text-xs font-semibold text-[var(--accent-gold)]">
              <Flame className="w-4 h-4 text-[var(--accent-warm)] animate-bounce" />
              <span>Next Batch Coming Out of Oven in 12 Mins</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-main)] leading-[1.15]">
              Artisanal French Pastries, <br />
              <span className="gold-gradient-text italic font-normal">Freshly Baked Hourly.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl font-sans font-normal leading-relaxed">
              Experience authentic Parisian pastry craftsmanship. From golden laminated butter croissants to bespoke fruit tarts made with 100% Normandy Isigny butter and organic fruits.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-semibold text-base shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Daily Menu</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onBuilderClick}
                className="px-7 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] font-semibold text-base border border-[var(--border-light)] shadow-sm flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
                <span>Build Custom Tart</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)] text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-pistachio)] shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--text-main)]">100% Isigny AOP Butter</p>
                  <p className="text-[var(--text-light)]">Pure French Standard</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--accent-gold)] shrink-0 fill-amber-400" />
                <div>
                  <p className="font-semibold text-[var(--text-main)]">4.9 Star Rating</p>
                  <p className="text-[var(--text-light)]">1,200+ Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[var(--accent-warm)] shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--text-main)]">Specialty Coffee</p>
                  <p className="text-[var(--text-light)]">Ethically Sourced Beans</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Pastry Counter"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/40 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-warm-light)] flex items-center justify-center text-xl">
                    👨‍🍳
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Chef Executive Jean-Luc</h4>
                    <p className="text-xs text-[var(--text-muted)]">Master Pâtissier of Paris</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--accent-gold)] text-white font-bold text-xs">
                    Fresh Today
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
