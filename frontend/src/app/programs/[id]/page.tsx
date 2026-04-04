'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

const programs = [
  { id: 'fintech-corp', name: 'FinTech Corp', type: 'Private', scope: 'Web · Mobile · API', max: '$15,000', open: true, desc: 'Secure the next generation of digital payments.' },
  { id: 'cloudnative-inc', name: 'CloudNative Inc', type: 'Private', scope: 'Infrastructure · API', max: '$25,000', open: true, desc: 'Enterprise-grade cloud infrastructure security.' },
  { id: 'shopplatform', name: 'ShopPlatform', type: 'Public', scope: 'Web · Mobile', max: '$8,000', open: true, desc: 'Protecting millions of global transactions daily.' },
  { id: 'datasafe-ltd', name: 'DataSafe Ltd', type: 'Private', scope: 'API · Cloud', max: '$12,000', open: true, desc: 'Zero-trust data storage for heavily regulated industries.' },
];

const SevTag = ({ s }: { s: string }) => (
  <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}>
    <span style={{ fontSize: 11, color: '#f5f5f7', fontWeight: 700, letterSpacing: '0.05em' }}>{s}</span>
  </div>
);

export default function ProgramDetail() {
  const params = useParams();
  const program = programs.find(p => p.id === params.id) || programs[0];

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1c1c21 0%, #0e0e10 100%)', color: '#f5f5f7', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '160px 24px 100px', display: 'flex', flexDirection: 'column', gap: 64 }}>
        
        {/* Header */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #2a2a2e 0%, #1a1a1e 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <span className="metallic-text" style={{ fontSize: 32, fontWeight: 800 }}>{program.name[0]}</span>
            </div>
            
            <h1 className="metallic-text" style={{ fontSize: 48, fontWeight: 900, marginBottom: 16, lineHeight: 1, letterSpacing: '-0.04em' }}>{program.name}</h1>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
              <SevTag s={program.type.toUpperCase()} />
              <SevTag s="VDP ACTIVE" />
            </div>

            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, width: '100%', maxWidth: 400, margin: '0 auto' }}>
              <p style={{ fontSize: 10, color: '#a1a1a6', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>REWARD RANGE</p>
              <p className="metallic-text" style={{ fontSize: 40, fontWeight: 800, marginBottom: 4 }}>{program.max}</p>
              <p style={{ fontSize: 14, color: '#6e6e73' }}>Per critical vulnerability</p>
            </div>
          </motion.div>
        </section>

        {/* Details Cluster */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>Program Overview</h2>
            <p style={{ fontSize: 17, color: '#a1a1a6', lineHeight: 1.6, fontWeight: 450 }}>{program.desc} Our bug bounty program rewards hackers for identifying security vulnerabilities in our core infrastructure and customer-facing applications. We follow a strict coordinated disclosure policy.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>Scope & Reward Matrix</h2>
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#f5f5f7' }}>ASSET</span>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#f5f5f7' }}>MAX REWARD</span>
              </div>
              {[
                { asset: 'api.target.com', reward: program.max },
                { asset: 'app.target.com', reward: '$12,000' },
                { asset: '*.target.com', reward: '$2,500' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '24px 32px', borderBottom: idx === 2 ? 'none' : '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 15, color: '#f5f5f7', opacity: 0.8, fontFamily: 'DM Mono' }}>{item.asset}</code>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: 16 }}>{item.reward}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>Submission Guidelines</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Include a clear proof of concept (PoC).',
                'Only use test accounts for your research.',
                'No Denial of Service (DoS) attacks allowed.',
                'Automated scanners must be limited to 5 requests/sec.',
              ].map((rule, idx) => (
                <li key={idx} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, color: '#a1a1a6', fontSize: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a1a1a6' }} />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ padding: '64px 32px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, textAlign: 'center' }}>
            <h3 className="metallic-text" style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to hunt?</h3>
            <p style={{ color: '#a1a1a6', marginBottom: 40, fontSize: 16, maxWidth: 500, marginInline: 'auto', lineHeight: 1.6 }}>By clicking accept, you agree to the program rules and coordinated disclosure policy.</p>
            <Link href="/dashboard" style={{
              display: 'inline-block', padding: '18px 56px', background: '#f5f5f7', borderRadius: 14,
              color: '#111', fontWeight: 800, textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 10px 30px rgba(255,255,255,0.1)', fontSize: 16
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#f5f5f7'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.1)'; }}
            >
              Accept and Start Hunting
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
