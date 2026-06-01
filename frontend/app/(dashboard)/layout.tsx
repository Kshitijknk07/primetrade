'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/(dashboard)/dashboard';
    }
    return pathname.includes(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-slate-200">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/dashboard"
              className="text-lg font-bold tracking-tight text-slate-900 flex-shrink-0"
            >
              Primetrade
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-8 flex-1">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard') && !pathname.includes('/profile') && !pathname.includes('/admin')
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tasks
              </Link>

              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Profile
              </Link>

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="h-6" />

            {/* User Info & Logout */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {user && (
                <span className="text-sm text-slate-600">{user.email}</span>
              )}
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="text-xs font-medium"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
