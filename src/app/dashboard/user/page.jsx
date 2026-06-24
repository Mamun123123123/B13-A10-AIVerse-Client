"use client";

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

export default function DashboardHome() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning ☀️"
      : currentHour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (

<div className="space-y-8">
  {/* Hero Section */}
  <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900 p-8 md:p-12 text-white shadow-2xl">

    {/* Glow Effects */}
    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>

    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

      {/* Left Content */}
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
          <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {session?.user?.name}
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-300">
          Discover, create and manage powerful AI prompts from
          one modern AI-powered dashboard.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/dashboard/creator/add-prompt"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Plus size={18} />
            Create Prompt
          </Link>

          <Link
            href="/all-prompts"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
          >
            Explore Prompts
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

        </div>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-2xl">

        <img
          src={
            session?.user?.image ||
            `https://ui-avatars.com/api/?name=${session?.user?.name}`
          }
          alt="user"
          className="mx-auto h-24 w-24 rounded-full border-4 border-cyan-400 object-cover"
        />

        <h3 className="mt-4 text-xl font-bold">
          {session?.user?.name}
        </h3>

        <p className="mt-1 text-sm text-slate-300">
          {session?.user?.email}
        </p>

        <div className="mt-5 flex justify-center">
          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
            ● Active Member
          </span>
        </div>

      </div>
    </div>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Total Prompts */}
    <div className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-base-content/60">
            Total Prompts
          </p>

          <h2 className="mt-2 text-4xl font-black">
            12
          </h2>

          <p className="mt-2 text-sm text-emerald-500">
            +12% this month
          </p>
        </div>

        <div className="rounded-2xl bg-primary/10 p-4">
          <FileText size={34} className="text-primary" />
        </div>

      </div>
    </div>

    {/* Saved Prompts */}
    <div className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-base-content/60">
            Saved Prompts
          </p>

          <h2 className="mt-2 text-4xl font-black">
            84
          </h2>

          <p className="mt-2 text-sm text-pink-500">
            +8% this month
          </p>
        </div>

        <div className="rounded-2xl bg-pink-500/10 p-4">
          <Heart size={34} className="text-pink-500" />
        </div>

      </div>
    </div>

    {/* Total Views */}
    <div className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-base-content/60">
            Total Views
          </p>

          <h2 className="mt-2 text-4xl font-black">
            1.4K
          </h2>

          <p className="mt-2 text-sm text-green-500">
            +25% this month
          </p>
        </div>

        <div className="rounded-2xl bg-green-500/10 p-4">
          <TrendingUp size={34} className="text-green-500" />
        </div>

      </div>
    </div>

  </div>
</div>


  );
}