import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, Award, Edit2, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../../auth/context/AuthContext';
import api from '../../../config/api.config';
import { Link } from 'react-router-dom';

export default function ClientProfilePage() {
    const { user, login } = useContext(AuthContext); // Re-using login function to update context token and user potentially or a refresh func
    const [profile, setProfile] = useState({ name: '', email: '', points: 0 });
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await api.get('/users/me');
            setProfile(res.data);
            setFormData({ name: res.data.name, email: res.data.email });
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Erreur lors du chargement du profil.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await api.put('/users/me', formData);
            setProfile(prev => ({ ...prev, name: res.data.user.name, email: res.data.user.email }));
            setIsEditing(false);
            setMessage({ text: 'Profil mis à jour avec succès.', type: 'success' });

            // Update local storage implicitly if we want it to reflect in Navbar without reload.
            // Usually AuthContext.user holds the state.
            // Easiest is to update localStorage manually, though AuthProvider does not listen to storage events directly in same tab.
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.name = res.data.user.name;
                storedUser.email = res.data.user.email;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }

            setTimeout(() => setMessage({ text: '', type: '' }), 5000);

        } catch (err) {
            console.error(err);
            setMessage({ text: err.response?.data?.message || 'Erreur lors de la mise à jour.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-slate-400">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="flex-1 bg-slate-50 min-h-screen py-10 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header Breadcrumb */}
                <div className="flex items-center gap-4 mb-4">
                    <Link to="/" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mon Profil</h1>
                        <p className="text-sm font-medium text-slate-500">Gérez vos informations personnelles</p>
                    </div>
                </div>

                {/* Message Banner */}
                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        {message.text}
                    </div>
                )}

                {/* Main Card */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        {/* Avatar Section */}
                        <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
                            <div className="w-32 h-32 rounded-full bg-slate-900 text-white flex items-center justify-center text-5xl font-black shadow-lg border-4 border-white shadow-slate-200/50">
                                {profile.email?.charAt(0).toUpperCase() || <User className="w-12 h-12" />}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900">{profile.name}</h2>
                                <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-lg border border-slate-200">
                                    Client
                                </span>
                            </div>
                        </div>

                        {/* Info / Edit Section */}
                        <div className="w-full md:w-2/3">
                            {!isEditing ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            Informations
                                        </h3>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Modifier
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nom complet</div>
                                                <div className="font-bold text-slate-900">{profile.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adresse E-mail</div>
                                                <div className="font-bold text-slate-900">{profile.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleUpdate} className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Modifier mon profil</h3>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nom complet</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all shadow-sm"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">E-mail</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all shadow-sm"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => { setIsEditing(false); setFormData({ name: profile.name, email: profile.email }); }}
                                            className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-[2] py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
                                        >
                                            {saving ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            ) : (
                                                'Enregistrer'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Gamification / Points Card */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-8 text-indigo-800/30 font-black text-9xl pointer-events-none -mr-40 ml-auto right-0 text-right">★</div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Award className="w-8 h-8 text-indigo-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tight flex items-center gap-2">Points Fidélité</h3>
                                <p className="text-indigo-200 font-medium text-sm mt-1">Cumulez des points à chaque location de véhicule.</p>
                            </div>
                        </div>

                        <div className="text-center bg-white/5 px-8 py-5 rounded-2xl backdrop-blur-sm border border-white/10 shrink-0 min-w-[200px]">
                            <div className="text-4xl font-black text-white tracking-tighter">
                                {profile.points || 0}
                            </div>
                            <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mt-1">
                                Points Actuels
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
