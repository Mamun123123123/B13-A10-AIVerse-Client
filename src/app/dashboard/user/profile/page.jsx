"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Shield, Crown } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const [totalPrompts, setTotalPrompts] = useState(0);
  const [loading, setLoading] = useState(true);

  const subscription = "Free";

  useEffect(() => {
    if (isPending) return;

    const email = session?.user?.email;

    const fetchStats = async () => {
      try {
        setLoading(true);

        // no user → just exit fetch (NO setState here)
        if (!email) return;

        const res = await fetch(
          `${API_URL}/api/prompts?email=${email}`
        );

        const data = await res.json();

        setTotalPrompts(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error(error);
        setTotalPrompts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session?.user?.email, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const avatarName = encodeURIComponent(session?.user?.name || "User");

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-0">

      <h1 className="text-4xl font-black text-white">
        My Profile
      </h1>

      <div className="relative overflow-hidden rounded-3xl bg-purple-800 p-8 text-white shadow-2xl">

        <div className="flex flex-col md:flex-row gap-8 items-center">

          <div className="relative w-28 h-28">
            <Image
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${avatarName}`
              }
              alt="profile"
              fill
              className="rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {session?.user?.name}
            </h2>

            <div className="mt-3 space-y-2 text-white/80">
              <p className="flex items-center gap-2">
                <Mail size={16} /> {session?.user?.email}
              </p>

              <p className="flex items-center gap-2">
                <Shield size={16} />
                {session?.user?.role || "user"}
              </p>
            </div>

            <p className="mt-4">
              Total Prompts:{" "}
              <span className="font-bold text-white">
                {totalPrompts}
              </span>
            </p>
          </div>

          <div className="w-64 bg-white/10 p-5 rounded-xl border border-white/20">
            <div className="flex items-center gap-2">
              <Crown className="text-yellow-400" />
              <span className="font-bold">Subscription</span>
            </div>

            <p className="mt-2 text-lg">{subscription}</p>

            {subscription === "Free" && (
              <Link href="/user/payment">
                <button className="mt-4 w-full bg-white text-black py-2 rounded-xl">
                  Upgrade
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}