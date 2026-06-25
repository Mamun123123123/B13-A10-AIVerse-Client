"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/admin/prompts`);
        const data = await res.json();
        setPrompts(data || []);
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  const approvePrompt = async (id) => {
    await fetch(`${API_URL}/api/admin/prompts/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });

    setPrompts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status: "approved" } : p
      )
    );
  };

  const rejectPrompt = async () => {
    if (!feedback.trim()) {
      alert("Rejection feedback required!");
      return;
    }

    await fetch(`${API_URL}/api/admin/prompts/${selectedPrompt}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "rejected",
        feedback,
      }),
    });

    setPrompts((prev) =>
      prev.map((p) =>
        p._id === selectedPrompt
          ? { ...p, status: "rejected", feedback }
          : p
      )
    );

    setShowRejectModal(false);
    setFeedback("");
    setSelectedPrompt(null);
  };

  const toggleFeature = async (id, featured) => {
    await fetch(`${API_URL}/api/admin/prompts/${id}/feature`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });

    setPrompts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, featured: !featured } : p
      )
    );
  };

  const deletePrompt = async (id) => {
    if (!confirm("Delete this prompt?")) return;

    await fetch(`${API_URL}/api/admin/prompts/${id}`, {
      method: "DELETE",
    });

    setPrompts((prev) => prev.filter((p) => p._id !== id));
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchSearch =
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.userEmail?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [prompts, search, statusFilter]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      {/* HEADER */}
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
        <h1 className="text-3xl font-bold">All Prompts</h1>
        <p className="text-zinc-400 mt-1">
          Show all prompts in a table format
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded-xl text-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black border border-zinc-800 px-4 py-2 rounded-xl"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">User</th>
              <th className="p-3">Status</th>
              <th className="p-3">Feature</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPrompts.map((p) => (
              <tr key={p._id} className="border-t border-zinc-800">

                <td className="p-3">{p.title}</td>
                <td className="p-3 text-zinc-400">{p.userEmail}</td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-zinc-800 text-xs">
                    {p.status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleFeature(p._id, p.featured)}
                    className="p-2 border border-zinc-700 rounded"
                  >
                    <Star
                      className={
                        p.featured ? "text-yellow-400" : "text-white"
                      }
                      size={16}
                    />
                  </button>
                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => approvePrompt(p._id)}
                    className="p-2 bg-green-600 rounded"
                  >
                    <CheckCircle size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPrompt(p._id);
                      setShowRejectModal(true);
                    }}
                    className="p-2 bg-yellow-600 rounded"
                  >
                    <XCircle size={16} />
                  </button>

                  <button
                    onClick={() => deletePrompt(p._id)}
                    className="p-2 bg-red-600 rounded"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl w-[400px]">

            <h2 className="text-lg font-bold mb-3">
              Rejection Feedback (Required)
            </h2>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-28 p-3 bg-black border border-zinc-700 rounded"
              placeholder="Write reason..."
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-1 border border-zinc-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={rejectPrompt}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Reject
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}