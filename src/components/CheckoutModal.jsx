import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Clock, MapPin, Sparkles, X } from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, checkoutData, cartItems, currency }) {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst upon order placement
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] p-6 md:p-8 space-y-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-[var(--accent-gold-light)] border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
          🥐
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            Order Confirmed & Baking!
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)]">
            Merci beaucoup!
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Order Ref: <span className="font-mono font-bold text-[var(--text-main)]">{orderNumber}</span>
          </p>
        </div>

        {/* Fulfillment Timer & Map Details */}
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-left space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[var(--accent-warm)] shrink-0" />
            <div>
              <p className="font-bold text-[var(--text-main)]">
                {checkoutData?.fulfillment === 'delivery' ? 'Estimated Express Delivery: 25 - 35 Mins' : 'Ready for Bakery Pickup in: 15 Mins'}
              </p>
              <p className="text-[var(--text-light)]">Freshly wrapped in our signature foil pastry box.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
            <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
            <div>
              <p className="font-bold text-[var(--text-main)]">L'Étoile Flagship Patisserie</p>
              <p className="text-[var(--text-light)]">42 Boulevard Saint-Germain, Paris / Downtown Store</p>
            </div>
          </div>
        </div>

        {/* Order Receipt Items */}
        <div className="space-y-2 text-left text-xs max-h-40 overflow-y-auto pr-1">
          <p className="font-bold text-[var(--text-main)] uppercase tracking-wider text-[10px]">Order Summary:</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-[var(--text-muted)]">
              <span>{item.quantity}x {item.name}</span>
              <span className="font-bold text-[var(--text-main)]">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Total Paid */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-bold text-sm">
          <span className="text-[var(--text-main)]">Total Charged</span>
          <span className="text-xl font-extrabold text-[var(--accent-gold)]">
            {formatPrice(checkoutData?.grandTotal || 0)}
          </span>
        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-bold text-sm shadow-md transition-all"
        >
          Return to Bakery Menu
        </button>

      </div>
    </div>
  );
}
