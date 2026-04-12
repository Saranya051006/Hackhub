"use client";

import { Button } from "@/components/ui/button";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

interface HeroProps {
    onExplore?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
    return (
        <section className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden bg-[#111113]">

            {/* Canvas ripple — fills entire section */}
            <BackgroundRippleEffect />

            {/* Content — pointer-events-none so mouse events reach the canvas */}
            <div className="pointer-events-none relative z-10 flex min-h-[calc(100vh-64px)] flex-col justify-center px-6 md:px-12 lg:px-20 py-20">

                <div className="max-w-5xl mx-auto lg:mx-0 lg:ml-16">

                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center rounded-full border border-purple-500/25 bg-purple-500/10 px-3.5 py-1">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300">
                            Curated Technology Events
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-6 font-bold leading-[1.05] tracking-[-0.025em] text-white text-[clamp(3.5rem,9vw,6.5rem)]">
                        <span className="block">Discover</span>
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, #a855f7 0%, #60a5fa 55%, #67e8f9 100%)",
                            }}
                        >
                            Hackathons
                        </span>
                        <span className="block">That Matter.</span>
                    </h1>

                    {/* Description */}
                    <p className="mb-10 max-w-[38ch] text-[15px] leading-relaxed text-gray-400">
                        Join the world&apos;s most prestigious developer gatherings. Build the future,
                        find your tribe, and scale your impact.
                    </p>

                    {/* CTA Buttons */}
                    <div className="pointer-events-auto flex items-center gap-3">
                        <Button
                            size="lg"
                            onClick={onExplore}
                            className="h-11 rounded-lg px-6 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            Explore Events&nbsp;&nbsp;→
                        </Button>

                        <Button
                            size="lg"
                            className="h-11 rounded-lg px-6 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            Host a Hackathon
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
