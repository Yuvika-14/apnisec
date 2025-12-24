import Navbar from '@/components/Navbar';
import { ArrowRight, Lock, Cloud, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950"></div>
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Next-Gen Cybersecurity
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Secure Your Digital Assets with <span className="text-sky-500">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Comprehensive security solutions including Cloud Security, Reteam Assessments, and VAPT services tailored for your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="px-8 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg font-semibold transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto">defending your infrastructure with advanced methodologies and expert analysis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 transition-colors group">
              <div className="h-12 w-12 bg-sky-500/10 rounded-lg flex items-center justify-center mb-6 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Cloud Security</h3>
              <p className="text-slate-400 leading-relaxed">
                Secure your AWS, Azure, and GCP environments with our comprehensive cloud security posture management.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-colors group">
              <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Reteam Assessment</h3>
              <p className="text-slate-400 leading-relaxed">
                Simulate real-world attacks to identify weaknesses in your people, processes, and technology stack.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">VAPT Services</h3>
              <p className="text-slate-400 leading-relaxed">
                Vulnerability Assessment and Penetration Testing for web, mobile, and network infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-900/30 text-slate-400 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2024 ApniSec. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-sky-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-sky-400">Terms of Service</Link>
            <Link href="#" className="hover:text-sky-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
