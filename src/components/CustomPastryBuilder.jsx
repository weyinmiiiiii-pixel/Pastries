import React, { useState } from 'react';
import { Sparkles, Check, Plus, ShoppingBag, RotateCcw, Heart } from 'lucide-react';

const BASES = [
  { id: 'b1', name: 'Sweet Almond Sablé Crust', price: 4.00, icon: '🥧', desc: 'Crispy butter pastry dough' },
  { id: 'b2', name: 'Dark Chocolate Sablé Base', price: 4.50, icon: '🍫', desc: 'Rich cocoa infused butter crust' },
  { id: 'b3', name: 'Caramelized Puff Pastry', price: 5.00, icon: '🥐', desc: '72-layer flaky caramelized pastry' },
  { id: 'b4', name: 'Airy Choux Crown', price: 4.80, icon: '🥯', desc: 'Light French choux ring' }
];

const FILLINGS = [
  { id: 'f1', name: 'Madagascan Vanilla Bean Custard', price: 3.50, color: '#FDF3D0' },
  { id: 'f2', name: '70% Valrhona Dark Chocolate Ganache', price: 4.00, color: '#4A2C1D' },
  { id: 'f3', name: 'Sicilian Pistachio Mousseline', price: 4.50, color: '#88AB75' },
  { id: 'f4', name: 'Tangy Passionfruit Curd', price: 3.80, color: '#F5B041' },
  { id: 'f5', name: 'Breton Fleur de Sel Caramel', price: 3.90, color: '#C07D33' }
];

const TOPPINGS = [
  { id: 't1', name: 'Organic Fresh Raspberries', price: 3.00, icon: '🫐' },
  { id: 't2', name: 'Caramelized Hazelnuts & Almonds', price: 2.50, icon: '🌰' },
  { id: 't3', name: '24k Edible Gold Leaf Flakes', price: 5.00, icon: '✨' },
  { id: 't4', name: 'Vanilla Bean Chantilly Cream', price: 2.00, icon: '🍦' },
  { id: 't5', name: 'Candied Citrus Peels', price: 2.20, icon: '🍊' }
];

