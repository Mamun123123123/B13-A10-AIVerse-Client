"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Star,
  Copy,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    totalReviews: 0,
    totalCopies: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/admin/stats`
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-white/80">
          Manage users, prompts, reports and platform analytics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Users
              </p>
              <h2 className="text-4xl font-bold">
                {stats.totalUsers}
              </h2>
            </div>

            <Users size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Prompts
              </p>
              <h2 className="text-4xl font-bold">
                {stats.totalPrompts}
              </h2>
            </div>

            <FileText size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Reviews
              </p>
              <h2 className="text-4xl font-bold">
                {stats.totalReviews}
              </h2>
            </div>

            <Star size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Copies
              </p>
              <h2 className="text-4xl font-bold">
                {stats.totalCopies}
              </h2>
            </div>

            <Copy size={40} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <a
          href="/dashboard/admin/users"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">
            👥 All Users
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Manage user roles and accounts.
          </p>
        </a>

        <a
          href="/dashboard/admin/prompts"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">
            📄 All Prompts
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Approve, reject or feature prompts.
          </p>
        </a>

        <a
          href="/dashboard/admin/reports"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">
            🚨 Reports
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Review reported prompts.
          </p>
        </a>

        <a
          href="/dashboard/admin/analytics"
          className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">
            📊 Analytics
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Platform insights and performance.
          </p>
        </a>
      </div>
    </div>
  );
}