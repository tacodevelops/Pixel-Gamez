'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../../components/AuthContext';

export default function GameAnalyticsPage({ params }: { params: { id: string } }) {
  const { isLoggedIn, isOwner, loading } = useAuth();
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && isOwner) {
      fetchData();
    }
  }, [loading, isOwner]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/admin/analytics/${params.id}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {} finally {
      setFetching(false);
    }
  }

  if (loading || fetching) {
    return <div style={{ padding: '40px', color: 'var(--text-dim)' }}>Loading analytics...</div>;
  }

  if (!isOwner) {
    return <div style={{ padding: '40px', color: '#ef4444' }}>Access denied.</div>;
  }

  if (!data) {
    return <div style={{ padding: '40px', color: 'var(--text-dim)' }}>Game not found.</div>;
  }

  const likes = data.votes?.filter((v: any) => v.type === 'UP').length || 0;
  const dislikes = data.votes?.filter((v: any) => v.type === 'DOWN').length || 0;
  const totalVotes = likes + dislikes;
  const ratingRatio = totalVotes > 0 ? Math.round((likes / totalVotes) * 100) : 0;
  const favorites = data._count?.favoritedBy || 0;
  const plays = data.plays || 0;

  // Funnel calculations
  const step1 = plays; // Base
  const step2 = totalVotes;
  const step3 = favorites;
  const maxFunnel = Math.max(step1, 1);
  const funnelPct2 = Math.round((step2 / maxFunnel) * 100);
  const funnelPct3 = Math.round((step3 / maxFunnel) * 100);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
      <Link href="/admin" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; Back to Dashboard
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
        {data.thumbnail ? (
          <img src={data.thumbnail} alt="" style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '120px', height: '120px', borderRadius: '16px', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎮</div>
        )}
        <div>
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800 }}>{data.title}</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-dim)', fontSize: '1.1rem' }}>Developer: {data.developerName} | ID: {data.id}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Plays</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0', color: 'white' }}>{plays.toLocaleString()}</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Rating Ratio</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0', color: 'white' }}>{ratingRatio}%</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Favorites</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '8px 0', color: '#ef4444' }}>{favorites.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem' }}>Rating Distribution</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold' }}>
            <span style={{ color: '#10b981' }}>👍 {likes.toLocaleString()} Likes</span>
            <span style={{ color: '#ef4444' }}>👎 {dislikes.toLocaleString()} Dislikes</span>
          </div>
          <div style={{ width: '100%', height: '24px', borderRadius: '12px', background: '#ef4444', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${ratingRatio}%`, height: '100%', background: '#10b981', transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-dim)' }}>
            Total Votes: {totalVotes.toLocaleString()}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem' }}>Engagement Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Plays</span>
                <span style={{ fontWeight: 'bold' }}>100%</span>
              </div>
              <div style={{ width: '100%', height: '16px', borderRadius: '8px', background: 'var(--accent-primary)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Voted</span>
                <span style={{ fontWeight: 'bold' }}>{funnelPct2}%</span>
              </div>
              <div style={{ width: `${funnelPct2}%`, minWidth: '8px', height: '16px', borderRadius: '8px', background: 'var(--accent-secondary)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Favorited</span>
                <span style={{ fontWeight: 'bold' }}>{funnelPct3}%</span>
              </div>
              <div style={{ width: `${funnelPct3}%`, minWidth: '8px', height: '16px', borderRadius: '8px', background: '#ef4444' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
