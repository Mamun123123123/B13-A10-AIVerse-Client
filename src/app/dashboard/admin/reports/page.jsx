"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ReportedReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/reviews?reported=true`);
        const data = await res.json();

        const reportedOnly = (data || []).filter(
          (r) => r.report?.isReported === true
        );

        setReviews(reportedOnly);
      } catch (error) {
        console.error("Failed to load reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const q = search.toLowerCase();

      return (
        r.promptTitle?.toLowerCase().includes(q) ||
        r.reportedBy?.toLowerCase().includes(q) ||
        r.reason?.toLowerCase().includes(q)
      );
    });
  }, [reviews, search]);

  const warnUser = async (email) => {
    const msg = prompt("Write warning message:");
    if (!msg) return;

    await fetch(`${API_URL}/api/admin/warn-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, reason: msg }),
    });

    alert("User warned successfully");
  };

  const removePrompt = async (promptId) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    await fetch(`${API_URL}/api/prompts/${promptId}`, {
      method: "DELETE",
    });

    setReviews((prev) =>
      prev.filter((r) => r.promptId !== promptId)
    );
  };


  const dismissReport = async (id) => {
    await fetch(`${API_URL}/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "report.isReported": false,
        status: "dismissed",
      }),
    });

    setReviews((prev) =>
      prev.map((r) =>
        r._id === id
          ? {
              ...r,
              status: "dismissed",
              report: { ...r.report, isReported: false },
            }
          : r
      )
    );
  };


  const StatusBadge = ({ status }) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold border";

    if (status === "dismissed") {
      return (
        <span className={`${base} bg-green-500/10 text-green-400 border-green-500/20`}>
          Safe
        </span>
      );
    }

    return (
      <span className={`${base} bg-yellow-500/10 text-yellow-400 border-yellow-500/20`}>
        Reported
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading reports...
      </div>
    );
  }

 
  if (!reviews.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white bg-black">
        <ShieldCheck size={40} className="text-green-400 mb-3" />
        <h2 className="text-xl font-bold">No Reports Found</h2>
        <p className="text-zinc-500 mt-1">
          Everything looks clean 🎉
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Reported Reviews
        </h1>
        <p className="text-zinc-400 mt-1">
          Manage user reports from reviews collection
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by prompt, user, reason..."
          className="w-full md:w-96 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-zinc-600 transition"
        />
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">

        {/* HEADER ROW */}
        <div className="grid grid-cols-12 text-xs uppercase text-zinc-400 px-6 py-4 border-b border-zinc-800">
          <div className="col-span-4">Prompt</div>
          <div className="col-span-2">User</div>
          <div className="col-span-3">Reason</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* DATA ROWS */}
        <div className="divide-y divide-zinc-800">

          {filtered.map((r) => (
            <div
              key={r._id}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-900/40 transition"
            >

              {/* PROMPT */}
              <div className="col-span-4">
                <p className="font-medium truncate">
                  {r.promptTitle}
                </p>
                <p className="text-xs text-zinc-500">
                  ID: {r.promptId}
                </p>
              </div>

              {/* USER */}
              <div className="col-span-2 text-sm text-zinc-300 truncate">
                {r.reportedBy}
              </div>

              {/* REASON */}
              <div className="col-span-3 text-sm text-zinc-400 truncate">
                {r.reason}
              </div>

              {/* STATUS */}
              <div className="col-span-1">
                <StatusBadge status={r.status} />
              </div>

              {/* ACTIONS */}
              <div className="col-span-2 flex justify-end gap-2">

                <button
                  onClick={() => warnUser(r.reportedBy)}
                  className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
                  title="Warn User"
                >
                  <AlertTriangle size={16} />
                </button>

                <button
                  onClick={() => removePrompt(r.promptId)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  title="Delete Prompt"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => dismissReport(r._id)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white"
                  title="Dismiss Report"
                >
                  <XCircle size={16} />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}