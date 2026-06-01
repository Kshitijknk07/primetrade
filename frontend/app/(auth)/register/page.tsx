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
import { PasswordStrengthGuide } from '@/components/PasswordStrengthGuide';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await authAPI.register(formData);
      storage.setToken(response.data.token);
      storage.setUser(response.data);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center gap-8 max-w-6xl mx-auto">
      <Card className="w-full max-w-md border-0 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex-shrink-0">
        <CardHeader className="space-y-3 pb-8 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Get Started</CardTitle>
          <CardDescription className="text-base text-slate-500">Create your account to begin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2.5">
                <Label htmlFor="firstName" className="text-sm font-medium text-slate-900">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="lastName" className="text-sm font-medium text-slate-900">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="username" className="text-sm font-medium text-slate-900">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
                className="bg-white border-slate-200 h-11 text-base rounded-xl focus:border-slate-400 focus:ring-0 transition-colors duration-200"
              />
            </div>

            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              placeholder="••••••••"
              showStrength={true}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-slate-900 h-12 text-base font-semibold rounded-xl transition-all duration-200 active:scale-98 mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="pt-2 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-semibold hover:text-slate-700 transition-colors duration-200">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="hidden lg:block w-80 flex-shrink-0">
        <PasswordStrengthGuide />
      </div>
    </div>
  );
}
