'use client';

import { useAuth } from '../../components/AuthContext';
import SubmitGameForm from './SubmitGameForm';

export default function DeveloperPage() {
  const { isLoggedIn, openAuthModal } = useAuth();

  return (
    <div className="dev-page animate-fade-in">

      <div className="dev-intro">
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          <strong>Notice:</strong> This feature is currently inactive as we finalize payment and monetization systems for developers. Check back later!
        </div>
        <h1>Publish your game</h1>
        <p>
          Got an HTML5 or Unity WebGL game? Upload it here and it&apos;ll be available
          on the Community Games page once reviewed by our team.
        </p>
      </div>

      {}
      <section className="dev-formats">
        <h2 className="dev-section-title">What we accept</h2>
        <div className="dev-formats__grid">
          <div className="dev-format-card">
            <h3>HTML5 games</h3>
            <ul>
              <li>Single <code>.html</code> file or a <code>.zip</code> containing <code>index.html</code></li>
              <li>Canvas, WebGL, or DOM-based — anything that runs in a browser</li>
              <li>Built with Phaser, PixiJS, Three.js, Godot HTML5, Construct, or vanilla JS</li>
              <li>50 MB max upload size</li>
            </ul>
          </div>
          <div className="dev-format-card">
            <h3>Unity WebGL</h3>
            <ul>
              <li>Export your project as WebGL from Unity 2020+</li>
              <li>Host the build somewhere (itch.io, your own server, etc.)</li>
              <li>Provide the URL to your <code>index.html</code></li>
              <li>Make sure CORS headers allow embedding</li>
            </ul>
          </div>
        </div>
      </section>

      {}
      <section className="dev-submit-section" id="submit">
        <h2 className="dev-section-title">Submit your game</h2>

        {isLoggedIn ? (
          <>
            <p className="dev-section-note">
              Submissions go through a quick review before going live. You&apos;ll see your game
              on the Community page once it&apos;s approved.
            </p>
            <SubmitGameForm />
          </>
        ) : (
          <div className="dev-signin-prompt">
            <p>You need an account to submit games.</p>
            <button className="dev-signin-btn" onClick={openAuthModal}>
              Sign in or create an account
            </button>
          </div>
        )}
      </section>

      {}
      <section className="dev-guidelines">
        <h2 className="dev-section-title">Before you submit</h2>
        <div className="dev-guidelines__list">
          <div className="dev-guideline-item">
            <span className="dev-guideline-check">✓</span>
            Test in Chrome, Firefox, and Edge
          </div>
          <div className="dev-guideline-item">
            <span className="dev-guideline-check">✓</span>
            Make sure the game loads within a few seconds
          </div>
          <div className="dev-guideline-item">
            <span className="dev-guideline-check">✓</span>
            Include in-game instructions or a controls guide
          </div>
          <div className="dev-guideline-item">
            <span className="dev-guideline-check">✓</span>
            Use only assets you have rights to
          </div>
          <div className="dev-guideline-item dev-guideline-item--no">
            <span className="dev-guideline-x">✕</span>
            No malware, ad spam, or broken builds
          </div>
        </div>
      </section>

      {}
      <section className="dev-faq">
        <h2 className="dev-section-title">FAQ</h2>
        <div className="dev-faq__list">
          <details className="dev-faq__item">
            <summary>How long does review take?</summary>
            <p>Usually within a day. We check that the game loads, runs, and doesn&apos;t contain anything harmful.</p>
          </details>
          <details className="dev-faq__item">
            <summary>Is it free?</summary>
            <p>Yes. No fees, no revenue share. We just want more games on the platform.</p>
          </details>
          <details className="dev-faq__item">
            <summary>Can I update my game after publishing?</summary>
            <p>Not yet — you&apos;d need to submit a new version. We&apos;re working on an edit feature.</p>
          </details>
          <details className="dev-faq__item">
            <summary>Do I keep ownership?</summary>
            <p>Yes. Your game, your IP. We just host it and let people play.</p>
          </details>
        </div>
      </section>

    </div>
  );
}
