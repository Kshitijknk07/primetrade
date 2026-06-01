'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { AdminPanel } from '@/components/AdminPanel';

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = storage.getUser();
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    setIsAdmin(true);
  }, [router]);

  if (!isAdmin) {
    return <div className="text-center py-8">Checking permissions...</div>;
  }

  return (
    <div>
      <AdminPanel />
    </div>
  );
}
