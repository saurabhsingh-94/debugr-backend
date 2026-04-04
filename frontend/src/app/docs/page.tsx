'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';

type DocSection = 'overview' | 'hacking-rules' | 'payouts' | 'triage' | 'terms';

export default function Docs() {
  const [section, setSection] = useState<DocSection>('overview');

  const navItems: { id: DocSection; label: string }[] = [
    { id: 'overview', label: 'Platform Overview' },
    { id: 'hacking-rules', label: 'Hacking Rules' },
    { id: 'payouts', label: 'Reward Tiers' },
    { id: 'triage', label: 'Triage Process' },
    { id: 'terms', label: 'Legal Terms' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--t1)' }}>
      <Navbar />

      <main style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 3fr', minHeight: '100vh' }}>
        
        {/* ─── Persistent Sidebar (Left) ─── */}
        <nav style={{ 
          padding: '160px 48px 60px 8%', 
          borderRight: '1px solid var(--line)',
          background: 'rgba(255,255,255,0.01)',
          display: 'flex', flexDirection: 'column', gap: 40,
          position: 'sticky', top: 0, height: '100vh'
        }}>
          <div>
            <p className="mono" style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.2em', marginBottom: 16 }}>DOCUMENTATION</p>
            <h1 className="metallic-text" style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
              Operational<br />Manual.
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  textAlign: 'left', padding: '14px 20px', borderRadius: 12, fontSize: 14, fontWeight: 500,
                  background: section === item.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                  color: section === item.id ? '#f5f5f7' : 'var(--t3)',
                  border: `1px solid ${section === item.id ? 'var(--line)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {if(section !== item.id) e.currentTarget.style.color = '#fff'}}
                onMouseLeave={e => {if(section !== item.id) e.currentTarget.style.color = 'var(--t3)'}}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 12, color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>
              Last Updated: April 4, 2024<br />Version: v1.0.4-Titanium
            </p>
          </div>
        </nav>

        {/* ─── Content Area (Right) ─── */}
        <section style={{ padding: '160px 15% 100px 10%', display: 'flex', flexDirection: 'column', gap: 64 }}>
          
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {section === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>Welcome to Debugr</h2>
                <p style={{ fontSize: 17, color: 'var(--t2)', lineHeight: 1.7 }}>
                  Debugr is an industrial-grade bug bounty platform designed to connect professional hackers with enterprise companies. 
                  Our goal is to provide a highly secure environment where impact is rewarded fairly and transparently.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
                  <div className="metallic-card" style={{ padding: 32, borderRadius: 24 }}>
                    <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>For Hackers</h4>
                    <p style={{ fontSize: 14, color: 'var(--t3)', lineHeight: 1.6 }}>Access elite private programs, receive fast payouts, and build your reputation within our exclusive leaderboard.</p>
                  </div>
                  <div className="metallic-card" style={{ padding: 32, borderRadius: 24 }}>
                    <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>For Companies</h4>
                    <p style={{ fontSize: 14, color: 'var(--t3)', lineHeight: 1.6 }}>Secure your infrastructure with the power of thousands of specialized security minds, with professional triage support.</p>
                  </div>
                </div>
              </div>
            )}

            {section === 'hacking-rules' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>Engagment Rules</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Never execute destructive attacks (e.g., DoS, data deletion).',
                    'Stop immediately when you discover a sensitive data leak.',
                    'Use only your assigned @debugr.tst accounts for research.',
                    'Do not interact with real customers or their data.',
                    'Keep all findings confidential until the report is fully resolved.'
                  ].map((rule, i) => (
                    <div key={i} style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--line)', borderRadius: 16, display: 'flex', gap: 20, alignItems: 'center' }}>
                      <span className="mono" style={{ color: 'var(--t3)', fontSize: 13 }}>0{i+1}</span>
                      <p style={{ color: 'var(--t2)', fontSize: 16 }}>{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'payouts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>Reward Tiers & CVSS</h2>
                <div style={{ border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '24px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--line)' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--t3)' }}>SEVERITY</span>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--t3)' }}>CVSS SCORE</span>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--t3)', textAlign: 'right' }}>TYPICAL REWARD</span>
                  </div>
                  {[
                    { s: 'CRITICAL', c: '9.0 - 10.0', r: '$10,000 - $50,000+' },
                    { s: 'HIGH', c: '7.0 - 8.9', r: '$2,500 - $10,000' },
                    { s: 'MEDIUM', c: '4.0 - 6.9', r: '$500 - $2,500' },
                    { s: 'LOW', c: '0.1 - 3.9', r: '$100 - $500' },
                  ].map((tier, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '24px 32px', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: tier.s === 'CRITICAL' ? '#e5334b' : '#fff' }}>{tier.s}</span>
                      <span style={{ color: 'var(--t3)', fontFamily: 'DM Mono' }}>{tier.c}</span>
                      <span style={{ textAlign: 'right', fontWeight: 700, color: '#f5f5f7' }}>{tier.r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'triage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>The Lifecycle of a Report</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40, position: 'relative' }}>
                  {/* Vertical Line for steps */}
                  <div style={{ position: 'absolute', left: 16, top: 20, bottom: 20, width: 1, background: 'var(--line)' }} />
                  {[
                    { t: 'Submisson', d: 'Hacker submits report via the portal with full PoC and steps to reproduce.' },
                    { t: 'Validation', d: 'Debugr triage team validates the report within 24 hours to confirm impact.' },
                    { t: 'Triage', d: 'The company is notified for internal verification and fix prioritization.' },
                    { t: 'Resolution', d: 'The vulnerability is patched and confirmed by both the company and Debugr.' },
                    { t: 'Payout', d: 'Reward is released immediately upon resolution or triage, depending on program rules.' },
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 32, position: 'relative', zIndex: 1 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 100, background: 'var(--bg)', border: '2px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>{step.t}</h4>
                        <p style={{ color: 'var(--t2)', fontSize: 14, lineHeight: 1.6 }}>{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'terms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>Legal Framework</h2>
                <p style={{ color: 'var(--t2)', lineHeight: 1.7 }}>
                  By using Debugr, you agree to our Terms of Service. Hackers are independent contractors and are responsible for their own tax obligations. 
                  All platform interactions are subject to coordinated disclosure policies and mutual non-disclosure agreements.
                </p>
                <div style={{ padding: 24, border: '1px solid rgba(229,51,75,0.2)', background: 'rgba(229,51,75,0.05)', borderRadius: 16 }}>
                  <p style={{ fontSize: 13, color: '#e5334b', fontWeight: 600 }}>WARNING: Failure to comply with the hacking rules will result in immediate permanent suspension from all platform activities and forfeiture of any pending bounties.</p>
                </div>
              </div>
            )}
          </motion.div>

        </section>
      </main>
    </div>
  );
}
