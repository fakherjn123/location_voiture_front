import { useEffect, useState } from "react";
import { getMyFactures, downloadFacture } from "../api/facture.service";
import { Receipt, Download, FileText, ArrowRight, Calendar, Car } from "lucide-react";

const sans = "'Inter', 'Helvetica Neue', sans-serif";
const fmt = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

/* ─── Inject styles ───────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById('my-factures-styles')) return;
  const s = document.createElement('style');
  s.id = 'my-factures-styles';
  s.textContent = `
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
  `;
  document.head.appendChild(s);
};

export default function MyFacturesPage() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectStyles();
    getMyFactures().then(r => { 
        setFactures(r.data.factures.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))); 
        setLoading(false); 
    }).catch(() => setLoading(false));
  }, []);

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
            <Receipt size={32} />
          </div>
          <div>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: '0 0 8px', letterSpacing: "-0.02em" }}>
              Mes Factures
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 16, margin: 0, fontWeight: 500 }}>
              Consultez et téléchargez l'historique de vos paiements
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "-32px auto 80px", padding: "0 40px", position: "relative", zIndex: 10 }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                background: "#fff", borderRadius: 24, height: 260,
                border: "1px solid #e2e8f0", padding: "24px",
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear'
              }} />
            ))}
          </div>
        ) : factures.length === 0 ? (
          <div style={{
            background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24,
            padding: "80px 40px", textAlign: "center", boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}>
            <div style={{ width: 80, height: 80, background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#cbd5e1' }}>
              <FileText size={40} />
            </div>
            <h3 style={{ color: "#0f172a", fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>Aucune facture</h3>
            <p style={{ color: "#64748b", fontSize: 15, margin: "0", maxWidth: 400, marginInline: 'auto', lineHeight: 1.6 }}>
              Vous n'avez pas encore de factures disponibles. Elles apparaîtront ici une fois vos réservations terminées.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {factures.map((f, i) => (
              <div key={f.id} style={{
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24, padding: "28px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${i * 0.05}s`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                {/* Facture Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, background: '#f1f5f9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Facture</div>
                      <div style={{ color: "#0f172a", fontSize: 16, fontWeight: 800, fontFamily: 'monospace' }}>#{String(f.id).padStart(5, "0")}</div>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 20, border: '1px solid #e2e8f0', color: "#64748b", fontSize: 13, fontWeight: 600 }}>
                    {fmt(f.created_at)}
                  </div>
                </div>

                {/* Info Véhicule & Dates */}
                <div style={{ flex: 1, borderTop: "1px solid #f1f5f9", paddingTop: 20, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: "#0f172a", fontSize: 18, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.01em" }}>
                    <Car size={18} className="text-slate-400" />
                    {f.brand} <span style={{ fontWeight: 500, color: '#64748b' }}>{f.model}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: "#64748b", fontSize: 14, fontWeight: 500 }}>
                    <Calendar size={16} className="text-slate-300" />
                    {fmt(f.start_date)} <ArrowRight size={12} className="text-slate-300" /> {fmt(f.end_date)}
                  </div>
                </div>

                {/* Total & Action */}
                <div style={{ background: '#f8fafc', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid #f1f5f9' }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <span style={{ color: "#64748b", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>TOTAL Payé</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: "#059669", fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>
                        {f.total}
                      </span>
                      <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600, marginLeft: 4 }}>TND</span>
                    </div>
                  </div>

                  <button onClick={() => downloadFacture(f.id)} style={{
                    width: "100%", background: "#0f172a", color: "#fff",
                    border: "none", padding: "14px", fontSize: 14,
                    fontFamily: sans, fontWeight: 700, borderRadius: 12, cursor: "pointer",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: "all 0.2s", boxShadow: '0 4px 12px rgba(15,23,42,0.1)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(15,23,42,0.2)"; e.currentTarget.style.background = "#1e293b"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.1)"; e.currentTarget.style.background = "#0f172a"; }}
                  >
                    <Download size={18} /> Télécharger le PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}