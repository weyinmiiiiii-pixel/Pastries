import React from 'react';
import { ArrowRight, PhoneCall, Sparkles, ShieldCheck, Flame, Star } from 'lucide-react';

export function Hero({ onExploreClick, onBuilderClick }) {
  return (
    <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px] flex items-center justify-center rounded-3xl my-2 border border-[var(--border-subtle)] shadow-xl">
      
      {/* Full Bleed Background Image (Teapot & Cozy Pastry Tea Setting as in screenshot) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=2000&q=80"
          alt="Mamana Cakes & Pastries Tea Setting"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Dark Overlay to ensure readability exactly like screenshot */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
      </div>

      {/* Main Centered Content Stack */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-12 sm:py-16 space-y-6 text-white">
        
        {/* Subtitle Tag in Red Caps */}
        <div className="inline-block">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF5252] drop-shadow-sm">
            PREMIUM CAKES & SNACKS
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
          Beautiful Bakes & <br />
          <span className="text-[#FF5252] italic font-serif font-normal">
            Delicious Bites
          </span>
        </h1>

        {/* Paragraph Text */}
        <p className="text-base sm:text-xl text-stone-200 font-sans font-normal max-w-xl mx-auto leading-relaxed">
          From celebrations to corporate orders, we deliver custom cakes, cupcakes, and event small chops on time, every time.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          
          {/* Primary Action Button (Solid Red Pill) */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 tracking-wide flex items-center justify-center gap-2"
          >
            <span>View Order Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary Action Button (Outline Pill) */}
          <button
            onClick={onBuilderClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-base border-2 border-white/80 shadow-md backdrop-blur-sm transition-all transform hover:-translate-y-0.5 tracking-wide flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Custom Order</span>
          </button>

        </div>

        {/* Live Batch Highlight Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/20 text-xs text-stone-300 backdrop-blur-md pt-2">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Fresh Batch Baking Now • Express 45 Min Delivery</span>
        </div>

      </div>

    </section>
  );
}
