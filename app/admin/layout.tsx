import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
