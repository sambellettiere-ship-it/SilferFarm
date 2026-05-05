'use server';

import { setSession, logout as clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  
  if (password === process.env.ADMIN_PASSWORD) {
    await setSession();
    redirect('/admin');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logout() {
  await clearSession();
  redirect('/admin/login');
}
