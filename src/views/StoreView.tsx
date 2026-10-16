import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Store as StoreIcon,
  Search,
  Filter,
  Plus,
  Building2,
  Tag,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Flag,
  DollarSign
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

export const StoreView: React.FC = () => {
  const {
    products,
    stores,
    createProduct,
    currentUser,
    selectedUniversityId,
    selectedUniversity,
    universities,
    submitReport,
    showToast
  } = useApp();

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [budgetPreset, setBudgetPreset] = useState<'all' | 'under_10k' | '10k_25k' | '25k_50k' | 'above_50k'>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [conditionFilter, setConditionFilter] = useState<'all' | 'new' | 'pre-owned'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');

  // Modal State
  const [showListModal, setShowListModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState<Product | null>(null);
  const [reportReason, setReportReason] = useState('');

  // New product form
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('essentials');
  const [prodCondition, setProdCondition] = useState<'new' | 'pre-owned'>('new');
  const [prodPickup, setProdPickup] = useState('');
  const [prodContact, setProdContact] = useState('');

  const productCategories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'perfumes', label: 'Perfumes & Decants' },
    { id: 'clothing', label: 'Clothing & Thrift' },
    { id: 'shoes', label: 'Shoes & Footwear' },
    { id: 'gadgets', label: 'Tech & Electronics' },
    { id: 'phones_accessories', label: 'Phone Accessories' },
    { id: 'books_stationery', label: 'Books & Textbooks' },
    { id: 'beauty_care', label: 'Beauty & Skincare' },
    { id: 'essentials', label: 'Hostel Essentials' },
    { id: 'food_snacks', label: 'Snacks & Groceries' },
    { id: 'other', label: 'Other Items' }
  ];

  // Filtering
  const filteredProducts = products
    .filter((prod) => {
      // University filter
      if (selectedUniversityId !== 'all') {
        const uObj = universities.find((u) => u.id === selectedUniversityId);
        if (uObj && prod.university_name !== uObj.name) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== 'all' && prod.category !== categoryFilter) {
        return false;
      }

      // Condition filter
      if (conditionFilter !== 'all' && prod.condition !== conditionFilter) {
        return false;
      }

      // Budget presets
      if (budgetPreset === 'under_10k' && prod.price >= 10000) return false;
      if (budgetPreset === '10k_25k' && (prod.price < 10000 || prod.price > 25000)) return false;
      if (budgetPreset === '25k_50k' && (prod.price < 25000 || prod.price > 50000)) return false;
      if (budgetPreset === 'above_50k' && prod.price <= 50000) return false;

      // Custom price range
      if (minPrice && prod.price < parseFloat(minPrice)) return false;
      if (maxPrice && prod.price > parseFloat(maxPrice)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchDesc = prod.description.toLowerCase().includes(q);
        const matchStore = prod.store_name.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchStore) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice || !prodPickup.trim()) return;

    createProduct({
      store_id: 'store-custom',
      store_name: currentUser?.full_name ? `${currentUser.full_name}'s Student Store` : 'Campus Vendor',
      name: prodName.trim(),
      description: prodDesc.trim(),
      price: parseFloat(prodPrice),
      currency: 'NGN',
      category: prodCategory,
      condition: prodCondition,
      pickup_location: prodPickup.trim(),
      university_name: selectedUniversity?.name || currentUser?.university_name || 'University of Lagos',
      contact_url: prodContact.trim() || `https://wa.me/2348000000000?text=Hi, I saw ${encodeURIComponent(prodName)} on univyX Store`,
      is_available: true
    });

    setShowListModal(false);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdPickup('');
    setProdContact('');
  };

  const handleReportProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showReportModal || !reportReason.trim()) return;
    submitReport(showReportModal.id, 'product', reportReason, showReportModal.name);
    setShowReportModal(null);
    setReportReason('');
  };

  return (
    <div className="w-full min-w-0">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D9BF0] mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Campus Commerce & Student Vendors</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              univyX Store
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Discover student-friendly essentials, textbooks, tech accessories, and thrift fashion with direct campus pickup.
            </p>
          </div>

          <button
            onClick={() => setShowListModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] active:scale-95 transition-all shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">List an Item</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-[#111316] border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {productCategories.map((cat) => {
          const isSelected = categoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#1D9BF0] text-white'
                  : 'bg-white dark:bg-[#16181C] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter and Budget Controls Bar */}
      <div className="p-3.5 sm:p-4 bg-white dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-slate-800 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, chargers, textbooks, fragrance decants..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
          />
        </div>

        {/* Budget Presets & Custom Limits */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[#1D9BF0]" />
            Budget:
          </span>
          <button
            onClick={() => setBudgetPreset('all')}
            className={`px-2.5 py-1 rounded-lg ${budgetPreset === 'all' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
          >
            All
          </button>
          <button
            onClick={() => setBudgetPreset('under_10k')}
            className={`px-2.5 py-1 rounded-lg ${budgetPreset === 'under_10k' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
          >
            &lt; ₦10,000
          </button>
          <button
            onClick={() => setBudgetPreset('10k_25k')}
            className={`px-2.5 py-1 rounded-lg ${budgetPreset === '10k_25k' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
          >
            ₦10k - ₦25k
          </button>
          <button
            onClick={() => setBudgetPreset('25k_50k')}
            className={`px-2.5 py-1 rounded-lg ${budgetPreset === '25k_50k' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
          >
            ₦25k - ₦50k
          </button>
          <button
            onClick={() => setBudgetPreset('above_50k')}
            className={`px-2.5 py-1 rounded-lg ${budgetPreset === 'above_50k' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
          >
            &gt; ₦50k
          </button>

          {/* Condition & Sort */}
          <div className="ml-auto flex items-center gap-2">
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value as any)}
              className="p-1 rounded-lg bg-slate-100 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
            >
              <option value="all">Any Condition</option>
              <option value="new">Brand New</option>
              <option value="pre-owned">Pre-owned</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-1 rounded-lg bg-slate-100 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid (Text-first product cards with clear pricing and typography) */}
      <div className="p-4 sm:p-5">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            No products found matching these filters. Try clearing your search or price range.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-[#1D9BF0]/50 transition-colors shadow-xs"
              >
                <div>
                  {/* Category & Condition unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="capitalize text-[#1D9BF0] font-semibold">
                        {prod.category.replace('_', ' ')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{prod.condition}</span>
                    </div>

                    <button
                      onClick={() => setShowReportModal(prod)}
                      title="Report product"
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {prod.name}
                  </h3>

                  <div className="mt-1 flex items-baseline gap-1 text-slate-900 dark:text-white">
                    <span className="text-lg font-extrabold tabular-nums">
                      {prod.currency} {prod.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Vendor & Pickup Location */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <StoreIcon className="w-3 h-3 text-[#1D9BF0] shrink-0" />
                      <span className="font-semibold">{prod.store_name}</span>
                      <span className="text-slate-400">({prod.university_name})</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">Pickup: {prod.pickup_location}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Seller Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Direct Campus Handover</span>
                  {prod.contact_url ? (
                    <a
                      href={prod.contact_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold active:scale-95 transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contact Seller</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Inquire via Hostel</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* List an Item Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181C] shadow-2xl p-5 border border-slate-200 dark:border-slate-800 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              List Item on univyX Store
            </h3>
            <p className="text-slate-500 mt-0.5">
              Sell your textbook, gadget, perfume decant, or fashion piece to students on campus.
            </p>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-3">
              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Product Name *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Baseus 65W Fast Charger (Includes Type-C Cable)"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Price (NGN) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Condition</label>
                  <select
                    value={prodCondition}
                    onChange={(e) => setProdCondition(e.target.value as any)}
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="new">Brand New</option>
                    <option value="pre-owned">Pre-owned / Used</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value as any)}
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="perfumes">Perfumes & Fragrances</option>
                  <option value="clothing">Clothing & Fashion</option>
                  <option value="shoes">Shoes & Accessories</option>
                  <option value="gadgets">Gadgets & Electronics</option>
                  <option value="phones_accessories">Phones & Accessories</option>
                  <option value="books_stationery">Books & Stationery</option>
                  <option value="beauty_care">Beauty & Personal Care</option>
                  <option value="essentials">Student Essentials</option>
                  <option value="thrift_preowned">Thrift & Pre-owned</option>
                  <option value="food_snacks">Food & Snacks</option>
                  <option value="other">Other Products</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Campus Pickup Location *</label>
                <input
                  type="text"
                  required
                  value={prodPickup}
                  onChange={(e) => setProdPickup(e.target.value)}
                  placeholder="e.g. Moremi Hall Quadrangle / Faculty of Science"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">WhatsApp or Phone Link</label>
                <input
                  type="text"
                  value={prodContact}
                  onChange={(e) => setProdContact(e.target.value)}
                  placeholder="https://wa.me/2348012345678"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Describe item condition, inclusions, and study relevance..."
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1D9BF0] text-white font-semibold hover:bg-[#1A8CD8]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Product Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Report Marketplace Listing</h3>
            <p className="text-slate-500 mt-1">
              Reporting: <strong>{showReportModal.name}</strong>
            </p>
            <form onSubmit={handleReportProduct} className="mt-3 space-y-3">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                required
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
              >
                <option value="" disabled className="dark:bg-[#16181C]">Select reason</option>
                <option value="Fraudulent or counterfeit item" className="dark:bg-[#16181C]">Fraudulent or counterfeit item</option>
                <option value="Exorbitant or misleading price" className="dark:bg-[#16181C]">Misleading price or condition</option>
                <option value="Unreachable vendor or scam" className="dark:bg-[#16181C]">Unreachable vendor or scam</option>
                <option value="Prohibited campus item" className="dark:bg-[#16181C]">Prohibited campus item</option>
              </select>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(null)}
                  className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-rose-600 text-white rounded-lg font-semibold"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
