import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClients } from '../api/client.service';
import { Users, UserPlus, Search, Mail, ChevronRight, ShieldAlert, ShieldCheck } from 'lucide-react';

const sans = "'Inter', 'Helvetica Neue', sans-serif";

const Clients = () => {
    const navigate = useNavigate();
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
        <div style={{ fontFamily: sans, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* ── Header ────────────────────────────────────────── */}
            <div style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                padding: "60px 40px", position: "relative", overflow: "hidden"
            }}>
                {/* Glow Effects */}
                <div style={{
                    position: 'absolute', top: -100, right: 100, width: 300, height: 300,
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none'
                }} />
                
                <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                            <div style={{
                                width: 72, height: 72, background: 'rgba(255,255,255,0.05)', borderRadius: 24,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
                            }}>
                                <Users size={32} />
                            </div>
                            <div>
                                <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: '0 0 8px', letterSpacing: "-0.02em" }}>
                                    Clients
                                </h1>
                                <p style={{ color: "#94a3b8", fontSize: 16, margin: 0, fontWeight: 500 }}>
                                    Gérez les profils, les locations et les dépenses de vos clients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content ───────────────────────────────────────── */}
            <div style={{ maxWidth: 1280, margin: "-32px auto 80px", padding: "0 40px", position: "relative", zIndex: 10 }}>
                {/* Search */}
                <div style={{
                    background: "#fff", borderRadius: 24, padding: "24px", marginBottom: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: "1px solid #e2e8f0",
                    display: 'flex', alignItems: 'center', gap: 16
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={20} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            style={{
                                width: '100%', padding: '16px 20px 16px 56px', background: '#f8fafc',
                                border: '1px solid transparent', borderRadius: 16, fontSize: 15,
                                color: '#0f172a', fontWeight: 500, outline: 'none', transition: 'all 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={e => { e.target.style.background = '#fff'; e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = '0 0 0 4px #f1f5f9'; }}
                            onBlur={e => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = 'transparent'; e.target.style.boxShadow = 'none'; }}
                            placeholder="Rechercher un client (nom, email)..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table container */}
                <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #e2e8f0", boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                    <th style={{ padding: "20px 24px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.04em" }}>Client</th>
                                    <th style={{ padding: "20px 24px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.04em" }}>Contact</th>
                                    <th style={{ padding: "20px 24px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.04em" }}>Activité</th>
                                    <th style={{ padding: "20px 24px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.04em", textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: "64px 24px", textAlign: "center", color: "#94a3b8" }}>
                                            <div style={{ fontSize: 15, fontWeight: 600 }}>Chargement des clients...</div>
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: "80px 24px", textAlign: "center" }}>
                                            <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#94a3b8' }}>
                                                <Users size={32} />
                                            </div>
                                            <div style={{ color: "#0f172a", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Aucun client trouvé</div>
                                            <div style={{ color: "#64748b", fontSize: 15 }}>Il n'y a pas de résultat pour "{search}".</div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((client) => (
                                        <tr key={client.id}
                                            onClick={() => navigate(`/admin/clients/${client.id}`, { state: { client } })}
                                            style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", transition: "all 0.2s" }}
                                            onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.cells[3].querySelector('button').style.transform = 'translateX(4px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.cells[3].querySelector('button').style.transform = 'none'; }}
                                        >
                                            <td style={{ padding: "20px 24px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                    <div style={{
                                                        width: 48, height: 48, background: '#f1f5f9', borderRadius: 16,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: '#475569', fontSize: 15, fontWeight: 900
                                                    }}>
                                                        {getInitials(client.name)}
                                                    </div>
                                                    <div>
                                                        <div style={{ color: "#0f172a", fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{client.name}</div>
                                                        <span style={{ display: 'inline-block', background: '#f1f5f9', color: '#64748b', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                            {client.role || 'Client'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: "20px 24px" }}>
                                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#475569", fontSize: 14, fontWeight: 500 }}>
                                                        <Mail size={16} color="#94a3b8" />
                                                        {client.email}
                                                    </div>
                                                    {client.driving_license_status === 'pending' && (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, width: 'max-content', background: '#fef3c7', color: '#d97706', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                            <ShieldAlert size={14} /> Permis à vérifier
                                                        </span>
                                                    )}
                                                    {client.driving_license_status === 'approved' && (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, width: 'max-content', background: '#d1fae5', color: '#059669', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                            <ShieldCheck size={14} /> Permis Validé
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td style={{ padding: "20px 24px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                                                    <div>
                                                        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Locations</div>
                                                        <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 800 }}>{client.total_rentals || 0}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Dépenses</div>
                                                        <div style={{ color: "#059669", fontSize: 16, fontWeight: 900, background: '#d1fae5', padding: '2px 8px', borderRadius: 8, display: 'inline-block' }}>
                                                            {Number(client.total_spent || 0).toLocaleString('fr-FR')} <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>TND</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: "20px 24px", textAlign: "right" }}>
                                                <button style={{
                                                    width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer',
                                                    marginLeft: 'auto', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#64748b'; }}
                                                >
                                                    <ChevronRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style={{ padding: "16px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", color: "#64748b", fontSize: 13, fontWeight: 600 }}>
                        {loading ? '...' : `Total : ${filtered.length} client(s)`}
                    </div>
                </div>
            </div>
            
            <style>{`
                input::placeholder { color: #94a3b8; }
            `}</style>
        </div>
    );
};

export default Clients;
