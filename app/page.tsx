import { getVisibleProducts, getStoreStatus } from '@/lib/db';
import { MapPin, Clock, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

export default async function Home() {
  const products = getVisibleProducts();
  const lastUpdated = getStoreStatus();
  
  const formattedDate = format(new Date(lastUpdated), 'MMMM do');
  const formattedTime = format(new Date(lastUpdated), 'h:mm a');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      {/* Top Bar / Navigation */}
      <nav className="h-20 px-6 sm:px-10 border-b border-stone-200 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10 12 2l9 8"/><path d="M5 10v12h14V10"/><path d="M9 22v-8h6v8"/><path d="m9 14 6 8"/><path d="m15 14-6 8"/><circle cx="12" cy="6.5" r="1.5"/></svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-olive-dark">Silfer Farm Stand</h1>
        </div>
        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium uppercase tracking-widest text-stone-500">
          <a href="/admin" className="text-rust opacity-60 hover:opacity-100 transition-opacity">Admin Login</a>
        </div>
      </nav>

      {/* Main Viewport Grid */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 p-4 sm:p-6 md:p-10">
        
        {/* Left Column: Hero & Info */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Hero Image Card */}
          <div className="relative h-64 w-full bg-stone-200 rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
            <Image 
              src="/silferfarm.jpeg"
              alt="Silfer Farm Stand"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-xs uppercase tracking-[0.2em] mb-1 font-semibold">Self-Serve</p>
              <h2 className="text-2xl font-serif">Fresh From Our Soil</h2>
            </div>
          </div>

          {/* Directions & Vital Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col gap-6">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-rust font-bold mb-2">Open Daily</h3>
              <p className="text-xl font-medium">9:00 AM – 7:00 PM</p>
              <p className="text-sm text-stone-500 mt-1">1085 County Rd 2200 N, Champaign, IL 61822</p>
            </div>

            <a 
              href="https://maps.google.com/?q=1085+County+Rd+2200+N,+Champaign,+IL+61822" 
              target="_blank" rel="noopener noreferrer"
              className="w-full py-4 bg-olive text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-olive-light transition-colors"
            >
              <MapPin size={18} />
              Get Directions
            </a>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3 flex items-center gap-2">
                <Info size={14}/> The Honor System
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 italic mb-4">
                Grab what you need, leave your payment in the box or pay digitally via our accepted methods. We appreciate your honesty!
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-stone-50 rounded-lg text-[10px] font-bold border border-stone-200 flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-olive" /> CASH
                </div>
                <div className="px-3 py-1.5 bg-stone-50 rounded-lg text-[10px] font-bold border border-stone-200 flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-olive" /> VENMO
                </div>
                <div className="px-3 py-1.5 bg-stone-50 rounded-lg text-[10px] font-bold border border-stone-200 flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-olive" /> ZELLE
                </div>
              </div>
            </div>
          </div>

          <div className="bg-olive-dark text-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-serif font-medium mb-3 text-stone-200">About Silfer Farm</h3>
            <p className="text-sm leading-relaxed text-stone-300 opacity-90">
               Nestled in the heart of Champaign, Silfer Farm has been a family passion project for over a decade. We believe in sustainable practices, community connection, and the simple joy of fresh, high-quality food.
            </p>
          </div>
        </div>

        {/* Right Column: Live Inventory Board */}
        <div className="md:col-span-8 flex flex-col bg-white rounded-[40px] shadow-sm border border-stone-200 overflow-hidden">
          {/* Inventory Header */}
          <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-100 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-olive-dark">Live Inventory</h2>
              <p className="text-sm text-stone-500 mt-2 flex items-center">
                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Updated: {formattedDate} at {formattedTime}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-5 py-2.5 bg-stone-50 rounded-full text-xs font-semibold border border-stone-200">All Items</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max h-full">
            {products.length > 0 ? (
              products.map(product => {
                const isSoldOut = product.status.toLowerCase().includes('sold') || product.status.toLowerCase().includes('out');
                const isLowStock = product.status.toLowerCase().includes('few') || product.status.toLowerCase().includes('left');

                return (
                  <div key={product.id} className={`p-5 rounded-2xl border border-stone-200 flex items-center gap-4 transition-all ${isSoldOut ? 'bg-white opacity-60 grayscale' : 'bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'}`}>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isSoldOut ? 'bg-stone-100' : 'bg-[#D8E0D8]'}`}>
                      {/* Generative icon based on name if possible, or fallback */}
                      {product.name.toLowerCase().includes('egg') ? '🥚' : 
                       product.name.toLowerCase().includes('honey') ? '🍯' : 
                       product.name.toLowerCase().includes('cookie') ? '🍪' : 
                       product.name.toLowerCase().includes('tomato') ? '🍅' : 
                       product.name.toLowerCase().includes('corn') ? '🌽' : '🌿'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-olive-dark truncate">{product.name}</h4>
                      <p className="text-sm text-stone-500 mt-0.5">{product.price}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-bold uppercase py-1.5 px-2.5 rounded-md inline-block ${
                        isSoldOut ? 'bg-red-50 text-red-500' : 
                        isLowStock ? 'bg-orange-100 text-orange-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {isSoldOut ? 'Sold Out' : 'In Stock'}
                      </span>
                      <p className="text-[10px] text-stone-500 mt-1.5 truncate max-w-[80px]">{product.status}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex items-center justify-center py-20 text-stone-500">
                We&apos;re currently sold out of everything! Check back later.
              </div>
            )}
          </div>

          {/* Footer Branding Strip */}
          <div className="px-6 md:px-8 py-5 bg-stone-50 border-t border-stone-200 flex justify-between items-center mt-auto">
            <p className="text-xs text-stone-500">Owned and operated by the Silfer Family since 2012.</p>
            <div className="flex gap-3">
              <a href="mailto:info@silferfarm.com" className="w-8 h-8 rounded-full border border-rust flex items-center justify-center text-rust hover:bg-rust hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Status / Utility Bar */}
      <footer className="mt-8 h-12 bg-olive-dark text-white/70 px-6 sm:px-10 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
        <div className="truncate pr-4">Champaign, IL &bull; Local Farm</div>
        <div className="flex gap-4 sm:gap-6 items-center text-white/90 flex-shrink-0">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            Online
          </span>
          <span className="hidden sm:inline">&copy; {new Date().getFullYear()} Silfer Farm</span>
        </div>
      </footer>
    </div>
  );
}
