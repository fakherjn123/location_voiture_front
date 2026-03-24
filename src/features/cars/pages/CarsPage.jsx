import { useEffect, useState, useRef } from "react";
import { Search, DollarSign, Car, Sparkles, Gift, Mail, Phone, MapPin } from "lucide-react";
import AiRecommendationCard from "../../recommendation/components/AiRecommendationCard";
import api from "../../../config/api.config";
import { Link } from "react-router-dom";

const sans = "'Inter', 'Helvetica Neue', sans-serif";

/* ─── Inject animations ───────────────────────────────────── */
const injectCarsStyles = () => {
  if (document.getElementById('cars-page-pub-styles')) return;
  const s = document.createElement('style');
  s.id = 'cars-page-pub-styles';
  s.textContent = `
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes gradientText {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes dotFloat {
      0%,100% { opacity: 0.3; transform: translate(0, 0); }
      50% { opacity: 0.8; transform: translate(var(--dx, 10px), var(--dy, -10px)); }
    }
    .car-pub-card {
      animation: fadeUp .5s ease both;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .car-pub-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px rgba(0,0,0,0.1);
      border-color: #000 !important;
    }
    .car-pub-card:hover .car-pub-img {
      transform: scale(1.05);
    }
    .car-pub-img { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .car-pub-card:hover .arrow-circle {
      background: #000 !important;
      color: #fff !important;
      transform: translateX(4px);
    }
    .arrow-circle { transition: all 0.3s ease; }
    .filter-pill { transition: all .2s ease; }
    .filter-pill:hover { border-color: #000 !important; color: #000 !important; }
    .hero-dot {
      position: absolute;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(0,0,0,0.06);
      animation: dotFloat 4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(s);
};

/* ─── Car Card ────────────────────────────────────────────── */
function CarCard({ car, index, discount }) {
  const isDiscounted = discount > 0;
  const originalPrice = car.price_per_day;
  const discountedPrice = isDiscounted ? Math.round(originalPrice * (1 - discount / 100)) : originalPrice;

  return (
    <Link
      to={`/cars/${car.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="car-pub-card" style={{
        background: "#fff",
        border: "1px solid #ebebeb",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        animationDelay: `${index * 0.06}s`,
      }}>
        <div style={{ height: 210, background: "#f8f9fa", position: "relative", overflow: 'hidden' }}>
          <img
            className="car-pub-img"
            src={car.image ? `http://localhost:3000${car.image}` : "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Non+Disponible"}
            alt={car.brand}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Non+Disponible"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", bottom: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            background: car.available ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
            color: '#fff', padding: '3px 10px', borderRadius: 20,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
            {car.available ? 'AVAILABLE' : 'UNAVAILABLE'}
          </div>
        </div>

        <div style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#000", fontFamily: sans, letterSpacing: '-0.02em' }}>{car.brand}</h3>
              <p style={{ margin: '3px 0 0', fontSize: 13, color: "#aaa", fontWeight: 500 }}>{car.model}</p>
            </div>
          </div>

          {/* Description preview */}
          {car.description && (
            <p style={{
              color: '#888', fontSize: 12, lineHeight: 1.6,
              margin: '0 0 14px', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{car.description}</p>
          )}

          <div style={{
            paddingTop: 16, borderTop: "1px solid #f0f0f0",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <span style={{ fontSize: 10, color: "#bbb", display: "block", marginBottom: 3, fontWeight: 600, letterSpacing: '0.06em' }}>DAILY RATE</span>
              {isDiscounted && (
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f43f5e', textDecoration: 'line-through', marginRight: 6 }}>
                  {originalPrice} TND
                </span>
              )}
              <span style={{ fontSize: 20, fontWeight: 900, color: "#000", letterSpacing: '-0.02em' }}>
                {discountedPrice} <span style={{ fontSize: 11, fontWeight: 500, color: "#aaa" }}>TND</span>
              </span>
            </div>
            <div className="arrow-circle" style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#f5f5f5", color: "#999",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 600,
            }}>
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ brand: "", maxPrice: "" });
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAiRec, setShowAiRec] = useState(false);
  const [userPoints, setUserPoints] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    injectCarsStyles();
    fetchCars();
    fetchHeroImages();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (localStorage.getItem("token")) {
      try {
        const { data } = await api.get("/users/me");
        setUserPoints(data.points);
      } catch (err) {
        console.error("User profile fetch error:", err);
      }
    }
  };

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const fetchHeroImages = async () => {
    try {
      const { data } = await api.get("/hero");
      setHeroImages(data);
    } catch (err) {
      console.error("Hero fetch error:", err);
    }
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/cars", { params: filters });
      setCars(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filteredCars = cars.filter(car => {
    if (activeFilter === 'available') return car.available;
    if (activeFilter === 'premium') return car.price_per_day >= 200;
    return true;
  });

  // Unique brands
  const brands = [...new Set(cars.map(c => c.brand).filter(Boolean))];

  const inputStyle = {
    background: "#fff", border: "1px solid #ebebeb",
    padding: "14px 22px", fontSize: 14, borderRadius: 14,
    outline: "none", fontFamily: sans, color: "#000",
    flex: 1, minWidth: 200, transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: 'border-box',
  };

  // Floating dots for hero
  const dots = Array.from({ length: 12 }, (_, i) => ({
    left: `${10 + (i * 7) % 80}%`,
    top: `${15 + (i * 13) % 60}%`,
    dx: `${(i % 3 - 1) * 12}px`,
    dy: `${(i % 2 === 0 ? -1 : 1) * 8}px`,
    delay: `${i * 0.3}s`,
    size: 4 + (i % 3) * 2,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#fdfdfd", paddingTop: 70, fontFamily: sans }}>

      {/* ── Hero Section ──────────────────────────────── */}
      <div ref={heroRef} style={{
        padding: "100px 40px 80px", maxWidth: 1280, margin: "20px auto 40px",
        position: 'relative', overflow: 'hidden', borderRadius: 40,
        background: '#000', minHeight: 480, display: 'flex', alignItems: 'center'
      }}>
        {/* Dynamic Backgrounds */}
        {heroImages.length > 0 ? (
          heroImages.map((img, i) => (
            <div key={img.id} style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(http://localhost:3000${img.image_url})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'opacity 1.5s ease-in-out, transform 10s linear',
              opacity: currentHeroIndex === i ? 0.6 : 0,
              transform: currentHeroIndex === i ? 'scale(1.1)' : 'scale(1)',
              zIndex: 0
            }} />
          ))
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920)`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.4, zIndex: 0
          }} />
        )}

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 1
        }} />

        {/* Floating dots */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          {dots.map((d, i) => (
            <div key={i} className="hero-dot" style={{
              left: d.left, top: d.top,
              width: d.size, height: d.size,
              '--dx': d.dx, '--dy': d.dy,
              animationDelay: d.delay,
              background: 'rgba(255,255,255,0.2)'
            }} />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 800 }}>
          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12,
            animation: 'fadeIn 0.8s ease both'
          }}>
            <span style={{ width: 32, height: 2, background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
            Premium Fleet {heroImages.length > 0 && `· 0${currentHeroIndex + 1}`}
          </p>

          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 950, margin: "0 0 20px",
            letterSpacing: "-0.04em", lineHeight: 1, color: '#fff',
            animation: 'fadeUp 0.8s ease both .1s'
          }}>
            Find your<br />
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>perfect car</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 480,
            lineHeight: 1.6, margin: '0 0 44px', fontWeight: 500,
            animation: 'fadeUp 0.8s ease both .2s'
          }}>
            Explore our meticulously maintained collection of premium vehicles for your ultimate driving experience.
          </p>

          {/* Search Bar */}
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24, padding: 10, backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'fadeUp 0.8s ease both .3s'
          }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}><Search size={18} className="text-white/40" /></span>
              <input
                placeholder="Search brand..."
                value={filters.brand}
                onChange={e => setFilters({ ...filters, brand: e.target.value })}
                style={{ ...inputStyle, border: 'none', paddingLeft: 46, background: 'transparent', color: '#fff' }}
              />
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}><DollarSign size={18} className="text-white/40" /></span>
              <input
                type="number"
                placeholder="Max price (TND)"
                value={filters.maxPrice}
                onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                style={{ ...inputStyle, border: 'none', paddingLeft: 46, background: 'transparent', color: '#fff' }}
              />
            </div>
            <button
              onClick={() => setShowAiRec(!showAiRec)}
              style={{
                padding: "16px 20px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(34, 211, 238, 0.2))",
                border: "1px solid rgba(139, 92, 246, 0.4)", borderRadius: 16, color: "#fff",
                fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex", alignItems: "center", gap: 8, flexShrink: 0
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.02) translateY(-2px)'; e.target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(34, 211, 238, 0.4))'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(34, 211, 238, 0.2))'; }}
            >
              <Sparkles size={16} className="text-violet-300" /> IA Suggest
            </button>
            <button
              onClick={fetchCars}
              style={{
                padding: "16px 40px", background: "#fff", color: "#000",
                border: "none", borderRadius: 16, fontWeight: 900,
                fontSize: 14, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                letterSpacing: '-0.01em', flexShrink: 0,
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.02) translateY(-2px)'; e.target.style.background = '#f0f0f0'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = '#fff'; }}
            >
              Explore Now →
            </button>
          </div>
        </div>
      </div>

      {/* ── Results Section ───────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>

        {/* AI Recommendation Slot */}
        {showAiRec && (
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <AiRecommendationCard />
          </div>
        )}

        {/* Filters Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Discover</h2>
            <span style={{ fontSize: 13, color: "#aaa", fontWeight: 500, background: '#f5f5f5', padding: '4px 12px', borderRadius: 20 }}>
              {filteredCars.length} vehicles
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'All' },
              { key: 'available', label: 'Available' },
              { key: 'premium', label: 'Premium' },
            ].map(f => (
              <button key={f.key} className="filter-pill" onClick={() => setActiveFilter(f.key)} style={{
                padding: '7px 16px', borderRadius: 20,
                border: `1px solid ${activeFilter === f.key ? '#000' : '#ebebeb'}`,
                background: activeFilter === f.key ? '#000' : '#fff',
                color: activeFilter === f.key ? '#fff' : '#888',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loyalty Banner Redesign */}
        {userPoints !== null && (
          <div style={{
            background: userPoints >= 100
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(135deg, #fff 0%, #fafafa 100%)',
            border: userPoints >= 100 
              ? '1px solid rgba(255,255,255,0.1)' 
              : '1px solid #ebebeb',
            borderRadius: 24, padding: '32px 40px', marginBottom: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32,
            boxShadow: userPoints >= 100 
              ? '0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 12px 32px rgba(0,0,0,0.04)',
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute', top: -100, right: -50, width: 300, height: 300,
              background: userPoints >= 100 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, minWidth: 320, zIndex: 1 }}>
              <div style={{
                background: userPoints >= 100 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                  : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                width: 64, height: 64, borderRadius: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                flexShrink: 0, boxShadow: userPoints >= 100 ? '0 8px 24px rgba(16,185,129,0.3)' : '0 8px 24px rgba(245,158,11,0.2)'
              }}>
                <Gift size={32} strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <h4 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: userPoints >= 100 ? '#fff' : '#000', letterSpacing: '-0.02em' }}>
                    {userPoints >= 100 ? 'Statut VIP Débloqué !' : 'Programme de Fidélité BMZ'}
                  </h4>
                  <span style={{
                    background: userPoints >= 100 ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.1)',
                    color: userPoints >= 100 ? '#10b981' : '#d97706',
                    padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em'
                  }}>
                    {userPoints >= 100 ? '-10% Actif' : 'Offre Exclusive'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: userPoints >= 100 ? '#94a3b8' : '#666', lineHeight: 1.6, fontWeight: 500 }}>
                  {userPoints >= 100
                    ? `Félicitations ! Vous bénéficiez d'une réduction de 10% sur tous vos prochains trajets.`
                    : `Louez nos véhicules pour cumuler des points. À 100 points, débloquez une réduction garantie de 10% sur toute notre flotte !`}
                </p>
                
                {/* Progress Bar for non-VIP */}
                {userPoints < 100 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#000', marginBottom: 6 }}>
                      <span>Votre progression</span>
                      <span style={{ color: '#d97706' }}>{userPoints} / 100 Points</span>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${Math.min(100, userPoints)}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)', 
                        borderRadius: 4, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' 
                      }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ zIndex: 1 }}>
              <button onClick={() => {
                heroRef.current?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => document.querySelector('input[placeholder="Search brand..."]')?.focus(), 500);
              }} style={{
                background: userPoints >= 100 ? '#fff' : '#000',
                color: userPoints >= 100 ? '#0f172a' : '#fff',
                border: 'none', padding: '16px 28px', borderRadius: 16,
                fontSize: 15, fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: userPoints >= 100 ? '0 8px 20px rgba(255,255,255,0.1)' : '0 8px 24px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = userPoints >= 100 ? '0 12px 28px rgba(255,255,255,0.15)' : '0 12px 32px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = userPoints >= 100 ? '0 8px 20px rgba(255,255,255,0.1)' : '0 8px 24px rgba(0,0,0,0.15)'; }}
              >
                {userPoints >= 100 ? 'Profiter de mon offre' : 'Louer pour cumuler'} 
                <span style={{ fontSize: 18 }}>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 22 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #ebebeb', borderRadius: 18,
                overflow: 'hidden', animation: 'fadeUp .4s ease both',
                animationDelay: `${i * 0.06}s`,
              }}>
                <div style={{
                  height: 210, background: 'linear-gradient(90deg, #f5f5f5 25%, #eee 50%, #f5f5f5 75%)',
                  backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear',
                }} />
                <div style={{ padding: 22 }}>
                  <div style={{ height: 14, background: '#f0f0f0', borderRadius: 6, width: '50%', marginBottom: 8 }} />
                  <div style={{ height: 20, background: '#f0f0f0', borderRadius: 6, width: '70%', marginBottom: 20 }} />
                  <div style={{ height: 1, background: '#f5f5f5', marginBottom: 16 }} />
                  <div style={{ height: 12, background: '#f0f0f0', borderRadius: 6, width: '30%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCars.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            background: '#fff', borderRadius: 18, border: '1px solid #ebebeb',
          }}>
            <div style={{ marginBottom: 12 }}><Car size={48} className="mx-auto text-slate-300" /></div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>No vehicles found</h3>
            <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Try different search criteria.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 22,
          }}>
            {filteredCars.map((car, i) => (
              <CarCard
                key={car.id}
                car={car}
                index={i}
                discount={userPoints >= 100 ? 10 : 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── About Us Section ───────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 100px", display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 60, height: 4, background: '#000', marginBottom: 24, borderRadius: 2 }} />
        <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 24px', color: '#000' }}>
          À Propos de <span style={{ background: 'linear-gradient(135deg, #000 0%, #555 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BMZ Rent Car</span>
        </h2>
        <p style={{ maxWidth: 700, fontSize: 16, color: '#666', lineHeight: 1.8, margin: '0 0 48px', fontWeight: 500 }}>
          Chez BMZ Rent Car, nous redéfinissons l'expérience de la location automobile. Fondée sur la passion de l'automobile et l'excellence du service client, notre mission est de vous offrir plus qu'un simple véhicule : une véritable expérience de conduite premium. Que vous recherchiez l'élégance pour un événement spécial ou la fiabilité pour vos voyages d'affaires, notre flotte méticuleusement entretenue est à votre disposition.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, width: '100%' }}>
          {[
            { icon: <Sparkles size={32} className="text-slate-800" />, title: 'Qualité Premium', desc: 'Une flotte entretenue avec la plus grande rigueur pour votre sécurité et votre confort.' },
            { icon: <DollarSign size={32} className="text-slate-800" />, title: 'Tarifs Transparents', desc: 'Des offres claires sans frais cachés, pour vous permettre de voyager en toute sérénité.' },
            { icon: <Car size={32} className="text-slate-800" />, title: 'Expérience Unique', desc: 'Un parcours de réservation fluide et un accompagnement personnalisé à chaque étape.' }
          ].map((item, i) => (
            <div key={i} style={{ padding: '40px 32px', background: '#fff', border: '1px solid #ebebeb', borderRadius: 24, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }}
                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#000'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ebebeb'; }}
            >
              <div style={{ width: 72, height: 72, background: '#f5f5f5', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 12px', color: '#000', letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#888', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', background: '#fafafa', padding: '32px 48px', borderRadius: 24, border: '1px solid #ebebeb', width: '100%', maxWidth: 840, marginTop: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#000', margin: '0 0 8px' }}>Contactez-nous</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: '#444' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <Phone size={18} />
              </div>
              <a href="tel:+21655123456" style={{ color: 'inherit', textDecoration: 'none' }}>+216 29 015 948</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: '#444' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <Mail size={18} />
              </div>
              <a href="mailto:contact@bmz-rentcar.com" style={{ color: 'inherit', textDecoration: 'none' }}>contact@bmz-rentcar.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, color: '#444' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <MapPin size={18} />
              </div>
              Sousse Sahloul, Tunisie
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
    </div>
  );
}