"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPromptForm({ id }) {
  const router = useRouter();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    prompt: "",
  });

  const [loading, setLoading] = useState(false);

  // Load single prompt for edit
  useEffect(() => {
    if (!isEdit) return;

    const fetchPrompt = async () => {
      const res = await fetch(`/api/prompts/${id}`);
      const data = await res.json();

      setForm({
        title: data.title || "",
        description: data.description || "",
        prompt: data.prompt || "",
      });
    };

    fetchPrompt();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        isEdit ? `/api/prompts/${id}` : "/api/prompts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        router.push("/dashboard/my-prompts");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
      />

      <textarea
        name="prompt"
        value={form.prompt}
        onChange={handleChange}
        placeholder="Prompt"
        rows={6}
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        required
      />

      <button
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Prompt"
          : "Create Prompt"}
      </button>
    </form>
  );
}