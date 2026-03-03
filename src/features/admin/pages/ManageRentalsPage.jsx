import { useState, useEffect } from "react";
import api from "../../../config/api.config";

export default function ManageRentalsPage() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const res = await api.get("/rentals/all");
            setRentals(res.data);
        } catch (error) {
            console.error("Failed to fetch rentals:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed': return <span className="px-2.5 py-1 bg-violet-100 text-violet-700 rounded-lg text-xs font-bold tracking-wide">CONFIRMED</span>;
            case 'ongoing': return <span className="px-2.5 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs font-bold tracking-wide">ONGOING</span>;
            case 'completed': return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold tracking-wide">COMPLETED</span>;
            case 'awaiting_payment': return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold tracking-wide">AWAITING PAYMENT</span>;
            case 'cancelled': return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold tracking-wide">CANCELLED</span>;
            default: return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold tracking-wide">{status?.toUpperCase()}</span>;
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-16">
            <div className="bg-white border-b border-slate-200 py-8 px-6 sm:px-10 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">Manage Rentals</h1>
                    <p className="text-slate-500 mt-2">View and manage all vehicle allocations across the system.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden auto-cols-auto overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Client</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Period</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rentals.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-500 text-sm">
                                        No rentals found in the system.
                                    </td>
                                </tr>
                            ) : (
                                rentals.map(rental => (
                                    <tr key={rental.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-semibold text-slate-900 text-sm">{rental.user_name}</div>
                                            <div className="text-slate-500 text-xs">{rental.user_email}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 text-sm">{rental.brand}</div>
                                            <div className="text-slate-500 text-xs">{rental.model}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-slate-900 text-sm">
                                                {new Date(rental.start_date).toLocaleDateString()} &rarr; {new Date(rental.end_date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 text-sm">{Number(rental.total_price).toFixed(2)} TND</div>
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(rental.status)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
