import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BedShowroom3D from './components/BedShowroom3D';
import FabricInspector3D from './components/FabricInspector3D';
import ProductList from './components/ProductList';
import CharactersSection from './components/CharactersSection';
import UnboxingCard from './components/UnboxingCard';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import BedsheetVideoModal from './components/BedsheetVideoModal';
import { Sparkles, Check, ShoppingBag, Eye, X, Film } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [videoModalProduct, setVideoModalProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Cart operations
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === productToAdd.id &&
          (item.selectedColor || item.color) === (productToAdd.selectedColor || productToAdd.color) &&
          (item.selectedSize || item.size) === (productToAdd.selectedSize || productToAdd.size)
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += (productToAdd.quantity || 1);
        return newCart;
      } else {
        return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });

    showToast(`Added ${productToAdd.name.split('—')[0].trim()} to your Bag!`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = newQty;
      return newCart;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleOpenCheckout = (data) => {
    setCheckoutData(data);
    setIsCheckoutOpen(true);
  };

  const handleDirectBuy = (product) => {
    const directCart = [{ ...product, quantity: 1 }];
    const subtotal = product.price;
    const shipping = subtotal >= 3000 ? 0 : 250;
    setCheckoutData({
      cart: directCart,
      subtotal,
      discountAmount: 0,
      shipping,
      finalTotal: subtotal + shipping
    });
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = () => {
    setCart([]); // Clear cart after successful order
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* HERO SECTION */}
      <Hero
        onExplore3D={() => {
          const el = document.getElementById('3d-studio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onShopNow={() => {
          const el = document.getElementById('bed-collections');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3D INTERACTIVE BEDROOM STUDIO SECTION */}
      <section id="3d-studio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time 3D WebGL Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Customize Your Bedding in 3D.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Drag to rotate 360°, switch between luxury Ottoman colors and fabric finishes, 
            or toggle between daytime sunlight and romantic palace lanterns.
          </p>
        </div>

        {/* 3D CANVAS EMBED */}
        <BedShowroom3D onAddToCart={handleAddToCart} />
      </section>

      {/* CURATED BEDDING COLLECTIONS */}
      <ProductList
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProductForModal(p)}
        onOpenVideoReel={(p) => setVideoModalProduct(p)}
      />

      {/* 3D MICROSCOPIC FABRIC & BREATHABILITY LAB */}
      <section id="fabric-lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FabricInspector3D />
      </section>

      {/* MEET THE HANLI TRIBE (CHARACTERS & SUNGLASSES SWAG) */}
      <CharactersSection />

      {/* UNBOXING PACKAGING NOTE & EXPERIENCE */}
      <UnboxingCard />

      {/* VERIFIED CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* FOOTER */}
      <Footer />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleOpenCheckout}
      />

      {/* CHECKOUT & CASH ON DELIVERY (COD) MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* QUICK VIEW / PRODUCT DETAILS MODAL (WITH MULTI-IMAGE GALLERY & TAP NEXT) */}
      <ProductModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleDirectBuy}
        onOpenVideoReel={(p) => setVideoModalProduct(p)}
      />

      {/* 4K AI VIDEO REEL MODAL & LIVE BEDSHEET SWITCHER */}
      <BedsheetVideoModal
        isOpen={!!videoModalProduct}
        onClose={() => setVideoModalProduct(null)}
        initialProduct={videoModalProduct}
        onAddToCart={handleAddToCart}
        onBuyNow={handleDirectBuy}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-900/95 border border-amber-500/50 text-white shadow-2xl backdrop-blur-md animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage('')}
            className="text-zinc-500 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
