import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api.config";
import { AuthContext } from "../../auth/context/AuthContext";

const T = {
  bg: "#f7f6f3", white: "#ffffff", black: "#0d0d0d",
  gold: "#b8860b", goldLight: "#c8a96e", goldBg: "#fdf8ee",
  goldBorder: "rgba(200,169,110,0.3)", border: "#e8e5de",
  muted: "#8a8680", mutedLight: "#c5c2bc",
  danger: "#dc2626", success: "#16a34a",
  text: "#1a1a1a", textSub: "#6b6866",
};

const getTier = (points) => {
  if (points >= 500) return { name: "Platinum", icon: "💎", color: "#7c3aed", bg: "#f5f3ff", border: "rgba(124,58,237,0.3)", next: null, progress: 100 };
  if (points >= 200) return { name: "Gold", icon: "🥇", color: T.gold, bg: T.goldBg, border: T.goldBorder, next: 500, progress: Math.round(((points - 200) / 300) * 100) };
  if (points >= 100) return { name: "Silver", icon: "🥈", color: "#64748b", bg: "#f8fafc", border: "rgba(100,116,139,0.3)", next: 200, progress: Math.round(((points - 100) / 100) * 100) };
  return { name: "Bronze", icon: "🥉", color: "#92400e", bg: "#fef3c7", border: "rgba(146,64,14,0.25)", next: 100, progress: Math.round((points / 100) * 100) };
};

const useCountUp = (target, duration = 1000) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return val;
};

