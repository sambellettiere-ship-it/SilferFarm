import { getAllProducts, getStoreStatus } from '@/lib/db';
import { AddProductForm } from '@/components/admin/AddProductForm';
import { ProductItem } from '@/components/admin/ProductItem';
import { logout } from '@/app/actions/auth';
import { LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AdminDashboard() {
  const products = getAllProducts();
  const lastUpdated = getStoreStatus();
  
  const formattedDate = format(new Date(lastUpdated), 'MMM d, yyyy');
  const formattedTime = format(new Date(lastUpdated), 'h:mm a');

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 pb-24">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900">Inventory Dashboard</h1>
          <p className="text-sm text-stone-500 mt-1">Last synced: {formattedDate} at {formattedTime}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="p-2 bg-stone-200 text-stone-700 rounded-full hover:bg-stone-300 transition-colors">
            <LogOut size={18} />
          </button>
        </form>
      </header>

      <div className="mb-6">
        <Link href="/" className="inline-flex items-center space-x-2 text-olive hover:text-olive-dark font-medium text-sm">
          <ArrowLeft size={16} />
          <span>View Public Store</span>
        </Link>
      </div>

      <div className="space-y-6">
        <AddProductForm />
        
        <div className="space-y-4">
          <h3 className="font-serif font-medium text-lg text-stone-800">Current Items</h3>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div className="text-center py-10 bg-white rounded-3xl border border-stone-200">
              <p className="text-stone-500 mb-2">No products added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
