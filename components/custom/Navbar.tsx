"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<{ name: string; role: string } | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // fetch session + profile on mount
    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                fetchProfile(session.user.id);
            }
        };
        init();

        // listen for auth changes (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                fetchProfile(session.user.id);
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data } = await supabase
            .from("profiles")
            .select("name, role")
            .eq("id", userId)
            .single();
        if (data) setProfile(data);
    };

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        router.push("/auth");
    };

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

                {/* RIGHT: SEARCH + AUTH */}
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

                    {/* AUTH: show profile icon if logged in, Sign Up if not */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Profile avatar button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-8 h-8 rounded-none bg-[#7B3FF2] flex items-center justify-center text-white font-bold text-[13px] hover:bg-[#6d35d9] transition-colors"
                            >
                                {profile?.name?.[0]?.toUpperCase() ?? "?"}
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-10 w-56 bg-[#13131a] border border-white/[0.08] shadow-xl z-50">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-white/[0.06]">
                                        <p className="text-white font-semibold text-[13px] truncate">
                                            {profile?.name ?? "User"}
                                        </p>
                                        <p className="text-gray-400 text-[11px] truncate mt-0.5">
                                            {user.email}
                                        </p>
                                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                            {profile?.role ?? "participant"}
                                        </span>
                                    </div>

                                    {/* Sign out */}
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full px-4 py-2.5 text-left text-[13px] text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="h-8 px-4 flex items-center bg-[#7B3FF2] hover:bg-[#6d35d9] transition-colors text-[13px] font-semibold text-white rounded-none tracking-wide"
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}