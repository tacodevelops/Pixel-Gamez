'use client';

import { useState, FormEvent, useRef } from 'react';
import { categories } from '../../lib/data';

export default function SubmitGameForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('action');
  const [gameType, setGameType] = useState<'html' | 'unity'>('html');
  const [embedUrl, setEmbedUrl] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');
  const [steamUrl, setSteamUrl] = useState('');
  const [gameFile, setGameFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('gameType', gameType);
      formData.append('thumbnail', '');

      if (gameType === 'html' && gameFile) {
        formData.append('gameFile', gameFile);
      }
      if (embedUrl) {
        formData.append('embedUrl', embedUrl);
      }
      if (discordUrl) {
        formData.append('discordUrl', discordUrl);
      }
      if (steamUrl) {
        formData.append('steamUrl', steamUrl);
      }

      const res = await fetch('/api/developer/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: `"${title}" has been submitted and is pending review. You'll see it on the Community page once approved.`,
        });
        setTitle('');
        setDescription('');
        setCategory('action');
        setGameType('html');
        setEmbedUrl('');
        setDiscordUrl('');
        setSteamUrl('');
        setGameFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setResult({ success: false, message: data.error || 'Submission failed.' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="dev-form" onSubmit={handleSubmit}>
      <div className="dev-form__section">
        <h3 className="dev-form__section-title">
          <span className="dev-form__section-number">1</span>
          Game details
        </h3>

        <div className="dev-form__field">
          <label className="dev-form__label" htmlFor="dev-title">Title</label>
          <input
            id="dev-title"
            type="text"
            className="dev-form__input"
            placeholder="Your game's name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="dev-form__field">
          <label className="dev-form__label" htmlFor="dev-description">Description</label>
          <textarea
            id="dev-description"
            className="dev-form__textarea"
            placeholder="What's the game about? How do you play?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="dev-form__field">
          <label className="dev-form__label" htmlFor="dev-category">Category</label>
          <select
            id="dev-category"
            className="dev-form__select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="dev-form__field">
          <label className="dev-form__label" htmlFor="dev-discord">Discord Server (Optional)</label>
          <input
            id="dev-discord"
            type="url"
            className="dev-form__input"
            placeholder="https://discord.gg/..."
            value={discordUrl}
            onChange={(e) => setDiscordUrl(e.target.value)}
          />
        </div>

        <div className="dev-form__field">
          <label className="dev-form__label" htmlFor="dev-steam">Steam Page (Optional)</label>
          <input
            id="dev-steam"
            type="url"
            className="dev-form__input"
            placeholder="https://store.steampowered.com/app/..."
            value={steamUrl}
            onChange={(e) => setSteamUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="dev-form__section">
        <h3 className="dev-form__section-title">
          <span className="dev-form__section-number">2</span>
          Game file
        </h3>

        <div className="dev-form__type-selector">
          <button
            type="button"
            className={`dev-form__type-btn ${gameType === 'html' ? 'active' : ''}`}
            onClick={() => setGameType('html')}
          >
            HTML5
          </button>
          <button
            type="button"
            className={`dev-form__type-btn ${gameType === 'unity' ? 'active' : ''}`}
            onClick={() => setGameType('unity')}
          >
            Unity WebGL
          </button>
        </div>

        {gameType === 'html' ? (
          <div className="dev-form__upload-area">
            <div
              className="dev-form__dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              {gameFile ? (
                <div className="dev-form__dropzone-text">
                  <strong>{gameFile.name}</strong>
                  <span>{(gameFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ) : (
                <div className="dev-form__dropzone-text">
                  <strong>Choose file</strong>
                  <span>.zip, .html, .htm — 50 MB max</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip,.html,.htm"
              style={{ display: 'none' }}
              onChange={(e) => setGameFile(e.target.files?.[0] || null)}
            />

            <div className="dev-form__field" style={{ marginTop: '12px' }}>
              <label className="dev-form__label dev-form__label--or">Or paste a URL</label>
              <input
                type="url"
                className="dev-form__input"
                placeholder="https://your-game.com/index.html"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="dev-form__field">
            <label className="dev-form__label" htmlFor="dev-unity-url">Hosted URL</label>
            <input
              id="dev-unity-url"
              type="url"
              className="dev-form__input"
              placeholder="https://your-domain.com/game/index.html"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              required
            />
            <p className="dev-form__hint">The URL to your Unity WebGL build&apos;s index.html</p>
          </div>
        )}
      </div>

      {result && (
        <div className={`dev-form__result ${result.success ? 'dev-form__result--success' : 'dev-form__result--error'}`}>
          {result.message}
        </div>
      )}

      <button
        type="submit"
        className="dev-form__submit"
        disabled={isSubmitting || (!gameFile && !embedUrl)}
      >
        {isSubmitting ? 'Submitting...' : 'Submit for review'}
      </button>
    </form>
  );
}
