import React from 'react';

const Invoices = () => {
    return (
        <main className="flex-1 p-6 lg:p-10 space-y-8 bg-slate-50 dark:bg-[#121620]/50 h-full max-w-7xl mx-auto w-full">

            {/* Metrics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Facturé</p>
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">45 280,00 DT</h3>
                    <div className="mt-2 flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>+12.5%</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Paiements en attente</p>
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">12 450,00 DT</h3>
                    <div className="mt-2 flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>+5.2%</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenus du mois</p>
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                            <span className="material-symbols-outlined">account_balance_wallet</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">18 900,00 DT</h3>
                    <div className="mt-2 flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>+8.1%</span>
                    </div>
                </div>
            </div>

            {/* Filter & Actions Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        Filtrer
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        Période
                    </button>
                </div>
                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">add</span>
                    Nouvelle Facture
                </button>
            </div>

            {/* Invoices Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Factures Récentes</h2>
                    <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Dernière mise à jour : il y a 5 min</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
                            <tr>
                                <th className="px-6 py-4">ID Facture</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Montant</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">

                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">#INV-2023-089</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">JD</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Jean Dupont</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">24 Oct 2023</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">450,00 DT</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        Payée
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Voir">
                                            <span className="material-symbols-outlined text-xl">visibility</span>
                                        </button>
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Télécharger">
                                            <span className="material-symbols-outlined text-xl">download</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">#INV-2023-090</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">AM</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Alice Martin</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">22 Oct 2023</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">1 280,00 DT</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                        En attente
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded text-amber-600 transition-colors cursor-pointer" title="Relancer">
                                            <span className="material-symbols-outlined text-xl">send</span>
                                        </button>
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Télécharger">
                                            <span className="material-symbols-outlined text-xl">download</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">#INV-2023-091</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">PB</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Pierre Bernard</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">18 Oct 2023</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">320,00 DT</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                                        En retard
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded text-rose-600 transition-colors cursor-pointer" title="Relancer urgent">
                                            <span className="material-symbols-outlined text-xl">priority_high</span>
                                        </button>
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Modifier">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">#INV-2023-092</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">RL</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Robert Leroy</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">15 Oct 2023</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">2 100,00 DT</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        Payée
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Voir">
                                            <span className="material-symbols-outlined text-xl">visibility</span>
                                        </button>
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Télécharger">
                                            <span className="material-symbols-outlined text-xl">download</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Affichage de 1-4 sur 120 factures</span>
                    <div className="flex items-center gap-2">
                        <button className="p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50 cursor-not-allowed">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Configuration Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Configuration de la Facturation</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Paramétrez le comportement de génération automatique.</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">auto_mode</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700">
                            <div className="flex gap-3 items-center">
                                <span className="material-symbols-outlined text-primary">history_edu</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Génération à la signature</p>
                                    <p className="text-xs text-slate-500">Facturer dès la signature du contrat</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700">
                            <div className="flex gap-3 items-center">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Envoi auto par email</p>
                                    <p className="text-xs text-slate-500">Envoyer directement au client</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Délai de paiement par défaut</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-100 outline-none cursor-pointer">
                                <option>Immédiat</option>
                                <option defaultValue>15 jours</option>
                                <option>30 jours</option>
                                <option>Fin de mois</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">TVA Applicable (%)</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-100 outline-none" type="number" defaultValue="20" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-md">
                        Enregistrer les préférences
                    </button>
                </div>
            </div>

        </main>
    );
};

export default Invoices;
