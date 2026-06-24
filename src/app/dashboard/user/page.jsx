"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  FileText,
  Heart,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardHome() {
  const { data: session, isPending } =
    useSession();

  const [stats, setStats] = useState({
    totalPrompts: 0,
    totalBookmarks: 0,
    totalCopies: 0,
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadStats = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/dashboard/stats?email=${session.user.email}`
        );

        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning ☀️"
      : currentHour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-800 from-slate-900 via-indigo-900 to-violet-900 p-8 md:p-12 text-white shadow-2xl">

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles size={16} />
              <span className="text-sm font-medium">
                AI Prompt Marketplace
              </span>
            </div>

            <h2 className="mt-6 text-lg text-slate-300">
              {greeting}
            </h2>

            <h1 className="mt-2 text-5xl md:text-6xl font-black leading-tight">
              Welcome Back,
              <span className="block bg-cyan-300 from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                {session?.user?.name}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Manage your prompts,
              bookmarks and marketplace
              activity from one place.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/dashboard/creator/add-prompt"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:scale-105 transition"
              >
                <Plus size={18} />
                Create Prompt
              </Link>

              <Link
                href="/all-prompts"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white"
              >
                Explore Prompts
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>

         
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60">
                Total Prompts
              </p>

              <h2 className="mt-2 text-4xl font-black">
                {stats.totalPrompts}
              </h2>
            </div>

            <div className="rounded-2xl bg-primary/10 p-4">
              <FileText
                size={34}
                className="text-primary"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60">
                Saved Prompts
              </p>

              <h2 className="mt-2 text-4xl font-black">
                {stats.totalBookmarks}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-500/10 p-4">
              <Heart
                size={34}
                className="text-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60">
                Total Copies
              </p>

              <h2 className="mt-2 text-4xl font-black">
                {stats.totalCopies}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-500/10 p-4">
              <TrendingUp
                size={34}
                className="text-green-500"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}