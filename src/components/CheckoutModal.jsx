import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Clock, MapPin, Sparkles, X, Gift } from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, checkoutData, cartItems, currency }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#F5E096', '#C85A32', '#FFFFFF']
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const orderNumber = `LE-${Math.floor(100000 + Math.random() * 900000)}`;

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--border-light)] p-6 md:p-8 space-y-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Emblem */}
        <div className="w-20 h-20 rounded-full bg-[var(--gold-gradient)] p-0.5 shadow-glow mx-auto animate-bounce">
          <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-4xl shadow-inner">
            🥐
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-gold)] block">
            Order Transmitted to Stone Furnace #2
          </span>
          <h2 className="font-serif text-3xl font-black text-[var(--text-main)]">
            Merci Beaucoup!
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Boutique Order Ref: <span className="font-bold text-[var(--accent-gold)]">{orderNumber}</span>
          </p>
        </div>

        {/* Status Timeline */}
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-xs text-left space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[var(--accent-warm)] shrink-0" />
            <div>
              <p className="font-extrabold text-[var(--text-main)]">
                {checkoutData?.fulfillment === 'delivery' ? 'Express Gourmet Delivery: ~ 30 Mins' : 'Warm Bakery Pickup: Ready in 15 Mins'}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">Baked with 100% Isigny Normandy AOP Butter.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
            <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
            <div>
              <p className="font-bold text-[var(--text-main)]">L'Étoile Flagship Patisserie</p>
              <p className="text-[11px] text-[var(--text-muted)]">42 Boulevard Saint-Germain, Paris / Boutique Kitchen</p>
            </div>
          </div>
        </div>

        {/* Order Breakdown */}
        <div className="space-y-2 text-left text-xs max-h-36 overflow-y-auto pr-1 border-t border-[var(--border-subtle)] pt-3">
          <p className="font-black text-[var(--text-main)] uppercase tracking-wider text-[10px]">Purchased Items Summary:</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-main)]">{item.quantity}x {item.name}</span>
              <span className="font-bold text-[var(--accent-gold)]">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Total Charge */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-bold text-sm">
          <span className="text-[var(--text-main)] font-extrabold">Total Charged</span>
          <span className="text-2xl font-black text-[var(--accent-gold)]">
            {formatPrice(checkoutData?.grandTotal || 0)}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-4 px-6 rounded-full bg-[var(--gold-gradient)] hover:brightness-110 text-white font-extrabold text-sm shadow-xl uppercase tracking-wide transition-all transform active:scale-95"
        >
          Return to Bakery Menu
        </button>

      </div>
    </div>
  );
}
