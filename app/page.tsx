'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Phone, 
  Mail, 
  ArrowRight, 
  Star,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

// --- Types ---
type Category = 'all' | 'dresses' | 'abayas' | 'tops' | 'accessories';
type Page = 'home' | 'new' | 'collections' | 'sale' | 'about' | 'contact';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  tag?: 'new' | 'sale';
  image: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Linen Wrap Midi Dress", price: 295, category: 'dresses', tag: 'new', image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 2, name: "Luxury Silk Abaya", price: 480, category: 'abayas', tag: 'new', image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 3, name: "Floral Chiffon Blouse", price: 185, category: 'tops', tag: 'new', image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 4, name: "Tailored Wide-Leg Trousers", price: 245, category: 'tops', image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 5, name: "Embroidered Evening Gown", price: 680, category: 'dresses', image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 6, name: "Classic Crepe Abaya", price: 390, category: 'abayas', image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 7, name: "Summer Linen Co-ord Set", price: 320, category: 'tops', tag: 'new', image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 8, name: "Pearl Drop Earrings", price: 120, category: 'accessories', image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 9, name: "Beaded Clutch Bag", price: 210, category: 'accessories', tag: 'new', image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 10, name: "Ruffle Hem Mini Dress", price: 220, originalPrice: 310, category: 'dresses', tag: 'sale', image: "https://images.unsplash.com/photo-1539106604064-739568d6f2c0?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 11, name: "Open Abaya with Belt", price: 295, originalPrice: 420, category: 'abayas', tag: 'sale', image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 12, name: "Silk Scarf", price: 95, originalPrice: 150, category: 'accessories', tag: 'sale', image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&h=800&q=80" },
];

const BUSINESS_INFO = {
  brand: "BIO*WAIVE*",
  legalName: "BioWeave International (FZC)",
  licenseNo: "10762",
  authority: "SRTI Free Zone Authority (Sharjah)",
  address: "Block B – B54-037, SRTIP Free Zone, Sharjah, United Arab Emirates",
  phone: "+971 50 679 3455",
  email: "hello@biowaive.com",
  hours: "Sunday–Thursday, 9:00 AM – 6:00 PM GST",
  expiry: "23/12/2026"
};

// --- Components ---

const AnnouncementBar = () => (
  <div className="bg-black text-white text-[11px] py-2 px-4 text-center tracking-[2px] uppercase font-light">
    Free delivery across UAE on orders over AED 250 ✦ Easy 14-day returns
  </div>
);

