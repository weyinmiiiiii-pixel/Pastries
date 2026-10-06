import React from 'react';
import { MapPin, Phone, Mail, Globe, Share2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] pt-16 pb-12">
      <div className="container space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border-2 border-[#E53935] bg-red-50/60 inline-flex">
              <span className="text-xl">🥐</span>
              <span className="font-serif text-xl font-bold text-[#E53935]">Pastries</span>
            </div>
            <p className="leading-relaxed">
              Crafting artisanal cakes, flaky butter croissants, party small chops, gourmet cupcakes, and fresh bakes daily with 100% natural ingredients.
            </p>
            <div className="flex items-center gap-3 text-[var(--text-main)]">
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[#E53935] transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[#E53935] transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-[var(--bg-secondary)] hover:text-[#E53935] transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Bakery Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Bakery Opening Hours</h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-bold text-[var(--text-main)]">07:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span className="font-bold text-[var(--text-main)]">07:30 - 21:00</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span className="font-bold text-[var(--text-main)]">08:00 - 19:00</span></li>
              <li className="pt-2 text-[#E53935] font-semibold">Fresh Bakes Out of Ovens Hourly</li>
            </ul>
          </div>

          {/* Bakery Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Contact & Location</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                <p>12 Bakery Avenue, Gourmet Center</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                <p>+1 (800) PASTRIES / +1 (800) 727-8743</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-main)]">Pastries Club</h4>
            <p className="text-[11px]">Subscribe for fresh bake alerts and 10% off your first online order.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold transition-colors"
              >
                Join Pastries Club
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-subtle)] text-center text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Pastries Bakery & Pâtisserie. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Freshly Baked Every Day With Passion</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>

      </div>
    </footer>
  );
}
