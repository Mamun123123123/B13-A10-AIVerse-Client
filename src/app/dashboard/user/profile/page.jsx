"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Mail, Shield, Crown } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const [totalPrompts, setTotalPrompts] = useState(0);
  const [loading, setLoading] = useState(true);

  const subscription = "Free"; // future: DB from backend

  useEffect(() => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/prompts?email=${session.user.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setTotalPrompts(data.length || 0);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setTotalPrompts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session?.user?.email]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black">My Profile</h1>
        <p className="text-gray-500 mt-2">
          Manage your account and view activity
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 p-8 text-white shadow-2xl">

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          {/* PROFILE IMAGE */}
          <img
            src={
              session?.user?.image ||
              `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />

          {/* INFO */}
          <div className="flex-1 text-center md:text-left">

            <h2 className="text-3xl font-bold">
              {session?.user?.name}
            </h2>

            <div className="mt-4 space-y-3 text-white/80">

              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail size={18} />
                <span>{session?.user?.email}</span>
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Shield size={18} />
                <span className="capitalize">
                  {session?.user?.role || "user"}
                </span>
              </div>

            </div>

            {/* STATS */}
            <div className="mt-5 text-sm">
              <p>
                Total Prompts:{" "}
                <span className="font-bold">
                  {totalPrompts}
                </span>
              </p>
            </div>
          </div>

          {/* SUBSCRIPTION BOX */}
          <div className="w-full max-w-xs rounded-2xl bg-white/10 p-6 backdrop-blur-xl border border-white/20">

            <div className="flex items-center gap-2">
              <Crown className="text-yellow-400" />
              <h3 className="font-bold">Subscription</h3>
            </div>

            <p className="mt-2 text-lg font-semibold">
              {subscription}
            </p>

            {subscription === "Free" && (
              <Link href="/payment">
                <button className="mt-4 w-full bg-white text-black py-2 rounded-xl font-semibold hover:opacity-90 transition">
                  Upgrade to Premium
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}