'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { fetchWithAuth } from '@/lib/api';
import { inView, viewportConfig } from '@/lib/animations';

interface Program {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private';
  reward_min: string;
  reward_max: string;
  scope: string[];
}

export default function BountyDirectory() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');

  useEffect(() => {
    async function loadPrograms() {
      try {
        const res = await fetchWithAuth('/api/programs');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setPrograms(data.programs);
          }
        }
      } catch (err) {
        console.error('Failed to load programs', err);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const filtered = programs.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--t1)' }}>
      <Navbar />

      <main style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', minHeight: '100vh' }}>
        
        {/* ─── Sidebar / Hero (Left) ─── */}
        <section style={{ 
          padding: '160px 48px 60px 8%', 
          borderRight: '1px solid var(--line)',
          background: 'rgba(255,255,255,0.01)',
          display: 'flex', flexDirection: 'column', gap: 40,
          position: 'sticky', top: 0, height: '100vh'
        }}>
          <motion.div variants={inView()} initial="hidden" animate="visible">
            <p className="mono" style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.2em', marginBottom: 16 }}>DIRECTORY</p>
            <h1 className="metallic-text" style={{ fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
              Hunt the<br />Untraceable.
            </h1>
            <p style={{ color: 'var(--t2)', fontSize: 16, lineHeight: 1.6, maxWidth: 320 }}>
              Browse verified bounty programs from elite companies. Filter by scope, reward, or platform credibility.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>Search Targets</p>
              <input 
                type="text" 
                placeholder="Company, keyword, or asset..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)',
                  borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: 14, outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
            </div>

            <div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>Program Type</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['all', 'public', 'private'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      background: filterType === t ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: `1px solid ${filterType === t ? 'rgba(255,255,255,0.2)' : 'var(--line)'}`,
                      color: filterType === t ? '#fff' : 'var(--t3)',
                      cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 13, color: 'var(--t2)', fontWeight: 500 }}>{filtered.length} active programs found</p>
          </div>
        </section>

        {/* ─── Main Content (Right) ─── */}
        <section style={{ padding: '160px 8% 100px 8%', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {loading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--t3)' }}>Scanning network for targets...</div>
          )}

          <AnimatePresence mode="popLayout">
            {!loading && filtered.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link href={`/programs/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="metallic-card" style={{ 
                    padding: '32px 40px', borderRadius: 24, transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01) translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                      <div style={{ 
                        width: 64, height: 64, background: 'var(--chrome)', borderRadius: 16, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#111'
                      }}>
                        {p.name[0]}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{p.name}</h3>
                          <span style={{ 
                            fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, 
                            background: p.type === 'private' ? 'rgba(229,51,75,0.1)' : 'rgba(76,175,80,0.1)',
                            color: p.type === 'private' ? '#e5334b' : '#4caf50',
                            textTransform: 'uppercase', letterSpacing: '0.05em'
                          }}>
                            {p.type}
                          </span>
                        </div>
                        <p style={{ color: 'var(--t2)', fontSize: 14, marginBottom: 16, maxWidth: 400, lineHeight: 1.5 }}>{p.description}</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {p.scope.slice(0, 3).map(s => (
                            <span key={s} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'var(--t3)', padding: '4px 10px', borderRadius: 6 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 10, color: 'var(--t3)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>Max Bounty</p>
                      <p className="metallic-text" style={{ fontSize: 28, fontWeight: 800 }}>${Number(p.reward_max).toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {!loading && filtered.length === 0 && (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p style={{ color: 'var(--t3)', fontSize: 18 }}>No programs match your current search parameters.</p>
              <button onClick={() => {setSearch(''); setFilterType('all');}} style={{ marginTop: 24, background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>Clear Filters</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
