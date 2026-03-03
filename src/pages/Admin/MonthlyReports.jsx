import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getFinancialStats, getTopCars } from './api/report.service';

const MonthlyReports = () => {
    const [stats, setStats] = useState(null);
    const [financial, setFinancial] = useState(null);
    const [topCars, setTopCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [statsRes, financialRes, topCarsRes] = await Promise.all([
                    getDashboardStats(),
                    getFinancialStats(),
                    getTopCars(),
                ]);
                setStats(statsRes.data);
                setFinancial(financialRes.data);
                setTopCars(topCarsRes.data);
            } catch (error) {
                console.error("Erreur chargement rapports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const formatCurrency = (value) =>
        value?.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' DT';

    const occupancyRate = stats
        ? Math.round((stats.ongoing_rentals / (stats.active_cars || 1)) * 100)
        : 0;

    const maxRentals = topCars.length > 0 ? Math.max(...topCars.map(c => Number(c.total_rentals))) : 1;

    return (
        <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#121620]">

            {/* Header */}
            <header className="sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#121620]/80 backdrop-blur-md gap-4">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Rapports de Performance</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-slate-400 text-sm">database</span>
                        <span className="text-sm text-text-slate-500 dark:text-slate-400">Données en temps réel depuis la base de données</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/admin/reports/forecasts" className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800">
                        <span className="material-symbols-outlined text-[20px]">trending_up</span>
                        Prévisions
                    </Link>
                    <Link to="/admin/reports/export" className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-opacity cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">file_download</span>
                        Exporter
                    </Link>
                </div>
            </header>

            <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
                        <span className="material-symbols-outlined animate-spin text-primary text-3xl">autorenew</span>
                        <span>Chargement des données depuis la base de donnéesDT</span>
                    </div>
                )}

                {/* KPI Cards */}
                {!loading && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenu du Mois</span>
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">trending_up</span>
                                        Live
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    {formatCurrency(financial?.current_month_revenue)}
                                </p>
                                <p className="text-xs text-slate-400 mt-2">Total : {formatCurrency(financial?.total_revenue)}</p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Véhicules Actifs</span>
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-full">Live</div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats?.active_cars ?? 'DT'}</p>
                                <p className="text-xs text-slate-400 mt-2">Total parc : {stats?.total_cars} véhicules</p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Locations en Cours</span>
                                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full">Live</div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats?.ongoing_rentals ?? 'DT'}</p>
                                <p className="text-xs text-slate-400 mt-2">Total locations : {stats?.total_rentals}</p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Clients Enregistrés</span>
                                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded-full">Live</div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats?.total_users ?? 'DT'}</p>
                                <p className="text-xs text-slate-400 mt-2">Paiements validés : {financial?.paid_payments}</p>
                            </div>
                        </div>

                        {/* Top Cars */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-base font-bold mb-6 text-slate-900 dark:text-slate-100">Top Véhicules par Nombre de Locations</h3>
                            {topCars.length === 0 ? (
                                <p className="text-sm text-slate-500 text-center py-4">Aucune donnée disponible.</p>
                            ) : (
                                <div className="space-y-5">
                                    {topCars.map((car, idx) => (
                                        <div key={car.id} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                                    {idx + 1}. {car.brand} {car.model}
                                                </span>
                                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                                    {car.total_rentals} location(s)
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full transition-all"
                                                    style={{ width: `${Math.round((Number(car.total_rentals) / maxRentals) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Stats Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Résumé Financier</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Indicateur</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Valeur</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Revenu Total (tous temps)</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">{formatCurrency(financial?.total_revenue)}</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Revenu du Mois en Cours</td>
                                            <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(financial?.current_month_revenue)}</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Total Paiements Validés</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{financial?.paid_payments} / {financial?.total_payments}</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Locations Actives</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{stats?.ongoing_rentals} en cours</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Données calculées en temps réel depuis la base de données PostgreSQL.</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default MonthlyReports;
