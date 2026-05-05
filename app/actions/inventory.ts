'use server';

import { addProduct, updateProduct, deleteProduct } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

async function checkAuth() {
  const session = await getSession();
  if (!session || !session.admin) {
    throw new Error('Unauthorized');
  }
}

export async function addProductAction(formData: FormData) {
  await checkAuth();
  
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const status = formData.get('status') as string;
  
  if (!name || !price || !status) return { error: 'All fields are required' };
  
  try {
    addProduct(name, price, status);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to add product' };
  }
}

export async function updateProductAction(id: number, formData: FormData) {
  await checkAuth();
  
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const status = formData.get('status') as string;
  const hidden = formData.get('hidden') === 'true' ? 1 : 0;
  
  if (!name || !price || !status) return { error: 'All fields are required' };
  
  try {
    updateProduct(id, name, price, status, hidden);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update product' };
  }
}

export async function deleteProductAction(id: number) {
  await checkAuth();
  
  try {
    deleteProduct(id);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete product' };
  }
}
