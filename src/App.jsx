import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Hero } from './components/Hero';
import { PictorialCategoryGrid } from './components/PictorialCategoryGrid';
import { PastryCard } from './components/PastryCard';
import { PastryModal } from './components/PastryModal';
import { CustomPastryBuilder } from './components/CustomPastryBuilder';
import { OvenTracker } from './components/OvenTracker';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { PASTRIES_DATA, CATEGORIES, REVIEWS } from './data/pastriesData';
import { Star, Sparkles, Filter, Coffee, ShieldCheck, Heart, Award, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'builder' | 'oven'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState(['p1', 'c1']);
  
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

  // Wishlist Handler
  const handleToggleWishlist = (pastryId) => {
    setWishlist(prev => 
      prev.includes(pastryId) 
        ? prev.filter(id => id !== pastryId)
        : [...prev, pastryId]
    );
  };

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
      
      {/* Top Header Bar */}
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
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Website Three-Column Grid Layout */}
      <div className="flex-grow w-full max-w-[1600px] mx-auto flex gap-6 px-4 py-6">
        
        {/* Persistent Left Sidebar */}
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
          wishlistCount={wishlist.length}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
        />

        {/* Central Stage Main Content Area */}
        <main className="flex-1 min-w-0 space-y-10">
          
          {/* Hero Banner Showcase */}
          {activeTab === 'menu' && (
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('pastry-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onBuilderClick={() => setActiveTab('builder')}
              onQuickAdd={handleAddToCart}
            />
          )}

          {/* Menu Catalog View */}
          {activeTab === 'menu' && (
            <div id="pastry-catalog" className="space-y-8">
              
              {/* Pictorial Category Cards */}
              <PictorialCategoryGrid
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {/* Category Filter Pills & Search Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-black text-[var(--text-main)]">
                    {selectedCategory === 'All' ? 'Artisanal Daily Catalog' : `${selectedCategory} Collection`}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Hand-crafted daily using 100% Isigny AOP Normandy Butter and organic flour.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
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
                <div className="text-center py-16 space-y-3 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-light)] p-8">
                  <div className="text-5xl">🥐</div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--text-main)]">No pastries match your search</h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Try searching for another keyword or select "All" categories to view all delicious offerings.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPastries.map(pastry => (
                    <PastryCard
                      key={pastry.id}
                      pastry={pastry}
                      onQuickAdd={(p) => handleAddToCart(p, 1)}
                      onViewDetails={(p) => setSelectedPastry(p)}
                      currency={currency}
                      isWishlisted={wishlist.includes(pastry.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Custom Tart Studio View */}
          {activeTab === 'builder' && (
            <CustomPastryBuilder
              onAddCustomToCart={handleAddToCart}
              currency={currency}
            />
          )}

          {/* Live Warm Oven Tracker View */}
          {activeTab === 'oven' && (
            <OvenTracker />
          )}

          {/* Customer Reviews Section */}
          <section className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-light)] shadow-md space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[var(--text-main)]">
                Loved by Paris & Worldwide Pastry Lovers
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Read authentic feedback from our daily customers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 hover:border-[var(--accent-gold)] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[var(--text-main)]">{rev.name}</span>
                    <span className="text-[var(--text-light)] font-mono">{rev.date}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[var(--accent-gold)] pt-2 border-t border-[var(--border-subtle)] font-bold">
                    <span>{rev.city}</span>
                    <span>Verified Gourmet Order</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* Persistent Right Sidebar */}
        <RightSidebar
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
          onQuickAdd={handleAddToCart}
          currency={currency}
          setActiveTab={setActiveTab}
        />

      </div>

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
