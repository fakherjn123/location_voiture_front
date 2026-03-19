import React, { useState, useEffect } from 'react';
import { Sparkles, CarFront, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecommendationService } from '../api/recommendation.service';

const sans = "'Inter', 'Helvetica Neue', sans-serif";

export default function AiRecommendationCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecommendation = async () => {
      try {
        setLoading(true);
        // GET instead of POST since we removed the budget requirement
        const res = await getRecommendationService(); 
        if (isMounted && res.data && res.data.recommendation) {
          setData(res.data);
        } else {
            setError(true);
        }
      } catch (err) {
        console.error("AI Rec Error:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecommendation();
    return () => { isMounted = false; };
  }, []);

  if (error || (!loading && !data)) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      borderRadius: 24,
      padding: '24px 28px',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: sans,
      boxShadow: '0 20px 40px rgba(49, 46, 129, 0.2)',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      border: '1px solid rgba(139, 92, 246, 0.3)'
    }}>
      {/* Glow Effects */}
      <div style={{
        position: 'absolute', top: -50, right: -50, width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -50, left: -50, width: 150, height: 150,
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      {/* Shimmer loading state */}
      <style>{`
        @keyframes shimmerRec {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .ai-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 75%);
          background-size: 400px 100%;
          animation: shimmerRec 1.5s infinite linear;
          border-radius: 8px;
        }
      `}</style>

      {/* Content */}
      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            background: 'rgba(139, 92, 246, 0.2)', padding: '6px 10px',
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={14} className="text-violet-300" />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#ddd6fe', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Sélection IA
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#fff' }}>
          {loading ? <div className="ai-shimmer" style={{ width: '60%', height: 28 }} /> : 'Notre suggestion pour vous'}
        </h3>
        
        <div style={{ fontSize: 15, color: '#c7d2fe', lineHeight: 1.6, maxWidth: '90%', fontWeight: 500 }}>
          {loading ? (
            <>
               <div className="ai-shimmer" style={{ width: '100%', height: 16, marginBottom: 6 }} />
               <div className="ai-shimmer" style={{ width: '80%', height: 16 }} />
            </>
          ) : (
             data.message
          )}
        </div>
      </div>

      {/* Car Image & Action */}
      {!loading && data?.recommendation && (
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
             <div style={{
                width: 240, height: 140, borderRadius: 16, overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.1)', background: '#000',
                position: 'relative'
             }}>
                 <img 
                    src={data.recommendation.image ? `http://localhost:3000${data.recommendation.image}` : "https://placehold.co/600x400/1e293b/94a3b8?text=Auto"} 
                    alt={data.recommendation.model}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                 />
                 <div style={{
                     position: 'absolute', bottom: 0, left: 0, right: 0,
                     background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                     padding: '24px 12px 10px',
                 }}>
                     <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                         {data.recommendation.brand} {data.recommendation.model}
                     </div>
                 </div>
             </div>
             
             <Link to={`/cars/${data.recommendation.id}`} style={{
                 background: '#fff', color: '#1e1b4b', textDecoration: 'none',
                 padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                 display: 'flex', alignItems: 'center', gap: 8,
                 transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
             }}
             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
             >
                 Découvrir <ArrowRight size={16} />
             </Link>
        </div>
      )}
    </div>
  );
}
