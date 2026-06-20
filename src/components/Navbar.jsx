"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = false;

  return (
    <nav className="bg-[#0B0F1A] border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">✨</span>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            AI<span className="text-purple-500">verse</span>
          </h2>
        </Link>

    
        <div className="hidden md:flex items-center gap-8 text-white">
          <Link href="/">Home</Link>
          <Link href="/prompts">All Prompts</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>

        
        <div className="hidden md:flex gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 border border-gray-600 rounded-lg text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-purple-600 text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <button className="px-5 py-2 rounded-lg bg-red-500 text-white">
              Logout
            </button>
          )}
        </div>

        
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#111827] border-t border-purple-500/20 px-4 py-4">
          <div className="flex flex-col gap-4 text-white">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/prompts" onClick={() => setOpen(false)}>
              All Prompts
            </Link>

            {user && (
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}

            <hr className="border-gray-700" />

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-center py-2 border border-gray-600 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-center py-2 rounded-lg bg-purple-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <button className="py-2 rounded-lg bg-red-500 text-white">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;