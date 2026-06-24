"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PromptDetailsPage() {
  const { id } = useParams();

  const { data: session } = useSession();

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] =
    useState(false);

  useEffect(() => {
    if (!id) return;

    const loadPrompt = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/prompts/${id}`
        );

        const data = await res.json();

        setPrompt(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPrompt();
  }, [id]);

  useEffect(() => {
    if (!id || !session?.user?.email) return;

    const checkBookmark = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/bookmarks/check?promptId=${id}&email=${session.user.email}`
        );

        const data = await res.json();

        setBookmarked(data.bookmarked);
      } catch (error) {
        console.error(error);
      }
    };

    checkBookmark();
  }, [id, session]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        prompt.prompt
      );

      setCopied(true);

      await fetch(
        `${API_URL}/api/prompts/copy/${id}`,
        {
          method: "PATCH",
        }
      );

      setPrompt((prev) => ({
        ...prev,
        copyCount:
          (prev.copyCount || 0) + 1,
      }));

      setTimeout(
        () => setCopied(false),
        2000
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    if (!session?.user?.email) {
      alert(
        "Please login to save bookmarks"
      );
      return;
    }

    try {
      setBookmarkLoading(true);

      const res = await fetch(
        `${API_URL}/api/bookmarks`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            promptId: prompt._id,
            userEmail:
              session.user.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Bookmark failed"
        );
      }

      setBookmarked(true);
    } catch (error) {
      console.error(error);
      alert(
        error.message ||
          "Failed to bookmark"
      );
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Prompt not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl">

        {/* Thumbnail */}
        {prompt.thumbnail && (
          <div className="relative w-full aspect-video">
            <Image
              src={prompt.thumbnail}
              alt={prompt.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-5 sm:p-8">

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
              {prompt.title}
            </h1>

            <span className="w-fit px-3 py-1 rounded-full bg-purple-600 text-xs sm:text-sm">
              {prompt.difficulty}
            </span>
          </div>

          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            {prompt.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
            <Info
              label="Category"
              value={prompt.category}
            />

            <Info
              label="AI Tool"
              value={prompt.aiTool}
            />

            <Info
              label="Visibility"
              value={prompt.visibility}
            />

            <Info
              label="Copies"
              value={
                prompt.copyCount || 0
              }
            />

            <Info
              label="Creator"
              value={prompt.userEmail}
            />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2">
              Tags
            </h3>

            <div className="flex flex-wrap gap-2">
              {prompt.tags?.map(
                (tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-purple-600/70"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Prompt Content */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2">
              Prompt Content
            </h3>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 whitespace-pre-wrap text-sm sm:text-base">
              {prompt.prompt}
            </div>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="py-3 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition"
            >
              {copied
                ? "✅ Copied Successfully"
                : "📋 Copy Prompt"}
            </button>

            <button
              onClick={handleBookmark}
              disabled={
                bookmarked ||
                bookmarkLoading
              }
              className={`py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                bookmarked
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck
                    size={18}
                  />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark size={18} />
                  {bookmarkLoading
                    ? "Saving..."
                    : "Save Bookmark"}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
      <p className="text-gray-400 text-xs">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}