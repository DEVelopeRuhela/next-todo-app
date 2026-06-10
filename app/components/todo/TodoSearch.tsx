"use client";

import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
export const TodoSearch = ({ search, setSearch }: { search: string; setSearch: (search: string) => void }) => {
    const [show, setShow] = useState(false);


    const handleClose = () => {
        setSearch("");
        setShow(false);
    };

    return (
        <div className="flex items-center justify-end h-10">
            <div
                className={`flex items-center overflow-hidden transition-all duration-300 ease-out border ${
                    show
                        ? "w-64 bg-white border-zinc-300 rounded-lg shadow-sm"
                        : "w-9 bg-transparent border-transparent rounded-full hover:bg-zinc-100"
                }`}
            >
                <button
                    type="button"
                    onClick={() => setShow(true)}
                    className={`flex items-center justify-center shrink-0 h-9 w-9 transition-colors ${
                        show ? "text-zinc-400 cursor-default" : "text-zinc-600  hover:text-zinc-900 cursor-pointer"
                    }`}
                    aria-label="Open search"
                    disabled={show}
                >
                    <Search className="h-4 w-4" />
                </button>

                <input
                    
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`flex-1 bg-transparent text-sm text-zinc-900 outline-none transition-opacity duration-300 ${
                        show ? "opacity-100 px-1 w-full" : "opacity-0 w-0"
                    }`}
                    disabled={!show}
                />

                <button
                    type="button"
                    onClick={handleClose}
                    className={`flex items-center justify-center shrink-0 h-9 w-9 text-zinc-400 hover:text-zinc-900 transition-all duration-300 ${
                        show ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
                    }`}
                    aria-label="Close search"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};