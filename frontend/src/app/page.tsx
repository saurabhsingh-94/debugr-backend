'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { fadeInUp, inView, viewportConfig } from '@/lib/animations';

/* ─── Data ─────────── */
const numbers = [
  { n: '$15.2M', label: 'Paid to hackers' },
  { n: '8,500+', label: 'Active hunters' },
  { n: '12,000+', label: 'Vulnerabilities closed' },
  { n: '340+', label: 'Companies protected' },
];

const programs = [
  { id: 'fintech-corp', name: 'FinTech Corp', type: 'Private', scope: 'Web · Mobile · API', max: '$15,000', open: true },
  { id: 'cloudnative-inc', name: 'CloudNative Inc', type: 'Private', scope: 'Infrastructure · API', max: '$25,000', open: true },
  { id: 'shopplatform', name: 'ShopPlatform', type: 'Public', scope: 'Web · Mobile', max: '$8,000', open: false },
  { id: 'datasafe-ltd', name: 'DataSafe Ltd', type: 'Private', scope: 'API · Cloud', max: '$12,000', open: true },
  { id: 'startup-xyz', name: 'StartupXYZ', type: 'Public', scope: 'Web · API', max: '$5,000', open: true },
];

const steps = [
  { n: '01', title: 'Apply once', body: 'Create your hacker profile. We review it once — then you have access to every program you qualify for.' },
  { n: '02', title: 'Pick a target', body: 'Browse programs by scope, payout range, or company. Private programs are invite-only based on your track record.' },
  { n: '03', title: 'Submit findings', body: 'Write a clear report. Our triage team reviews within 24h. Every submission gets a response — no ghosting.' },
  { n: '04', title: 'Get paid fast', body: 'Verified reports trigger a payout within 48h. No NET-90 nonsense. Real money, real fast.' },
];

const recentActivity = [
  { type: 'SQL Injection', severity: 'Critical', company: 'FinTech Corp', reward: '$5,000' },
  { type: 'Auth Bypass', severity: 'Critical', company: 'CloudNative', reward: '$9,000' },
  { type: 'Stored XSS', severity: 'High', company: 'SaaS Core', reward: '$1,200' },
  { type: 'IDOR', severity: 'High', company: 'ShopPlatform', reward: '$2,500' },
  { type: 'SSRF', severity: 'Critical', company: 'DataSafe', reward: '$6,000' },
  { type: 'Race Condition', severity: 'Critical', company: 'ShopPlatform', reward: '$4,500' },
];

/* ─── Severity pill ─────────── */
function Sev({ s }: { s: string }) {
  const color = s === 'Critical' ? '#fff' : s === 'High' ? '#a1a1a6' : '#6e6e73';
  return (
    <span style={{ fontFamily: 'DM Mono', fontSize: 10, color, letterSpacing: '0.04em', fontWeight: 700 }}>
      {s.toUpperCase()}
    </span>
  );
}

