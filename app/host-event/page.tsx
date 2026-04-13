"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Tag presets ───────────────────────────────────────────────────────────────
const TAG_OPTIONS = [
    { label: "AI / ML", color: "#a78bfa", bg: "rgba(139,92,246,0.15)", visual: "neural" },
    { label: "WEB3", color: "#34d399", bg: "rgba(52,211,153,0.15)", visual: "eth" },
    { label: "SECURITY", color: "#fb923c", bg: "rgba(251,146,60,0.15)", visual: "shield" },
    { label: "CLIMATE", color: "#4ade80", bg: "rgba(74,222,128,0.15)", visual: "green" },
    { label: "SYSTEMS", color: "#60a5fa", bg: "rgba(96,165,250,0.15)", visual: "kernel" },
    { label: "DESIGN", color: "#f472b6", bg: "rgba(244,114,182,0.15)", visual: "ui" },
];

interface FormState {
    title: string;
    description: string;
    tag: string;
    date_start: string;
    date_end: string;
    location: string;
    prize: string;
}

const EMPTY: FormState = {
    title: "",
    description: "",
    tag: "",
    date_start: "",
    date_end: "",
    location: "",
    prize: "",
};

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
    label,
    required,
    children,
    hint,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-1">
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            {children}
            {hint && <p className="text-[10px] text-gray-700">{hint}</p>}
        </div>
    );
}

