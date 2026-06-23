"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Sparkles, FileText, AlignLeft, Pencil } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function AddPromptForm({ id }) {
  const router = useRouter();
  const isEdit = Boolean(id);
  const { data: session } = useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    prompt: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  // =========================
  // LOAD SINGLE PROMPT (EDIT)
  // =========================
  useEffect(() => {
    if (!isEdit) return;

    const load = async () => {
      try {
        setFetching(true);

        const res = await fetch(`${API_URL}/api/prompts/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Fetch failed");

        setForm({
          title: data.title || "",
          description: data.description || "",
          prompt: data.prompt || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [id, isEdit]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SUBMIT (CREATE / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!session?.user?.email) {
        throw new Error("User not logged in");
      }

      const payload = {
        ...form,
        userEmail: session.user.email, // 🔥 IMPORTANT FIX
      };

      const res = await fetch(
        isEdit
          ? `${API_URL}/api/prompts/${id}`
          : `${API_URL}/api/prompts`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      router.push("/dashboard/my-prompts");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (fetching) {
    return (
      <div className="p-6 text-gray-400 border rounded-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-white">
        {isEdit ? "Edit Prompt" : "Create Prompt"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="p-3 bg-red-500/20 text-red-400 rounded-xl">
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
            required
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
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
            rows={3}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Prompt */}
        <div>
          <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <FileText size={14} /> Prompt
          </label>

          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            rows={6}
            required
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold"
        >
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