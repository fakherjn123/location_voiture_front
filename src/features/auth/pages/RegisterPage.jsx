import { useState } from "react";
import { registerService } from "../api/auth.service";
import { useNavigate, Link } from "react-router-dom";

const sans = "'Inter', 'Helvetica Neue', sans-serif";
const inputStyle = {
  width: "100%", background: "#fafafa", border: "1px solid #e8e8e8",
  color: "#0a0a0a", padding: "11px 14px", fontSize: 14,
  fontFamily: sans, borderRadius: 9, outline: "none", boxSizing: "border-box",
};

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try { await registerService(form); navigate("/login"); }
    catch (err) { setError(err.response?.data?.message || "Registration failed."); }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#fafafa", fontFamily: sans,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#0a0a0a", letterSpacing: "0.06em" }}>BMZ</span>
            <span style={{ fontSize: 12, color: "#bbb", marginLeft: 8 }}>LOCATION</span>
          </Link>
        </div>

        <div style={{
          background: "#fff", border: "1px solid #ebebeb", borderRadius: 16,
          padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        }}>
          <h1 style={{
            color: "#0a0a0a", fontSize: 24, fontWeight: 800,
            margin: "0 0 6px", letterSpacing: "-0.02em",
          }}>Create account</h1>
          <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 28px" }}>
            Join BMZ Fleet Rental
          </p>

          <form onSubmit={handleSubmit}>
            {[
              { key: "name", label: "Full name", type: "text", placeholder: "John Doe" },
              { key: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
              { key: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={{ color: "#666", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>{label}</label>
                <div style={{ position: "relative" }}>
                  <input type={type === "password" && showPassword ? "text" : type} required value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder} style={type === "password" ? { ...inputStyle, paddingRight: 40 } : inputStyle} />
                  {type === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#999", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", outline: "none"
                    }} title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <div style={{
                background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8,
                color: "#dc2626", fontSize: 13, padding: "10px 14px", marginBottom: 16,
              }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              width: "100%", background: "#0a0a0a", color: "#fff", border: "none",
              padding: "12px", fontSize: 14, fontFamily: sans, fontWeight: 700,
              borderRadius: 9, cursor: "pointer", marginTop: 4, marginBottom: 12,
              opacity: loading ? 0.7 : 1,
            }}>{loading ? "Creating account..." : "Create account"}</button>

            <button type="button" onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'} style={{
              width: "100%", background: "#fff", color: "#0a0a0a", border: "1px solid #e8e8e8",
              padding: "12px", fontSize: 14, fontFamily: sans, fontWeight: 600,
              borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "background 0.2s"
            }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18, height: 18 }} />
              Continuer avec Google
            </button>
          </form>
        </div>

        <p style={{ color: "#aaa", fontSize: 13, textAlign: "center", marginTop: 20 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0a0a0a", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}