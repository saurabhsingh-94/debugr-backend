'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { fetchWithAuth } from '@/lib/api';
import { inView } from '@/lib/animations';

interface HackerRank {
  id: string;
  email: string;
  total_earned: number;
  resolved_count: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<HackerRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'earned' | 'resolved'>('earned');

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`/api/users/leaderboard?sortBy=${sortBy}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setData(json.leaderboard);
          }
        }
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, [sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--t1)' }}>
      <Navbar />

      <main style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', minHeight: '100vh' }}>
        
        {/* ─── Stats / Title (Left) ─── */}
        <section style={{ 
          padding: '160px 48px 60px 8%', 
          borderRight: '1px solid var(--line)',
          background: 'rgba(255,255,255,0.01)',
          display: 'flex', flexDirection: 'column', gap: 40,
          position: 'sticky', top: 0, height: '100vh'
        }}>
          <motion.div variants={inView()} initial="hidden" animate="visible">
            <p className="mono" style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.2em', marginBottom: 16 }}>LEADERBOARD</p>
            <h1 className="metallic-text" style={{ fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
              Hall of<br />Excellence.
            </h1>
            <p style={{ color: 'var(--t2)', fontSize: 16, lineHeight: 1.6, maxWidth: 320 }}>
              Recognizing the elite hackers who protect the digital frontier. Rankings are updated in real-time.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>Ranking Metric</p>
              <div style={{ 
                display: 'flex', padding: 4, background: 'rgba(255,255,255,0.03)', 
                borderRadius: 12, border: '1px solid var(--line)', gap: 4 
              }}>
                {(['earned', 'resolved'] as const).map(m => (
                  <button 
                    key={m}
                    onClick={() => setSortBy(m)}
                    style={{
                      flex: 1, padding: '12px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                      background: sortBy === m ? '#f5f5f7' : 'transparent',
                      color: sortBy === m ? '#111' : 'var(--t3)',
                      border: 'none', cursor: 'pointer', transition: 'all 0.25s'
                    }}
                  >
                    {m === 'earned' ? 'Bounty Total' : 'Bugs Resolved'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 20 }}>
            {/* Minimal Stat Cards */}
            <div style={{ flex: 1, padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--line)' }}>
              <p className="mono" style={{ fontSize: 9, color: 'var(--t3)', marginBottom: 8 }}>AVG PAYOUT</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>$1,240</p>
            </div>
            <div style={{ flex: 1, padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--line)' }}>
              <p className="mono" style={{ fontSize: 9, color: 'var(--t3)', marginBottom: 8 }}>REPORTS/MONTH</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>482</p>
            </div>
          </div>
        </section>

        {/* ─── Rankings (Right) ─── */}
        <section style={{ padding: '160px 8% 100px 8%', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ 
            display: 'grid', gridTemplateColumns: '80px 1fr 140px 140px', 
            padding: '24px 32px', marginBottom: 12, opacity: 0.4
          }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>RANK</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>HACKER IDENTITY</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textAlign: 'right' }}>BUGS RESOLVED</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textAlign: 'right' }}>TOTAL EARNED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {loading && (
              <div style={{ padding: 80, textAlign: 'center', color: 'var(--t3)' }}>
                Recalculating global rankings...
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {!loading && data.map((h, idx) => {
                const isTop3 = idx < 3;
                return (
                  <motion.div
                    key={h.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    style={{
                      display: 'grid', gridTemplateColumns: '80px 1fr 140px 140px',
                      padding: '28px 32px', alignItems: 'center',
                      background: isTop3 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                      border: isTop3 ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 20,
                      boxShadow: isTop3 ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
                      transition: 'transform 0.2s, background 0.2s'
                    }}
                    whileHover={{ scale: 1.005, background: 'rgba(255,255,255,0.05)' }}
                  >
                    <span style={{ 
                      fontSize: 18, fontWeight: 900, 
                      color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : 'var(--t3)' 
                    }}>
                      #{idx + 1}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ 
                        width: 36, height: 36, background: 'var(--chrome)', borderRadius: 100, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#111'
                      }}>
                        {h.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, color: isTop3 ? '#fff' : 'var(--t1)' }}>{h.email.split('@')[0]}</p>
                        <p style={{ fontSize: 11, color: 'var(--t3)' }}>Verified Identity</p>
                      </div>
                    </div>

                    <span style={{ 
                      textAlign: 'right', fontWeight: sortBy === 'resolved' ? 800 : 500,
                      fontSize: sortBy === 'resolved' ? 18 : 15,
                      color: sortBy === 'resolved' ? '#f5f5f7' : 'var(--t2)'
                    }}>
                      {Number(h.resolved_count).toLocaleString()}
                    </span>

                    <span style={{ 
                      textAlign: 'right', fontWeight: sortBy === 'earned' ? 800 : 500,
                      fontSize: sortBy === 'earned' ? 18 : 15,
                      color: sortBy === 'earned' ? '#f5f5f7' : 'var(--t2)'
                    }}>
                      ${Number(h.total_earned).toLocaleString()}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {!loading && data.length === 0 && (
              <div style={{ padding: 80, textAlign: 'center', color: 'var(--t3)' }}>
                No rankings available yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