export function CustomPastryBuilder({ onAddCustomToCart, currency }) {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedFilling, setSelectedFilling] = useState(FILLINGS[0]);
  const [selectedToppings, setSelectedToppings] = useState([TOPPINGS[0], TOPPINGS[2]]);
  const [customText, setCustomText] = useState("Joyeux Anniversaire!");
  const [isAdded, setIsAdded] = useState(false);

  const toggleTopping = (topping) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      if (selectedToppings.length < 3) {
        setSelectedToppings([...selectedToppings, topping]);
      }
    }
  };

  const calculateTotal = () => {
    const basePrice = selectedBase.price;
    const fillingPrice = selectedFilling.price;
    const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
    return basePrice + fillingPrice + toppingsPrice;
  };

  const formatPrice = (amount) => {
    if (currency === 'EUR') return `€${(amount * 0.92).toFixed(2)}`;
    if (currency === 'GBP') return `£${(amount * 0.79).toFixed(2)}`;
    return `$${amount.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    const customTartItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedBase.name.split(' ')[0]} Tart`,
      frenchTitle: `Création Sur Mesure (${selectedFilling.name.split(' ')[0]})`,
      category: 'Custom Creation',
      price: calculateTotal(),
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Tart', 'Artisan Studio'],
      description: `Bespoke Tart featuring ${selectedBase.name}, filled with ${selectedFilling.name}, topped with ${selectedToppings.map(t => t.name).join(', ')}. ${customText ? `Piping message: "${customText}"` : ''}`,
      detailedIngredients: [selectedBase.name, selectedFilling.name, ...selectedToppings.map(t => t.name)],
      allergens: ['Gluten', 'Dairy', 'Eggs']
    };

    onAddCustomToCart(customTartItem, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="py-12 bg-[var(--bg-primary)]">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-widest border border-[var(--border-light)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-main)]">
            Design Your Custom French Tart
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Choose your signature crust base, artisanal custard filling, and luxury toppings. Our pastry chefs will bake it fresh for your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Layer Preview Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[var(--bg-card)] p-6 md:p-8 rounded-3xl border border-[var(--border-subtle)] shadow-xl space-y-6">
            
            <h3 className="font-serif text-xl font-bold text-[var(--text-main)] flex items-center justify-between">
              <span>Pastry Preview</span>
              <span className="font-sans text-2xl font-black text-[var(--accent-gold)]">
                {formatPrice(calculateTotal())}
              </span>
            </h3>

            {/* Tart Visual Simulator */}
            <div className="relative h-64 rounded-2xl bg-gradient-to-b from-amber-50/50 to-orange-100/50 dark:from-amber-950/20 dark:to-orange-950/20 flex flex-col items-center justify-center p-6 border border-amber-200/40 shadow-inner overflow-hidden">
              
              {/* Toppings Layer */}
              <div className="relative z-30 flex items-center gap-2 animate-bounce">
                {selectedToppings.map((t, idx) => (
                  <span key={idx} className="text-3xl filter drop-shadow-md" title={t.name}>
                    {t.icon}
                  </span>
                ))}
              </div>

              {/* Filling Layer */}
              <div 
                className="w-48 h-12 rounded-xl shadow-md my-2 flex items-center justify-center text-xs font-bold transition-all duration-300 border border-black/10"
                style={{ backgroundColor: selectedFilling.color }}
              >
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${selectedFilling.id === 'f2' ? 'text-white' : 'text-slate-900'}`}>
                  {selectedFilling.name}
                </span>
              </div>

              {/* Crust Base Layer */}
              <div className="w-56 h-10 rounded-b-2xl bg-amber-700/80 border-2 border-amber-800 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                <span className="mr-2">{selectedBase.icon}</span>
                <span className="text-xs font-sans font-semibold">{selectedBase.name}</span>
              </div>

              {/* Custom Piping Plate Message */}
              {customText && (
                <div className="mt-3 text-center">
                  <span className="font-serif italic text-xs text-[var(--accent-warm)] px-3 py-1 rounded-full bg-white/80 dark:bg-black/40 shadow-sm border border-amber-300/50">
                    "{customText}"
                  </span>
                </div>
              )}

            </div>

            {/* Selected Components Summary */}
            <div className="space-y-2 text-xs border-t border-[var(--border-subtle)] pt-4">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Base Crust:</span>
                <span className="font-semibold text-[var(--text-main)]">{selectedBase.name}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Filling:</span>
                <span className="font-semibold text-[var(--text-main)]">{selectedFilling.name}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Toppings ({selectedToppings.length}/3):</span>
                <span className="font-semibold text-[var(--text-main)]">
                  {selectedToppings.map(t => t.name).join(', ') || 'None'}
                </span>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-full font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Added Custom Tart to Order!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Bake & Add Custom Tart — {formatPrice(calculateTotal())}</span>
                </>
              )}
            </button>

          </div>

          {/* Right Column: Interactive Selection Options */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base Crust */}
            <div className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] flex items-center justify-center text-xs font-bold">1</span>
                <span>Select Your Pastry Base</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedBase.id === b.id
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-light)] shadow-sm'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-light)]'
                    }`}
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[var(--text-main)]">{b.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{b.desc}</p>
                    </div>
                    <span className="font-bold text-xs text-[var(--accent-gold)]">{formatPrice(b.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Filling */}
            <div className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] flex items-center justify-center text-xs font-bold">2</span>
                <span>Choose Your Artisanal Filling</span>
              </h4>
              <div className="space-y-2">
                {FILLINGS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFilling(f)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedFilling.id === f.id
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-light)] shadow-sm'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-light)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: f.color }} />
                      <span className="font-bold text-xs text-[var(--text-main)]">{f.name}</span>
                    </div>
                    <span className="font-bold text-xs text-[var(--accent-gold)]">{formatPrice(f.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Toppings (Max 3) */}
            <div className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] flex items-center justify-center text-xs font-bold">3</span>
                  <span>Select Gourmet Toppings</span>
                </h4>
                <span className="text-xs font-semibold text-[var(--text-muted)]">Max 3 choices</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOPPINGS.map((t) => {
                  const isSelected = selectedToppings.some(st => st.id === t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTopping(t)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[var(--accent-warm)] bg-[var(--accent-warm-light)] shadow-sm'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-light)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{t.icon}</span>
                        <span className="font-bold text-xs text-[var(--text-main)]">{t.name}</span>
                      </div>
                      <span className="font-bold text-xs text-[var(--accent-warm)]">{formatPrice(t.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Personal Message Piping */}
            <div className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] flex items-center justify-center text-xs font-bold">4</span>
                <span>Personal Piping Message (Free)</span>
              </h4>
              <input
                type="text"
                placeholder="e.g., Happy Birthday Sarah! / Joyeux Anniversaire!"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={40}
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-main)] focus:border-[var(--accent-gold)] transition-colors"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
