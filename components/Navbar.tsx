'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                    <ShieldCheck className="h-8 w-8 text-sky-400" />
                    <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                        ApniSec
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                        <Link href="#services" className="hover:text-sky-400 transition-colors">Services</Link>
                        <Link href="#about" className="hover:text-sky-400 transition-colors">About</Link>
                        <Link href="#contact" className="hover:text-sky-400 transition-colors">Contact</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 text-sm font-medium bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors shadow-lg shadow-sky-500/20"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
