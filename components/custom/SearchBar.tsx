"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

const FILTERS = ["Online", "In-Person", "College", "Date"];

export default function SearchBar() {
    const [active, setActive] = useState("In-Person");

    return (
        <section className="w-full px-8 py-10">
            <div className="max-w-6xl mx-auto flex items-center gap-3">

                {/* Search Input */}
                <div className="relative flex-1 max-w-sm">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <Input
                        placeholder="Find by tech stack, location or name..."
                        className="w-full h-10 pl-9 bg-[#1C1C20] border-white/[0.08] text-white text-sm placeholder:text-gray-500 rounded-lg focus-visible:ring-1 focus-visible:ring-violet-500/40"
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2">
                    {FILTERS.map((filter) => {
                        const isActive = active === filter;
                        const isDate = filter === "Date";
                        return (
                            <button
                                key={filter}
                                onClick={() => setActive(filter)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-transparent border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20"
                                    }`}
                            >
                                {isDate && (
                                    <svg
                                        className="w-3.5 h-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                                    </svg>
                                )}
                                {filter}
                            </button>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}