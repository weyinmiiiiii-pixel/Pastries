import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Sparkles, Truck, Store } from 'lucide-react';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [fulfillment, setFulfillment] = useState('delivery'); // 'delivery' | 'pickup'

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = fulfillment === 'delivery' ? (subtotal > 30 ? 0 : 3.99) : 0;
  const discountAmount = subtotal * discount;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  const applyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FRESH10') {
      setDiscount(0.10);
      setPromoApplied('10% OFF Applied!');
    } else if (clean === 'BAKER20') {
      setDiscount(0.20);
      setPromoApplied('20% OFF Applied!');
    } else {
      alert('Invalid promo code. Try "FRESH10" or "BAKER20"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-md bg-[var(--bg-card)] h-full shadow-2xl flex flex-col border-l border-[var(--border-subtle)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">Your Pastry Cart</h3>
            <span className="px-2 py-0.5 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] text-xs font-bold">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fulfillment Options */}
        <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setFulfillment('delivery')}
            className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              fulfillment === 'delivery'
                ? 'bg-[var(--bg-card)] border-[var(--accent-gold)] text-[var(--text-main)] shadow-sm'
                : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            <Truck className="w-4 h-4 text-[var(--accent-warm)]" />
            <span>Local Express ({subtotal > 30 ? 'FREE' : '$3.99'})</span>
          </button>

          <button
            onClick={() => setFulfillment('pickup')}
            className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all ${
              fulfillment === 'pickup'
                ? 'bg-[var(--bg-card)] border-[var(--accent-gold)] text-[var(--text-main)] shadow-sm'
                : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            <Store className="w-4 h-4 text-[var(--accent-gold)]" />
            <span>Bakery Pickup (Free)</span>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-gold-light)] flex items-center justify-center text-3xl mx-auto">
                🥐
              </div>
              <h4 className="font-serif font-bold text-lg text-[var(--text-main)]">Your cart is empty</h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                Add fresh croissants, fruit tarts, or build your own custom creation from our studio menu!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif font-bold text-sm text-[var(--text-main)] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[var(--accent-gold)] font-semibold">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-xs text-[var(--text-main)] min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] space-y-4">
            
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
                <input
                  type="text"
                  placeholder="Promo Code (FRESH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-card)] text-xs border border-[var(--border-subtle)] text-[var(--text-main)] uppercase tracking-wider"
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border border-[var(--border-light)] text-xs font-bold"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {promoApplied}
              </p>
            )}

            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[var(--text-main)]">{formatPrice(subtotal)}</span>
              </div>

              {fulfillment === 'delivery' && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-[var(--text-main)]">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-extrabold text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                <span>Grand Total</span>
                <span className="text-base text-[var(--accent-gold)]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onCheckout({ grandTotal, fulfillment })}
              className="w-full py-4 px-6 rounded-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-bold text-sm shadow-lg flex items-center justify-between transition-all transform active:scale-95"
            >
              <span>Place Bakery Order</span>
              <div className="flex items-center gap-1 font-black">
                <span>{formatPrice(grandTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
