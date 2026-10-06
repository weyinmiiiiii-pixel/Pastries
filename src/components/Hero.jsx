import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Star, Coffee, Award, Layers, ChevronRight } from 'lucide-react';
import { playCartChime } from './BoutiqueAudio';

const HERO_SPOTLIGHTS = [
  {
    id: 'p1',
    name: "Classic Normandy Butter Croissant",
    frenchTitle: "Croissant Pur Beurre de Normandie",
    price: 3.80,
    tag: "84% Isigny Butter",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80",
    desc: "Golden lamination crafted through 81 delicate honeycomb butter layers.",
    layers: "81 Flaky Butter Layers"
  },
  {
    id: 'c1',
    name: "Velvet Red Romance Layer Cake",
    frenchTitle: "Gâteau Velours Rouge Royale",
    price: 32.00,
    tag: "Masterpiece",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
    desc: "Moist red velvet sponge infused with Madagascan vanilla cream cheese frosting.",
    layers: "3 Soft Sponge Layers"
  },
  {
    id: 'p3',
    name: "Fresh Raspberry & Vanilla Bean Tart",
    frenchTitle: "Tarte aux Framboises & Vanille Bourbon",
    price: 7.90,
    tag: "24k Gold Leaf",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80",
    desc: "Crispy sweet sablé crust filled with Bourbon vanilla diplomat cream & fresh berries.",
    layers: "Almond Sablé & Vanilla Diplomat"
  },
  {
    id: 'sc1',
    name: "Deluxe Party Small Chops Platter",
    frenchTitle: "Plateau de Mini Feuilletés & Samoussas",
    price: 24.90,
    tag: "Warm Out of Oven",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80",
    desc: "Crispy spicy samosas, vegetable spring rolls, puff-puff & mini meat pies.",
    layers: "24 Crisp Savory Pieces"
  }
];

export function Hero({ onExploreClick, onBuilderClick, onQuickAdd }) {
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(740);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto slide spotlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpotlightIdx(prev => (prev + 1) % HERO_SPOTLIGHTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = HERO_SPOTLIGHTS[activeSpotlightIdx];

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative overflow-hidden py-14 lg:py-24 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-primary)] border-b border-[var(--border-light)]">
      
      {/* Decorative ambient lighting glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Opulent Typography & Main CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Oven Batch Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--accent-gold-light)] border border-[var(--border-light)] shadow-sm">
              <Flame className="w-4 h-4 text-[var(--accent-warm)] animate-bounce" />
              <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                Fresh Batch Baking in Oven #2:
              </span>
              <span className="font-mono text-xs font-extrabold text-[var(--accent-gold)] px-2 py-0.5 rounded-full bg-white dark:bg-black/40 shadow-inner">
                {formatTimer(secondsLeft)}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[var(--text-main)] leading-[1.12] tracking-tight">
              Artisanal French Pastries, <br />
              <span className="gold-gradient-text italic font-normal font-display">
                Baked Fresh Hourly.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl font-sans font-normal leading-relaxed">
              Experience the unmatched luxury of authentic Parisian baking. From 81-layer golden butter croissants to custom hand-crafted tarts and savory event platters.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-[var(--gold-gradient)] hover:brightness-110 text-white font-extrabold text-sm shadow-xl hover:shadow-glow flex items-center gap-2.5 transition-all transform hover:-translate-y-1 active:translate-y-0 tracking-wide uppercase"
              >
                <span>Explore Daily Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBuilderClick}
                className="px-8 py-4 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] font-extrabold text-sm border border-[var(--border-light)] shadow-md flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 tracking-wide uppercase"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Custom Tart Studio</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-pistachio-light)] flex items-center justify-center text-[var(--accent-pistachio)] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[var(--text-main)]">Isigny AOP Butter</p>
                  <p className="text-[11px] text-[var(--text-muted)]">100% Pure French</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-gold-light)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[var(--text-main)]">4.9★ Master Rating</p>
                  <p className="text-[11px] text-[var(--text-muted)]">1,400+ Gourmet Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-warm-light)] flex items-center justify-center text-[var(--accent-warm)] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[var(--text-main)]">Maison 1892</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Heritage Technique</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Spotlight Pastry Showcase Carousel */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden glass-card border-2 border-[var(--border-light)] p-2 shadow-2xl group">
              <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge Ribbon */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--gold-gradient)] text-white shadow-md">
                    {currentItem.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    <Layers className="w-3 h-3 inline mr-1 text-amber-300" />
                    {currentItem.layers}
                  </span>
                </div>

                {/* Bottom Interactive Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-5 rounded-2xl glass-panel border border-white/30 text-white shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-amber-300 font-bold">Chef Signature</p>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">
                        {currentItem.name}
                      </h3>
                      <p className="text-xs italic text-amber-100/80 font-serif">
                        {currentItem.frenchTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-xl font-black text-white">
                        ${currentItem.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/90 line-clamp-2 leading-relaxed font-sans">
                    {currentItem.desc}
                  </p>
                </div>
              </div>

              {/* Spotlight Carousel Selector Dots */}
              <div className="flex items-center justify-between p-3 bg-[var(--bg-card)] rounded-b-2xl">
                <div className="flex items-center gap-2">
                  {HERO_SPOTLIGHTS.map((spot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSpotlightIdx(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSpotlightIdx === idx
                          ? 'w-8 bg-[var(--accent-gold)] shadow-sm'
                          : 'w-2.5 bg-[var(--border-subtle)] hover:bg-[var(--accent-gold-light)]'
                      }`}
                      title={spot.name}
                    />
                  ))}
                </div>

                <div className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1">
                  <span>{activeSpotlightIdx + 1} of {HERO_SPOTLIGHTS.length} Spotlight</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
