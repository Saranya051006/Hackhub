"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──────────────────────────────────────────────────────────
// Put these in your .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Types ────────────────────────────────────────────────────────────────────
interface Event {
    id: string;
    title: string;
    description: string;
    tag: string;
    tag_color: string;
    tag_bg: string;
    date_start: string;
    date_end: string;
    location: string;
    prize: string;
    visual: string;
}

interface RegistrationForm {
    name: string;
    email: string;
    github: string;
    team_name: string;
    message: string;
}

// ── Tag colour presets (fallback if DB doesn't store them) ───────────────────
const TAG_PRESETS: Record<string, { color: string; bg: string }> = {
    "AI / ML": { color: "#a78bfa", bg: "rgba(139,92,246,0.15)" },
    WEB3: { color: "#34d399", bg: "rgba(52,211,153,0.15)" },
    SECURITY: { color: "#fb923c", bg: "rgba(251,146,60,0.15)" },
    CLIMATE: { color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
    SYSTEMS: { color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
    DESIGN: { color: "#f472b6", bg: "rgba(244,114,182,0.15)" },
    DEFAULT: { color: "#e2e8f0", bg: "rgba(226,232,240,0.1)" },
};

function tagStyle(tag: string, color?: string, bg?: string) {
    if (color && bg) return { color, bg };
    return TAG_PRESETS[tag] ?? TAG_PRESETS.DEFAULT;
}

// ── SVG Visuals ──────────────────────────────────────────────────────────────
function EventVisual({ type, accentColor }: { type: string; accentColor: string }) {
    const c = accentColor;

    if (type === "neural") return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <defs>
                <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={c} stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="200" height="120" fill="#0a0a0f" />
            <circle cx="100" cy="60" r="55" fill="url(#ng1)" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                const a = (i / 8) * Math.PI * 2;
                const x = 100 + Math.cos(a) * 38, y = 60 + Math.sin(a) * 38;
                return <g key={i}>
                    <line x1="100" y1="60" x2={x} y2={y} stroke={c} strokeWidth="0.5" strokeOpacity="0.6" />
                    <circle cx={x} cy={y} r="3" fill={c} fillOpacity="0.8" />
                </g>;
            })}
            <circle cx="100" cy="60" r="7" fill={c} />
            <circle cx="100" cy="60" r="3" fill="white" fillOpacity="0.9" />
        </svg>
    );

    if (type === "eth") return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <rect width="200" height="120" fill="#050510" />
            <polygon points="100,15 130,55 100,70 70,55" fill="none" stroke={c} strokeWidth="0.8" strokeOpacity="0.7" />
            <polygon points="100,105 130,65 100,70 70,65" fill="none" stroke={c} strokeWidth="0.8" strokeOpacity="0.5" />
            <polygon points="100,15 130,55 100,70 70,55" fill={c} fillOpacity="0.08" />
            <polygon points="100,105 130,65 100,70 70,65" fill={c} fillOpacity="0.06" />
            {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) =>
                <line key={i} x1={x} y1="0" x2={x} y2="120" stroke={c} strokeWidth="0.2" strokeOpacity="0.1" />
            )}
        </svg>
    );

    if (type === "shield") return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <rect width="200" height="120" fill="#0a0500" />
            {Array.from({ length: 12 }).map((_, i) =>
                <line key={i} x1="0" y1={i * 10} x2="200" y2={i * 10} stroke={c} strokeWidth="0.2" strokeOpacity="0.15" />
            )}
            {Array.from({ length: 20 }).map((_, i) =>
                <line key={i} x1={i * 10} y1="0" x2={i * 10} y2="120" stroke={c} strokeWidth="0.2" strokeOpacity="0.1" />
            )}
            <path d="M100 20 L130 35 L130 70 Q130 90 100 100 Q70 90 70 70 L70 35 Z"
                fill={c} fillOpacity="0.08" stroke={c} strokeWidth="1" strokeOpacity="0.6" />
            <path d="M88 60 L96 68 L114 50" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    if (type === "green") return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <rect width="200" height="120" fill="#010f05" />
            <path d="M0 90 Q50 40 100 70 Q150 100 200 30" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
            <path d="M0 100 Q50 60 100 80 Q150 100 200 50" stroke={c} strokeWidth="0.8" fill="none" strokeOpacity="0.4" />
            {[20, 60, 100, 140, 180].map((x, i) =>
                <circle key={i} cx={x} cy={i % 2 === 0 ? 70 : 55} r="3" fill={c} fillOpacity="0.8" />
            )}
            <circle cx="100" cy="70" r="8" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.4" />
        </svg>
    );

    if (type === "kernel") return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <rect width="200" height="120" fill="#000510" />
            {Array.from({ length: 6 }).map((_, i) =>
                <rect key={i} x={20 + i * 28} y={35} width="20" height={20 + (i % 3) * 15} rx="2"
                    fill={c} fillOpacity="0.1" stroke={c} strokeWidth="0.6" strokeOpacity="0.7" />
            )}
            <line x1="10" y1="95" x2="190" y2="95" stroke={c} strokeWidth="0.5" strokeOpacity="0.4" />
            {Array.from({ length: 8 }).map((_, i) =>
                <line key={i} x1={20 + i * 24} y1="95" x2={20 + i * 24} y2="105" stroke={c} strokeWidth="0.5" strokeOpacity="0.3" />
            )}
        </svg>
    );

    // default / ui
    return (
        <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
            <rect width="200" height="120" fill="#0f0005" />
            <rect x="20" y="20" width="70" height="40" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.7" />
            <rect x="30" y="30" width="50" height="6" rx="1" fill={c} fillOpacity="0.3" />
            <rect x="30" y="42" width="35" height="4" rx="1" fill={c} fillOpacity="0.2" />
            <rect x="110" y="25" width="70" height="70" fill="none" stroke={c} strokeWidth="0.6" strokeOpacity="0.4" />
            <rect x="110" y="25" width="70" height="20" fill={c} fillOpacity="0.1" />
            <line x1="20" y1="80" x2="90" y2="80" stroke={c} strokeWidth="0.5" strokeOpacity="0.5" />
            <line x1="20" y1="88" x2="70" y2="88" stroke={c} strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
    );
}

