import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Globe, Share2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] pt-16 pb-12">
      <div className="container space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥐</span>
              <span className="font-serif text-2xl font-bold text-[var(--text-main)]">L'Étoile</span>
            </div>
            <p className="leading-relaxed">
              Maison de Pâtisserie fondée en 1892. Crafting artisanal viennoiserie, fine pastries, and custom celebration tarts with 100% Normandy Isigny AOP butter.
            </p>
            <div className="flex items-center gap-3 text-[var(--text-main)]">
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Bakery Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Bakery Opening Hours</h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-bold text-[var(--text-main)]">07:00 - 19:30</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span className="font-bold text-[var(--text-main)]">07:30 - 20:00</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span className="font-bold text-[var(--text-main)]">08:00 - 18:00</span></li>
              <li className="pt-2 text-[var(--accent-gold)] font-semibold">Fresh Ovens Bake Every 2 Hours</li>
            </ul>
          </div>

          {/* Flagship Store Locations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Our Flagship Stores</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <p>42 Boulevard Saint-Germain, 75005 Paris</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <p>+33 1 43 29 88 00</p>
              </div>
            </div>
          </div>

          {/* VIP Club Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Le Club des Gourmands</h4>
            <p className="text-[11px]">Subscribe for secret seasonal pastry drops and 10% off your first online order.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-bold transition-colors"
              >
                Join Pastry Club
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-subtle)] text-center text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} L'Étoile Patisserie & Bakery. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with French Passion & Normandy Butter</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
}
