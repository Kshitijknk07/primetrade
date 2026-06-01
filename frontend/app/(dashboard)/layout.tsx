'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { storage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = storage.getUser();
    if (!userData) {
      router.push('/login');
    } else {
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    storage.clear();
    router.push('/login');
  };

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                Primetrade
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium ${
                    isActive('/dashboard') && !pathname.includes('/profile') && !pathname.includes('/admin')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  } pb-4`}
                >
                  Tasks
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium ${
                    isActive('/profile')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  } pb-4`}
                >
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`text-sm font-medium ${
                      isActive('/admin')
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    } pb-4`}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user && <span className="text-sm text-slate-600">{user.email}</span>}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
