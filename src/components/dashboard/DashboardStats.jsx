"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function DashboardStats() {
  const { data: session } = useSession();

  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
    growth: 0,
    recent: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        setStats((prev) => ({ ...prev, loading: true }));

        const res = await fetch(
          `http://localhost:5000/api/prompts?email=${session.user.email}`
        );

        const data = await res.json();

        const now = new Date();

        // =========================
        // FILTERS
        // =========================

        const todayData = data.filter((p) => {
          const d = new Date(p.createdAt || p._id?.getTimestamp?.());
          return (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });

        const weekData = data.filter((p) => {
          const d = new Date(p.createdAt || p._id?.getTimestamp?.());
          const diff = (now - d) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        });

        const monthData = data.filter((p) => {
          const d = new Date(p.createdAt || p._id?.getTimestamp?.());
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });

        // =========================
        // GROWTH CALCULATION
        // =========================
        const lastMonthData = data.filter((p) => {
          const d = new Date(p.createdAt || p._id?.getTimestamp?.());
          const lastMonth =
            now.getMonth() === 0 ? 11 : now.getMonth() - 1;

          return (
            d.getMonth() === lastMonth &&
            d.getFullYear() ===
              (now.getMonth() === 0
                ? now.getFullYear() - 1
                : now.getFullYear())
          );
        });

        const growth =
          lastMonthData.length === 0
            ? 100
            : ((monthData.length - lastMonthData.length) /
                lastMonthData.length) *
              100;

        // =========================
        // RECENT PROMPTS
        // =========================
        const recent = data
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
          .slice(0, 5);

        // =========================
        // SET STATE
        // =========================
        setStats({
          total: data.length,
          today: todayData.length,
          week: weekData.length,
          month: monthData.length,
          growth: growth.toFixed(1),
          recent,
          loading: false,
        });
      } catch (err) {
        console.error(err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [session?.user?.email]);

  // =========================
  // LOADING UI
  // =========================
  if (stats.loading) {
    return (
      <div className="text-gray-400 p-6">Loading dashboard...</div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card title="Total" value={stats.total} />
        <Card title="Today" value={stats.today} />
        <Card title="This Week" value={stats.week} />
        <Card
          title="Growth"
          value={`${stats.growth}%`}
          green
        />

      </div>

      {/* ================= RECENT ================= */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-white font-semibold mb-3">
          Recent Prompts
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          {stats.recent.length === 0 ? (
            <p className="text-gray-400">No prompts yet</p>
          ) : (
            stats.recent.map((p) => (
              <div
                key={p._id}
                className="flex justify-between border-b border-white/10 pb-2"
              >
                <span>{p.title}</span>
                <span className="text-gray-500">
                  {p.prompt?.slice(0, 30)}...
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// =========================
// SMALL CARD COMPONENT
// =========================
function Card({ title, value, green }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h3 className="text-gray-400">{title}</h3>
      <p
        className={`text-3xl font-bold ${
          green ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}