const StatCard = ({ label, value, unit = "", icon, delay = 0 }) => (
  <div style={{
    background: T.white, border: `1px solid ${T.border}`, borderRadius: 16,
    padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6,
    animation: "profileFadeUp 0.5s ease both", animationDelay: `${delay}s`,
    transition: "box-shadow 0.2s, transform 0.2s",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
  >
    <div style={{ fontSize: 22 }}>{icon}</div>
    <div style={{ color: T.muted, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
    <div style={{ color: T.black, fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em" }}>
      {value}<span style={{ fontSize: 13, fontWeight: 500, color: T.muted, marginLeft: 4 }}>{unit}</span>
    </div>
  </div>
);

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploadingLicense, setUploadingLicense] = useState(false);
  const [licenseMessage, setLicenseMessage] = useState({ text: "", type: "" });
  const animatedPoints = useCountUp(profile?.points || 0, 1200);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([api.get("/users/me"), api.get("/rentals/my")])
      .then(([profileRes, rentalsRes]) => {
        setProfile(profileRes.data);
        setForm({ name: profileRes.data.name || "", email: profileRes.data.email || "" });
        setRentals(rentalsRes.data || []);
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.name || !form.email) { setError("Nom et email requis"); return; }
    setSaving(true); setError("");
    try {
      const res = await api.put("/users/me", form);
      setProfile((p) => ({ ...p, ...res.data.user }));
      setSaved(true); setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour");
    } finally { setSaving(false); }
  };

  const handleLicenseUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("license", file);

    setUploadingLicense(true);
    setLicenseMessage({ text: "", type: "" });

    try {
      const res = await api.post("/users/upload-license", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProfile((p) => ({ ...p, driving_license_url: res.data.driving_license_url, driving_license_status: "pending" }));
      setLicenseMessage({ text: res.data.message || "Permis téléchargé avec succès. En attente de vérification.", type: "success" });
      setTimeout(() => setLicenseMessage({ text: "", type: "" }), 5000);
    } catch (err) {
      setLicenseMessage({ text: err.response?.data?.message || "Erreur lors du téléchargement", type: "error" });
    } finally {
      setUploadingLicense(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: `3px solid ${T.border}`, borderTopColor: T.goldLight, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <div style={{ color: T.muted, fontSize: 13 }}>Chargement du profil…</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const tier = getTier(profile?.points || 0);
  const totalSpent = rentals.reduce((s, r) => s + Number(r.total_price || 0), 0);
  const completedRentals = rentals.filter((r) => r.status === "completed").length;
  const initials = (profile?.name || "?").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <style>{`
        @keyframes profileFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progressFill { from { width: 0%; } to { width: ${tier.progress}%; } }
        @keyframes avatarPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(200,169,110,0.3); } 50% { box-shadow: 0 0 0 12px rgba(200,169,110,0); } }
      `}</style>
      <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 80, fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Header banner */}
          <div style={{ background: T.black, borderRadius: 24, padding: "40px 40px 32px", marginBottom: 24, position: "relative", overflow: "hidden", animation: "profileFadeUp 0.4s ease both" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.12), transparent)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${T.goldLight}, #e8c97e)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: 28, fontWeight: 900, animation: "avatarPulse 3s ease-in-out infinite" }}>{initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>{profile?.name}</h1>
                  <span style={{ background: tier.bg, color: tier.color, border: `1px solid ${tier.border}`, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.06em" }}>{tier.icon} {tier.name.toUpperCase()}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 4 }}>{profile?.email}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>Client BMZ Location · ID #{profile?.id}</div>
              </div>
              <button onClick={() => { logout(); navigate("/login"); }} style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)", color: "#f87171", padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Déconnexion</button>
            </div>
          </div>

          {/* Points card */}
          <div style={{ background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: 20, padding: "28px 32px", marginBottom: 24, animation: "profileFadeUp 0.5s ease both 0.1s", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${tier.color}18, transparent)` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ color: tier.color, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", marginBottom: 6 }}>PROGRAMME FIDÉLITÉ · {tier.icon} {tier.name.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 52, fontWeight: 900, color: T.black, letterSpacing: "-0.04em", lineHeight: 1 }}>{animatedPoints}</span>
                  <span style={{ color: T.muted, fontSize: 16, fontWeight: 500 }}>points</span>
                </div>
                {tier.next && <div style={{ color: T.textSub, fontSize: 12, marginTop: 6 }}><span style={{ fontWeight: 700, color: tier.color }}>{tier.next - (profile?.points || 0)} points</span> pour le niveau suivant</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>Avantages actifs</div>
                {[{ pts: 100, label: "-10% sur location", unlocked: (profile?.points || 0) >= 100 }, { pts: 200, label: "Accès Silver prioritaire", unlocked: (profile?.points || 0) >= 200 }, { pts: 500, label: "Service Platinum VIP", unlocked: (profile?.points || 0) >= 500 }].map(({ pts, label, unlocked }) => (
                  <div key={pts} style={{ display: "flex", alignItems: "center", gap: 6, opacity: unlocked ? 1 : 0.4, marginBottom: 4 }}>
                    <span style={{ color: unlocked ? T.success : T.muted, fontSize: 12 }}>{unlocked ? "✓" : "○"}</span>
                    <span style={{ color: unlocked ? T.text : T.muted, fontSize: 12, fontWeight: unlocked ? 600 : 400 }}>{label}</span>
                    {!unlocked && <span style={{ color: T.mutedLight, fontSize: 10 }}>({pts} pts)</span>}
                  </div>
                ))}
              </div>
            </div>
            {tier.next && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: tier.color, fontSize: 11, fontWeight: 700 }}>{tier.name}</span>
                  <span style={{ color: T.muted, fontSize: 11 }}>{tier.next} pts → niveau suivant</span>
                </div>
                <div style={{ height: 6, background: "rgba(0,0,0,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`, width: `${tier.progress}%`, animation: "progressFill 1.2s cubic-bezier(0.4,0,0.2,1) both 0.5s" }} />
                </div>
              </div>
            )}
            <div style={{ marginTop: 14, color: T.muted, fontSize: 11, lineHeight: 1.6 }}>
              💡 Vous gagnez <strong style={{ color: T.text }}>10 points</strong> par jour de location.{(profile?.points || 0) >= 100 && " Votre prochaine réservation bénéficiera d'une réduction de 10%."}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
            <StatCard label="Points cumulés" value={profile?.points || 0} icon="⭐" delay={0.15} />
            <StatCard label="Locations" value={rentals.length} icon="🚗" delay={0.2} />
            <StatCard label="Terminées" value={completedRentals} icon="✅" delay={0.25} />
            <StatCard label="Total dépensé" value={totalSpent.toFixed(0)} unit="DT" icon="💳" delay={0.3} />
          </div>

          {/* Edit profile */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden", marginBottom: 24, animation: "profileFadeUp 0.5s ease both 0.35s" }}>
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: T.black }}>Informations personnelles</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>Modifiez votre nom et adresse email</div>
              </div>
              {!editing
                ? <button onClick={() => setEditing(true)} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text, padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✏️ Modifier</button>
                : <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditing(false); setError(""); setForm({ name: profile?.name || "", email: profile?.email || "" }); }} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Annuler</button>
                  <button onClick={handleSave} disabled={saving} style={{ background: T.black, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "inherit" }}>{saving ? "Enregistrement…" : "✓ Sauvegarder"}</button>
                </div>
              }
            </div>
            <div style={{ padding: "24px 28px" }}>
              {saved && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: T.success, fontSize: 13, fontWeight: 600 }}>✓ Profil mis à jour !</div>}
              {error && <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: T.danger, fontSize: 13 }}>{error}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ label: "Nom complet", key: "name", type: "text", placeholder: "Votre nom" }, { label: "Adresse email", key: "email", type: "email", placeholder: "votre@email.com" }].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ display: "block", color: T.muted, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
                    {editing
                      ? <input type={type} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: T.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={(e) => (e.target.style.borderColor = T.goldLight)} onBlur={(e) => (e.target.style.borderColor = T.border)} />
                      : <div style={{ padding: "11px 14px", background: T.bg, borderRadius: 10, border: `1px solid ${T.border}`, color: T.text, fontSize: 14 }}>{profile?.[key] || "—"}</div>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* License Upload Section */}
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden", marginBottom: 24, animation: "profileFadeUp 0.5s ease both 0.35s" }}>
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: T.black }}>Permis de conduire & Statut Location</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{profile?.driving_license_status === "approved" ? "Vous êtes autorisé à louer des véhicules." : "Ce document est requis pour autoriser vos locations."}</div>
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              {licenseMessage.text && <div style={{ background: licenseMessage.type === "success" ? "#f0fdf4" : "#fff5f5", border: `1px solid ${licenseMessage.type === "success" ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: licenseMessage.type === "success" ? T.success : T.danger, fontSize: 13 }}>{licenseMessage.text}</div>}
              
              {profile?.driving_license_url ? (
                <div style={{ display: "flex", alignItems: "center", gap: 16, background: profile?.driving_license_status === "approved" ? "#f0fdf4" : profile?.driving_license_status === "rejected" ? "#fff5f5" : "#fffbeb", border: `1px solid ${profile?.driving_license_status === "approved" ? "#bbf7d0" : profile?.driving_license_status === "rejected" ? "#fecaca" : "#fef08a"}`, padding: "16px", borderRadius: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {profile?.driving_license_status === "approved" ? "✅" : profile?.driving_license_status === "rejected" ? "❌" : "⏳"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: T.black }}>
                      {profile?.driving_license_status === "approved" ? "Permis validé (Location Autorisée)" : profile?.driving_license_status === "rejected" ? "Permis refusé (Location Bloquée)" : "En cours de vérification (Location Bloquée)"}
                    </div>
                    <div style={{ color: profile?.driving_license_status === "rejected" ? T.danger : T.muted, fontSize: 12, marginTop: 2 }}>
                      {profile?.driving_license_status === "approved" ? "Votre permis a été vérifié. Vous pouvez louer un véhicule." : profile?.driving_license_status === "rejected" ? (profile?.driving_license_msg || "Document illisible ou non valide. Veuillez en fournir un nouveau.") : "Votre document est en cours d'examen. Vous ne pouvez pas encore louer de véhicule."}
                    </div>
                  </div>
                  {profile?.driving_license_status !== "approved" && (
                    <label style={{ background: T.white, border: `1px solid ${T.border}`, padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: uploadingLicense ? "not-allowed" : "pointer", color: T.text, opacity: uploadingLicense ? 0.7 : 1, textAlign: "center", flexShrink: 0 }}>
                      {uploadingLicense ? "Chargement..." : "Mettre à jour"}
                      <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={handleLicenseUpload} disabled={uploadingLicense} />
                    </label>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#fffbeb", border: "1px solid #fef08a", padding: "16px", borderRadius: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    ⚠️
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: T.black }}>Permis manquant (Location Bloquée)</div>
                    <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>Veuillez uploader votre permis pour vérifier votre profil et pouvoir louer un véhicule.</div>
                  </div>
                  <label style={{ background: T.black, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: uploadingLicense ? "not-allowed" : "pointer", opacity: uploadingLicense ? 0.7 : 1, textAlign: "center", flexShrink: 0 }}>
                    {uploadingLicense ? "Chargement..." : "Uploader un fichier"}
                    <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={handleLicenseUpload} disabled={uploadingLicense} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Recent rentals */}
          {rentals.length > 0 && (
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden", animation: "profileFadeUp 0.5s ease both 0.4s" }}>
              <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: T.black }}>Dernières locations</div>
                <button onClick={() => navigate("/rentals")} style={{ background: "none", border: "none", color: T.goldLight, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Voir tout →</button>
              </div>
              <div style={{ padding: "8px 0" }}>
                {rentals.slice(0, 5).map((r, i) => {
                  const statusMap = { completed: { color: "#16a34a", bg: "#f0fdf4", label: "Terminée" }, ongoing: { color: "#0ea5e9", bg: "#f0f9ff", label: "En cours" }, confirmed: { color: "#6366f1", bg: "#eef2ff", label: "Confirmée" }, cancelled: { color: "#dc2626", bg: "#fff5f5", label: "Annulée" }, awaiting_payment: { color: "#d97706", bg: "#fffbeb", label: "Paiement requis" } };
                  const s = statusMap[r.status] || statusMap.confirmed;
                  const days = Math.ceil((new Date(r.end_date) - new Date(r.start_date)) / 86400000);
                  return (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 28px", borderBottom: i < Math.min(rentals.length, 5) - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🚗</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: T.black }}>{r.brand} {r.model}</div>
                        <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{new Date(r.start_date).toLocaleDateString("fr-FR")} → {new Date(r.end_date).toLocaleDateString("fr-FR")} · {days} jour{days > 1 ? "s" : ""}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{s.label}</span>
                        <div style={{ color: T.black, fontWeight: 800, fontSize: 14, marginTop: 4 }}>{Number(r.total_price).toFixed(0)} DT</div>
                        {r.status === "completed" && <div style={{ color: T.goldLight, fontSize: 10, fontWeight: 700, marginTop: 2 }}>+{days * 10} pts ⭐</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
