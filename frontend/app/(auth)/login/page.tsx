'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authAPI } from '@/lib/api';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordInput } from '@/components/PasswordInput';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await authAPI.login(email, password);
      if (!response.success || !response.data?.token) {
        throw new Error(response.message || 'Login failed');
      }
      storage.setToken(response.data.token);
      storage.setUser(response.data);
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md border-0 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
      <CardHeader className="space-y-3 pb-8 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription className="text-base text-slate-500">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200"
            />
          </div>

          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-slate-900 h-12 text-base font-semibold rounded-xl transition-all duration-200 active:scale-98 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="pt-2 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-black font-semibold hover:text-slate-700 transition-colors duration-200">
            Create one
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