const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: () => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-white"
  >
    <div className="aspect-[3/4] overflow-hidden bg-[#f0f0f0] relative">
      <Image 
        src={product.image} 
        alt={product.name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {product.tag && (
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-wider z-10 ${product.tag === 'sale' ? 'bg-red-600 text-white' : 'bg-gold text-white'}`}>
          {product.tag}
        </span>
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
          className="bg-white text-black px-4 py-2 text-[10px] uppercase tracking-widest font-semibold hover:bg-gold hover:text-white transition-colors"
        >
          Quick Add
        </button>
      </div>
    </div>
    <div className="py-4">
      <h3 className="text-[13px] text-black">{product.name}</h3>
      <div className="mt-1 flex items-center gap-2">
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">AED {product.originalPrice}</span>
        )}
        <span className="text-sm font-semibold text-gold">
          AED {product.price}
        </span>
      </div>
    </div>
  </motion.div>
);

// --- Page Sections ---

const HomePage = ({ navigateTo }: { navigateTo: (page: Page, filter?: Category) => void }) => (
  <div className="space-y-20 pb-20">
    {/* Hero Section */}
    <section className="grid md:grid-cols-2 min-h-[400px] bg-white overflow-hidden">
      <div className="flex flex-col justify-center p-12 md:p-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif leading-[1.1] text-black">
            Refined Elegance<br/>for the Modern Woman.
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mt-6 leading-relaxed">
            Experience high-end Emirati craftsmanship. Discover our new season of silk abayas and tailored linen dresses.
          </p>
          <button 
            onClick={() => navigateTo('collections')}
            className="mt-8 px-8 py-3 bg-black text-white text-[12px] uppercase tracking-[2px] hover:bg-gold transition-colors"
          >
            Shop the Collection
          </button>
        </motion.div>
      </div>
      <div className="relative bg-gradient-to-br from-[#e5e5e5] to-[#dcdcdc] hidden md:flex items-center justify-center overflow-hidden">
        <div className="absolute font-serif text-[200px] text-white/40 select-none">BIO*W</div>
        <Image 
          src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&h=1600&q=80" 
          alt="Hero Model" 
          fill 
          className="object-cover mix-blend-multiply opacity-80"
          priority
          referrerPolicy="no-referrer"
        />
      </div>
    </section>

    {/* Marquee */}
    <div className="bg-black py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-white text-[12px] uppercase tracking-[4px] mx-8">
            New Arrivals ✦ Free Shipping UAE ✦ Women&apos;s Fashion ✦ Premium Fabrics ✦ Easy Returns ✦ Designed in Sharjah
          </span>
        ))}
      </div>
    </div>

    {/* Category Grid */}
    <section className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Dresses & Gowns', cat: 'dresses', img: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=400&h=600&q=80' },
          { name: 'Abayas & Modest', cat: 'abayas', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=400&h=600&q=80' },
          { name: 'Tops & Co-ords', cat: 'tops', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&h=600&q=80' },
          { name: 'Accessories', cat: 'accessories', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=600&q=80' },
        ].map((item) => (
          <div 
            key={item.cat} 
            onClick={() => navigateTo('collections', item.cat as Category)}
            className="group cursor-pointer relative aspect-[3/4] overflow-hidden"
          >
            <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <h3 className="text-white text-lg font-serif italic">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Products */}
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-serif text-black">New Arrivals</h2>
        <button onClick={() => navigateTo('collections')} className="text-[12px] uppercase tracking-widest text-gold hover:opacity-70 transition-all">View All</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {PRODUCTS.slice(0, 8).map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={() => alert('Item added to your luxury collection.')} />
        ))}
      </div>
    </section>

    {/* Stats Bar */}
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-serif">2,400+</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Happy Customers</div>
        </div>
        <div>
          <div className="text-3xl font-serif">200+</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Unique Styles</div>
        </div>
        <div>
          <div className="text-3xl font-serif">7</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Emirates Covered</div>
        </div>
        <div>
          <div className="text-3xl font-serif">4.8★</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Average Rating</div>
        </div>
      </div>
    </section>

    {/* Brand Banner */}
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-luxury-black text-white grid md:grid-cols-2 overflow-hidden">
        <div className="p-12 md:p-20 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl leading-tight">Crafting Beauty <br/>With Purpose</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Biowaive is more than a brand; it&apos;s a commitment to quality and elegance. Based in the heart of Sharjah, we bring you the finest fabrics and most exquisite designs.
          </p>
          <button 
            onClick={() => navigateTo('about')}
            className="w-fit px-8 py-3 border border-white/30 text-[10px] uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-colors"
          >
            Our Story
          </button>
        </div>
        <div className="relative h-64 md:h-auto">
          <Image src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&h=600&q=80" alt="Brand Story" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="max-w-3xl mx-auto px-6 text-center">
      <h2 className="text-3xl">Join the Inner Circle</h2>
      <p className="text-gray-500 mt-4 text-sm">Subscribe to receive updates on new arrivals, exclusive offers, and styling tips.</p>
      <form 
        onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to BIO*WAIVE*.'); }}
        className="mt-8 flex flex-col md:flex-row gap-4"
      >
        <input 
          type="email" 
          placeholder="Your Email Address" 
          required
          className="flex-1 bg-white border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
        />
        <button className="bg-luxury-black text-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-gold transition-colors">
          Subscribe
        </button>
      </form>
    </section>
  </div>
);

const ProductListPage = ({ 
  title, 
  subtitle, 
  products, 
  activeFilter, 
  setActiveFilter, 
  onAddToCart, 
  showFilters = true 
}: { 
  title: string, 
  subtitle: string, 
  products: Product[], 
  activeFilter: Category, 
  setActiveFilter: (cat: Category) => void, 
  onAddToCart: () => void, 
  showFilters?: boolean 
}) => (
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <p className="text-gray-500 mt-4 max-w-xl mx-auto">{subtitle}</p>
    </div>

    {showFilters && (
      <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-black/5 pb-8">
        {['all', 'dresses', 'abayas', 'tops', 'accessories'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat as Category)}
            className={`text-[12px] uppercase tracking-[2px] transition-all relative ${activeFilter === cat ? 'text-black font-bold after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-gold' : 'text-gray-400 hover:text-black'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    )}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      <AnimatePresence mode="popLayout">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </AnimatePresence>
    </div>
    
    {products.length === 0 && (
      <div className="text-center py-20 text-gray-400 italic">No products found in this category.</div>
    )}
  </div>
);

const AboutPage = ({ navigateTo }: { navigateTo: (page: Page, filter?: Category) => void }) => (
  <div className="pb-20">
    <section className="grid md:grid-cols-2 bg-white">
      <div className="relative h-[50vh] md:h-auto">
        <Image src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&h=1200&q=80" alt="About Biowaive" fill className="object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="p-12 md:p-24 flex flex-col justify-center space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Our Heritage</span>
        <h1 className="text-5xl">Defining UAE <br/>Luxury Fashion</h1>
        <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
          <p>Founded with a vision to blend traditional Emirati aesthetics with contemporary global trends, Biowaive (BioWeave International FZC) has quickly become a destination for women seeking sophistication and quality.</p>
          <p>Our journey began in Sharjah, driven by a passion for premium textiles and meticulous craftsmanship. Every piece in our collection is a testament to our commitment to excellence, from the selection of the finest silks to the intricate embroidery that defines our signature style.</p>
        </div>
      </div>
    </section>

    {/* License Strip */}
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-[11px] uppercase tracking-[2px]">
        <div className="space-y-2">
          <div className="text-gold font-bold">Legal Entity</div>
          <div className="text-gray-400">{BUSINESS_INFO.legalName}</div>
        </div>
        <div className="space-y-2">
          <div className="text-gold font-bold">Trade License</div>
          <div className="text-gray-400">No. {BUSINESS_INFO.licenseNo}</div>
        </div>
        <div className="space-y-2">
          <div className="text-gold font-bold">Authority</div>
          <div className="text-gray-400">{BUSINESS_INFO.authority}</div>
        </div>
        <div className="space-y-2">
          <div className="text-gold font-bold">Registered Address</div>
          <div className="text-gray-400 normal-case leading-relaxed">{BUSINESS_INFO.address}</div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-xl">Premium Quality</h3>
        <p className="text-gray-500 text-sm">We source only the finest materials and employ expert artisans to ensure every garment meets our luxury standards.</p>
      </div>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-6">
          <Truck className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-xl">UAE-Wide Delivery</h3>
        <p className="text-gray-500 text-sm">Fast and reliable shipping across all 7 Emirates, with complimentary delivery on orders over AED 250.</p>
      </div>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-6">
          <RotateCcw className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-xl">Easy Returns</h3>
        <p className="text-gray-500 text-sm">Your satisfaction is our priority. Enjoy a hassle-free 14-day return policy on all eligible items.</p>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="grid md:grid-cols-2 gap-20">
      <div className="space-y-12">
        <div>
          <h1 className="text-5xl mb-6">Get in Touch</h1>
          <p className="text-gray-500 leading-relaxed">Our dedicated concierge team is here to assist you with any inquiries regarding our collections, sizing, or your order.</p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-1">Our Studio</h4>
              <p className="text-sm text-gray-600">{BUSINESS_INFO.address}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-1">Phone / WhatsApp</h4>
              <p className="text-sm text-gray-600">{BUSINESS_INFO.phone}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-1">Email</h4>
              <p className="text-sm text-gray-600">{BUSINESS_INFO.email}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-1">Hours</h4>
              <p className="text-sm text-gray-600">{BUSINESS_INFO.hours}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="text-[10px] uppercase tracking-widest text-gray-400">
            Trade License: No. {BUSINESS_INFO.licenseNo} · {BUSINESS_INFO.authority} · Valid until {BUSINESS_INFO.expiry}
          </div>
        </div>
      </div>

      <div className="bg-white p-10 md:p-16 shadow-sm border border-gray-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); alert('Your message has been sent. Our team will contact you shortly.'); }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">First Name</label>
              <input type="text" required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">Last Name</label>
              <input type="text" required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">Email Address</label>
            <input type="email" required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">Subject</label>
            <select className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors text-sm bg-transparent">
              <option>General Inquiry</option>
              <option>Order Status</option>
              <option>Returns & Exchanges</option>
              <option>Wholesale</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">Message</label>
            <textarea rows={4} required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors text-sm resize-none"></textarea>
          </div>
          <button className="w-full bg-black text-white py-5 text-[12px] uppercase tracking-[3px] font-bold hover:bg-gold transition-colors mt-6">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default function BiowaiveApp() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    alert('Item added to your luxury collection.');
  };

  const navigateTo = (page: Page, filter: Category = 'all') => {
    setCurrentPage(page);
    setActiveFilter(filter);
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (currentPage === 'new') list = list.filter(p => p.tag === 'new');
    if (currentPage === 'sale') list = list.filter(p => p.tag === 'sale');
    if (activeFilter !== 'all') list = list.filter(p => p.category === activeFilter);
    return list;
  }, [currentPage, activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div className="flex-1 md:hidden">
              <button onClick={() => setIsMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            </div>
            
            <div className="hidden md:flex flex-1 gap-8">
              {/* Empty space to center logo */}
            </div>

            <div className="flex-1 text-center">
              <button onClick={() => navigateTo('home')} className="text-2xl md:text-3xl font-serif tracking-[6px] uppercase">
                BIO<span className="text-gold italic font-normal">WAIVE</span>
              </button>
            </div>

            <div className="flex-1 flex justify-end items-center gap-6">
              <button onClick={() => alert('Search functionality coming soon.')} className="text-[14px] uppercase tracking-[1px] hover:text-gold transition-colors">Search</button>
              <button onClick={() => alert('Account login coming soon.')} className="hidden md:block text-[14px] uppercase tracking-[1px] hover:text-gold transition-colors">Account</button>
              <button onClick={() => alert('Cart feature coming soon.')} className="text-[14px] uppercase tracking-[1px] hover:text-gold transition-colors flex items-center gap-2">
                Cart 
                <span className="bg-gold text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Main Nav */}
          <nav className="hidden md:flex justify-center gap-10 pb-6">
            <button onClick={() => navigateTo('home')} className="text-[12px] uppercase tracking-[2px] font-semibold hover:text-gold transition-colors">Home</button>
            <button onClick={() => navigateTo('new')} className="text-[12px] uppercase tracking-[2px] font-semibold hover:text-gold transition-colors">New Arrivals</button>
            <div 
              className="relative group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button 
                onClick={() => navigateTo('collections')}
                className="text-[12px] uppercase tracking-[2px] font-semibold hover:text-gold transition-colors flex items-center gap-1"
              >
                Collections <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Mega Menu */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl border border-black/5 p-10 grid grid-cols-2 gap-10"
                  >
                    <div>
                      <h4 className="text-[11px] uppercase tracking-[1px] font-bold text-gold mb-6">Shop by Category</h4>
                      <ul className="space-y-4">
                        {['dresses', 'abayas', 'tops', 'accessories'].map(cat => (
                          <li key={cat}>
                            <button 
                              onClick={() => navigateTo('collections', cat as Category)}
                              className="text-[13px] hover:text-gold transition-colors capitalize"
                            >
                              {cat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative aspect-video overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&h=400&q=80" alt="Featured" fill className="object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-white text-lg font-serif italic">Summer Edit</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => navigateTo('sale')} className="text-[12px] uppercase tracking-[2px] font-semibold text-[#d32f2f] hover:opacity-70 transition-opacity">Sale</button>
            <button onClick={() => navigateTo('about')} className="text-[12px] uppercase tracking-[2px] font-semibold hover:text-gold transition-colors">About</button>
            <button onClick={() => navigateTo('contact')} className="text-[12px] uppercase tracking-[2px] font-semibold hover:text-gold transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-[100] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="mt-12 space-y-8">
              <button onClick={() => navigateTo('home')} className="block text-3xl font-serif italic">Home</button>
              <button onClick={() => navigateTo('new')} className="block text-3xl font-serif italic">New Arrivals</button>
              <button onClick={() => navigateTo('collections')} className="block text-3xl font-serif italic">Collections</button>
              <button onClick={() => navigateTo('sale')} className="block text-3xl font-serif italic text-red-600">Sale</button>
              <button onClick={() => navigateTo('about')} className="block text-3xl font-serif italic">About Us</button>
              <button onClick={() => navigateTo('contact')} className="block text-3xl font-serif italic">Contact</button>
            </div>
            <div className="mt-auto pt-12 border-t border-gray-100 flex gap-6">
              <Instagram className="w-6 h-6" />
              <Phone className="w-6 h-6" />
              <Mail className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
            {currentPage === 'new' && (
              <ProductListPage 
                title="New Arrivals" 
                subtitle="The latest pieces from our studio, crafted with premium fabrics and contemporary silhouettes."
                products={filteredProducts}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onAddToCart={handleAddToCart}
                showFilters={true}
              />
            )}
            {currentPage === 'collections' && (
              <ProductListPage 
                title={activeFilter === 'all' ? 'Our Collections' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                subtitle="Explore our curated selections of high-end women&apos;s fashion."
                products={filteredProducts}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onAddToCart={handleAddToCart}
              />
            )}
            {currentPage === 'sale' && (
              <div className="space-y-0">
                <section className="bg-black text-white py-32 text-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[150px] text-white/5 select-none pointer-events-none">SALE</div>
                  <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-serif italic mb-6">The Seasonal Sale</h1>
                    <p className="text-gold uppercase tracking-[4px] text-[12px] font-bold">Up to 50% Off Selected Pieces</p>
                  </div>
                </section>
                <ProductListPage 
                  title="" 
                  subtitle=""
                  products={filteredProducts}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  onAddToCart={handleAddToCart}
                  showFilters={true}
                />
              </div>
            )}
            {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <h4 className="text-lg font-serif tracking-[2px] uppercase">BIO*WAIVE*</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">
                BioWeave International (FZC) is a premier e-commerce destination for women&apos;s fashion, providing high-quality garments and accessories across the Middle East.
              </p>
              <div className="text-[9px] text-gold uppercase tracking-wider">
                License No. 10762 · SRTI Free Zone Authority
              </div>
            </div>
            
            <div>
              <h5 className="text-[11px] uppercase tracking-[1px] font-bold text-gold mb-6">Shop</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-gray-400">
                <li><button onClick={() => navigateTo('collections', 'dresses')} className="hover:text-gold transition-colors">Dresses</button></li>
                <li><button onClick={() => navigateTo('collections', 'abayas')} className="hover:text-gold transition-colors">Abayas</button></li>
                <li><button onClick={() => navigateTo('collections', 'tops')} className="hover:text-gold transition-colors">Co-ords</button></li>
                <li><button onClick={() => navigateTo('collections', 'accessories')} className="hover:text-gold transition-colors">Accessories</button></li>
                <li><button onClick={() => navigateTo('sale')} className="hover:text-gold transition-colors">Sale</button></li>
                <li><button onClick={() => alert('Gift cards coming soon.')} className="hover:text-gold transition-colors">Gift Cards</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[11px] uppercase tracking-[1px] font-bold text-gold mb-6">Support</h5>
              <ul className="space-y-2 text-[10px] text-gray-400">
                <li><button onClick={() => alert('Shipping info: 1-3 business days UAE wide.')} className="hover:text-gold transition-colors">Shipping</button></li>
                <li><button onClick={() => alert('Returns policy: 14-day easy returns.')} className="hover:text-gold transition-colors">Returns</button></li>
                <li><button onClick={() => alert('Size guide coming soon.')} className="hover:text-gold transition-colors">Size Guide</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-gold transition-colors">Contact</button></li>
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <h5 className="text-[11px] uppercase tracking-[1px] font-bold text-gold mb-6">Follow Us</h5>
                <div className="flex gap-4">
                  <button onClick={() => alert('Instagram: @biowaive')} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"><Instagram className="w-4 h-4" /></button>
                  <button onClick={() => window.open('https://wa.me/971506793455')} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"><Phone className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 mt-8 text-[10px] text-gray-500 uppercase tracking-widest">
                <span>2.4k+ Customers</span>
                <span>7 Emirates</span>
                <span>4.8★ Rating</span>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] text-gray-500 text-center md:text-left">
              © 2025 {BUSINESS_INFO.legalName} — License No. {BUSINESS_INFO.licenseNo} · {BUSINESS_INFO.authority} · Sharjah, UAE
            </div>
            <div className="flex gap-4 opacity-30 grayscale">
              <div className="text-[8px] border border-white/30 px-2 py-1 rounded">VISA</div>
              <div className="text-[8px] border border-white/30 px-2 py-1 rounded">MASTERCARD</div>
              <div className="text-[8px] border border-white/30 px-2 py-1 rounded">AMEX</div>
              <div className="text-[8px] border border-white/30 px-2 py-1 rounded">APPLE PAY</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
