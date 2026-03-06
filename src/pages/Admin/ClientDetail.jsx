import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getClientRentals } from './api/client.service';
import api from '../../config/api.config';

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Si on arrive depuis la liste, "client" est dans le state, sinon on le laisse vide (le fetch pourrait l'ajouter si on veut)
    const [clientProfile, setClientProfile] = useState(location.state?.client || { id, name: "Client", total_rentals: 0, total_spent: 0 });
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Si on a pas le state (ex: refresh page), on refetch au moins les infos du client
                if (!location.state?.client) {
                    const usersRes = await api.get('/users');
                    const c = usersRes.data.find(u => u.id === parseInt(id));
                    if (c) setClientProfile(c);
                }

                // Charger l'historique de location
                const rentalsRes = await getClientRentals(parseInt(id));
                setRentals(rentalsRes.data || []);
            } catch (error) {
                console.error("Erreur serveur", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [id, location.state]);

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (dateString) => {
        if (!dateString) return;
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    const calculateDays = (start, end) => {
        const diffTime = Math.abs(new Date(end) - new Date(start));
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed': return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Terminée</span>;
            case 'ongoing': return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">En cours</span>;
            case 'pending': return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">En attente</span>;
            case 'cancelled': return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">Annulée</span>;
            default: return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{status}</span>;
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto w-full py-2">

            {/* Top Back Action */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">
                    arrow_back
                </button>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Retour aux clients</h2>
            </div>

            {/* Customer Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                        {getInitials(clientProfile.name)}
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{clientProfile.name}</h1>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{clientProfile.role || 'Client'}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{clientProfile.email} • ID: #{id}</p>

                        <div className="flex gap-2 mt-4">
                            <a href={`mailto:${clientProfile.email}`} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm shadow-primary/20">
                                <span className="material-symbols-outlined text-sm">mail</span>
                                Email
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pr-4">
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Locations</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{clientProfile.total_rentals || rentals.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Dépenses</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{Number(clientProfile.total_spent || 0).toLocaleString('fr-FR')} DT</p>
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
                                Informations
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Nom Complet</label>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{clientProfile.name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Email</label>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{clientProfile.email}</p>
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
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4">Dates & Durée</th>
                                        <th className="px-6 py-4">Véhicule</th>
                                        <th className="px-6 py-4">Montant</th>
                                        <th className="px-6 py-4">Statut</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 min-h-[300px]">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                <span className="material-symbols-outlined animate-spin text-primary text-3xl block mb-2">autorenew</span>
                                                Chargement de l'historique...
                                            </td>
                                        </tr>
                                    ) : rentals.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                <span className="material-symbols-outlined text-4xl block mb-2 text-slate-300">directions_car</span>
                                                Aucun historique de location pour ce client.
                                            </td>
                                        </tr>
                                    ) : (
                                        rentals.map((rental) => (
                                            <tr key={rental.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{formatDate(rental.start_date)} au {formatDate(rental.end_date)}</p>
                                                    <p className="text-[10px] text-slate-500">{calculateDays(rental.start_date, rental.end_date)} Jours</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                                            {rental.Car?.image ? (
                                                                <img src={rental.Car.image} alt="car" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="material-symbols-outlined text-slate-400 text-xl">directions_car</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{rental.Car?.brand} {rental.Car?.model}</p>
                                                            <p className="text-[10px] text-slate-500">{rental.Car?.fuel_type || 'Voiture'} • #{rental.car_id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-slate-100">
                                                    {Number(rental.total_price || 0).toLocaleString('fr-FR')} DT
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(rental.status)}
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <button onClick={() => window.open(`/cars/${rental.car_id}`, '_blank')} title="Voir le véhicule" className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer mr-2">directions_car</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                            <p className="text-[10px] text-slate-500">{rentals.length} location(s) trouvée(s)</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;

