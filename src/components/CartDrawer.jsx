import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Sparkles, Truck, Store, Gift } from 'lucide-react';
import { playCartChime } from './BoutiqueAudio';

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
  const [isGiftBox, setIsGiftBox] = useState(true);

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
    if (clean === 'FRESH10' || clean === 'PARIS10') {
      setDiscount(0.10);
      setPromoApplied('10% OFF Applied!');
    } else if (clean === 'BAKER20') {
      setDiscount(0.20);
      setPromoApplied('20% OFF Applied!');
    } else {
      alert('Invalid promo code. Try "PARIS10" or "BAKER20"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[var(--bg-card)] h-full shadow-2xl flex flex-col border-l-2 border-[var(--border-light)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-gold-light)] flex items-center justify-center text-[var(--accent-gold)]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-xl text-[var(--text-main)]">Your Pastry Order</h3>
              <p className="text-[11px] text-[var(--text-muted)]">Hand-crafted at L'Étoile Maison 1892</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fulfillment Choice (Express Delivery vs Bakery Pickup) */}
        <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setFulfillment('delivery')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
              fulfillment === 'delivery'
                ? 'bg-[var(--bg-card)] border-[var(--accent-gold)] text-[var(--text-main)] shadow-md'
                : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            <Truck className="w-4 h-4 text-[var(--accent-warm)]" />
            <span>Express Delivery ({subtotal > 30 ? 'FREE' : '$3.99'})</span>
          </button>

          <button
            onClick={() => setFulfillment('pickup')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
              fulfillment === 'pickup'
                ? 'bg-[var(--bg-card)] border-[var(--accent-gold)] text-[var(--text-main)] shadow-md'
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
              <div className="w-20 h-20 rounded-full bg-[var(--accent-gold-light)] flex items-center justify-center text-4xl mx-auto shadow-inner">
                🥐
              </div>
              <h4 className="font-serif font-black text-xl text-[var(--text-main)]">Your cart is empty</h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
                Explore our daily menu of golden croissants, fruit tarts, cakes, small chops, or build your own tart in the Studio!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] flex gap-4 items-center shadow-sm hover:border-[var(--accent-gold)] transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-black/10"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif font-extrabold text-sm text-[var(--text-main)] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[var(--accent-gold)] font-bold">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-black text-xs text-[var(--text-main)] min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        playCartChime();
                        onUpdateQuantity(item.id, item.quantity + 1);
                      }}
                      className="p-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
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

        {/* Gift Ribbon Option & Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-light)] space-y-4">
            
            {/* Complimentary Luxury Ribbon Box Checkbox */}
            <div 
              onClick={() => setIsGiftBox(!isGiftBox)}
              className="p-3 rounded-2xl bg-[var(--accent-gold-light)] border border-[var(--border-light)] cursor-pointer flex items-center justify-between text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="text-[var(--text-main)]">Complimentary Gold Ribbon Gift Box</span>
              </div>
              <input
                type="checkbox"
                checked={isGiftBox}
                onChange={() => {}}
                className="w-4 h-4 text-[var(--accent-gold)] accent-[var(--accent-gold)] cursor-pointer"
              />
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
                <input
                  type="text"
                  placeholder="Promo Code (PARIS10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-card)] text-xs border border-[var(--border-light)] text-[var(--text-main)] uppercase tracking-wider font-bold"
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border border-[var(--border-light)] text-xs font-extrabold uppercase"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                ✓ {promoApplied}
              </p>
            )}

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[var(--text-main)]">{formatPrice(subtotal)}</span>
              </div>

              {fulfillment === 'delivery' && (
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="font-bold text-[var(--text-main)]">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                <span>Grand Total</span>
                <span className="text-lg font-black text-[var(--accent-gold)]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onCheckout({ grandTotal, fulfillment, isGiftBox })}
              className="w-full py-4 px-6 rounded-full bg-[var(--gold-gradient)] hover:brightness-110 text-white font-extrabold text-sm shadow-xl flex items-center justify-between transition-all transform active:scale-95 uppercase tracking-wide"
            >
              <span>Place Bakery Order</span>
              <div className="flex items-center gap-1.5 font-black">
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
