import { useState, useMemo, MouseEvent } from 'react';
import { 
  Menu, 
  ShoppingBag, 
  Heart, 
  User, 
  X, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  MapPin, 
  CreditCard, 
  Settings, 
  Plus, 
  Minus, 
  Check, 
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, INITIAL_ORDERS, INITIAL_WISHLIST, Product, Order } from './data';

export default function App() {
  // Navigation & Page state
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'wishlist' | 'profile'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [profileSubView, setProfileSubView] = useState<'main' | 'orders'>('main');
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'IN PROGRESS' | 'DELIVERED' | 'CANCELLED'>('ALL');
  
  // E-commerce state
  const [wishlist, setWishlist] = useState<Product[]>(INITIAL_WISHLIST);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<{ product: Product; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [activeDetailImage, setActiveDetailImage] = useState<string>('');
  
  // Filter variables under Shop Tab
  const [sizeFilter, setSizeFilter] = useState<string>('ALL');
  const [colorFilter, setColorFilter] = useState<string>('ALL');
  const [collectionFilter, setCollectionFilter] = useState<string>('ALL');

  // Feedback notifications
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Find currently selected product for detail view
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return PRODUCTS.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId]);

  // Set initial image when detail view opens
  const handleSelectProduct = (productId: string) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      setActiveDetailImage(prod.images?.[0] || prod.image);
      // Preselect default size if product has sizes
      if (prod.sizes && prod.sizes.length > 0) {
        setSelectedSize(prod.sizes[1] || prod.sizes[0]);
      } else {
        setSelectedSize('S');
      }
    }
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper selectors
  const toggleWishlist = (product: Product, event?: MouseEvent) => {
    if (event) event.stopPropagation();
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast(`Removed from curated wishlist.`);
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Added to curated wishlist.`);
    }
  };

  const handleAddToCart = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, size, quantity: 1 }]);
    }
    showToast(`Added ${product.name} (Size ${size}) to bag.`);
  };

  const handleMoveToBag = (product: Product) => {
    handleAddToCart(product, 'S');
    setWishlist(wishlist.filter(item => item.id !== product.id));
    showToast(`Moved ${product.name} to bag.`);
  };

  const updateCartQuantity = (productId: string, size: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId && item.size === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart(updated);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(cart.filter(item => !(item.product.id === productId && item.size === size)));
    showToast(`Removed item from bag.`);
  };

  const handleTrackOrder = (orderNumber: string) => {
    showToast(`Tracking status initialized for #${orderNumber}. Standard carrier speed.`,);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'CANCELLED' };
      }
      return order;
    }));
    showToast(`Order has been cancelled.`);
  };

  // Filtered orders list based on toggle
  const filteredOrders = useMemo(() => {
    if (orderFilter === 'ALL') return orders;
    return orders.filter(o => o.status === orderFilter);
  }, [orders, orderFilter]);

  // Combined metrics calculator
  const totalCartValue = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-brand-white text-brand-black font-sans relative pb-28 md:pb-12 antialiased">
      
      {/* Dynamic Toast Feedback Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -45, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-black text-brand-white text-xs uppercase tracking-[0.2em] py-4 px-8 shadow-2xl flex items-center gap-3 border border-brand-black/20"
          >
            <Check className="w-4 h-4 text-brand-white stroke-[3px]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TopAppBar - Global Luxury Header */}
      <header className="sticky top-0 bg-brand-white/80 backdrop-blur-xl z-40 hairline-border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Menu Icon */}
          <div className="flex-1 flex justify-start">
            <button className="p-2 -ml-2 text-brand-black hover:opacity-50 transition-opacity relative group" onClick={() => showToast("Navigation drawer is represented below.")}>
              <Menu className="w-5 h-5 stroke-[1.5px]" />
              <span className="absolute left-0 bottom-[-16px] text-[8px] tracking-[0.1em] scale-0 group-hover:scale-100 transition-transform origin-top uppercase text-brand-grey font-semibold">MENU</span>
            </button>
          </div>
          
          {/* Brand Logo Header */}
          <div className="flex-grow flex justify-center text-center">
            <h1 
              onClick={() => { setSelectedProductId(null); setActiveTab('home'); }}
              className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-light cursor-pointer select-none"
            >
              LUMIÈRE
            </h1>
          </div>

          {/* Cart Icon & Count */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 -mr-2 text-brand-black hover:opacity-50 transition-opacity relative flex items-center"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-black rounded-full" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Primary Main Content Stage */}
      <main className="max-w-7xl mx-auto min-h-[calc(100vh-10rem)] w-full">
        <AnimatePresence mode="wait">
          
          {/* 1. PRODUCT DETAIL PAGE (if active) */}
          {selectedProduct ? (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-6 pb-20 px-6 md:px-12"
            >
              {/* Back breadcrumb */}
              <button 
                onClick={() => setSelectedProductId(null)}
                className="flex items-center gap-2 mb-8 text-[11px] font-semibold text-brand-grey hover:text-brand-black uppercase tracking-[0.15em] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 stroke-[1.5px]" />
                <span>Return to collection</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
                
                {/* Product Gallery Gallery Grid */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-offwhite">
                    <img 
                      src={activeDetailImage || selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    />
                    <button 
                      onClick={(e) => toggleWishlist(selectedProduct, e)}
                      className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm hover:opacity-75"
                    >
                      <Heart 
                        className={`w-5 h-5 stroke-[1.5px] ${wishlist.some(item => item.id === selectedProduct.id) ? 'fill-brand-black text-brand-black' : 'text-brand-black'}`} 
                      />
                    </button>
                  </div>

                  {/* Asymmetrical Detail Thumbnails Grid */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-6">
                      <div 
                        onClick={() => setActiveDetailImage(selectedProduct.images?.[1] || '')}
                        className="aspect-[4/5] overflow-hidden bg-brand-offwhite cursor-pointer group"
                      >
                        <img 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                          src={selectedProduct.images[1]} 
                          alt="Detailed Texture close-up" 
                        />
                      </div>
                      <div 
                        onClick={() => setActiveDetailImage(selectedProduct.images?.[2] || '')}
                        className="aspect-[4/5] overflow-hidden bg-brand-offwhite cursor-pointer mt-12 group"
                      >
                        <img 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                          src={selectedProduct.images[2]} 
                          alt="Model posture detail" 
                        />
                      </div>
                    </div>
                  )}

                  {selectedProduct.images && selectedProduct.images.length > 3 && (
                    <div 
                      onClick={() => setActiveDetailImage(selectedProduct.images?.[3] || '')}
                      className="aspect-[16/9] overflow-hidden bg-brand-offwhite cursor-pointer"
                    >
                      <img 
                        className="w-full h-full object-cover"
                        src={selectedProduct.images[3]} 
                        alt="Lifestyle broadsheet context" 
                      />
                    </div>
                  )}
                </div>

                {/* Product Information Panel */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col space-y-12">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-grey">
                        {selectedProduct.category || "Collection № 04"}
                      </p>
                      <button 
                        onClick={(e) => toggleWishlist(selectedProduct, e)}
                        className="text-brand-black hover:opacity-50 transition-opacity"
                      >
                        <Heart className={`w-5 h-5 stroke-[1.5px] ${wishlist.some(item => item.id === selectedProduct.id) ? 'fill-brand-black' : ''}`} />
                      </button>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight tracking-tight text-brand-black flex flex-col">
                      {selectedProduct.name.split(' ').map((word, i) => (
                        <span key={i}>{word}</span>
                      ))}
                    </h2>
                    <p className="text-xl font-light tracking-tight text-brand-black">${selectedProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm leading-relaxed text-brand-black/80 max-w-md">
                      {selectedProduct.description || "A masterclass in modern designer tailoring. Designed with spatial guidelines, precision, and an eye for absolute luxury finishes."}
                    </p>
                    
                    <div className="pt-4 flex flex-col space-y-2 text-xs uppercase tracking-[0.15em] font-semibold">
                      <div className="flex justify-between items-center py-4 border-b border-brand-line">
                        <span className="text-brand-grey font-medium">Material</span>
                        <span className="text-brand-black font-semibold">{selectedProduct.meta || "Virgin Wool & Silk blends"}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-brand-line">
                        <span className="text-brand-grey font-medium">Origin</span>
                        <span className="text-brand-black font-semibold">{selectedProduct.origin || "Milan, Italy"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-black">Select Size</label>
                      <button 
                        onClick={() => showToast("Size guide recommendation: True to size model fit.")}
                        className="text-[10px] font-semibold underline underline-offset-4 uppercase tracking-[0.1em] text-brand-grey hover:text-brand-black transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProduct.sizes ? selectedProduct.sizes.map((size) => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-4 text-xs font-semibold tracking-wider transition-all border ${
                            selectedSize === size 
                              ? 'bg-brand-black text-brand-white border-brand-black' 
                              : 'bg-brand-white text-brand-black border-brand-line hover:border-brand-black'
                          }`}
                        >
                          {size}
                        </button>
                      )) : ['XS', 'S', 'M', 'L'].map((size) => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-4 text-xs font-semibold tracking-wider transition-all border ${
                            selectedSize === size 
                              ? 'bg-brand-black text-brand-white border-brand-black' 
                              : 'bg-brand-white text-brand-black border-brand-line hover:border-brand-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Bag Action */}
                  <div className="flex flex-col space-y-4">
                    <button 
                      onClick={() => handleAddToCart(selectedProduct, selectedSize)}
                      className="w-full bg-brand-black text-brand-white py-6 px-8 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-brand-black/90 transition-colors"
                    >
                      Add to Bag
                    </button>
                    <p className="text-center text-[10px] text-brand-grey tracking-wider pt-2">
                      Free express courier delivery on all curated orders.
                    </p>
                  </div>

                  {/* Accordion Secondary Info Accents */}
                  <div className="pt-6 space-y-4 border-t border-brand-line">
                    <details className="group cursor-pointer">
                      <summary className="list-none flex justify-between items-center py-4 text-[10px] uppercase tracking-[0.15em] font-bold text-brand-black select-none">
                        <span>Sustainability Policy</span>
                        <ChevronRight className="w-4 h-4 text-brand-black transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="pb-6 text-xs text-brand-grey leading-relaxed pr-4 font-normal">
                        {selectedProduct.sustainability || "Our silk and wool components are OEKO-TEX® certified, ensuring absolutely no harmful ingredients. We proudly partner with family-owned mills in Como and Biella."}
                      </div>
                    </details>
                    
                    <details className="group cursor-pointer">
                      <summary className="list-none flex justify-between items-center py-4 border-t border-brand-line text-[10px] uppercase tracking-[0.15em] font-bold text-brand-black select-none">
                        <span>Care Instructions</span>
                        <ChevronRight className="w-4 h-4 text-brand-black transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="pb-6 text-xs text-brand-grey leading-relaxed pr-4 font-normal">
                        {selectedProduct.care || "Dry clean only. Store on a padded hanger to maintain structural bias-cut flow. Do not iron directly or expose to humid steam environments."}
                      </div>
                    </details>
                  </div>

                </div>
              </div>

              {/* Complete the Look Cross-sell section */}
              <section className="mt-40 border-t border-brand-line pt-24">
                <h3 className="font-serif text-3xl mb-16 text-center tracking-tight text-brand-black">Complete the Look</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {/* Item 1 */}
                  <div 
                    onClick={() => handleSelectProduct('strappy-heel')}
                    className="space-y-4 group cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-brand-offwhite">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                        src={PRODUCTS.find(p => p.id === 'strappy-heel')?.image} 
                        alt="Strappy heel leather" 
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-semibold text-brand-black uppercase tracking-wider">Strappy Heel</h4>
                      <p className="text-xs text-brand-grey">$420.00</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div 
                    onClick={() => handleSelectProduct('vault-clutch')}
                    className="space-y-4 group cursor-pointer mt-12 md:mt-0"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-brand-offwhite">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                        src={PRODUCTS.find(p => p.id === 'vault-clutch')?.image} 
                        alt="Vault brown leather clutch" 
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-semibold text-brand-black uppercase tracking-wider">Vault Clutch</h4>
                      <p className="text-xs text-brand-grey">$1,250.00</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div 
                    onClick={() => handleSelectProduct('helix-earrings')}
                    className="space-y-4 group cursor-pointer hidden md:block"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-brand-offwhite">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                        src={PRODUCTS.find(p => p.id === 'helix-earrings')?.image} 
                        alt="Helix earrings editorial" 
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-semibold text-brand-black uppercase tracking-wider">Helix Earrings</h4>
                      <p className="text-xs text-brand-grey">$310.00</p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <>
              {/* 2. THE MAIN TAB LAYOUT VIEWS */}
              
              {/* TAB A: HOME EDITORIAL FEED */}
              {activeTab === 'home' && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 md:px-12 py-12"
                >
                  
                  {/* Hero Banner */}
                  <section className="mb-20 -mx-6 md:mx-auto md:max-w-6xl">
                    <div className="relative mx-auto max-w-none md:max-w-5xl overflow-hidden">
                      <img 
                        src="/images/lumiere/raw/hero-winter-anthology.png" 
                        alt="The Winter Anthology Model" 
                        className="block w-full h-auto"
                      />

                      <div className="absolute inset-x-0 bottom-[12%] sm:bottom-[14%] md:bottom-[13%] flex flex-col items-center text-center px-6">
                        <h3 className="font-serif text-[2.55rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] max-w-[13rem] sm:max-w-md md:max-w-2xl">
                          The Winter
                          <br />
                          Anthology
                        </h3>
                        <button 
                          onClick={() => { handleSelectProduct('anthology-linen-jumpsuit'); }}
                          className="mt-6 bg-black text-white hover:bg-neutral-900 transition-all font-semibold tracking-[0.24em] text-[10px] sm:text-[11px] px-6 sm:px-9 py-3 sm:py-4 uppercase shadow-xl w-full max-w-[180px] sm:max-w-[220px]"
                        >
                          SHOP THE LOOK
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Collections Carousel Strip */}
                  <section className="mb-24 border-b border-brand-line pb-12">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="font-serif text-2xl text-brand-black font-light tracking-tight">Active Collections</h3>
                      <button onClick={() => showToast("Showing all curated editions.")} className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-grey hover:text-brand-black">View All</button>
                    </div>

                    <div className="flex gap-gutter overflow-x-auto no-scrollbar scroll-smooth">
                      {[
                        { name: "Silk Dresses", img: "/images/lumiere/raw/02.jpg" },
                        { name: "Luxury Coats", img: "/images/lumiere/raw/03.jpg" },
                        { name: "Minimalist Tops", img: "/images/lumiere/raw/04.jpg" },
                        { name: "Linen Jumpsuits", img: "/images/lumiere/raw/01.jpg" }
                      ].map((col, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => { setActiveTab('shop'); setCollectionFilter('Collection № 04'); }}
                          className="flex-shrink-0 w-44 cursor-pointer group flex flex-col items-center text-center"
                        >
                          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border border-brand-line group-hover:border-brand-black transition-colors">
                            <img src={col.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={col.name}/>
                          </div>
                          <span className="text-xs uppercase font-semibold text-brand-black tracking-widest">{col.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Asymmetric Product Grid - Part 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
                    
                    {/* Item 1: Wide Portrait */}
                    <div className="md:col-span-7 group cursor-pointer" onClick={() => handleSelectProduct('the-archival-trench')}>
                      <div className="relative overflow-hidden bg-brand-offwhite">
                        <img 
                          alt="Archival wool coat" 
                          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/03.jpg"
                        />
                        <button 
                          onClick={(e) => toggleWishlist({ id: 'the-archival-trench', name: 'The Archival Trench', price: 1240, category: 'Collection № 04', image: '/images/lumiere/raw/03.jpg' }, e)}
                          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === 'the-archival-trench') ? 'fill-brand-black' : ''}`} />
                        </button>
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">The Archival Trench</h3>
                          <p className="text-[11px] font-semibold text-brand-grey uppercase tracking-widest mt-1">100% Virgin Wool</p>
                        </div>
                        <span className="text-lg font-light text-brand-black">$1,240</span>
                      </div>
                    </div>

                    {/* Item 2: Square Detail (Offset top) */}
                    <div className="md:col-span-5 md:mt-32 group cursor-pointer" onClick={() => handleSelectProduct('structure-top')}>
                      <div className="relative overflow-hidden bg-brand-offwhite">
                        <img 
                          alt="Structure Top" 
                          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/04.jpg"
                        />
                        <button 
                          onClick={(e) => toggleWishlist({ id: 'structure-top', name: 'Structure Top', price: 480, category: 'Collection № 04', image: '/images/lumiere/raw/04.jpg' }, e)}
                          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === 'structure-top') ? 'fill-brand-black' : ''}`} />
                        </button>
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">Structure Top</h3>
                          <p className="text-[11px] font-semibold text-brand-grey uppercase tracking-widest mt-1">Sculpted Canvas</p>
                        </div>
                        <span className="text-lg font-light text-brand-black">$480</span>
                      </div>
                    </div>

                    {/* Item 3: Tall Vertical */}
                    <div className="md:col-span-4 group cursor-pointer" onClick={() => handleSelectProduct('silk-narrative')}>
                      <div className="relative overflow-hidden bg-brand-offwhite">
                        <img 
                          alt="Silk narrative model dress" 
                          className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/05.jpg"
                        />
                        <button 
                          onClick={(e) => toggleWishlist({ id: 'silk-narrative', name: 'Silk Narrative', price: 390, category: 'Collection № 04', image: '/images/lumiere/raw/05.jpg' }, e)}
                          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === 'silk-narrative') ? 'fill-brand-black' : ''}`} />
                        </button>
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">Silk Narrative</h3>
                          <p className="text-[11px] font-semibold text-brand-grey uppercase tracking-widest mt-1">Mulberry Silk</p>
                        </div>
                        <span className="text-lg font-light text-brand-black">$390</span>
                      </div>
                    </div>

                    {/* Item 4: Wide Large Landscape Landscape banner */}
                    <div className="md:col-span-8 md:mt-16 group cursor-pointer" onClick={() => handleSelectProduct('the-void-trousers')}>
                      <div className="relative overflow-hidden bg-brand-offwhite">
                        <img 
                          alt="Wide pants style" 
                          className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/06.jpg"
                        />
                        <button 
                          onClick={(e) => toggleWishlist({ id: 'the-void-trousers', name: 'The Void Trousers', price: 550, category: 'Collection № 04', image: '/images/lumiere/raw/06.jpg' }, e)}
                          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === 'the-void-trousers') ? 'fill-brand-black' : ''}`} />
                        </button>
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">The Void Trousers</h3>
                          <p className="text-[11px] font-semibold text-brand-grey uppercase tracking-widest mt-1">Relaxed Fit Cotton</p>
                        </div>
                        <span className="text-lg font-light text-brand-black">$550</span>
                      </div>
                    </div>

                  </div>

                  {/* Aesthetic Statement Quote Block */}
                  <section className="my-36 text-center max-w-3xl mx-auto py-16 px-6 border-t border-b border-brand-line">
                    <p className="font-serif text-2xl md:text-3xl italic text-brand-black/90 font-light leading-relaxed">
                      "Fashion is the most powerful art we have. It is how we present our souls and silence to the world."
                    </p>
                  </section>

                  {/* Asymmetric Product Grid - Part 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="group cursor-pointer" onClick={() => handleSelectProduct('leather-obscura')}>
                      <div className="relative aspect-square overflow-hidden bg-brand-offwhite">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/07.jpg" 
                          alt="Leather obscura" 
                        />
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">Leather Obscura</h3>
                          <p className="text-xs uppercase tracking-wider text-brand-grey mt-1">Calfskin Accessories</p>
                        </div>
                        <p className="text-md text-brand-black font-light">$210.00</p>
                      </div>
                    </div>

                    <div className="group cursor-pointer mt-12 md:mt-0" onClick={() => handleSelectProduct('linear-layering')}>
                      <div className="relative aspect-square overflow-hidden bg-brand-offwhite">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          src="/images/lumiere/raw/08.jpg" 
                          alt="Linear layering" 
                        />
                      </div>
                      <div className="mt-8 flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl text-brand-black">Linear Layering</h3>
                          <p className="text-xs uppercase tracking-wider text-brand-grey mt-1">Seasonal Set</p>
                        </div>
                        <p className="text-md text-brand-black font-light">$890.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Explore discovery trigger */}
                  <div className="mt-32 flex flex-col items-center">
                    <button 
                      onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }}
                      className="px-12 py-5 bg-brand-black text-brand-white text-xs font-semibold uppercase tracking-[0.3em] transition-all hover:bg-brand-black/90 active:scale-95"
                    >
                      Discover Entire Catalog
                    </button>
                  </div>

                </motion.div>
              )}

              {/* TAB B: SHOP CURATED CATALOG */}
              {activeTab === 'shop' && (
                <motion.div
                  key="shop-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 md:px-12 py-12"
                >
                  <section className="mb-12">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-grey mb-4">Curated Selections</p>
                    <h2 className="font-serif text-5xl md:text-6xl text-brand-black font-normal">Catalog</h2>
                  </section>

                  {/* Sleek Underline Filters Strip */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-line mb-12">
                    
                    {/* Horizontal filter capsules */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-brand-grey">
                      <span className="text-brand-black uppercase">Category:</span>
                      {[
                        { label: 'ALL', value: 'ALL' },
                        { label: '№ 04 COLLECTION', value: 'Collection № 04' },
                        { label: 'APPAREL', value: 'Apparel' },
                        { label: 'ACCESSORIES', value: 'Accessories' }
                      ].map((cat) => (
                        <button 
                          key={cat.value}
                          onClick={() => setCollectionFilter(cat.value)}
                          className={`px-3 py-1.5 transition-colors ${
                            collectionFilter === cat.value 
                              ? 'text-brand-black border-b border-brand-black' 
                              : 'hover:text-brand-black'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Secondary filter selectors */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-brand-grey tracking-widest">Size:</span>
                        <select 
                          value={sizeFilter}
                          onChange={(e) => setSizeFilter(e.target.value)}
                          className="bg-transparent border-none text-xs font-semibold tracking-wider text-brand-black py-1 focus:ring-0 cursor-pointer"
                        >
                          <option value="ALL">ALL SIZES</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-brand-grey tracking-widest">Sort:</span>
                        <select 
                          onChange={(e) => {
                            if (e.target.value === 'low-high') {
                              PRODUCTS.sort((a,b) => a.price - b.price);
                            } else if (e.target.value === 'high-low') {
                              PRODUCTS.sort((a,b) => b.price - a.price);
                            }
                            showToast("Catalog sorted.");
                          }}
                          className="bg-transparent border-none text-xs font-semibold tracking-wider text-brand-black py-1 focus:ring-0 cursor-pointer"
                        >
                          <option value="default">EDITORIAL</option>
                          <option value="low-high">PRICE: LOW TO HIGH</option>
                          <option value="high-low">PRICE: HIGH TO LOW</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Active Filters pillbox */}
                  {(collectionFilter !== 'ALL' || sizeFilter !== 'ALL') && (
                    <div className="flex items-center gap-2 mb-8">
                      <span className="text-[10px] uppercase tracking-widest text-brand-grey font-semibold">Active:</span>
                      {collectionFilter !== 'ALL' && (
                        <span className="inline-flex items-center gap-2 bg-brand-offwhite text-[11px] font-semibold text-brand-black px-3 py-1.5 border border-brand-line">
                          <span>{collectionFilter}</span>
                          <X className="w-3.5 h-3.5 stroke-[2.5px] cursor-pointer" onClick={() => setCollectionFilter('ALL')} />
                        </span>
                      )}
                      {sizeFilter !== 'ALL' && (
                        <span className="inline-flex items-center gap-2 bg-brand-offwhite text-[11px] font-semibold text-brand-black px-3 py-1.5 border border-brand-line">
                          <span>Size {sizeFilter}</span>
                          <X className="w-3.5 h-3.5 stroke-[2.5px] cursor-pointer" onClick={() => setSizeFilter('ALL')} />
                        </span>
                      )}
                      <button 
                        onClick={() => { setCollectionFilter('ALL'); setSizeFilter('ALL'); }}
                        className="text-[10px] font-semibold tracking-widest text-[#93000a] hover:opacity-75 uppercase ml-2"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}

                  {/* Symmetrical Catalog Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {PRODUCTS.filter(product => {
                      if (collectionFilter !== 'ALL' && product.category !== collectionFilter) return false;
                      if (sizeFilter !== 'ALL' && product.sizes && !product.sizes.includes(sizeFilter)) return false;
                      return true;
                    }).map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="group flex flex-col cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-brand-offwhite mb-6">
                          <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                            src={product.image} 
                            alt={product.name} 
                          />
                          <button 
                            onClick={(e) => toggleWishlist(product, e)}
                            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === product.id) ? 'fill-brand-black' : ''}`} />
                          </button>
                          {product.meta && (
                            <span className="absolute bottom-4 left-4 bg-brand-black text-brand-white text-[9px] font-bold uppercase tracking-[0.2em] py-1.5 px-3">
                              {product.meta}
                            </span>
                          )}
                        </div>
                        
                        {/* Title, Category & Price */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-grey mb-1">{product.category}</p>
                            <h4 className="font-serif text-lg text-brand-black group-hover:underline decoration-0.5 underline-offset-4">{product.name}</h4>
                          </div>
                          <span className="text-sm font-semibold text-brand-black">${product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}

              {/* TAB C: WISHLIST ASYMMETRICAL GRID */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 md:px-12 py-12"
                >
                  <section className="mb-16">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-grey mb-4">Curated Selection</p>
                    <h2 className="font-serif text-5xl md:text-6xl italic leading-tight text-brand-black font-normal">Wishlist</h2>
                  </section>

                  {wishlist.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-brand-line">
                      <Heart className="w-10 h-10 text-brand-grey/50 mx-auto mb-6" />
                      <p className="text-sm font-semibold tracking-wider text-brand-black uppercase mb-4">Your space is currently empty</p>
                      <button 
                        onClick={() => setActiveTab('shop')}
                        className="px-8 py-4 bg-brand-black text-brand-white text-[10px] font-semibold uppercase tracking-[0.15em]"
                      >
                        Browse Collections
                      </button>
                    </div>
                  ) : (
                    /* The high fashion asymmetrical look requested by image 3 */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
                      
                      {/* Product 1: Large Offset */}
                      {wishlist[0] && (
                        <div className="md:col-span-7 group">
                          <div className="relative overflow-hidden bg-brand-offwhite aspect-square mb-8">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                              src={wishlist[0].image} 
                              alt={wishlist[0].name}
                            />
                            <button 
                              onClick={() => toggleWishlist(wishlist[0])}
                              className="absolute top-6 right-6 p-3 bg-white/90 shadow-sm hover:opacity-75"
                            >
                              <X className="w-4 h-4 stroke-[2px]" />
                            </button>
                          </div>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 onClick={() => handleSelectProduct(wishlist[0].id)} className="font-serif text-2xl text-brand-black cursor-pointer hover:underline">{wishlist[0].name}</h3>
                              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-grey">{wishlist[0].meta || "Autumn / Winter '24"}</p>
                              <p className="text-lg mt-4 font-light text-brand-black">${wishlist[0].price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className="flex flex-col items-end gap-6">
                              <button 
                                onClick={() => handleMoveToBag(wishlist[0])}
                                className="bg-brand-black text-brand-white px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-brand-black/90 active:scale-95 transition-all"
                              >
                                Move to Bag
                              </button>
                              <button 
                                onClick={() => toggleWishlist(wishlist[0])}
                                className="editorial-underline text-[10px] font-bold uppercase tracking-widest text-brand-grey"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Product 2: Smaller, Offset Right */}
                      {wishlist[1] && (
                        <div className="md:col-start-9 md:col-span-4 mt-12 group">
                          <div className="relative overflow-hidden bg-brand-offwhite aspect-square mb-8">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                              src={wishlist[1].image} 
                              alt={wishlist[1].name}
                            />
                            <button 
                              onClick={() => toggleWishlist(wishlist[1])}
                              className="absolute top-4 right-4 p-2 bg-white/90 shadow-sm"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5px]" />
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 onClick={() => handleSelectProduct(wishlist[1].id)} className="font-serif text-xl tracking-tight text-brand-black cursor-pointer hover:underline">{wishlist[1].name}</h3>
                              <p className="text-md font-light text-brand-grey mt-1">${wishlist[1].price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <button 
                              onClick={() => handleMoveToBag(wishlist[1])}
                              className="w-full border-b border-brand-line py-4 text-left flex justify-between items-center group/btn"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-black">Move to Bag</span>
                              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Product 3: Extra columns / asymmetric layout */}
                      {wishlist[2] && (
                        <div className="md:col-span-5 md:mt-[-8rem] group">
                          <div className="relative overflow-hidden bg-brand-offwhite aspect-[4/5] mb-8">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                              src={wishlist[2].image} 
                              alt={wishlist[2].name}
                            />
                            <button 
                              onClick={() => toggleWishlist(wishlist[2])}
                              className="absolute top-6 right-6 p-2.5 bg-white/90 shadow-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <h3 onClick={() => handleSelectProduct(wishlist[2].id)} className="font-serif text-2xl text-brand-black cursor-pointer hover:underline">{wishlist[2].name}</h3>
                            <p className="text-md font-light text-brand-grey">${wishlist[2].price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            <div className="pt-6 flex gap-8">
                              <button 
                                onClick={() => handleMoveToBag(wishlist[2])}
                                className="editorial-underline text-xs font-semibold uppercase tracking-widest text-brand-black"
                              >
                                Add to Bag
                              </button>
                              <button 
                                onClick={() => toggleWishlist(wishlist[2])}
                                className="text-brand-grey hover:text-brand-black text-xs font-semibold uppercase tracking-widest"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Product 4: Large Wide Module */}
                      {wishlist[3] && (
                        <div className="md:col-start-7 md:col-span-6 group">
                          <div className="relative overflow-hidden bg-brand-offwhite aspect-square mb-8">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                              src={wishlist[3].image} 
                              alt={wishlist[3].name}
                            />
                            <button 
                              onClick={() => toggleWishlist(wishlist[3])}
                              className="absolute top-6 right-6 p-3 bg-white/90 shadow-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-end border-t border-brand-line pt-8">
                            <div>
                              <h3 onClick={() => handleSelectProduct(wishlist[3].id)} className="font-serif text-3xl tracking-tight text-brand-black cursor-pointer hover:underline">{wishlist[3].name}</h3>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2rem] text-brand-grey mt-2">Limited Edition</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-light mb-4 text-brand-black">${wishlist[3].price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                              <button 
                                onClick={() => handleMoveToBag(wishlist[3])}
                                className="bg-brand-black text-brand-white px-10 py-5 text-xs font-semibold uppercase tracking-widest active:scale-95"
                              >
                                Move to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {wishlist.length > 0 && (
                    <div className="mt-32 border-t border-brand-line pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-grey">
                        Viewing {wishlist.length} curated {wishlist.length === 1 ? 'item' : 'items'}
                      </p>
                      <button 
                        onClick={() => showToast("All saved wishlist models loaded successfully.")}
                        className="editorial-underline text-xs font-bold uppercase tracking-widest py-2"
                      >
                        Load More Saved Items
                      </button>
                    </div>
                  )}

                </motion.div>
              )}

              {/* TAB D: PROFILE & ORDER HISTORY */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-12"
                >
                  <AnimatePresence mode="wait">
                    
                    {/* SUBVIEW D1: MAIN SOPHIE ACCOUNT */}
                    {profileSubView === 'main' ? (
                      <motion.div
                        key="main-profile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-6 md:px-12"
                      >
                        
                        {/* Summary Header */}
                        <section className="flex flex-col items-center md:items-start text-center md:text-left mb-12">
                          <span className="text-[11px] font-semibold text-brand-grey mb-4 uppercase tracking-[0.25em]">My Account</span>
                          <h2 className="font-serif text-4xl md:text-6xl text-brand-black mb-8 leading-tight">
                            Welcome back,<br className="md:hidden"/> Sophie.
                          </h2>
                          
                          {/* S.M. circular initial */}
                          <div className="flex items-center justify-center md:justify-start w-full">
                            <div className="w-24 h-24 rounded-full border border-brand-black flex items-center justify-center">
                              <span className="font-serif text-xl tracking-wider text-brand-black">S.M.</span>
                            </div>
                          </div>
                        </section>

                        {/* Metric Strip Section */}
                        <section className="border-t border-b border-brand-line w-full grid grid-cols-3 mb-16">
                          <div 
                            onClick={() => setProfileSubView('orders')}
                            className="flex flex-col items-center justify-center py-8 border-r border-brand-line cursor-pointer hover:bg-brand-offwhite/50 transition-colors"
                          >
                            <span className="text-[10px] font-semibold text-brand-grey mb-2 uppercase tracking-widest">Orders</span>
                            <span className="font-serif text-2xl text-brand-black">{orders.length}</span>
                          </div>
                          
                          <div 
                            onClick={() => setActiveTab('wishlist')}
                            className="flex flex-col items-center justify-center py-8 border-r border-brand-line cursor-pointer hover:bg-brand-offwhite/50 transition-colors"
                          >
                            <span className="text-[10px] font-semibold text-brand-grey mb-2 uppercase tracking-widest">Wishlist</span>
                            <span className="font-serif text-2xl text-brand-black">{wishlist.length}</span>
                          </div>

                          <div 
                            onClick={() => showToast("Lumière Circle tier: Privilege Member. 3,450 points accrued.")}
                            className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-brand-offwhite/50 transition-colors"
                          >
                            <span className="text-[10px] font-semibold text-brand-grey mb-2 uppercase tracking-widest">Points</span>
                            <span className="font-serif text-2xl text-brand-black">3,450</span>
                          </div>
                        </section>

                        {/* Menu Navigation options list */}
                        <section className="max-w-3xl mx-auto md:ml-0">
                          <nav className="flex flex-col">
                            
                            {/* Option 1: My Orders & Returns */}
                            <button 
                              onClick={() => { setProfileSubView('orders'); window.scrollTo(0,0); }}
                              className="flex justify-between items-center py-6 border-b border-brand-line hover:opacity-50 transition-opacity group text-left"
                            >
                              <div className="flex items-center gap-4">
                                <Truck className="w-5 h-5 text-brand-grey group-hover:text-brand-black transition-colors stroke-[1.5px]" />
                                <span className="text-base text-brand-black font-normal">My Orders &amp; Returns</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-brand-grey group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Option 2: Saved Addresses */}
                            <button 
                              onClick={() => showToast("Addresses: 142 Rue du Faubourg Saint-Honoré, Paris.")}
                              className="flex justify-between items-center py-6 border-b border-brand-line hover:opacity-50 transition-opacity group text-left"
                            >
                              <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-brand-grey group-hover:text-brand-black transition-colors stroke-[1.5px]" />
                                <span className="text-base text-brand-black font-normal">Saved Addresses</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-brand-grey group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Option 3: Payment Methods */}
                            <button 
                              onClick={() => showToast("Payment wallet: Apple Pay Active, VISA ending in 4021.")}
                              className="flex justify-between items-center py-6 border-b border-brand-line hover:opacity-50 transition-opacity group text-left"
                            >
                              <div className="flex items-center gap-4">
                                <CreditCard className="w-5 h-5 text-brand-grey group-hover:text-brand-black transition-colors stroke-[1.5px]" />
                                <span className="text-base text-brand-black font-normal">Payment Methods</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-brand-grey group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Option 4: Account Settings */}
                            <button 
                              onClick={() => showToast("Security parameters standard. Password encrypted.")}
                              className="flex justify-between items-center py-6 border-b border-brand-line hover:opacity-50 transition-opacity group text-left"
                            >
                              <div className="flex items-center gap-4">
                                <Settings className="w-5 h-5 text-brand-grey group-hover:text-brand-black transition-colors stroke-[1.5px]" />
                                <span className="text-base text-brand-black font-normal">Account Settings</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-brand-grey group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Option 5: Sign Out */}
                            <button 
                              onClick={() => {
                                showToast("Signing out Sophie simulated. Reload to reset local state.");
                              }}
                              className="flex justify-between items-center py-8 group text-left max-w-xs"
                            >
                              <span className="text-[11px] font-bold text-brand-grey group-hover:text-brand-black transition-colors uppercase tracking-[0.2em] underline underline-offset-4 decoration-0.5">
                                Sign Out Account
                              </span>
                            </button>

                          </nav>
                        </section>

                      </motion.div>
                    ) : (
                      
                      /* SUBVIEW D2: ORDER HISTORY COMPREHENSIVE LIST */
                      <motion.div
                        key="order-history"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-6 md:px-12"
                      >
                        
                        {/* Header & Back Action */}
                        <div className="mb-12">
                          <button 
                            onClick={() => setProfileSubView('main')}
                            className="flex items-center gap-2 mb-6 text-[10px] font-bold text-brand-grey hover:text-brand-black uppercase tracking-[0.15em] transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>My Account</span>
                          </button>
                          <h2 className="font-serif text-4xl md:text-5xl text-brand-black">Order History</h2>
                        </div>

                        {/* Order Filters Strip */}
                        <div className="flex gap-gutter mb-12 overflow-x-auto no-scrollbar border-b border-brand-line pb-4 font-semibold text-[11px] tracking-[0.15em] text-brand-grey">
                          {['ALL', 'IN PROGRESS', 'DELIVERED', 'CANCELLED'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setOrderFilter(tab as any)}
                              className={`pb-1 whitespace-nowrap transition-colors ${
                                orderFilter === tab 
                                  ? 'text-brand-black border-b border-brand-black font-bold' 
                                  : 'hover:text-brand-black'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* List items dynamically filtered */}
                        <div className="flex flex-col divide-y divide-brand-line">
                          {filteredOrders.length === 0 ? (
                            <div className="text-center py-16 text-brand-grey uppercase tracking-widest text-xs">
                              No orders found under {orderFilter} filter.
                            </div>
                          ) : (
                            filteredOrders.map((order) => (
                              <div 
                                key={order.id}
                                className="flex flex-col md:flex-row gap-8 py-8 items-start md:items-center justify-between"
                              >
                                {/* Left visual layout */}
                                <div className="flex gap-6 items-center">
                                  <div className="flex-shrink-0 w-20 h-20 bg-brand-offwhite border border-brand-line overflow-hidden">
                                    <img className="w-full h-full object-cover" src={order.product.image} alt={order.product.name} />
                                  </div>
                                  <div>
                                    <h3 
                                      className="font-serif text-xl text-brand-black hover:underline cursor-pointer"
                                      onClick={() => {
                                        // Open detail page context if possible
                                        if (PRODUCTS.some(p => p.id === order.product.id)) {
                                          handleSelectProduct(order.product.id);
                                        } else {
                                          showToast(`${order.product.name} template context loaded.`);
                                        }
                                      }}
                                    >
                                      {order.product.name}
                                    </h3>
                                    <div className="text-xs text-brand-grey mt-2 flex flex-wrap gap-x-6 gap-y-1">
                                      <span>Order #{order.orderNumber}</span>
                                      <span>Placed: {order.placedDate}</span>
                                      <span className="font-semibold text-brand-black">Total: ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Status tracker right layouts */}
                                <div className="flex flex-col items-end gap-3 mt-4 md:mt-0 text-right w-full md:w-auto">
                                  <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 border ${
                                    order.status === 'IN PROGRESS' 
                                      ? 'bg-brand-black/5 text-brand-black border-brand-black/10' 
                                      : order.status === 'CANCELLED' 
                                        ? 'bg-[#ffdad6] text-[#93000a] border-none'
                                        : 'bg-brand-offwhite text-brand-grey border-brand-line'
                                  }`}>
                                    {order.status}
                                  </span>

                                  <div className="flex gap-6 text-[10px] font-bold tracking-[0.15em] uppercase text-brand-black mt-2">
                                    {order.status === 'IN PROGRESS' && (
                                      <>
                                        <button 
                                          onClick={() => handleTrackOrder(order.orderNumber)}
                                          className="text-brand-black hover:opacity-50 transition-opacity underline underline-offset-4 flex items-center gap-1"
                                        >
                                          TRACK ORDER →
                                        </button>
                                        <button 
                                          onClick={() => handleCancelOrder(order.id)}
                                          className="text-[#93000a] hover:opacity-75 transition-opacity"
                                        >
                                          CANCEL
                                        </button>
                                      </>
                                    )}
                                    <button 
                                      onClick={() => showToast(`Detailed manifest overview of order #${order.orderNumber} sent to sophie@lumiere.com`)}
                                      className="text-brand-grey hover:text-brand-black transition-colors"
                                    >
                                      DETAILS
                                    </button>
                                  </div>
                                </div>

                              </div>
                            ))
                          )}
                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>
                </motion.div>
              )}

            </>
          )}

        </AnimatePresence>
      </main>

      {/* MINIMALIST SHOPPING BAG / CART SLIDE OUT DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 inset-y-0 bg-brand-black/40 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Shopping bar Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand-white shadow-2xl flex flex-col z-10"
            >
              
              {/* Drawer Header */}
              <div className="p-6 md:p-8 border-b border-brand-line flex justify-between items-center bg-brand-offwhite">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-brand-black" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-black">Shopping Bag</span>
                  <span className="bg-brand-black text-brand-white text-[10px] px-2 py-0.5 font-bold tracking-tight">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:opacity-50 transition-opacity">
                  <X className="w-5 h-5 text-brand-black" />
                </button>
              </div>

              {/* Cart List Items */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-6 md:px-8 divide-y divide-brand-line">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center py-12 text-brand-grey">
                    <ShoppingBag className="w-8 h-8 text-brand-grey/40 mb-4" />
                    <p className="text-xs uppercase tracking-widest font-semibold mb-6">Your bag is empty</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                      className="px-6 py-3 bg-brand-black text-brand-white text-[10px] font-bold uppercase tracking-widest"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.product.id}-${item.size}-${idx}`} className="py-6 flex gap-4">
                      
                      {/* Image */}
                      <div className="w-16 h-20 bg-brand-offwhite border border-brand-line overflow-hidden flex-shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-sm">
                            <h4 className="font-serif text-[15px] font-light text-brand-black">{item.product.name}</h4>
                            <span className="font-semibold text-brand-black">${item.product.price * item.quantity}</span>
                          </div>
                          <p className="text-[10px] text-brand-grey uppercase tracking-widest font-semibold mt-1">
                            Size: <span className="text-brand-black">{item.size}</span>
                          </p>
                        </div>
                        
                        {/* Quantity Counter & Delete */}
                        <div className="flex justify-between items-center text-[10px] mt-2 h-8">
                          <div className="flex items-center border border-brand-line bg-brand-offwhite">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                              className="p-1 px-2.5 hover:bg-brand-line"
                            >
                              <Minus className="w-2.5 h-2.5 text-brand-black" />
                            </button>
                            <span className="px-3 font-semibold text-brand-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                              className="p-1 px-2.5 hover:bg-brand-line"
                            >
                              <Plus className="w-2.5 h-2.5 text-brand-black" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-[10px] font-semibold text-[#ba1a1a] hover:opacity-75 uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Subtotal and Simulation Checkout Area */}
              {cart.length > 0 && (
                <div className="p-6 md:p-8 border-t border-brand-line bg-brand-offwhite space-y-6">
                  
                  <div className="flex justify-between text-xs font-semibold tracking-wider text-brand-grey uppercase">
                    <span>Subtotal accrued</span>
                    <span className="text-sm font-semibold text-brand-black">${totalCartValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-xs font-semibold tracking-wider text-brand-grey uppercase border-b border-brand-line pb-4">
                    <span>Eco Shipping</span>
                    <span className="text-brand-black font-semibold uppercase text-[10px]">Complementary</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                    <span>Estimated total</span>
                    <span className="text-base text-brand-black">${totalCartValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <button 
                    onClick={() => {
                      showToast("Checkout finalized! Placing order simulation into My Account profile.");
                      // Append dynamic order inside active orders list
                      const newOrderNum = `LM-${Math.floor(10000 + Math.random() * 90000)}`;
                      const newOrderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                      const newOrder: Order = {
                        id: `order-dyn-${Date.now()}`,
                        orderNumber: newOrderNum,
                        placedDate: newOrderDate,
                        total: totalCartValue,
                        status: 'IN PROGRESS',
                        product: cart[0].product
                      };
                      setOrders([newOrder, ...orders]);
                      setCart([]);
                      setIsCartOpen(false);
                      setProfileSubView('orders');
                      setActiveTab('profile');
                    }}
                    className="w-full py-5 bg-brand-black text-brand-white text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-brand-black/90 text-center block"
                  >
                    Complete Secure Order
                  </button>
                  <p className="text-[9px] text-brand-grey text-center leading-relaxed max-w-xs mx-auto">
                    Security certificates fully integrated. Complete authorization backed by SSL encryption.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Filter Button */}
      <button
        onClick={() => {
          setActiveTab('shop');
          setSelectedProductId(null);
          showToast("Opening boutique collection filters.");
          // Scroll smoothly to filter container under Shop Tab
          setTimeout(() => {
            window.scrollTo({ top: 320, behavior: 'smooth' });
          }, 100);
        }}
        className="fixed bottom-[88px] right-6 z-30 bg-brand-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-xl"
        aria-label="Filter products"
        id="floating-filter-button"
      >
        <SlidersHorizontal className="w-5 h-5 stroke-[1.8px] text-white" />
      </button>

      {/* RESPONSIVE BOTTOM FOOTER NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-white/90 backdrop-blur-md border-t border-brand-line shadow-sm">
        <div className="max-w-md mx-auto h-16 flex items-center justify-between px-8 text-neutral-400">
          
          {/* Menu Item 1: Home */}
          <button 
            onClick={() => { setActiveTab('home'); setSelectedProductId(null); }}
            className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
              activeTab === 'home' && !selectedProductId ? 'text-brand-black font-semibold' : 'hover:text-brand-black'
            }`}
          >
            <HomeIcon className="w-[18px] h-[18px] stroke-[1.5px]" filled={activeTab === 'home' && !selectedProductId} />
            <span className="text-[10px] mt-1 font-medium tracking-normal">Home</span>
          </button>

          {/* Menu Item 2: Shop */}
          <button 
            onClick={() => { setActiveTab('shop'); setSelectedProductId(null); }}
            className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
              activeTab === 'shop' || selectedProductId ? 'text-brand-black font-semibold' : 'hover:text-brand-black'
            }`}
          >
            <ShopIcon className="w-[18px] h-[18px] stroke-[1.5px]" filled={activeTab === 'shop' || selectedProductId} />
            <span className="text-[10px] mt-1 font-medium tracking-normal">Shop</span>
          </button>

          {/* Menu Item 3: Wishlist */}
          <button 
            onClick={() => { setActiveTab('wishlist'); setSelectedProductId(null); }}
            className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors relative ${
              activeTab === 'wishlist' && !selectedProductId ? 'text-brand-black font-semibold' : 'hover:text-brand-black'
            }`}
          >
            <div className="relative">
              <Heart className={`w-[18px] h-[18px] stroke-[1.5px] ${activeTab === 'wishlist' && !selectedProductId ? 'fill-brand-black text-brand-black' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-black text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium tracking-normal">Wishlist</span>
          </button>

          {/* Menu Item 4: Profile */}
          <button 
            onClick={() => { setActiveTab('profile'); setSelectedProductId(null); }}
            className={`flex flex-col items-center justify-center py-1 cursor-pointer transition-colors ${
              activeTab === 'profile' && !selectedProductId ? 'text-brand-black font-semibold' : 'hover:text-brand-black'
            }`}
          >
            <User className={`w-[18px] h-[18px] stroke-[1.5px] ${activeTab === 'profile' && !selectedProductId ? 'fill-brand-black' : ''}`} />
            <span className="text-[10px] mt-1 font-medium tracking-normal">Profile</span>
          </button>

        </div>
      </nav>

    </div>
  );
}

// Inline custom clean SVG representations as instructed by the system (standard icon utilities)
function HomeIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function ShopIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <path d="M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
      <path d="M9 12a3 3 0 0 0 6 0" />
    </svg>
  );
}
