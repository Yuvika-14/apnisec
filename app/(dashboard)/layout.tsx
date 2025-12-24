'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShieldCheck, LayoutDashboard, User, LogOut, Loader2 } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        // Optional: Verify token with /api/auth/me to ensures it's still valid
        // For now, trust local storage to avoid blocking render too much
        setUser(JSON.parse(userData));
        setLoading(false);
    }, [router]);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-950 flex-col hidden md:flex sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <ShieldCheck className="h-8 w-8 text-sky-400" />
                        <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                            ApniSec
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors">
                        <User className="h-5 w-5" />
                        Profile
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="mb-4 px-2">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="md:hidden p-4 border-b border-slate-800 flex items-center justify-between">
                    <Link href="/" className="font-bold text-sky-400">ApniSec</Link>
                    <button onClick={handleLogout}><LogOut className="h-5 w-5 text-slate-400" /></button>
                </div>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
