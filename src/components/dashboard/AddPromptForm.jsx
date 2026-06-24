"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  FileText,
  AlignLeft,
  Pencil,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = "http://localhost:5000";

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

  // =========================
  // LOAD SINGLE PROMPT
  // =========================
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
          tags: Array.isArray(data.tags)
            ? data.tags.join(", ")
            : "",
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

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
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
        throw new Error(data.error || "Failed");
      }

      router.push("/dashboard/my-prompts");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-gray-400 p-6">
        Loading prompt...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">
        {isEdit ? "Edit Prompt" : "Create Prompt"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <Pencil size={16} />
            Prompt Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <AlignLeft size={16} />
            Prompt Description
          </label>

          <textarea
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Prompt Content */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <FileText size={16} />
            Prompt Content
          </label>

          <textarea
            rows={8}
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-300 mb-2 block">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          >
            <option value="">Select Category</option>
            <option value="Content Writing">
              Content Writing
            </option>
            <option value="Programming">
              Programming
            </option>
            <option value="Marketing">
              Marketing
            </option>
            <option value="Education">
              Education
            </option>
            <option value="Business">
              Business
            </option>
          </select>
        </div>

        {/* AI Tool */}
        <div>
          <label className="text-gray-300 mb-2 block">
            AI Tool
          </label>

          <select
            name="aiTool"
            value={form.aiTool}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          >
            <option value="">Select Tool</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Claude">Claude</option>
            <option value="Gemini">Gemini</option>
            <option value="Copilot">GitHub Copilot</option>
            <option value="Midjourney">Midjourney</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <Tag size={16} />
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="seo, blog, marketing"
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-gray-300 mb-2 block">
            Difficulty Level
          </label>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          >
            <option value="Beginner">
              Beginner
            </option>
            <option value="Intermediate">
              Intermediate
            </option>
            <option value="Pro">
              Pro
            </option>
          </select>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <ImageIcon size={16} />
            Thumbnail URL
          </label>

          <input
            type="text"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://image-url.com/image.jpg"
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="text-gray-300 mb-2 block">
            Visibility
          </label>

          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
          >
            <option value="Public">
              Public
            </option>
            <option value="Private">
              Private
            </option>
          </select>
        </div>

        <button
          disabled={loading}
          type="submit"
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