import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PastryCard } from './components/PastryCard';
import { PastryModal } from './components/PastryModal';
import { CustomPastryBuilder } from './components/CustomPastryBuilder';
import { OvenTracker } from './components/OvenTracker';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { PASTRIES_DATA, CATEGORIES, REVIEWS } from './data/pastriesData';
import { Star, Sparkles, Filter, Coffee, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'builder' | 'oven'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  
  const [cartItems, setCartItems] = useState([
    {
      ...PASTRIES_DATA[0],
      quantity: 2
    },
    {
      ...PASTRIES_DATA[2],
      quantity: 1
    }
  ]);

  const [selectedPastry, setSelectedPastry] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Sync theme attribute on root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Filter pastries based on selected category & search input
  const filteredPastries = PASTRIES_DATA.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.frenchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (pastry, quantityToAdd = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === pastry.id);
      if (existing) {
        return prev.map(item =>
          item.id === pastry.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { ...pastry, quantity: quantityToAdd }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = (data) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-300">
      
      {/* Header Bar */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        theme={theme}
        setTheme={setTheme}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        {activeTab === 'menu' && (
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('pastry-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onBuilderClick={() => setActiveTab('builder')}
          />
        )}

        {/* Tab View 1: Pastry Catalog Menu */}
        {activeTab === 'menu' && (
          <div id="pastry-catalog" className="py-12">
            <div className="container space-y-8">
              
              {/* Category Pills & Controls Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-[var(--text-main)]">
                    Artisanal Selection
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Hand-crafted daily using 100% Isigny AOP Normandy Butter and organic flour.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-[var(--accent-gold)] text-white shadow-md'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Pastry Cards */}
              {filteredPastries.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-main)]">No pastries found</h3>
                  <p className="text-xs text-[var(--text-muted)]">Try searching for another keyword or change your filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPastries.map(pastry => (
                    <PastryCard
                      key={pastry.id}
                      pastry={pastry}
                      onQuickAdd={(p) => handleAddToCart(p, 1)}
                      onViewDetails={(p) => setSelectedPastry(p)}
                      currency={currency}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab View 2: Custom Tart Builder Studio */}
        {activeTab === 'builder' && (
          <CustomPastryBuilder
            onAddCustomToCart={handleAddToCart}
            currency={currency}
          />
        )}

        {/* Tab View 3: Oven Bake Tracker */}
        {activeTab === 'oven' && (
          <OvenTracker />
        )}

        {/* Customer Reviews Section */}
        <section className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
          <div className="container space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <h3 className="font-serif text-3xl font-bold text-[var(--text-main)]">
                Loved by Paris & Worldwide Pastry Lovers
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Read authentic feedback from our daily customers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-main)]">{rev.name}</span>
                    <span className="text-[var(--text-light)]">{rev.date}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[var(--accent-gold)] pt-2 border-t border-[var(--border-subtle)] font-semibold">
                    <span>{rev.city}</span>
                    <span>Verified Gourmet Order</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Detail Modal */}
      <PastryModal
        pastry={selectedPastry}
        onClose={() => setSelectedPastry(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        currency={currency}
      />

      {/* Checkout Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCartItems([]);
        }}
        checkoutData={checkoutData}
        cartItems={cartItems}
        currency={currency}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
