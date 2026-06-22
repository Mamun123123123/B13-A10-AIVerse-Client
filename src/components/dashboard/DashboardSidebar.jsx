"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

import {
  LayoutDashboard,
  User,
  PlusCircle,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menus = [
    {
      title: "Creator Home",
      href: "/dashboard/creator",
      icon: LayoutDashboard,
    },
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Add Prompt",
      href: "/dashboard/add-prompt",
      icon: PlusCircle,
    },
    {
      title: "My Prompts",
      href: "/dashboard/my-prompts",
      icon: FileText,
    },
  ];

  const isActive = (href) => pathname.startsWith(href);

  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="flex items-center justify-between border-b p-4 lg:hidden">
        <h1 className="font-semibold">Dashboard</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 transition"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* sidebar */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-5 shadow-xl flex flex-col">
            
            {/* header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Creator Hub</h2>
                <p className="text-xs text-gray-500">AI Prompt Dashboard</p>
              </div>

              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* menu */}
            <nav className="flex flex-col gap-1">
              {menus.map(({ title, href, icon: Icon }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                      ${
                        active
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Icon size={18} />
                    {title}
                  </Link>
                );
              })}
            </nav>

            {/* logout */}
            <div className="mt-auto pt-6">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 min-h-screen border-r bg-white p-5 flex-col">
        
        {/* header */}
        <div className="mb-6 border-b pb-5">
          <h2 className="text-xl font-bold">Creator Hub</h2>
          <p className="text-sm text-gray-500">AI Prompt Dashboard</p>
        </div>

        {/* menu */}
        <nav className="flex flex-col gap-1">
          {menus.map(({ title, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                  ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {title}
              </Link>
            );
          })}
        </nav>

        {/* logout */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}