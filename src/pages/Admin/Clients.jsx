import React, { useState, useEffect } from 'react';
import { getClients } from './api/client.service';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (error) {
                console.error("Erreur chargement clients", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const filtered = clients.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    );

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="max-w-7xl mx-auto py-2">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Liste des Clients</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez vos relations clients et consultez l'historique de location.</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-primary/20 cursor-pointer">
                    <span className="material-symbols-outlined">person_add</span>
                    Nouveau Client
                </button>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[300px] relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none"
                        placeholder="Rechercher par nom ou email..."
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Client</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Rôle</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        <span className="material-symbols-outlined animate-spin text-primary text-3xl block mb-2">autorenew</span>
                                        Chargement des clients depuis la base de données...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        <span className="material-symbols-outlined text-4xl block mb-2 text-slate-300">group</span>
                                        Aucun client trouvé.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                    <span className="text-sm font-bold text-primary">{getInitials(client.name)}</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{client.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{client.email}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 capitalize">
                                                {client.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {loading ? '...' : `${filtered.length} client(s) trouvé(s)`}
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Clients</p>
                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">{clients.length}</h3>
                        <span className="text-xs font-bold px-2 py-1 bg-green-500/10 text-green-600 rounded flex items-center gap-1 mb-1">
                            <span className="material-symbols-outlined text-[14px]">group</span>
                            Depuis la BDD
                        </span>
                    </div>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Résultats de Recherche</p>
                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">{filtered.length}</h3>
                        <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded mb-1">
                            filtré(s)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
