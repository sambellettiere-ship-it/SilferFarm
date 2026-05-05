'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import { KeyRound, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-olive">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-serif font-medium text-stone-900">Admin Access</h1>
          <p className="text-stone-500 mt-2">Enter your password to manage inventory.</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive transition-colors"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm text-center">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center space-x-2 bg-olive hover:bg-olive-dark text-white py-3 px-6 rounded-full transition-colors disabled:opacity-50"
          >
            <span>{isPending ? 'Authenticating...' : 'Secure Login'}</span>
            {!isPending && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
