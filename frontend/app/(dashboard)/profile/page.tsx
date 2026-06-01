'use client';

import { useState, useEffect } from 'react';
import { userAPI } from '@/lib/api';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response: any = await userAPI.getProfile();
      setProfile(response.data);
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response: any = await userAPI.updateProfile(formData);
      setProfile(response.data);
      storage.setUser(response.data);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-600 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-600 text-sm">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your account information</p>
        </div>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
            <CardDescription>Your email, username, and account role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-slate-700 mb-2 block">Email</Label>
              <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                {profile.email}
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700 mb-2 block">Username</Label>
              <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                {profile.username}
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700 mb-2 block">Role</Label>
              <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium capitalize">
                {profile.role === 'admin' ? (
                  <span className="text-purple-600">Administrator</span>
                ) : (
                  <span className="text-blue-600">User</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your first and last name</CardDescription>
            </div>
            {!editing && (
              <Button
                onClick={() => setEditing(true)}
                size="sm"
                className="bg-black hover:bg-slate-900 text-white"
              >
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {!editing ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-slate-700 mb-2 block">First Name</Label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                    {profile.firstName || <span className="text-slate-500">Not set</span>}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700 mb-2 block">Last Name</Label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                    {profile.lastName || <span className="text-slate-500">Not set</span>}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-xs font-semibold text-slate-700 mb-2 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="h-10 bg-white border-slate-200"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="h-10 bg-white border-slate-200"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-black hover:bg-slate-900 text-white"
                    size="sm"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditing(false)}
                    size="sm"
                    className="border-slate-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
