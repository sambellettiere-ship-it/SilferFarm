'use client';

import { useState } from 'react';
import { updateProductAction, deleteProductAction } from '@/app/actions/inventory';
import type { Product } from '@/lib/db';
import { EyeOff, Eye, Trash2, Check, X } from 'lucide-react';

export function ProductItem({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.append('hidden', product.hidden ? 'true' : 'false'); // retain hidden state
    await updateProductAction(product.id, formData);
    setIsPending(false);
    setIsEditing(false);
  }

  async function toggleVisibility() {
    setIsPending(true);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('status', product.status);
    formData.append('hidden', product.hidden ? 'false' : 'true');
    await updateProductAction(product.id, formData);
    setIsPending(false);
  }

  async function handleDelete() {
    if (confirm('Are you sure you want to permanently delete this item?')) {
      setIsPending(true);
      await deleteProductAction(product.id);
      setIsPending(false);
    }
  }

  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-olive">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Name</label>
            <input name="name" defaultValue={product.name} required className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Price</label>
              <input name="price" defaultValue={product.price} required className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Status</label>
              <input name="status" defaultValue={product.status} required className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive" />
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <button type="submit" disabled={isPending} className="flex-1 bg-olive text-white py-2 rounded-full font-medium hover:bg-olive-dark flex items-center justify-center space-x-1 disabled:opacity-50">
              <Check size={16} /> <span>Save</span>
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-stone-100 text-stone-700 py-2 rounded-full font-medium hover:bg-stone-200 flex items-center justify-center space-x-1">
              <X size={16} /> <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-stone-100 flex flex-col space-y-4 ${product.hidden ? 'opacity-60 grayscale' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-stone-900">{product.name}</h4>
          <p className="text-stone-500 font-medium text-sm mt-0.5">{product.price}</p>
        </div>
        <div className={`text-xs px-2 py-1 rounded-md font-semibold ${product.status.toLowerCase().includes('sold') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {product.status}
        </div>
      </div>
      
      <div className="flex space-x-2 pt-2 border-t border-stone-100">
        <button onClick={() => setIsEditing(true)} disabled={isPending} className="flex-1 bg-stone-50 text-stone-700 py-2 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors">
          Edit
        </button>
        <button onClick={toggleVisibility} disabled={isPending} className="flex-1 bg-stone-50 text-stone-700 py-2 rounded-full text-sm font-medium hover:bg-stone-100 flex items-center justify-center space-x-1 transition-colors">
          {product.hidden ? <><Eye size={16}/><span>Show</span></> : <><EyeOff size={16}/><span>Hide</span></>}
        </button>
        <button onClick={handleDelete} disabled={isPending} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors flex-shrink-0">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
