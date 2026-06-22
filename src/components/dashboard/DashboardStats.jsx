"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/prompts");
      const data = await res.json();
      setCount(data.length);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-gray-400">Total Prompts</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-gray-400">Today</h3>
        <p className="text-3xl font-bold">+0</p>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-gray-400">Growth</h3>
        <p className="text-3xl font-bold text-green-400">+12%</p>
      </div>
    </div>
  );
}