'use client';
import React, { useState } from 'react';

export default function BrandIntegrationPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', budget: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '', budget: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--accent-primary)' }}>Brand Integration</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px', color: 'var(--text-dim)' }}>
        Welcome to the Brand Integration hub. Pixel Gamez offers unique opportunities for brands to connect with our highly engaged gaming community. 
      </p>

      <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Partnership Opportunities</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Sponsored Games:</strong> Feature your custom-branded games directly on our platform.</li>
          <li><strong>In-Game Advertising:</strong> Seamlessly integrate your brand into existing popular titles.</li>
          <li><strong>Homepage Takeovers:</strong> Maximize visibility with premium placement on our front page.</li>
        </ul>
      </div>

      <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--accent-primary)', boxShadow: '0 8px 32px rgba(236, 72, 153, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Get in Touch</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-dim)' }}>
          Interested in partnering with us? Fill out the form below and our team will get back to you shortly.
        </p>
        
        {status === 'success' ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #10b981', marginBottom: '16px' }}>
            Thanks for reaching out! We've received your message and will be in contact soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }} 
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Company Website" 
                value={(formData as any).website || ''}
                onChange={e => setFormData({...formData, website: e.target.value} as any)}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }} 
              />
              <input 
                type="text" 
                placeholder="Company Name" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }} 
              />
              <select 
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                required
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: formData.budget ? 'var(--text-primary)' : 'var(--text-dim)', padding: '12px', borderRadius: 'var(--radius-md)', appearance: 'none' }}
              >
                <option value="" disabled>Monthly Spending / Budget</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
            </div>
            <textarea 
              placeholder="Tell us about your goals..." 
              required 
              rows={4}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)', resize: 'vertical' }} 
            />
            {status === 'error' && (
              <p style={{ color: '#ef4444', margin: 0 }}>Failed to send message. Please try again later.</p>
            )}
            <button 
              type="submit"
              disabled={status === 'loading'}
              style={{ 
                background: 'var(--accent-primary)', 
                color: 'var(--bg-primary)', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: 'var(--radius-md)', 
                fontWeight: 'bold',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                opacity: status === 'loading' ? 0.7 : 1,
                alignSelf: 'flex-start'
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
