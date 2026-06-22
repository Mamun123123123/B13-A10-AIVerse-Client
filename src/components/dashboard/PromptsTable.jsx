"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PromptsTable() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/prompts");
      const data = await res.json();
      setPrompts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this prompt?");
    if (!ok) return;

    try {
      await fetch(`/api/prompts/${id}`, {
        method: "DELETE",
      });

      setPrompts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          My Prompts
        </h2>

        <button
          onClick={fetchData}
          className="text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          Refresh
        </button>
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[700px] text-left">
          {/* Head */}
          <thead className="bg-white/10 text-gray-300 text-sm">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Prompt</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-400"
                >
                  Loading prompts...
                </td>
              </tr>
            ) : prompts.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-10 text-center text-gray-400"
                >
                  No prompts found. Create your first prompt 🚀
                </td>
              </tr>
            ) : (
              prompts.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  {/* Title */}
                  <td className="p-4 font-medium text-white">
                    {p.title}
                  </td>

                  {/* Prompt */}
                  <td className="p-4 text-sm text-gray-400 max-w-[300px] truncate">
                    {p.prompt}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/update-prompt/${p._id}`}
                        className="px-3 py-1 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white"
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
  );
}