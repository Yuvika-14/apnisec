'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || 'Login failed');
            }

            localStorage.setItem('token', json.data.token.accessToken);
            localStorage.setItem('user', JSON.stringify(json.data.user));

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
            {/* Left Section - Hero/Branding */}
            <div className="hidden lg:flex flex-col justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-500/10 backdrop-blur-3xl"></div>
                <div className="relative z-10 text-slate-200">
                    <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
                    <p className="text-lg text-slate-400">Securely access your ApniSec dashboard and manage your assets.</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <ShieldCheck className="mx-auto h-12 w-12 text-sky-500" />
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Sign in to ApniSec</h2>
                        <p className="mt-2 text-sm text-slate-400">
                            New here? <Link href="/register" className="font-medium text-sky-500 hover:text-sky-400 transition-colors">Create an account</Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all sm:text-sm"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" university-className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="#" className="font-medium text-sky-500 hover:text-sky-400 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-xl bg-sky-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sky-900/20 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
