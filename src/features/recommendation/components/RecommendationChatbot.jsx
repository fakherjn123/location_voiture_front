import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api.config";
import { AuthContext } from "../../auth/context/AuthContext";

const C = {
  bg: "#0a0a0a", surface: "#141414", surfaceHigh: "#1e1e1e",
  border: "rgba(255,255,255,0.08)", borderHover: "rgba(255,255,255,0.16)",
  accent: "#c8a96e", accentDim: "rgba(200,169,110,0.15)",
  accentBorder: "rgba(200,169,110,0.3)",
  text: "#f5f5f5", muted: "#888", mutedLight: "#555",
};

const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "chatDot 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s`, opacity: 0.6 }} />
    ))}
  </div>
);

const CarCard = ({ car, totalPrice, days, navigate }) => (
  <div onClick={() => navigate(`/cars/${car.id}`)} style={{ marginTop: 12, background: C.surfaceHigh, border: `1px solid ${C.accentBorder}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.2s ease" }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(200,169,110,0.15)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
    {car.image && (
      <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
        <img src={`http://localhost:3000${car.image}`} alt={car.model} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, background: C.accent, color: "#000", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.06em" }}>RECOMMANDÉ</div>
      </div>
    )}
    <div style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 2 }}>{car.brand}</div>
          <div style={{ color: C.text, fontSize: 16, fontWeight: 800 }}>{car.model}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: C.accent, fontSize: 18, fontWeight: 900 }}>{car.price_per_day} <span style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>DT/j</span></div>
          {days && <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Total: <span style={{ color: C.text, fontWeight: 700 }}>{totalPrice} DT</span></div>}
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
        {[car.fuel_type, car.transmission].filter(Boolean).map((tag) => (
          <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: C.muted, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, padding: "3px 8px", borderRadius: 6 }}>{tag}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: C.accent }}>Voir détails →</span>
      </div>
    </div>
  </div>
);

