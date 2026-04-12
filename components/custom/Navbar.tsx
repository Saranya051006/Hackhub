"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full h-14 flex items-center border-b border-white/[0.06] bg-[#0e0e10]/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="w-full grid grid-cols-3 items-center px-8">

                {/* LEFT: LOGO */}
                <div className="flex items-center">
                    <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                        HackHub
                    </h1>
                </div>

                {/* CENTER: NAV LINKS */}
                <div className="flex items-center justify-center gap-2">
                    <a href="#" className="relative px-4 py-1.5 text-white font-semibold text-[15px]">
                        Explore
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-violet-500" />
                    </a>
                    <a href="#" className="px-4 py-1.5 text-gray-400 hover:text-white transition-colors font-medium text-[15px]">
                        Organize
                    </a>
                    <a href="#" className="px-4 py-1.5 text-gray-400 hover:text-white transition-colors font-medium text-[15px]">
                        Dashboard
                    </a>
                </div>

                {/* RIGHT: SEARCH + SIGN UP */}
                <div className="flex items-center justify-end gap-3">

                    {/* Search */}
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <Input
                            placeholder="Search events..."
                            className="w-56 h-8 pl-8 bg-[#1a1a1e] border-white/[0.08] text-white text-[13px] placeholder:text-gray-500 rounded-none focus-visible:ring-1 focus-visible:ring-violet-500/40"
                        />
                    </div>

                    {/* Sign Up */}
                    <Link
                        href="/auth"
                        className="h-8 px-4 flex items-center bg-[#7B3FF2] hover:bg-[#6d35d9] transition-colors text-[13px] font-semibold text-white rounded-none tracking-wide"
                    >
                        Sign Up
                    </Link>

                </div>
            </div>
        </nav>
    );
}