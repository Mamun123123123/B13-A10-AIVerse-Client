"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = useSession();
 console.log(session);
 
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#0B0F1A] border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">✨</span>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            AI<span className="text-purple-500">verse</span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <Link href="/">Home</Link>
          <Link href="/all-prompts">All Prompts</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <span className="text-gray-300 text-sm">Loading...</span>
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 border border-gray-600 rounded-lg text-white hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">
                👋 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#111827] border-t border-purple-500/20 px-4 py-4">
          <div className="flex flex-col gap-4 text-white">

            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/all-prompts" onClick={() => setOpen(false)}>
              All Prompts
            </Link>

            {user && (
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}

            <hr className="border-gray-700" />

            {isPending ? (
              <span className="text-gray-300 text-sm">Loading...</span>
            ) : !user ? (
              <>
                <Link
                  href="/login"
                  className="py-2 text-center border border-gray-600 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="py-2 text-center bg-purple-600 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="text-white font-medium">
                  👋 {user.name}
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;