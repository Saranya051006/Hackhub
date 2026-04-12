"use client";
import Image from "next/image";

export default function FeaturedEvent() {
    return (
        <section className="w-full px-8 py-6">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[2px] bg-white/40 rounded-full" />
                    <h2 className="text-white text-lg font-semibold tracking-tight">Featured Spotlight</h2>
                </div>

                {/* Spotlight Card */}
                <div className="grid grid-cols-[1.2fr_1fr] rounded-2xl overflow-hidden border border-white/[0.07] bg-[#141416]">

                    {/* LEFT: Event Image */}
                    <div className="relative min-h-[380px] bg-[#0e0e10] overflow-hidden group">
                        <Image
                            src="/aaa.png"
                            alt="Featured Event"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-all duration-300" />
                    </div>

                    {/* RIGHT: Event Details */}
                    <div className="flex flex-col justify-between p-8">
                        <div>
                            {/* Live Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                </span>
                                <span className="text-green-400 text-xs font-semibold uppercase tracking-widest">Live Now</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-white text-3xl font-bold leading-tight mb-4 tracking-tight">
                                Cyber-Sentinel: The 2024 Security Summit
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Join over 5,000 security experts to redefine the boundaries of decentralized defense. $150k in bounties up for grabs.
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-8 mb-8">
                                <div>
                                    <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-1">Participants</p>
                                    <p className="text-white text-xl font-bold">4,821+</p>
                                </div>
                                <div className="w-px h-8 bg-white/[0.08]" />
                                <div>
                                    <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-1">Prize Pool</p>
                                    <p className="text-white text-xl font-bold">$150,000</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-[#7c3aed] hover:text-white transition-colors">
                            Apply to Hack
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