const inputCls =
    "w-full bg-[#0e0e12] border border-white/[0.08] text-white text-xs px-3 py-2.5 outline-none placeholder-gray-700 focus:border-white/20 transition-colors font-mono";

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HostEventPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>(EMPTY);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const selectedTag = TAG_OPTIONS.find(t => t.label === form.tag);
    const accentColor = selectedTag?.color ?? "#6b7280";

    const set = (key: keyof FormState) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async () => {
        if (!form.title || !form.tag || !form.date_start || !form.location) {
            setErrorMsg("Please fill in all required fields.");
            return;
        }
        setErrorMsg("");
        setStatus("loading");

        const tag = TAG_OPTIONS.find(t => t.label === form.tag)!;

        const { error } = await supabase.from("events").insert({
            title: form.title.toUpperCase(),
            description: form.description,
            tag: form.tag,
            tag_color: tag.color,
            tag_bg: tag.bg,
            visual: tag.visual,
            date_start: form.date_start,
            date_end: form.date_end || null,
            location: form.location,
            prize: form.prize || null,
        });

        if (error) {
            setErrorMsg("Failed to submit event. Please try again.");
            setStatus("error");
        } else {
            setStatus("success");
        }
    };

    // ── Success screen ──────────────────────────────────────────────────────────
    if (status === "success") {
        return (
            <div className="min-h-screen bg-[#08080b] flex items-center justify-center px-4">
                <div className="max-w-sm w-full text-center flex flex-col items-center gap-5">
                    <div
                        className="w-16 h-16 flex items-center justify-center"
                        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}40` }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-white font-mono font-bold text-lg tracking-tight">Event Submitted</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            <span style={{ color: accentColor }} className="font-mono font-bold">{form.title.toUpperCase()}</span> is now live on the platform.
                        </p>
                    </div>
                    <div className="flex gap-3 mt-2 w-full">
                        <button
                            onClick={() => router.push("/")}
                            className="flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-all"
                            style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}40` }}
                        >
                            View Events
                        </button>
                        <button
                            onClick={() => { setForm(EMPTY); setStatus("idle"); }}
                            className="flex-1 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        >
                            Host Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Form ────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#08080b] px-4 py-16">
            <div className="max-w-xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-white text-xs uppercase tracking-widest mb-10 transition-colors group"
                >
                    <svg
                        className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                        <path d="M19 12H5M5 12l7 7M5 12l7-7" />
                    </svg>
                    Back
                </button>

                {/* Header */}
                <div className="mb-10">
                    <div
                        className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest mb-3"
                        style={{ color: accentColor, background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
                    >
                        Host an Event
                    </div>
                    <h1 className="text-white text-2xl font-bold font-mono tracking-tight">
                        Submit Your Event
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Fill in the details below. Your event will appear on the platform immediately after submission.
                    </p>
                </div>

                {/* Divider */}
                <div
                    className="h-px w-full mb-8"
                    style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }}
                />

                {/* Form fields */}
                <div className="flex flex-col gap-5">

                    <Field label="Event Title" required>
                        <input
                            className={inputCls}
                            placeholder="e.g. HACKMATRIX_2026"
                            value={form.title}
                            onChange={set("title")}
                            maxLength={60}
                        />
                    </Field>

                    <Field label="Category" required>
                        <select
                            className={inputCls + " cursor-pointer appearance-none"}
                            value={form.tag}
                            onChange={set("tag")}
                            style={{ colorScheme: "dark" }}
                        >
                            <option value="" disabled>Select a category…</option>
                            {TAG_OPTIONS.map(t => (
                                <option key={t.label} value={t.label}>{t.label}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Description" hint="Keep it under 180 characters for best display.">
                        <textarea
                            className={inputCls + " resize-none"}
                            rows={3}
                            placeholder="What is this event about? What will participants build?"
                            value={form.description}
                            onChange={set("description")}
                            maxLength={280}
                        />
                        <span className="text-[10px] text-gray-700 text-right">
                            {form.description.length} / 280
                        </span>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Start Date" required>
                            <input
                                type="date"
                                className={inputCls}
                                value={form.date_start}
                                onChange={set("date_start")}
                                style={{ colorScheme: "dark" }}
                            />
                        </Field>
                        <Field label="End Date">
                            <input
                                type="date"
                                className={inputCls}
                                value={form.date_end}
                                onChange={set("date_end")}
                                style={{ colorScheme: "dark" }}
                            />
                        </Field>
                    </div>

                    <Field label="Location" required hint='e.g. "Berlin, Germany" or "Remote"'>
                        <input
                            className={inputCls}
                            placeholder="City, Country"
                            value={form.location}
                            onChange={set("location")}
                        />
                    </Field>

                    <Field label="Prize Pool" hint='e.g. "$50K" — leave blank if none'>
                        <input
                            className={inputCls}
                            placeholder="$0K"
                            value={form.prize}
                            onChange={set("prize")}
                        />
                    </Field>
                </div>

                {/* Preview pill */}
                {form.tag && (
                    <div className="mt-8 p-4 border border-white/[0.06] bg-[#0e0e12] flex items-center gap-3">
                        <div
                            className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest shrink-0"
                            style={{ color: accentColor, background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
                        >
                            {form.tag}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-mono font-bold truncate">
                                {form.title ? form.title.toUpperCase() : "YOUR EVENT TITLE"}
                            </p>
                            <p className="text-gray-600 text-[10px] truncate">
                                {form.location || "Location"} · {form.date_start || "Date"}
                            </p>
                        </div>
                        {form.prize && (
                            <span className="text-xs font-bold shrink-0" style={{ color: accentColor }}>
                                {form.prize}
                            </span>
                        )}
                    </div>
                )}

                {/* Error */}
                {errorMsg && (
                    <p className="mt-4 text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">
                        {errorMsg}
                    </p>
                )}

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="mt-6 w-full py-3 text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-40 hover:opacity-90 active:scale-[0.99]"
                    style={{
                        background: `${accentColor}20`,
                        color: accentColor,
                        border: `1px solid ${accentColor}50`,
                    }}
                >
                    {status === "loading" ? "Submitting…" : "Submit Event →"}
                </button>

                <p className="text-center text-gray-700 text-[10px] mt-4">
                    Events are publicly visible immediately after submission.
                </p>
            </div>
        </div>
    );
}