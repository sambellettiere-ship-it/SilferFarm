'use client';

import { useState } from 'react';
import { addProductAction } from '@/app/actions/inventory';
import { Plus } from 'lucide-react';

export function AddProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    await addProductAction(formData);
    setIsOpen(false);
    setIsPending(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-stone-300 rounded-3xl text-stone-500 flex items-center justify-center space-x-2 hover:border-olive hover:text-olive transition-colors"
      >
        <Plus size={20} />
        <span className="font-medium">Add New Product</span>
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-stone-100">
      <h3 className="font-serif font-medium text-lg mb-4">New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Name</label>
          <input name="name" required className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive" placeholder="e.g. Heirloom Tomatoes" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Price</label>
            <input name="price" required className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive" placeholder="$4.00/lb" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Status</label>
            <select name="status" className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive">
              <option value="In Stock">In Stock</option>
              <option value="Sold Out">Sold Out</option>
              <option value="Few Left">Few Left</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3 pt-2">
          <button type="submit" disabled={isPending} className="flex-1 bg-olive text-white py-2 rounded-full font-medium hover:bg-olive-dark transition-colors disabled:opacity-50">
            {isPending ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-stone-100 text-stone-700 py-2 rounded-full font-medium hover:bg-stone-200 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
