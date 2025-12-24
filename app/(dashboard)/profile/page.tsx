'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Shield, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    async function fetchProfile() {
        try {
            const res = await fetch('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (res.ok) setUser(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        setMsg('');
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');

        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name }),
            });
            if (res.ok) {
                setMsg('Profile updated successfully');
                const json = await res.json();
                setUser(json.data);
                localStorage.setItem('user', JSON.stringify(json.data));
            }
        } catch (e) {
            setMsg('Failed to update');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-20 w-20 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500">
                        <User className="h-10 w-10" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                        <p className="text-slate-400">{user?.role}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <input
                                name="name"
                                defaultValue={user?.name}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <div className="relative opactiy-50">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <input
                                defaultValue={user?.email}
                                disabled
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-slate-400"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <span className="text-green-400 text-sm">{msg}</span>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