/* ─── Page ─────────── */
export default function Home() {
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const id: NodeJS.Timeout = setInterval(() => setFeedIdx(p => (p + 1) % recentActivity.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: '100vh', color: '#f5f5f7', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />

      {/* ════════════ HERO & TRENDING ════════════ */}
      <section style={{
        width: '100%', padding: '160px 5% 100px',
        position: 'relative', zIndex: 10,
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: 80, alignItems: 'center'
      }}>
        {/* LEFT: Hero Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <motion.h1 
            variants={fadeInUp(0.1)} initial="hidden" animate="visible" 
            className="metallic-text"
            style={{
              fontWeight: 850, fontSize: 'clamp(44px, 5vw, 96px)',
              lineHeight: 0.9, letterSpacing: '-0.05em',
              maxWidth: 800, marginBottom: 32,
            }}
          >
            Find vulnerabilities.<br />
            Get paid fairly.
          </motion.h1>

          <motion.p 
            variants={fadeInUp(0.2)} initial="hidden" animate="visible" 
            style={{
              fontSize: 20, color: '#a1a1a6', lineHeight: 1.6,
              maxWidth: 540, marginBottom: 48, fontWeight: 400,
            }}
          >
            Debugr connects global hackers with the companies that 
            build the modern web. Real rewards for real impact.
          </motion.p>

          <motion.div 
            variants={fadeInUp(0.3)} initial="hidden" animate="visible" 
            style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 64 }}
          >
            <Link href="/dashboard" style={{
              fontSize: 15, fontWeight: 700, color: '#111', background: '#f5f5f7',
              padding: '16px 40px', borderRadius: 12, textDecoration: 'none',
              transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f7'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Start hunting
            </Link>
            <Link href="/programs" style={{
              fontSize: 15, fontWeight: 600, color: '#f5f5f7',
              padding: '16px 40px', borderRadius: 12, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s',
              background: 'rgba(255,255,255,0.03)'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Browse programs
            </Link>
          </motion.div>

          <motion.div 
            variants={fadeInUp(0.45)} initial="hidden" animate="visible" 
            style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 16, padding: '12px 24px', 
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100
            }}>
              <span style={{ fontFamily: 'DM Mono', fontSize: 9, color: '#f5f5f7', letterSpacing: '0.15em', fontWeight: 700 }}>Live Activity</span>
              <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
              <motion.div
                key={feedIdx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <Sev s={recentActivity[feedIdx].severity} />
                <span style={{ fontSize: 13, color: '#a1a1a6', fontWeight: 500 }}>{recentActivity[feedIdx].type}</span>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 600, fontFamily: 'DM Mono' }}>{recentActivity[feedIdx].reward}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Trending Sidebar */}
        <motion.div
          variants={fadeInUp(0.4)} initial="hidden" animate="visible"
          className="metallic-card"
          style={{ padding: '32px', borderRadius: 24 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 className="metallic-text" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Trending Now</h2>
            <Link href="/programs" style={{ fontSize: 12, color: '#a1a1a6', textDecoration: 'none', fontWeight: 600 }}>See all</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {programs.slice(0, 5).map((p, i) => (
              <Link key={p.id} href={`/programs/${p.id}`} style={{ textDecoration: 'none' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '16px', background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f7', marginBottom: 2 }}>{p.name}</h4>
                    <p style={{ fontSize: 11, color: '#6e6e73', fontWeight: 600 }}>{p.type.toUpperCase()} · {p.scope.split('·')[0]}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'DM Mono' }}>{p.max}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link href="/programs" style={{
              fontSize: 13, fontWeight: 600, color: '#f5f5f7', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              Explore all programs <span style={{ fontSize: 16 }}>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ════════════ NUMBERS ════════════ */}
      <motion.section 
        variants={inView()} initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div style={{ padding: '0 5%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {numbers.map((item, i) => (
            <motion.div 
              key={item.n} 
              variants={inView(i * 0.07)} initial="hidden" whileInView="visible" viewport={viewportConfig} 
              style={{
                padding: '60px 40px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                textAlign: 'center'
              }}
            >
              <p className="metallic-text" style={{ fontWeight: 900, fontSize: 42, letterSpacing: '-0.04em', marginBottom: 8 }}>
                {item.n}
              </p>
              <p style={{ fontSize: 13, color: '#a1a1a6', fontWeight: 600, letterSpacing: '0.05em' }}>{item.label.toUpperCase()}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section style={{ width: '100%', padding: '120px 5%' }}>
        <motion.div variants={inView()} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ marginBottom: 80, textAlign: 'center' }}>
          <p style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#a1a1a6', letterSpacing: '0.2em', fontWeight: 800, marginBottom: 24 }}>Our Process</p>
          <h2 className="metallic-text" style={{ fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1, maxWidth: 800, margin: '0 auto' }}>
            Simple for hackers.<br />Reliable for companies.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {steps.map((s, i) => (
            <motion.div 
              key={s.n} 
              variants={inView(i * 0.1)} initial="hidden" whileInView="visible" viewport={viewportConfig} 
              className="metallic-card"
              style={{
                padding: '40px',
                borderRadius: 24,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span style={{ fontFamily: 'DM Mono', fontSize: 14, color: '#6e6e73', display: 'block', marginBottom: 32, fontWeight: 700 }}>{s.n}</span>
              <h3 style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', marginBottom: 16, color: '#f5f5f7' }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: '#a1a1a6', lineHeight: 1.6 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ ACTIVE PROGRAMS ════════════ */}
      <section style={{ width: '100%', padding: '120px 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60 }}>
          <motion.div variants={inView()} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <p style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#a1a1a6', letterSpacing: '0.2em', fontWeight: 800, marginBottom: 16 }}>Available Programs</p>
            <h2 style={{ fontWeight: 900, fontSize: 48, letterSpacing: '-0.03em' }}>Current Bounties</h2>
          </motion.div>
          <Link href="/programs" style={{ 
            fontSize: 14, color: '#a1a1a6', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
            onMouseLeave={e => (e.currentTarget.style.color = '#a1a1a6')}
          >
            View all programs <span style={{ fontSize: 18 }}>→</span>
          </Link>
        </div>

        <div className="metallic-card" style={{ borderRadius: 24, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.2fr 100px', gap: 24, padding: '20px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Program', 'Type', 'Target Scope', 'Max Payout', 'Status'].map(h => (
              <span key={h} style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#6e6e73', letterSpacing: '0.1em', fontWeight: 800 }}>{h.toUpperCase()}</span>
            ))}
          </div>
          {programs.map((p, i) => (
            <motion.div 
              key={p.id} 
              variants={inView(i * 0.05)} initial="hidden" whileInView="visible" viewport={viewportConfig} 
              style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.2fr 100px', gap: 24,
                padding: '24px 32px', borderBottom: i < programs.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                alignItems: 'center', cursor: 'pointer', transition: 'background 0.15s',
              }}
              onClick={() => window.location.href = `/programs/${p.id}`}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f7' }}>{p.name}</span>
              <span style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#a1a1a6', fontWeight: 600 }}>{p.type.toUpperCase()}</span>
              <span style={{ fontSize: 14, color: '#6e6e73' }}>{p.scope}</span>
              <span className="metallic-text" style={{ fontFamily: 'DM Mono', fontSize: 16, fontWeight: 800 }}>{p.max}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.open ? '#f5f5f7' : '#333', boxShadow: p.open ? '0 0 10px rgba(255,255,255,0.3)' : 'none' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: p.open ? '#f5f5f7' : '#444', letterSpacing: '0.05em' }}>{p.open ? 'ACTIVE' : 'PAUSED'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <motion.section 
        variants={inView()} initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ width: '100%', padding: '120px 5%', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="metallic-text" style={{ fontWeight: 900, fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 32 }}>
            Ready to find what<br />others miss?
          </h2>
          <p style={{ fontSize: 18, color: '#a1a1a6', lineHeight: 1.7, marginBottom: 56, maxWidth: 600, marginInline: 'auto' }}>
            Apply for private hacker access. We review every application manually to maintain the highest standards of impact and professionalism.
          </p>
          <Link href="/dashboard" style={{
            display: 'inline-block', fontSize: 16, fontWeight: 800,
            color: '#111', background: '#f5f5f7', padding: '20px 64px',
            borderRadius: 14, textDecoration: 'none', boxShadow: '0 10px 30px rgba(255,255,255,0.1)',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#f5f5f7'; }}
          >
            Apply for access
          </Link>
        </div>
      </motion.section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '60px 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #f5f5f7 0%, #a1a1a6 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#111', fontWeight: 900, fontSize: 16 }}>D</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#f5f5f7', letterSpacing: '-0.02em' }}>Debugr</span>
            <span style={{ fontSize: 13, color: '#444', marginLeft: 16 }}>© 2024 Debugr Platform</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Privacy', 'Terms', 'Security', 'Status'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: '#6e6e73', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6e6e73')}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
