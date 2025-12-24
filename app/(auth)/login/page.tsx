'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Loader2, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

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
        <div className="min-h-screen w-full flex bg-slate-950 relative overflow-hidden font-sans selection:bg-sky-500/30 z-[100]">
            {/* Animated Background Elements (CSS only) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/10 rounded-full blur-[120px] opacity-70"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] opacity-70"></div>
            </div>

            {/* Left Section: Hero/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden z-10">
                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8 relative inline-block text-white transition-transform hover:scale-105 duration-700">
                        <div className="absolute inset-0 bg-sky-500 blur-[40px] opacity-30 rounded-full"></div>
                        <ShieldCheck className="h-24 w-24 text-sky-400 relative z-10 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                    </div>

                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300 mb-6">
                        ApniSec
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                        Advanced security management for the modern web. <br />
                        Monitor, analyze, and secure your assets with confidence.
                    </p>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-black/50">
                        <div className="text-center mb-10">
                            <div className="lg:hidden flex justify-center mb-4">
                                <ShieldCheck className="h-12 w-12 text-sky-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-400 text-sm">Enter your credentials to access your dashboard.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-pulse">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-5">
                                <div className="group">
                                    <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className={`h-5 w-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-sky-400' : 'text-slate-500'}`} />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className="block w-full pl-10 pr-3 py-3.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 sm:text-sm shadow-inner"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Password</label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className={`h-5 w-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-sky-400' : 'text-slate-500'}`} />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            className="block w-full pl-10 pr-3 py-3.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 sm:text-sm shadow-inner"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500/40 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 select-none cursor-pointer hover:text-slate-300">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-sky-500 hover:text-sky-400 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500/50 shadow-lg shadow-sky-900/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <span className="flex items-center gap-2 relative z-10">
                                        Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
                            <p className="text-sm text-slate-400">
                                Don't have an account?{' '}
                                <Link href="/register" className="font-medium text-sky-400 hover:text-sky-300 transition-colors relative group">
                                    Create one now
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-600">© 2024 ApniSec. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
