"use client";

export default function LatestOpportunities() {
    return (
        <section className="w-full px-8 py-6 bg-[#0a0a0c]">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-white text-2xl font-bold tracking-tight">Latest Opportunities</h2>
                        <p className="text-gray-500 text-sm mt-1">Curated events starting in the next 30 days.</p>
                    </div>
                    <button className="flex items-center gap-1 text-gray-400 text-sm hover:text-white transition-colors">
                        View Archive
                        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-3">

                    {/* TOP LEFT: image card */}
                    <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#141416] flex flex-col">
                        {/* IMAGE PLACEHOLDER - replace with: <Image src="/event1.png" alt="NeuralNexus" fill className="object-cover" /> */}
                        <div className="relative h-[150px] bg-[#0d1117] flex items-center justify-center overflow-hidden">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="28" stroke="#30363d" strokeWidth="1" />
                                <path d="M15 30 Q30 10 45 30 Q30 50 15 30Z" fill="#21262d" stroke="#58a6ff" strokeWidth="0.8" />
                                <circle cx="30" cy="30" r="5" fill="#58a6ff" opacity="0.6" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
                            <span className="absolute bottom-2.5 left-3 text-[9px] text-gray-300 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">AUG 24 – 28</span>
                            <button className="absolute bottom-2.5 right-3 text-gray-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-white text-sm font-bold mb-1">NeuralNexus: AI Unleashed</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">Exploring the intersection of LLMs and robotics. Build the next autonomous companion.</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-violet-400 text-xs font-semibold">$50k Pool</span>
                                <span className="text-gray-600 text-xs">San Francisco</span>
                            </div>
                        </div>
                    </div>

                    {/* TOP MIDDLE: featured large image */}
                    <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#141416] min-h-[280px] flex items-center justify-center">
                        {/* IMAGE PLACEHOLDER - replace with: <Image src="/event2.png" alt="Web3 Global" fill className="object-cover" /> */}
                        <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#4a1a8c] flex items-center justify-center">
                            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                                <circle cx="70" cy="70" r="50" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
                                <circle cx="70" cy="70" r="35" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
                                <circle cx="45" cy="55" r="18" stroke="#a78bfa" strokeWidth="0.6" opacity="0.5" />
                                <circle cx="95" cy="85" r="22" stroke="#7c3aed" strokeWidth="0.6" opacity="0.4" />
                                <circle cx="70" cy="70" r="8" fill="#8b5cf6" opacity="0.8" />
                                <circle cx="45" cy="55" r="4" fill="#a78bfa" opacity="0.6" />
                                <circle cx="95" cy="85" r="5" fill="#7c3aed" opacity="0.5" />
                                <line x1="70" y1="70" x2="45" y2="55" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
                                <line x1="70" y1="70" x2="95" y2="85" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
                            </svg>
                        </div>
                    </div>

                    {/* TOP RIGHT: detail panel */}
                    <div className="rounded-2xl border border-white/[0.07] bg-[#141416] p-6 flex flex-col justify-between">
                        <div>
                            <p className="text-violet-400 text-[9px] font-bold uppercase tracking-widest mb-3">Global Virtual</p>
                            <h3 className="text-white text-xl font-bold leading-tight mb-3">Decentralized Dreams: Web3 Global</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-5">The world's largest gathering of Ethereum developers. 48 hours to ship the next billion-user dApp.</p>
                            <div className="flex items-center gap-6 mb-6">
                                <div>
                                    <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-1">Makers</p>
                                    <p className="text-white text-base font-bold">12,400</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-1">Sponsors</p>
                                    <p className="text-white text-base font-bold">45+</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-[#1e1e22] border border-white/[0.08] text-white text-sm font-semibold hover:bg-[#7c3aed] hover:border-transparent transition-colors">
                            Join Waitlist
                        </button>
                    </div>

                    {/* BOTTOM LEFT: icon card */}
                    <div className="rounded-2xl border border-white/[0.07] bg-[#141416] p-5 flex flex-col justify-between min-h-[160px] hover:border-white/[0.15] transition-colors cursor-pointer">
                        <div>
                            <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                                </svg>
                            </div>
                            <h3 className="text-white text-sm font-bold mb-1">Cloud Native Challenge</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">Optimizing serverless architectures for extreme scale. Sponsored by Infra-Giant.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center">
                                <span className="text-teal-400 text-[8px] font-bold">C</span>
                            </div>
                            <span className="text-gray-500 text-[11px]">Organized by <span className="text-gray-300">CloudScale</span></span>
                        </div>
                    </div>

                    {/* BOTTOM MIDDLE: icon card */}
                    <div className="rounded-2xl border border-white/[0.07] bg-[#141416] p-5 flex flex-col justify-between min-h-[160px] hover:border-white/[0.15] transition-colors cursor-pointer">
                        <div>
                            <div className="w-9 h-9 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                </svg>
                            </div>
                            <h3 className="text-white text-sm font-bold mb-1">Design Systems 48h</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">Bridging the gap between Figma and Production Code. For UI/UX maximalists.</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-violet-400 text-xs font-semibold">$10k prize</span>
                            <button className="text-gray-600 hover:text-gray-400 transition-colors">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT: small image + tags */}
                    <div className="rounded-2xl border border-white/[0.07] bg-[#141416] p-5 flex flex-col justify-between min-h-[160px] hover:border-white/[0.15] transition-colors cursor-pointer">
                        <div>
                            <h3 className="text-white text-sm font-bold mb-1">GameJam: Reality+</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">Building spatial experiences for the vision pro.</p>
                        </div>
                        {/* IMAGE PLACEHOLDER - replace with: <Image src="/event3.png" alt="GameJam" fill className="object-cover" /> */}
                        <div className="relative h-[90px] rounded-xl overflow-hidden my-3 bg-[#0a0a0f] flex items-center justify-center">
                            <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
                                <rect x="5" y="10" width="60" height="22" rx="8" stroke="#444" strokeWidth="1" fill="#111" />
                                <rect x="15" y="15" width="40" height="12" rx="4" stroke="#333" strokeWidth="0.5" fill="#0a0a0a" />
                                <circle cx="35" cy="21" r="3" fill="#222" stroke="#555" strokeWidth="0.5" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md">VR/AR</span>
                            <span className="text-[10px] text-gray-400 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md">Unity</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
