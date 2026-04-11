"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
    return (
        <nav className="w-full h-14 flex items-center border-b border-white/[0.06] bg-[#111113]/95 backdrop-blur-sm sticky top-0 z-50">
            {/* Full-width grid: left / center / right */}
            <div className="w-full grid grid-cols-3 items-center px-8">

                {/* LEFT: LOGO */}
                <div className="flex items-center">
                    <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                        HackHub
                    </h1>
                </div>

                {/* CENTER: NAV LINKS */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <a href="#" className="relative px-4 py-1.5 text-white font-semibold text-[15px]">
                        Explore
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-violet-500" />
                    </a>
                    <a href="#" className="px-4 py-1.5 text-gray-400 hover:text-white transition-colors font-medium text-[15px]">
                        Organize
                    </a>
                    <a href="#" className="px-4 py-1.5 text-gray-400 hover:text-white transition-colors font-medium text-[15px]">
                        Dashboard
                    </a>
                </div>

                {/* RIGHT: SEARCH + PROFILE */}
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
                            className="w-64 h-8 pl-8 bg-[#1C1C20] border-white/[0.08] text-white text-[13px] placeholder:text-gray-500 rounded-lg focus-visible:ring-1 focus-visible:ring-violet-500/40"
                        />
                    </div>

                    {/* Profile */}
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#1C1C20] hover:bg-white/5 transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#7C3AED] text-white text-xs font-semibold">
                                U
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[14px] font-medium text-white">Profile</span>
                    </button>

                </div>
            </div>
        </nav>
    );
}