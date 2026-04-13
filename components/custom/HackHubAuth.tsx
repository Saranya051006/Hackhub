"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Tab = "login" | "signup";
type Role = "participant" | "organizer";

export default function HackHubAuth() {
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("participant");

  // ✅ REMOVED: btnHovered state — hover is now handled purely via CSS
  // This eliminates onMouseEnter/onMouseLeave handlers that could interfere with clicks

  const handleSignup = async () => {
    if (!email || !password || !name || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful 🎉");
    }
  };

  const handleLogin = async () => {
    console.log("Login clicked");

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data, error);

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful 🚀");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("SESSION:", data.session);
    };
    checkSession();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        .hh-root * {
          box-sizing: border-box;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.03) inset !important;
          box-shadow: 0 0 0 1000px rgba(255,255,255,0.03) inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;
          border: 1px solid rgba(255,255,255,0.07) !important;
          transition: background-color 9999s ease-in-out 0s;
        }

        .hh-root {
          font-family: 'Space Grotesk', sans-serif;
          min-height: 100vh;
          width: 100%;
          background-color: #0b0f14;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* ✅ FIX: z-index: 0 ensures decorative layers never paint above interactive content */
        .hh-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* ✅ FIX: z-index: 0 on glow — was missing, could overlap .hh-content in some paint orders */
        .hh-glow {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 560px;
          height: 480px;
          background: radial-gradient(ellipse at 75% 80%, rgba(0,190,155,0.13) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        /* ✅ FIX: z-index: 10 keeps all interactive content reliably above decorative layers */
        .hh-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .hh-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 64px;
          padding-bottom: 40px;
          user-select: none;
        }

        .hh-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .hh-tagline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          color: #4b5a6e;
          letter-spacing: 0.22em;
          margin-top: 6px;
          text-transform: uppercase;
        }

        .hh-card-wrap {
          display: flex;
          justify-content: center;
          padding: 0 16px;
        }

        /* ✅ FIX: position: relative + z-index: 20 ensures card is always clickable */
        .hh-card {
          width: 100%;
          max-width: 420px;
          background: rgba(16, 22, 30, 0.94);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0;
          padding: 36px 36px 32px;
          position: relative;
          z-index: 20;
        }

        .hh-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .hh-access-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #ffffff;
        }

        .hh-tabs {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hh-tab {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding-bottom: 4px;
          transition: color 0.2s;
        }

        .hh-tab.active { color: #ffffff; }
        .hh-tab.inactive { color: #3d4e63; }

        .hh-tab-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #6d28d9, #a21caf);
        }

        .hh-field {
          margin-bottom: 20px;
        }

        .hh-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .hh-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          color: #4b5a6e;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hh-forgot {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          color: #4b5a6e;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .hh-forgot:hover { color: #fff; }

        .hh-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0;
          padding: 12px 14px;
        }

        .hh-input-wrap:focus-within {
          border-color: rgba(255,255,255,0.15);
        }

        .hh-input-icon {
          color: #3d4e63;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .hh-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #ffffff;
        }

        .hh-input::placeholder { color: #2a3547; }

        .hh-role-wrap {
          margin-bottom: 24px;
        }

        .hh-role-toggle {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0;
          overflow: hidden;
        }

        .hh-role-btn {
          flex: 1;
          padding: 11px 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          background: transparent;
          color: #3d4e63;
          border-radius: 0;
        }

        .hh-role-btn.active {
          background: rgba(109, 40, 217, 0.25);
          color: #c4b5fd;
          border-bottom: 2px solid #7c3aed;
        }

        .hh-role-divider {
          width: 1px;
          background: rgba(255,255,255,0.07);
        }

        /*
         * ✅ FIX: Hover is now handled entirely in CSS.
         * Removed onMouseEnter/onMouseLeave handlers from JSX.
         * This is cleaner and eliminates any handler-interference with onClick.
         */
        .hh-btn {
          width: 100%;
          padding: 15px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 0;
          position: relative;
          z-index: 30;
          background: #ffffff;
          color: #0b0f14;
          transition: background 0.25s, color 0.25s;
        }

        .hh-btn:hover {
          background: #7B3FF2;
          color: #ffffff;
        }

        .hh-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 28px 0;
        }

        .hh-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .hh-divider-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          color: #3d4e63;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hh-oauth {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .hh-oauth-btn {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .hh-oauth-btn:hover { background: rgba(255,255,255,0.09); }

        .hh-mid-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          margin-top: 40px;
        }

        .hh-mid-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          color: #3d4e63;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hh-mid-link:hover { color: #fff; }

        .hh-footer {
          margin-top: auto;
          padding: 32px 64px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .hh-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hh-footer-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .hh-footer-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .hh-footer-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          color: #3d4e63;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hh-footer-link:hover { color: #fff; }

        .hh-footer-copy {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem;
          color: #3d4e63;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hh-slide-enter {
          animation: slideIn 0.22s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hh-root">
        {/* ✅ z-index: 0 applied via CSS — decorative, never blocks clicks */}
        <div className="hh-grid" />
        <div className="hh-glow" />

        {/* ✅ z-index: 10 — all interactive content lives here */}
        <div className="hh-content">
          <header className="hh-header">
            <span className="hh-logo">HackHub</span>
            <span className="hh-tagline">The Editorial Tech Vanguard</span>
          </header>

          <div className="hh-card-wrap">
            {/* ✅ z-index: 20 on .hh-card via CSS */}
            <div className="hh-card">
              <div className="hh-card-header">
                <span className="hh-access-title">Access Hub</span>
                <div className="hh-tabs">
                  <button
                    className={`hh-tab ${tab === "login" ? "active" : "inactive"}`}
                    onClick={() => setTab("login")}
                  >
                    Login
                    {tab === "login" && <span className="hh-tab-underline" />}
                  </button>
                  <button
                    className={`hh-tab ${tab === "signup" ? "active" : "inactive"}`}
                    onClick={() => setTab("signup")}
                  >
                    Signup
                    {tab === "signup" && <span className="hh-tab-underline" />}
                  </button>
                </div>
              </div>

              {/* LOGIN FORM */}
              {tab === "login" && (
                <div className="hh-slide-enter">
                  <div className="hh-field">
                    <div className="hh-label-row">
                      <label className="hh-label">Email Address</label>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="email"
                        placeholder="curator@hackhub.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="hh-field" style={{ marginBottom: "28px" }}>
                    <div className="hh-label-row">
                      <label className="hh-label">Security Key</label>
                      <button className="hh-forgot">Forgot?</button>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <rect x="3" y="11" width="18" height="11" rx="0" ry="0" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/*
                                     * ✅ FIX: Removed onMouseEnter/onMouseLeave.
                                     * Hover effect now lives entirely in .hh-btn:hover CSS rule.
                                     */}
                  <button onClick={handleLogin} className="hh-btn">
                    Authorize Session
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <OAuthSection />
                </div>
              )}

              {/* SIGNUP FORM */}
              {tab === "signup" && (
                <div className="hh-slide-enter">
                  <div className="hh-field">
                    <div className="hh-label-row">
                      <label className="hh-label">Full Name</label>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="text"
                        placeholder="your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="hh-field">
                    <div className="hh-label-row">
                      <label className="hh-label">Email Address</label>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="email"
                        placeholder="curator@hackhub.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="hh-field">
                    <div className="hh-label-row">
                      <label className="hh-label">Security Key</label>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <rect x="3" y="11" width="18" height="11" rx="0" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="hh-field">
                    <div className="hh-label-row">
                      <label className="hh-label">Confirm Key</label>
                    </div>
                    <div className="hh-input-wrap">
                      <span className="hh-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                      </span>
                      <input
                        className="hh-input"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="hh-role-wrap">
                    <div className="hh-label-row" style={{ marginBottom: "8px" }}>
                      <label className="hh-label">I am a</label>
                    </div>
                    <div className="hh-role-toggle">
                      <button
                        className={`hh-role-btn ${role === "participant" ? "active" : ""}`}
                        onClick={() => setRole("participant")}
                      >
                        Participant
                      </button>
                      <div className="hh-role-divider" />
                      <button
                        className={`hh-role-btn ${role === "organizer" ? "active" : ""}`}
                        onClick={() => setRole("organizer")}
                      >
                        Organizer
                      </button>
                    </div>
                  </div>

                  {/* ✅ FIX: Removed onMouseEnter/onMouseLeave — hover via CSS only */}
                  <button onClick={handleSignup} className="hh-btn">
                    Create Account
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <OAuthSection />
                </div>
              )}
            </div>
          </div>

          <div className="hh-mid-footer">
            {["Infrastructure Status", "Privacy Protocol", "Legal Terms"].map((l) => (
              <a key={l} href="#" className="hh-mid-link">{l}</a>
            ))}
          </div>

          <footer className="hh-footer">
            <div className="hh-footer-inner">
              <span className="hh-footer-brand">HackHub</span>
              <div className="hh-footer-links">
                {["Terms", "Privacy", "About", "Discord", "GitHub"].map((l) => (
                  <a key={l} href="#" className="hh-footer-link">{l}</a>
                ))}
              </div>
              <span className="hh-footer-copy">© 2024 HackHub. The Editorial Tech Vanguard.</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

function OAuthSection() {
  return (
    <>
      <div className="hh-divider">
        <div className="hh-divider-line" />
        <span className="hh-divider-text">Or Authenticate Via</span>
        <div className="hh-divider-line" />
      </div>
      <div className="hh-oauth">
        <button className="hh-oauth-btn" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#4b5a6e">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </button>
        <button className="hh-oauth-btn" aria-label="Google" style={{ background: "rgba(59,81,130,0.3)", borderColor: "rgba(100,130,200,0.18)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#7b96d0" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#6a8bc0" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#8a9db8" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#7b96d0" />
          </svg>
        </button>
      </div>
    </>
  );
}