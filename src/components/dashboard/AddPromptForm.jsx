"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, AlignLeft, Pencil } from "lucide-react";

export default function AddPromptForm({ id }) {
  const router = useRouter();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    prompt: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const load = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/prompts/${id}`);
        const data = await res.json();

        setForm({
          title: data.title || "",
          description: data.description || "",
          prompt: data.prompt || "",
        });
      } catch {
        setError("Failed to load prompt");
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        isEdit ? `/api/prompts/${id}` : "/api/prompts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      router.push("/dashboard/my-prompts");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 mb-2">
          <Sparkles size={18} />
          <span className="text-sm uppercase tracking-wider">
            Prompt Studio
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {isEdit ? "Edit Prompt" : "Create New Prompt"}
        </h1>

        <p className="text-gray-400 mt-1">
          Build high-quality AI prompts for your collection
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl p-6 space-y-5"
      >
        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <Pencil size={14} /> Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. AI Blog Writer Prompt"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <AlignLeft size={14} /> Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short explanation of your prompt..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition resize-none"
          />
        </div>

        {/* Prompt */}
        <div>
          <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <FileText size={14} /> Prompt Content
          </label>

          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Write your AI prompt here..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition resize-none"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:opacity-90"
          } text-white`}
        >
          <Sparkles size={16} />
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Prompt"
            : "Create Prompt"}
        </button>
      </form>
    </div>
  );
}