// ── Register Modal ────────────────────────────────────────────────────────────
function RegisterModal({
    event,
    onClose,
}: {
    event: Event;
    onClose: () => void;
}) {
    const { color } = tagStyle(event.tag, event.tag_color, event.tag_bg);
    const [form, setForm] = useState<RegistrationForm>({
        name: "", email: "", github: "", team_name: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return;
        setStatus("loading");
        try {
            const { error } = await supabase.from("event_registrations").insert({
                event_id: event.id,
                name: form.name,
                email: form.email,
                github: form.github,
                team_name: form.team_name,
                message: form.message,
                registered_at: new Date().toISOString(),
            });
            if (error) throw error;
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-[#0e0e12] border border-white/10 overflow-hidden"
                style={{ boxShadow: `0 0 60px ${color}22` }}
                onClick={e => e.stopPropagation()}
            >
                {/* top accent */}
                <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

                <div className="p-6">
                    {/* header */}
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <div
                                className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest mb-2"
                                style={{ color, background: event.tag_bg || `${color}20`, border: `1px solid ${color}30` }}
                            >
                                {event.tag}
                            </div>
                            <h3 className="text-white font-mono font-bold text-base tracking-tight">{event.title}</h3>
                            <p className="text-gray-500 text-[11px] mt-0.5">{event.location} · {formatDate(event.date_start, event.date_end)}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-white transition-colors mt-1"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {status === "success" ? (
                        <div className="py-10 flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <p className="text-white font-mono font-bold text-sm">Registration Confirmed</p>
                            <p className="text-gray-500 text-xs">We&apos;ll reach out to <span style={{ color }}>{form.email}</span> with next steps.</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                                style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3">
                                {[
                                    { name: "name", label: "Full Name *", placeholder: "Your name", type: "text" },
                                    { name: "email", label: "Email *", placeholder: "you@example.com", type: "email" },
                                    { name: "github", label: "GitHub", placeholder: "github.com/handle", type: "text" },
                                    { name: "team_name", label: "Team Name", placeholder: "Solo or team name", type: "text" },
                                ].map(field => (
                                    <div key={field.name}>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={form[field.name as keyof RegistrationForm]}
                                            onChange={handleChange}
                                            className="w-full bg-[#141418] border border-white/[0.08] text-white text-xs px-3 py-2 outline-none placeholder-gray-700 focus:border-white/20 transition-colors"
                                            style={{ caretColor: color }}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Why do you want to join?</label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Brief motivation (optional)"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#141418] border border-white/[0.08] text-white text-xs px-3 py-2 outline-none placeholder-gray-700 focus:border-white/20 transition-colors resize-none"
                                        style={{ caretColor: color }}
                                    />
                                </div>
                            </div>

                            {status === "error" && (
                                <p className="text-red-400 text-[11px] mt-2">Something went wrong. Please try again.</p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={status === "loading" || !form.name || !form.email}
                                className="mt-5 w-full py-2.5 text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-40"
                                style={{
                                    background: `${color}22`,
                                    color,
                                    border: `1px solid ${color}50`,
                                }}
                            >
                                {status === "loading" ? "Registering…" : "Register Now →"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(start: string, end: string) {
    const fmt = (d: string) =>
        new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
    const year = new Date(end || start).getFullYear();
    return end ? `${fmt(start)} – ${fmt(end)}, ${year}` : `${fmt(start)}, ${year}`;
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="flex flex-col bg-[#0e0e12] border border-white/[0.07] overflow-hidden animate-pulse">
            <div className="h-[140px] bg-white/[0.03]" />
            <div className="p-4 flex flex-col gap-2">
                <div className="h-3 w-24 bg-white/[0.06] rounded" />
                <div className="h-2 w-full bg-white/[0.04] rounded" />
                <div className="h-2 w-3/4 bg-white/[0.04] rounded" />
                <div className="mt-3 pt-3 border-t border-white/[0.05] flex justify-between">
                    <div className="h-2 w-20 bg-white/[0.04] rounded" />
                    <div className="h-2 w-10 bg-white/[0.06] rounded" />
                </div>
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LatestOpportunities() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [registerEvent, setRegisterEvent] = useState<Event | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date_start", { ascending: true });

            if (error) {
                setError("Failed to load events.");
            } else {
                setEvents(data ?? []);
            }
            setLoading(false);
        }
        fetchEvents();
    }, []);

    return (
        <section className="w-full px-8 py-12 bg-[#08080b]">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-white text-2xl font-bold tracking-tight">Latest Opportunities</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {loading ? "Loading events…" : `${events.length} event${events.length !== 1 ? "s" : ""} available`}
                        </p>
                    </div>
                    <button className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-white transition-colors group">
                        View Archive
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3 mb-6">
                        {error}
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : events.map(event => {
                            const { color, bg } = tagStyle(event.tag, event.tag_color, event.tag_bg);
                            return (
                                <div
                                    key={event.id}
                                    className="group relative flex flex-col bg-[#0e0e12] border border-white/[0.07] hover:border-white/[0.16] transition-all duration-300 overflow-hidden"
                                >
                                    {/* Visual */}
                                    <div className="relative h-[140px] overflow-hidden">
                                        <EventVisual type={event.visual ?? "default"} accentColor={color} />
                                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {/* Tag */}
                                        <div
                                            className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                                            style={{ color, background: bg, border: `1px solid ${color}30` }}
                                        >
                                            {event.tag}
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-4">
                                        <h3 className="text-white text-[13px] font-bold tracking-tight mb-1.5 font-mono">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-500 text-[11px] leading-relaxed flex-1">
                                            {event.description}
                                        </p>

                                        {/* Meta */}
                                        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-gray-600 text-[10px]">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {formatDate(event.date_start, event.date_end)}
                                            </div>
                                            <span className="text-[11px] font-bold" style={{ color }}>
                                                {event.prize}
                                            </span>
                                        </div>

                                        <div className="mt-1.5 flex items-center gap-1 text-gray-600 text-[10px]">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                                <circle cx="12" cy="9" r="2.5" />
                                            </svg>
                                            {event.location}
                                        </div>

                                        {/* Register button */}
                                        <button
                                            onClick={() => setRegisterEvent(event)}
                                            className="mt-4 w-full py-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
                                            style={{
                                                background: `${color}16`,
                                                color,
                                                border: `1px solid ${color}40`,
                                            }}
                                        >
                                            Register →
                                        </button>
                                    </div>

                                    {/* Bottom accent on hover */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                                    />
                                </div>
                            );
                        })}
                </div>

                {!loading && events.length === 0 && !error && (
                    <div className="text-center text-gray-600 py-16 text-sm">
                        No events found. Check back soon.
                    </div>
                )}
            </div>

            {/* Modal */}
            {registerEvent && (
                <RegisterModal event={registerEvent} onClose={() => setRegisterEvent(null)} />
            )}
        </section>
    );
}