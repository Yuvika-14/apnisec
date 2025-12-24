'use client';

import { useState, useEffect } from 'react';
import { Plus, Filter, AlertCircle, CheckCircle, Clock, Trash2, Shield } from 'lucide-react';

interface Issue {
    id: string;
    title: string;
    description: string;
    type: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
    createdAt: string;
}

export default function DashboardPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [filterType, setFilterType] = useState<string>('ALL');
    const [error, setError] = useState('');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        fetchIssues();
    }, [token, filterType]); // Refetch when filter changes

    async function fetchIssues() {
        if (!token) return;
        try {
            const url = filterType !== 'ALL' ? `/api/issues?type=${filterType}` : '/api/issues';
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (res.ok) {
                setIssues(json.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            setIssues([json.data, ...issues]);
            setShowCreate(false);
        } catch (err: any) {
            setError(err.message);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this issue?')) return;
        try {
            const res = await fetch(`/api/issues/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setIssues(issues.filter(i => i.id !== id));
            }
        } catch (e) {
            alert('Failed to delete');
        }
    }

    function getPriorityColor(priority: string) {
        switch (priority) {
            case 'HIGH': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'LOW': return 'bg-green-500/10 text-green-500 border-green-500/20';
            default: return 'bg-slate-800 text-slate-400';
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Security Issues</h1>
                    <p className="text-slate-400">Manage and track your security assessments.</p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-sky-500/20"
                >
                    <Plus className="h-5 w-5" />
                    {showCreate ? 'Cancel' : 'New Issue'}
                </button>
            </div>

            {showCreate && (
                <div className="mb-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl animate-in slide-in-from-top-4 fade-in">
                    <h2 className="text-xl font-semibold mb-4 text-slate-200">Log New Security Issue</h2>
                    {error && <div className="mb-4 p-3 bg-red-500/10 text-red-400 text-sm rounded border border-red-500/20">{error}</div>}
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Issue Title</label>
                                <input name="title" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500" placeholder="e.g. Broken Access Control on API" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Issue Type</label>
                                <select name="type" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500">
                                    <option value="CLOUD_SECURITY">Cloud Security</option>
                                    <option value="RETEAM_ASSESSMENT">Reteam Assessment</option>
                                    <option value="VAPT">VAPT</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Priority</label>
                                <select name="priority" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500">
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                <textarea name="description" required rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500" placeholder="Detailed description of the issue..."></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium">Submit Issue</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                <Filter className="h-5 w-5 text-slate-500" />
                {['ALL', 'CLOUD_SECURITY', 'RETEAM_ASSESSMENT', 'VAPT'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${filterType === type
                                ? 'bg-sky-500/10 text-sky-400 border-sky-500/50'
                                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        {type.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading issues...</div>
                ) : issues.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                        <Shield className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-300">No issues found</h3>
                        <p className="text-slate-500">Create your first security issue to get started.</p>
                    </div>
                ) : (
                    issues.map((issue) => (
                        <div key={issue.id} className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors group">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(issue.priority)}`}>{issue.priority}</span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(issue.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700">{issue.type.replace('_', ' ')}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">{issue.title}</h3>
                                    <p className="text-slate-400 text-sm line-clamp-2">{issue.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleDelete(issue.id)} className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