const Message = ({ msg, navigate }) => {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 12, animation: "chatFadeUp 0.3s ease both" }}>
      {!isUser && <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${C.accent}, #e8c97e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, marginTop: 2 }}>✨</div>}
      <div style={{ maxWidth: "82%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
        <div style={{ padding: "10px 14px", background: isUser ? "linear-gradient(135deg, #1e1e40, #1a1a2e)" : C.surfaceHigh, border: `1px solid ${isUser ? "rgba(99,102,241,0.3)" : C.border}`, borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px", color: C.text, fontSize: 13, lineHeight: 1.65 }}>
          {msg.typing ? <TypingDots /> : msg.content}
        </div>
        {msg.car && <CarCard car={msg.car} totalPrice={msg.totalPrice} days={msg.days} navigate={navigate} />}
        {msg.suggestion && !msg.car && <CarCard car={msg.suggestion} totalPrice={msg.suggestionTotal} days={msg.days} navigate={navigate} />}
        <div style={{ color: "#555", fontSize: 10, marginTop: 4 }}>{msg.time}</div>
      </div>
    </div>
  );
};

const QUICK = [
  { label: "🚗 Budget 300 DT / 3 jours", budget: 300, days: 3 },
  { label: "✈️ Voyage 1 semaine", budget: 800, days: 7 },
  { label: "💼 Business court séjour", budget: 400, days: 2 },
  { label: "🏖️ Week-end détente", budget: 250, days: 2 },
];

export default function RecommendationChatbot() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("idle");
  const [collected, setCollected] = useState({});
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setPulse(false), 5000); return () => clearTimeout(t); }, []);
  useEffect(() => { if (open && messages.length === 0) startConversation(); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

  const now = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const addMsg = (msg) => setMessages((prev) => [...prev, { id: Date.now() + Math.random(), time: now(), ...msg }]);
  const replaceTyping = (content, extra = {}) => setMessages((prev) => {
    const idx = [...prev].reverse().findIndex((m) => m.typing);
    if (idx === -1) return prev;
    const realIdx = prev.length - 1 - idx;
    const updated = [...prev];
    updated[realIdx] = { ...updated[realIdx], typing: false, content, time: now(), ...extra };
    return updated;
  });

  const startConversation = () => {
    setStep("budget"); setCollected({});
    setTimeout(() => addMsg({ role: "bot", content: `Bonjour${user ? " " + user.name?.split(" ")[0] : ""} ! 👋\n\nJe suis votre assistant BMZ. Je vais vous trouver la voiture idéale.\n\nQuel est votre **budget total** pour cette location ? (en DT)` }), 400);
  };

  const handleQuick = ({ budget, days }) => {
    setCollected({ budget, days });
    addMsg({ role: "user", content: `Budget: ${budget} DT pour ${days} jour${days > 1 ? "s" : ""}` });
    addMsg({ role: "bot", typing: true, content: "" });
    setStep("category");
    setTimeout(() => replaceTyping("Parfait ! Avez-vous une préférence de marque ou type de véhicule ?\n\nTapez une marque (BMW, Peugeot…) ou **non** pour tout voir."), 800);
  };

  const processUserInput = async (text) => {
    const lower = text.toLowerCase().trim();
    if (step === "budget") {
      const num = parseFloat(lower.replace(/[^\d.]/g, ""));
      if (!num || num < 50) { addMsg({ role: "bot", content: "Veuillez entrer un budget valide (minimum 50 DT)." }); return; }
      setCollected((p) => ({ ...p, budget: num }));
      setStep("days");
      addMsg({ role: "bot", typing: true, content: "" });
      setTimeout(() => replaceTyping(`Budget de **${num} DT** noté ✅\n\nCombien de jours souhaitez-vous louer ?`), 600);
      return;
    }
    if (step === "days") {
      const num = parseInt(lower.replace(/[^\d]/g, ""));
      if (!num || num < 1) { addMsg({ role: "bot", content: "Veuillez entrer un nombre de jours valide." }); return; }
      setCollected((p) => ({ ...p, days: num }));
      setStep("category");
      addMsg({ role: "bot", typing: true, content: "" });
      setTimeout(() => replaceTyping(`**${num} jour${num > 1 ? "s" : ""}** ✅\n\nPréférence de marque ? Tapez une marque ou **non**.`), 700);
      return;
    }
    if (step === "category") {
      const category = (lower === "non" || lower === "non merci" || lower === "peu importe") ? "" : text;
      setCollected((p) => ({ ...p, category }));
      await fetchRecommendation({ ...collected, category });
      return;
    }
    if (lower.includes("recommenc") || lower.includes("nouvelle") || lower === "reset") { setMessages([]); startConversation(); return; }
    addMsg({ role: "bot", content: "Pour une nouvelle recherche, tapez **recommencer** ou cliquez sur ↺" });
  };

  const fetchRecommendation = async (data) => {
    setLoading(true); setStep("result");
    addMsg({ role: "bot", typing: true, content: "" });
    try {
      const payload = { budget: Number(data.budget), days: Number(data.days) };
      if (data.category) payload.category = data.category;
      const res = await api.post("/recommendation", payload);
      const { recommendation, suggestion, total_price } = res.data;
      if (recommendation) {
        replaceTyping(`🎯 Voiture parfaite pour **${data.budget} DT** sur **${data.days} jour${data.days > 1 ? "s" : ""}** !`, { car: recommendation, totalPrice: total_price, days: data.days });
        setTimeout(() => { addMsg({ role: "bot", content: `✅ Marge budgétaire restante : **${(Number(data.budget) - Number(total_price)).toFixed(0)} DT**\n\nCliquez sur la carte pour réserver !` }); }, 800);
      } else if (suggestion) {
        replaceTyping("Aucun véhicule exactement dans votre budget, mais voici la meilleure option :", { suggestion, suggestionTotal: (Number(suggestion.price_per_day) * Number(data.days)).toFixed(2), days: data.days });
        setTimeout(() => addMsg({ role: "bot", content: "Souhaitez-vous augmenter votre budget ou recommencer ?" }), 800);
      } else {
        replaceTyping("😔 Aucun véhicule disponible pour cette recherche. Essayez un budget plus élevé.");
      }
    } catch { replaceTyping("Une erreur s'est produite. Veuillez réessayer."); }
    finally { setLoading(false); }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    addMsg({ role: "user", content: text });
    processUserInput(text);
  };

  return (
    <>
      <style>{`
        @keyframes chatFadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes chatDot { 0%,80%,100% { transform:scale(0.6); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
        @keyframes chatPulse { 0%,100% { box-shadow:0 0 0 0 rgba(200,169,110,0.5); } 50% { box-shadow:0 0 0 12px rgba(200,169,110,0); } }
        @keyframes chatSlideUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes badgePop { 0% { transform:scale(0); } 80% { transform:scale(1.2); } 100% { transform:scale(1); } }
      `}</style>

      {/* Floating button */}
      <button onClick={() => setOpen((o) => !o)} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9998, width: 58, height: 58, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, #e8c97e)`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 8px 32px rgba(200,169,110,0.4)", animation: pulse && !open ? "chatPulse 2s ease-in-out infinite" : "none", transition: "transform 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
        {open ? "✕" : "✨"}
        {!open && <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#ef4444", border: "2px solid #fafafa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 800, animation: "badgePop 0.4s ease both" }}>1</div>}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 28, zIndex: 9999, width: 380, height: 580, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", animation: "chatSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both", fontFamily: "'Inter', sans-serif" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #111, #1a1a1a)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, #e8c97e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>✨</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.text, fontSize: 14, fontWeight: 800 }}>Assistant BMZ</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ color: C.muted, fontSize: 11 }}>Recommandation IA · En ligne</span>
              </div>
            </div>
            <button onClick={() => { setMessages([]); startConversation(); }} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.muted, width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }} title="Nouvelle recherche">↺</button>
          </div>

          {/* Quick chips */}
          {messages.length === 0 && (
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
              <div style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, letterSpacing: "0.08em" }}>RECHERCHE RAPIDE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {QUICK.map((q) => (
                  <button key={q.label} onClick={() => handleQuick(q)} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", color: C.muted, fontSize: 12, fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.color = C.accent; e.currentTarget.style.background = C.accentDim; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>{q.label}</button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", scrollbarWidth: "thin", scrollbarColor: "#555 transparent" }}>
            {messages.map((msg) => <Message key={msg.id} msg={msg} navigate={navigate} />)}
            {step === "result" && messages.length > 0 && (
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button onClick={() => { setMessages([]); startConversation(); }} style={{ background: C.accentDim, border: `1px solid ${C.accentBorder}`, color: C.accent, fontSize: 12, fontWeight: 700, padding: "8px 20px", borderRadius: 20, cursor: "pointer" }}>✨ Nouvelle recherche</button>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, background: C.surface, display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder={step === "budget" ? "Entrez votre budget en DT…" : step === "days" ? "Nombre de jours…" : step === "category" ? "Marque ou type (ou 'non')…" : "Posez votre question…"} disabled={loading} style={{ flex: 1, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif" }} onFocus={(e) => (e.target.style.borderColor = C.accentBorder)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
            <button onClick={handleSend} disabled={!input.trim() || loading} style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: input.trim() && !loading ? `linear-gradient(135deg, ${C.accent}, #e8c97e)` : "rgba(255,255,255,0.06)", border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", color: input.trim() && !loading ? "#000" : "#555", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
