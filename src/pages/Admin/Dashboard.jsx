import React from 'react';

const Dashboard = () => {
    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm flex flex-col gap-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">key</span>
                        </div>
                        <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-slate-custom-600 text-sm font-medium">Locations Actives</p>
                    <p className="text-3xl font-bold">142</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm flex flex-col gap-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-rose-500 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded-full">-5%</span>
                    </div>
                    <p className="text-slate-custom-600 text-sm font-medium">Revenus ce Mois</p>
                    <p className="text-3xl font-bold">45 200 DT</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm flex flex-col gap-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">car_repair</span>
                        </div>
                        <span className="text-slate-custom-600 text-xs font-bold bg-slate-custom-600/10 px-2 py-1 rounded-full">8 total</span>
                    </div>
                    <p className="text-slate-custom-600 text-sm font-medium">Véhicules en Maintenance</p>
                    <p className="text-3xl font-bold">8</p>
                </div>
            </div>

            {/* Charts and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Revenue Chart (Simulated) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Aperçu des Revenus</h3>
                            <p className="text-sm text-slate-custom-600">Revenus mensuels du premier semestre</p>
                        </div>
                        <select className="bg-slate-custom-100 dark:bg-slate-custom-800 border-none rounded-lg text-xs font-medium py-1.5 px-3">
                            <option>Année 2024</option>
                            <option>Année 2023</option>
                        </select>
                    </div>

                    <div className="h-64 flex flex-col gap-4">
                        <div className="flex-1 relative flex items-end justify-around gap-2 px-2">
                            {/* Bars simulated with divs */}
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[40%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">32k DT</div>
                            </div>
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[55%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">38k DT</div>
                            </div>
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[75%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">45k DT</div>
                            </div>
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[60%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">42k DT</div>
                            </div>
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[85%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">52k DT</div>
                            </div>
                            <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary h-[95%]">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">58k DT</div>
                            </div>
                        </div>
                        <div className="flex justify-around px-2 text-[10px] font-bold text-slate-custom-600 uppercase tracking-wider">
                            <span>Jan</span>
                            <span>Fév</span>
                            <span>Mar</span>
                            <span>Avr</span>
                            <span>Mai</span>
                            <span>Juin</span>
                        </div>
                    </div>
                </div>

                {/* Fleet Distribution */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Disponibilité Flotte</h3>
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-custom-600">Citadines</span>
                                <span className="font-semibold">45/60</span>
                            </div>
                            <div className="w-full h-2 bg-slate-custom-100 dark:bg-slate-custom-800 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[75%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-custom-600">Berlines</span>
                                <span className="font-semibold">22/30</span>
                            </div>
                            <div className="w-full h-2 bg-slate-custom-100 dark:bg-slate-custom-800 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[73%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-custom-600">SUV</span>
                                <span className="font-semibold">12/40</span>
                            </div>
                            <div className="w-full h-2 bg-slate-custom-100 dark:bg-slate-custom-800 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[30%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-custom-600">Utilitaires</span>
                                <span className="font-semibold">18/20</span>
                            </div>
                            <div className="w-full h-2 bg-slate-custom-100 dark:bg-slate-custom-800 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[90%] rounded-full"></div>
                            </div>
                        </div>

                        <button className="w-full py-2.5 mt-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">
                            Voir la flotte complète
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-primary/5">
                    <div>
                        <h3 className="text-lg font-bold">Activité Récente</h3>
                        <p className="text-sm text-slate-custom-600">Dernières réservations effectuées</p>
                    </div>
                    <button className="text-primary text-sm font-semibold hover:underline">Tout voir</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs font-bold text-slate-custom-600 uppercase tracking-wider bg-slate-custom-100/50 dark:bg-slate-custom-800/50">
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Véhicule</th>
                                <th className="px-6 py-4">Période</th>
                                <th className="px-6 py-4">Montant</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">

                            <tr className="hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-custom-100 dark:bg-slate-custom-800 flex items-center justify-center text-xs font-bold">JD</div>
                                        <div>
                                            <p className="text-sm font-medium">Jean Dupont</p>
                                            <p className="text-xs text-slate-custom-600">Réf: #9841</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Tesla Model 3</span>
                                        <span className="text-xs text-slate-custom-600">Electrique</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm">12 Juin - 15 Juin</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold">450 DT</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500">Confirmé</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-custom-600 hover:text-primary">more_vert</button>
                                </td>
                            </tr>

                            <tr className="hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-custom-100 dark:bg-slate-custom-800 flex items-center justify-center text-xs font-bold">SM</div>
                                        <div>
                                            <p className="text-sm font-medium">Sophie Martin</p>
                                            <p className="text-xs text-slate-custom-600">Réf: #9839</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">BMW X5</span>
                                        <span className="text-xs text-slate-custom-600">Hybride</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm">14 Juin - 20 Juin</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold">890 DT</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500">En attente</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-custom-600 hover:text-primary">more_vert</button>
                                </td>
                            </tr>

                            <tr className="hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-custom-100 dark:bg-slate-custom-800 flex items-center justify-center text-xs font-bold">PL</div>
                                        <div>
                                            <p className="text-sm font-medium">Pierre Leroy</p>
                                            <p className="text-xs text-slate-custom-600">Réf: #9838</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Renault Clio</span>
                                        <span className="text-xs text-slate-custom-600">Essence</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm">10 Juin - 11 Juin</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold">120 DT</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-custom-600/10 text-slate-custom-600">Terminé</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-custom-600 hover:text-primary">more_vert</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
