import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Key, Calendar, DollarSign, ArrowRight, Car, Receipt, AlertCircle, XCircle } from "lucide-react";
import { getMyRentals, cancelRental } from "../api/rental.service";

const sans = "'Inter', 'Helvetica Neue', sans-serif";

const STATUS = {
  confirmed: { color: "#059669", bg: "#d1fae5", border: "#34d399", label: "Confirmée", icon: <Calendar size={14} /> },
  ongoing: { color: "#2563eb", bg: "#dbeafe", border: "#60a5fa", label: "En cours", icon: <Car size={14} /> },
  completed: { color: "#475569", bg: "#f1f5f9", border: "#cbd5e1", label: "Terminée", icon: <Receipt size={14} /> },
  cancelled: { color: "#dc2626", bg: "#fee2e2", border: "#f87171", label: "Annulée", icon: <XCircle size={14} /> },
  awaiting_payment: { color: "#d97706", bg: "#fef3c7", border: "#fbbf24", label: "Paiement requis", icon: <AlertCircle size={14} /> },
};

/* ─── Inject styles ───────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById('my-rentals-styles')) return;
  const s = document.createElement('style');
  s.id = 'my-rentals-styles';
  s.textContent = `
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(s);
};

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try { 
      const r = await getMyRentals(); 
      setRentals(r.data.filter(rental => rental.status !== 'pending').sort((a,b) => new Date(b.created_at) - new Date(a.created_at))); 
    }
    catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { 
    injectStyles();
    fetch(); 
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ? \n\nNote : Annulation gratuite jusqu'à 48h avant le début. Si vous avez déjà payé, le remboursement sera automatique.")) return;
    try {
      const res = await cancelRental(id);
      alert(res.data?.message || "Réservation annulée avec succès.");
      fetch();
    }
    catch (e) { alert(e.response?.data?.message || "Impossible d'annuler."); }
  };

  const fmt = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  const days = (s, e) => Math.ceil((new Date(e) - new Date(s)) / 86400000);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: sans, paddingTop: 64 }}>
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
        
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 72, height: 72, background: 'rgba(255,255,255,0.05)', borderRadius: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
          }}>
            <Key size={32} />
          </div>
          <div>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: '0 0 8px', letterSpacing: "-0.02em" }}>
              Mes Réservations
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 16, margin: 0, fontWeight: 500 }}>
              Suivez et gérez l'ensemble de vos locations passées et à venir
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "-32px auto 80px", padding: "0 40px", position: "relative", zIndex: 10 }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                background: "#fff", borderRadius: 24, height: 160,
                border: "1px solid #e2e8f0", padding: "32px",
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear'
              }} />
            ))}
          </div>
        ) : rentals.length === 0 ? (
          <div style={{
            background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24,
            padding: "80px 40px", textAlign: "center", boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}>
            <div style={{ width: 80, height: 80, background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#cbd5e1' }}>
              <Car size={40} />
            </div>
            <h3 style={{ color: "#0f172a", fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>Aucune réservation</h3>
            <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 32px", maxWidth: 400, marginInline: 'auto', lineHeight: 1.6 }}>
              Vous n'avez pas encore effectué de réservation. Découvrez notre flotte premium et trouvez le véhicule idéal pour votre prochain trajet.
            </p>
            <button onClick={() => navigate("/")} style={{
              background: "#0f172a", color: "#fff", border: "none", padding: "16px 32px",
              fontSize: 15, fontWeight: 800, borderRadius: 16, cursor: "pointer",
              transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: '0 8px 20px rgba(15,23,42,0.15)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(15,23,42,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(15,23,42,0.15)'; }}
            >
              Parcourir nos véhicules <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {rentals.map((rental, i) => {
              const cfg = STATUS[rental.status] || STATUS.confirmed;
              const d = days(rental.start_date, rental.end_date);
              
              return (
                <div key={rental.id} style={{
                  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24,
                  padding: "32px", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: 32, flexWrap: "wrap",
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: `${i * 0.08}s`
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{
                        background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                        fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20,
                        display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: '0.04em'
                      }}>
                        {cfg.icon} {cfg.label}
                      </span>
                      <span style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, fontFamily: 'monospace' }}>
                        #{String(rental.id).padStart(5, "0")}
                      </span>
                    </div>
                    
                    <h3 style={{ color: "#0f172a", fontSize: 24, fontWeight: 900, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
                      {rental.brand} <span style={{ fontWeight: 500, color: '#64748b' }}>{rental.model}</span>
                    </h3>
                    
                    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", background: '#f8fafc', padding: '20px', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                      {[
                        { icon: <Calendar size={16} className="text-slate-400" />, label: "Départ", value: fmt(rental.start_date) },
                        { icon: <Calendar size={16} className="text-slate-400" />, label: "Retour", value: fmt(rental.end_date) },
                        { icon: <Calendar size={16} className="text-slate-400" />, label: "Durée", value: `${d} jour${d !== 1 ? "s" : ""}` },
                        { icon: <DollarSign size={16} className="text-emerald-500" />, label: "Total", value: `${rental.total_price} TND`, valueColor: '#059669' },
                      ].map(({ label, value, icon, valueColor }) => (
                        <div key={label} style={{ display: 'flex', gap: 10 }}>
                          <div style={{ marginTop: 2 }}>{icon}</div>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                            <div style={{ color: valueColor || "#0f172a", fontSize: 15, fontWeight: 800 }}>{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 200, flexShrink: 0 }}>
                    {rental.status === "awaiting_payment" && (
                      <button onClick={() => navigate(`/payment/${rental.id}`)} style={{
                        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", color: "#fff", border: "none",
                        padding: "16px 24px", fontSize: 14, fontFamily: sans,
                        fontWeight: 800, borderRadius: 16, cursor: "pointer",
                        whiteSpace: "nowrap", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                      >
                        Payer maintenant <ArrowRight size={16} />
                      </button>
                    )}
                    
                    {rental.status === "confirmed" && (
                       <div style={{ textAlign: 'center' }}>
                         <div style={{ fontSize: 12, color: '#10b981', fontWeight: 700, marginBottom: 12, background: '#d1fae5', padding: '8px 16px', borderRadius: 12, border: '1px solid #a7f3d0' }}>
                            Prête pour le retrait
                         </div>
                         <button onClick={() => handleCancel(rental.id)} style={{
                          background: "#fff", color: "#dc2626",
                          border: "1px solid #fecaca", padding: "12px 24px",
                          fontSize: 13, fontFamily: sans, fontWeight: 700,
                          borderRadius: 16, cursor: "pointer", whiteSpace: "nowrap", width: '100%',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#fecaca'; }}
                        >Annuler la réservation</button>
                       </div>
                    )}
                    
                    {rental.status === "completed" && (
                      <button onClick={() => navigate("/facture")} style={{
                        background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569",
                        fontSize: 14, fontWeight: 700, cursor: "pointer",
                        padding: "16px 24px", borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; }}
                      >
                        <Receipt size={16} /> Afficher la facture
                      </button>
                    )}
                    
                    {(rental.status === "ongoing" || rental.status === "cancelled") && (
                       <button onClick={() => navigate(`/cars/${rental.car_id}`)} style={{
                        background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569",
                        fontSize: 14, fontWeight: 700, cursor: "pointer",
                        padding: "16px 24px", borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; }}
                      >
                        Voir le véhicule <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
    </div>
  );
}