import { useState } from 'react';
import {
  ArrowRight, Check, Clipboard, Mail, MessageSquareText, Sparkles,
  WandSparkles, RotateCcw, ShieldCheck, Zap,
} from 'lucide-react';

const TONES = [
  { value: '', label: 'Choose a tone (optional)' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Formal', label: 'Formal' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Appreciative', label: 'Appreciative' },
  { value: 'Apologetic', label: 'Apologetic' },
  { value: 'Concise', label: 'Concise' },
];

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const GENERATE_ENDPOINT = import.meta.env.VITE_GENERATE_ENDPOINT || '/api/email/generate';

function extractReply(data) {
  // Support common Spring Boot response shapes. Adjust this mapping if your API differs.
  if (typeof data === 'string') return data;
  return data?.reply ?? data?.generatedReply ?? data?.emailReply ?? data?.content ?? data?.message ?? '';
}

export default function App() {
  const [email, setEmail] = useState('');
  const [tone, setTone] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function generateReply(event) {
    event.preventDefault();
    setError('');
    setCopied(false);
    setReply('');

    if (!email.trim()) {
      setError('Paste the email you want to reply to before generating a response.');
      return;
    }
    if (!API_BASE_URL) {
      setError('The backend URL is not configured. Copy .env.example to .env and set VITE_API_BASE_URL.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${GENERATE_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // Update these property names if your Spring Boot DTO expects a different payload.
        body: JSON.stringify({ emailContent: email.trim(), tone: tone || null }),
      });

      const raw = await response.text();
      let data = raw;
      try { data = raw ? JSON.parse(raw) : {}; } catch { /* API may return plain text */ }

      if (!response.ok) {
        const serverMessage = typeof data === 'object' ? data?.message || data?.error : data;
        throw new Error(serverMessage || `Request failed (${response.status}).`);
      }

      const generated = extractReply(data);
      if (!generated || typeof generated !== 'string') {
        throw new Error('The server responded, but no reply text was found. Check the response mapping in src/App.jsx.');
      }
      setReply(generated.trim());
    } catch (err) {
      setError(err.message || 'Something went wrong while generating your reply. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyReply() {
    if (!reply) return;
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setError('Clipboard access was blocked. Select the reply text and copy it manually.');
    }
  }

  function resetForm() {
    setEmail('');
    setTone('');
    setReply('');
    setError('');
    setCopied(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MailMind home">
          <span className="brand-mark"><Mail size={19} strokeWidth={2.4} /></span>
          <span>mailmind<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> AI writing assistant</div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><Sparkles size={14} /> WRITE BETTER EMAILS, FASTER</div>
        <h1>Your next reply,<br /><span>made effortless.</span></h1>
        <p className="hero-copy">Turn any email into a thoughtful, polished response. Add the message, choose a tone, and let AI help you find the right words.</p>
      </section>

      <section className="workspace" aria-label="Email reply generator">
        <div className="workspace-heading">
          <div className="heading-icon"><MessageSquareText size={19} /></div>
          <div>
            <h2>Email reply generator</h2>
            <p>Start with the email you received.</p>
          </div>
          <span className="private-label"><ShieldCheck size={13} /> Your draft</span>
        </div>

        <form onSubmit={generateReply}>
          <label className="field-label" htmlFor="email-content">Original email content</label>
          <textarea
            id="email-content"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Paste the email you received here…\n\nExample: “Hi, just following up on our conversation last week…”'}
            rows={7}
            maxLength={12000}
          />
          <div className="field-meta"><span>Include the context needed for a relevant reply.</span><span>{email.length.toLocaleString()} / 12,000</span></div>

          <label className="field-label tone-label" htmlFor="tone">Choose a tone <span>— optional</span></label>
          <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
            {TONES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>

          {error && <div className="error-message" role="alert">{error}</div>}

          <div className="form-actions">
            <button className="generate-button" type="submit" disabled={loading || !email.trim()}>
              {loading ? <span className="spinner" /> : <WandSparkles size={17} />}
              {loading ? 'Generating reply…' : 'Generate reply'}
              {!loading && <ArrowRight size={16} />}
            </button>
            <button className="reset-button" type="button" onClick={resetForm} disabled={loading || (!email && !reply && !tone)}>
              <RotateCcw size={15} /> Clear
            </button>
          </div>
        </form>

        <section className={`reply-panel ${reply ? 'has-reply' : ''}`} aria-live="polite">
          <div className="reply-header">
            <div>
              <div className="reply-title"><span className="reply-icon"><Sparkles size={15} /></span> Generated reply</div>
              <p>{reply ? 'Review your draft before sending.' : 'Your AI-generated response will appear here.'}</p>
            </div>
            {reply && <button className="copy-button" onClick={copyReply} type="button">
              {copied ? <Check size={15} /> : <Clipboard size={15} />}
              {copied ? 'Copied' : 'Copy reply'}
            </button>}
          </div>
          {reply ? (
            <div className="reply-content">{reply}</div>
          ) : (
            <div className="empty-state">
              <div className="empty-art"><Mail size={25} /><span><Sparkles size={14} /></span></div>
              <strong>Ready when you are</strong>
              <span>Your response will show up in this space.</span>
            </div>
          )}
        </section>
      </section>

      <footer className="footer">
        <div><Zap size={14} /> A little help for your inbox.</div>
        <span>AI-generated text can make mistakes. Review before sending.</span>
      </footer>
    </main>
  );
}
