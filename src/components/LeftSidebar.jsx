import React from 'react';
import { 
  Utensils, Sparkles, Clock, Flame, Heart, Music, 
  Award, ChevronRight, Compass, Star, MapPin
} from 'lucide-react';
import { CATEGORIES } from '../data/pastriesData';

const CATEGORY_IMAGES = {
  'All': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=150&q=80',
  'Cakes': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=150&q=80',
  'Small Chops': 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=150&q=80',
  'Cupcakes': 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=150&q=80',
  'Viennoiserie': 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=150&q=80',
  'Tarts': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=150&q=80',
  'Macarons': 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=150&q=80'
};

export function LeftSidebar({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  isAudioPlaying,
  setIsAudioPlaying,
  wishlistCount,
  isOpenMobile,
  setIsOpenMobile
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-24 left-0 z-50 lg:z-10
        h-screen lg:h-[calc(100vh-7rem)] w-72 
        bg-[var(--bg-card)] border-r lg:border border-[var(--border-light)] lg:rounded-3xl
        p-5 flex flex-col justify-between overflow-y-auto shadow-xl lg:shadow-md
        transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* Header Mobile Close & Maison Badge */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gold-gradient)] p-0.5 shadow-md">
                <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center text-xl">
                  🏛️
                </div>
              </div>
              <div>
                <h2 className="font-serif font-extrabold text-base text-[var(--text-main)] gold-gradient-text leading-tight">
                  Maison L'Étoile
                </h2>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                  Paris Est. 1892
                </p>
              </div>
            </div>
            {isOpenMobile && (
              <button 
                onClick={() => setIsOpenMobile(false)}
                className="lg:hidden p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Main App Navigation Section */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-light)] px-3 block mb-2">
              Boutique Navigation
            </span>

            <button
              onClick={() => { setActiveTab('menu'); setIsOpenMobile(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'menu'
                  ? 'bg-[var(--gold-gradient)] text-white shadow-lg'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-4 h-4" />
                <span>Pastry Catalog</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => { setActiveTab('builder'); setIsOpenMobile(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'builder'
                  ? 'bg-[var(--gold-gradient)] text-white shadow-lg'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Custom Tart Studio</span>
              </div>
              <span className="px-2 py-0.5 text-[9px] uppercase font-black bg-amber-400 text-black rounded-full">
                New
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('oven'); setIsOpenMobile(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'oven'
                  ? 'bg-[var(--gold-gradient)] text-white shadow-lg'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[var(--accent-warm)]" />
                <span>Live Bake Schedule</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </button>
          </div>

          {/* Pictorial Category Explorer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-light)]">
                Pictorial Categories
              </span>
              <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (activeTab !== 'menu') setActiveTab('menu');
                      setIsOpenMobile(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-[var(--accent-gold-light)] border-[var(--accent-gold)] text-[var(--accent-gold-hover)] shadow-sm'
                        : 'border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={CATEGORY_IMAGES[cat]}
                        alt={cat}
                        className="w-7 h-7 rounded-lg object-cover shadow-sm"
                      />
                      <span>{cat}</span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Boutique Audio Music Ambience Mini-Player */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className={`w-4 h-4 ${isAudioPlaying ? 'text-[var(--accent-gold)] animate-bounce' : 'text-[var(--text-muted)]'}`} />
                <span className="text-xs font-bold text-[var(--text-main)]">Paris Ambience</span>
              </div>
              <button
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all ${
                  isAudioPlaying
                    ? 'bg-[var(--accent-gold)] text-white shadow-sm'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                }`}
              >
                {isAudioPlaying ? 'Playing 🎷' : 'Play 🎵'}
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-tight italic">
              "Relaxing accordion & bistro sounds live from Le Marais, Paris"
            </p>
          </div>

        </div>

        {/* Footer info in sidebar */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-warm)]" />
            <span>Rue Saint-Honoré, Paris</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[var(--text-light)]">
            <span>© 2026 Maison L'Étoile</span>
            <span className="text-emerald-500 font-bold">🟢 Open Daily</span>
          </div>
        </div>

      </aside>
    </>
  );
}
