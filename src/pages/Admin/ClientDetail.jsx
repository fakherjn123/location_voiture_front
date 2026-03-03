import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 max-w-7xl mx-auto w-full">

            {/* Top Back Action (Simulated Header extension) */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">
                    arrow_back
                </button>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Retour aux clients</h2>
            </div>

            {/* Customer Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-3xl font-bold shrink-0" data-alt="Marc Lefebvre profile portrait">ML</div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Marc Lefebvre</h1>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">VIP</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Client depuis Janvier 2022 DT ID: #{id || 'CUST-9842'}</p>

                        <div className="flex gap-2 mt-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm shadow-primary/20">
                                <span className="material-symbols-outlined text-sm">mail</span>
                                Email
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-sm">call</span>
                                Appeler
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 pr-4">
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Locations</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">24</p>
                        <p className="text-emerald-500 text-[10px] font-bold mt-1">+15%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Dépenses</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">DT4,250</p>
                        <p className="text-emerald-500 text-[10px] font-bold mt-1">+10%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Points Fidélité</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">1,200</p>
                        <p className="text-emerald-500 text-[10px] font-bold mt-1">+20%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Personal Info and Documents */}
                <div className="space-y-8">

                    {/* Personal Info Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Informations Personnelles
                            </h3>
                            <button className="text-xs text-primary font-bold hover:underline cursor-pointer">Modifier</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Nom Complet</label>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Marc Lefebvre</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Date de Naissance</label>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">14/05/1985 (39 ans)</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Adresse de Résidence</label>
                                <p className="text-sm font-medium leading-relaxed text-slate-900 dark:text-slate-100">15 Avenue de la République,<br />75011 Paris, France</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Numéro de Permis</label>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">85/AB/123456</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Date d'expiration Permis</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">12/03/2028</p>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-[10px] text-emerald-500 font-bold">Valide</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Documents Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <span className="material-symbols-outlined text-primary">article</span>
                                Documents Justificatifs
                            </h3>
                            <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 group cursor-pointer transition-colors hover:border-primary/30">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Permis de Conduire.pdf</p>
                                        <p className="text-[10px] text-slate-500">Uploadé le 12/01/2024</p>
                                    </div>
                                </div>
                                <button className="material-symbols-outlined text-slate-400 text-sm group-hover:text-primary transition-colors">download</button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 group cursor-pointer transition-colors hover:border-primary/30">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-500">image</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Carte d'Identité.jpg</p>
                                        <p className="text-[10px] text-slate-500">Uploadé le 12/01/2024</p>
                                    </div>
                                </div>
                                <button className="material-symbols-outlined text-slate-400 text-sm group-hover:text-primary transition-colors">download</button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 group cursor-pointer transition-colors hover:border-primary/30">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-emerald-500">task</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Justificatif Domicile.pdf</p>
                                        <p className="text-[10px] text-slate-500">Uploadé le 12/01/2024</p>
                                    </div>
                                </div>
                                <button className="material-symbols-outlined text-slate-400 text-sm group-hover:text-primary transition-colors">download</button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Rental History */}
                <div className="lg:col-span-2">
                    <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <span className="material-symbols-outlined text-primary">history</span>
                                Historique des Locations
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer">Filtrer</button>
                                <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer">Exporter CSV</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Véhicule</th>
                                        <th className="px-6 py-4">Montant</th>
                                        <th className="px-6 py-4">Statut</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 min-h-[300px]">

                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">12/03/2024</p>
                                            <p className="text-[10px] text-slate-500">4 Jours</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">directions_car</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Tesla Model 3</p>
                                                    <p className="text-[10px] text-slate-500">Electrique DT EV-402-XX</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">DT480.00</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Ongoing</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">visibility</button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">20/02/2024</p>
                                            <p className="text-[10px] text-slate-500">2 Jours</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">directions_car</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Audi Q5 Sportback</p>
                                                    <p className="text-[10px] text-slate-500">Diesel DT AB-123-CD</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">DT320.00</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Completed</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">visibility</button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">05/01/2024</p>
                                            <p className="text-[10px] text-slate-500">7 Jours</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">directions_car</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">BMW Série 3</p>
                                                    <p className="text-[10px] text-slate-500">Hybride DT HY-992-ZZ</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">DT750.00</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Completed</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">visibility</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                            <p className="text-[10px] text-slate-500">Affichage de 3 sur 24 locations</p>
                            <div className="flex gap-2">
                                <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">Précédent</button>
                                <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">Suivant</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;
