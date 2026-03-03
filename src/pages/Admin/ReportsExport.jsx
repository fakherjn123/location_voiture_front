import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getFinancialStats, getTopCars } from './api/report.service';

const ReportsExport = () => {
    const [stats, setStats] = useState(null);
    const [financial, setFinancial] = useState(null);
    const [topCars, setTopCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsRes, financialRes, topCarsRes] = await Promise.all([
                    getDashboardStats(),
                    getFinancialStats(),
                    getTopCars(),
                ]);
                setStats(statsRes.data);
                setFinancial(financialRes.data);
                setTopCars(topCarsRes.data || []);
            } catch (err) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const maxRevenue = topCars.length > 0 ? Math.max(...topCars.map(c => c.revenue || 0)) : 1;

    return (
        <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#121620]">

            {/* Header */}
            <header className="sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#121620]/80 backdrop-blur-md gap-4">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Rapports de Performance Mensuels</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/admin/reports" className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Retour
                    </Link>
                    <Link to="/admin/reports/forecasts" className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800">
                        <span className="material-symbols-outlined text-[20px]">trending_up</span>
                        Prévisions
                    </Link>
                </div>
            </header>

            <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">

                {loading && (
                    <div className="flex items-center justify-center py-24 text-slate-400">
                        <span className="material-symbols-outlined animate-spin text-4xl mr-3">progress_activity</span>
                        <span className="text-lg font-medium">Chargement des données...</span>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-6 py-4">
                        <span className="material-symbols-outlined">error</span>
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Chiffre d'Affaires */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Chiffre d'Affaires Total</span>
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">trending_up</span>
                                        CE MOIS
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    {financial?.monthlyRevenue != null ? `${financial.monthlyRevenue.toLocaleString('fr-FR')} DT` : 'DT'}
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                    Total : {financial?.totalRevenue != null ? `${financial.totalRevenue.toLocaleString('fr-FR')} DT` : 'DT'}
                                </p>
                            </div>

                            {/* Taux d'Occupation */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Taux d'Occupation</span>
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-full">
                                        FLOTTE
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    {stats?.totalCars != null && stats?.availableCars != null
                                        ? `${Math.round(((stats.totalCars - stats.availableCars) / stats.totalCars) * 100)}%`
                                        : 'DT'}
                                </p>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                                    <div
                                        className="bg-primary h-full rounded-full"
                                        style={{
                                            width: stats?.totalCars
                                                ? `${Math.round(((stats.totalCars - stats.availableCars) / stats.totalCars) * 100)}%`
                                                : '0%'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Locations actives */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow hidden lg:block">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Locations Actives</span>
                                    <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                                        EN COURS
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    {stats?.activeRentals ?? 'DT'}
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                    Total contrats : {stats?.totalRentals ?? 'DT'}
                                </p>
                            </div>

                            {/* Clients */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Clients</span>
                                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded-full">
                                        CLIENTS
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    {stats?.totalClients ?? 'DT'}
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                    Véhicules disponibles : {stats?.availableCars ?? 'DT'}
                                </p>
                            </div>

                            {/* Export PDF */}
                            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20 dark:border-primary/40 shadow-sm col-span-1 md:col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-primary dark:text-primary/80 uppercase tracking-wider">Exporter</span>
                                    <div className="bg-primary/20 dark:bg-primary/30 text-primary text-[10px] font-bold px-2 py-1 rounded-full">PDF</div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Générez un rapport PDF complet avec les statistiques du mois en cours.
                                </p>
                                <div className="flex justify-end pt-4 border-t border-primary/10">
                                    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md hover:opacity-90 transition-opacity cursor-pointer">
                                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                                        Exporter en PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Top Véhicules */}
                        {topCars.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-base font-bold mb-6 text-slate-900 dark:text-slate-100">Top Véhicules par Rentabilité</h3>
                                <div className="space-y-6">
                                    {topCars.map((car, index) => {
                                        const pct = maxRevenue > 0 ? Math.round((car.revenue / maxRevenue) * 100) : 0;
                                        const opacities = ['', '/80', '/60', '/40', '/20'];
                                        const opacity = opacities[index] || '/20';
                                        return (
                                            <div key={car._id || index} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                                        {car.brand} {car.model}
                                                    </span>
                                                    <span className="font-bold text-slate-900 dark:text-slate-100">
                                                        {car.revenue != null ? `${car.revenue.toLocaleString('fr-FR')} DT` : `${car.rentalCount} locations`}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`bg-primary${opacity} h-full rounded-full transition-all duration-500`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default ReportsExport;
