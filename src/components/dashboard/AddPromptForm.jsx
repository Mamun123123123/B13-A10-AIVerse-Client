"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

import {
  FileText,
  AlignLeft,
  Pencil,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddPromptForm({ id }) {
  const router = useRouter();
  const isEdit = Boolean(id);
  const { data: session } = useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    prompt: "",
    category: "",
    aiTool: "",
    tags: "",
    difficulty: "Beginner",
    visibility: "Public",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (!isEdit) return;

    const loadPrompt = async () => {
      try {
        const res = await fetch(`${API_URL}/api/prompts/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch prompt");
        }

        setForm({
          title: data.title || "",
          description: data.description || "",
          prompt: data.prompt || "",
          category: data.category || "",
          aiTool: data.aiTool || "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          difficulty: data.difficulty || "Beginner",
          visibility: data.visibility || "Public",
          thumbnail: data.thumbnail || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    loadPrompt();
  }, [id, isEdit]);


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!session?.user?.email) {
        throw new Error("Please login first");
      }

      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        userEmail: session.user.email,

        copyCount: 0,
        status: "pending",
      };

      const res = await fetch(
        isEdit ? `${API_URL}/api/prompts/${id}` : `${API_URL}/api/prompts`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      if (session?.user?.role === "creator") {
  router.push("/dashboard/creator/my-prompts");
} else {
  router.push("/dashboard/user/my-prompts");
}
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-gray-400 p-6">Loading prompt...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 from-slate-950 via-purple-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4">
            ✨ AI Prompt Marketplace
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {isEdit ? "Edit Prompt" : "Create New Prompt"}
          </h1>

          <p className="text-gray-400 text-lg">
            Share your best AI prompts with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-3 font-medium">
                <Pencil size={18} />
                Prompt Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter prompt title..."
                className="w-full h-14 px-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-3 font-medium">
                <AlignLeft size={18} />
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your prompt..."
                className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-3 font-medium">
                <FileText size={18} />
                Prompt Content
              </label>

              <textarea
                rows={10}
                name="prompt"
                value={form.prompt}
                onChange={handleChange}
                required
                placeholder="Write your AI prompt..."
                className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-3">Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full h-14 px-4 rounded-2xl bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  <option>Content Writing</option>
                  <option>Programming</option>
                  <option>Marketing</option>
                  <option>Education</option>
                  <option>Business</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-3">AI Tool</label>

                <select
                  name="aiTool"
                  value={form.aiTool}
                  onChange={handleChange}
                  className="w-full h-14 px-4 rounded-2xl bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Tool</option>
                  <option>ChatGPT</option>
                  <option>Claude</option>
                  <option>Gemini</option>
                  <option>GitHub Copilot</option>
                  <option>Midjourney</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-3">Difficulty</label>

                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full h-14 px-4 rounded-2xl bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Pro</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-3">Visibility</label>

                <select
                  name="visibility"
                  value={form.visibility}
                  onChange={handleChange}
                  className="w-full h-14 px-4 rounded-2xl bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-3">
                <Tag size={18} />
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="seo, marketing, blog"
                className="w-full h-14 px-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-3">
                <ImageIcon size={18} />
                Thumbnail URL
              </label>

              <input
                type="text"
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full h-14 px-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Preview */}
            {form.thumbnail && (
              <div className="rounded-2xl overflow-hidden border border-white/10 relative h-64">
                <Image
                  src={form.thumbnail}
                  alt="preview"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className="w-full h-14 rounded-2xl bg-purple-500 from-purple-600 via-violet-600 to-pink-500 hover:scale-[1.02] transition-all duration-300 font-semibold text-white shadow-lg shadow-purple-500/25"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "🚀 Update Prompt"
                  : "✨ Create Prompt"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
