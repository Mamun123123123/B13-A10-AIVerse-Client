"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Eye } from "lucide-react";

export default function PromptsTable() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  // =========================
  // FETCH PROMPTS
  // =========================
  const fetchPrompts = useCallback(async (email) => {
    if (!email) {
      setPrompts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/prompts?email=${email}`
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setPrompts(data || []);
    } catch (err) {
      console.error(err);
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (status === "loading") return;

    const email = session?.user?.email;
    fetchPrompts(email);
  }, [session?.user?.email, status, fetchPrompts]);


  const refreshData = () => {
    fetchPrompts(session?.user?.email);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/prompts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

  
      setPrompts((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.message || "Failed to delete prompt");
    }
  };


  if (status === "loading") {
    return (
      <div className="text-gray-400 p-6">
        Checking session...
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Prompts</h2>

        <button
          onClick={refreshData}
          className="px-4 py-2 text-sm rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          Refresh
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-162 text-left">
            <thead className="bg-white/10 text-gray-700 text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Prompt</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-gray-700">
                    Loading prompts...
                  </td>
                </tr>
              ) : prompts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-gray-700">
                    No prompts found. Create your first prompt 🚀
                  </td>
                </tr>
              ) : (
                prompts.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-semibold text-black">
                      {p.title}
                    </td>

                    <td className="p-4 text-sm text-gray-900 max-w-75">
                      <p className="truncate">{p.prompt}</p>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                         <Link
      href={`/all-prompts/${p._id}`}
      className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 transition"
    >
      <Eye size={16} />
      Details
    </Link>

                        {/* EDIT */}
                        <Link
                          href={`/dashboard/update-prompt/${p._id}`}
                          className="px-3 py-1 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                        >
                          Edit
                        </Link>

                     
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}