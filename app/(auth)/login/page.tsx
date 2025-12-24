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
        <div className="min-h-screen bg-white text-black p-20">
            <h1 className="text-6xl font-black mb-10 text-red-600">TEST LOGIN PAGE</h1>
            <div className="max-w-md bg-gray-100 p-10 rounded-xl border-4 border-black">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="email" type="email" placeholder="Email" className="w-full p-4 border-2 border-black rounded" required />
                    <input name="password" type="password" placeholder="Password" className="w-full p-4 border-2 border-black rounded" required />
                    <button type="submit" className="w-full p-4 bg-black text-white font-bold rounded">
                        {loading ? 'Submitting...' : 'SIGN IN'}
                    </button>
                    {error && <p className="text-red-500 font-bold">{error}</p>}
                </form>
                <div className="mt-4">
                    <Link href="/register" className="text-blue-600 underline font-bold">Need an account? Register</Link>
                </div>
            </div>
        </div>
    );
}
