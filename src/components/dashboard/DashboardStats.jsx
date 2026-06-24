"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function DashboardStats() {
  const { data: session } = useSession();

  const [stats, setStats] = useState({
    totalPrompts: 0,
    totalCopies: 0,
    totalBookmarks: 0,
    growth: 0,
    recent: [],
    chartData: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        setStats((p) => ({ ...p, loading: true }));

        const res = await fetch(
          `http://localhost:5000/api/prompts?email=${session.user.email}`
        );

        const data = await res.json();

        // ======================
        // TOTAL COPIES
        // ======================
        const totalCopies = data.reduce(
          (sum, p) => sum + (p.copyCount || 0),
          0
        );

        // ======================
        // MONTHLY GROUP (for chart)
        // ======================
        const monthlyMap = {};

        data.forEach((p) => {
          const date = new Date(p.createdAt || p._id?.getTimestamp?.());
          const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

          if (!monthlyMap[key]) {
            monthlyMap[key] = {
              name: key,
              prompts: 0,
              copies: 0,
            };
          }

          monthlyMap[key].prompts += 1;
          monthlyMap[key].copies += p.copyCount || 0;
        });

        const chartData = Object.values(monthlyMap).sort(
          (a, b) => new Date(a.name) - new Date(b.name)
        );

        // ======================
        // RECENT PROMPTS
        // ======================
        const recent = data
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
          .slice(0, 5);

        setStats({
          totalPrompts: data.length,
          totalCopies,
          totalBookmarks: 0, // later add bookmark system
          growth: 0,
          recent,
          chartData,
          loading: false,
        });
      } catch (err) {
        console.error(err);
        setStats((p) => ({ ...p, loading: false }));
      }
    };

    fetchData();
  }, [session?.user?.email]);

  if (stats.loading) {
    return (
      <div className="text-gray-400 p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card title="Total Prompts" value={stats.totalPrompts} />
        <Card title="Total Copies" value={stats.totalCopies} />
        <Card title="Bookmarks" value={stats.totalBookmarks} />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Copies Chart */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold mb-4">
            Copies Analytics
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="copies"
                stroke="#a855f7"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Prompt Growth Chart */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold mb-4">
            Prompt Growth
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="prompts" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= RECENT PROMPTS ================= */}
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
                  {p.prompt?.slice(0, 35)}...
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ================= CARD =================
function Card({ title, value }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}