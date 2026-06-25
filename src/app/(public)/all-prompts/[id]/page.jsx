"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Bookmark,
  BookmarkCheck,
  Star,
  X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PromptDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // =========================
  // LOAD PROMPT
  // =========================
  useEffect(() => {
    if (!id) return;

    const loadPrompt = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/prompts/${id}`);
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

  // =========================
  // LOAD REVIEWS
  // =========================
  useEffect(() => {
    if (!id) return;

    const loadReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/api/reviews/${id}`);
        const data = await res.json();
        setReviews(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadReviews();
  }, [id]);

  // =========================
  // COPY PROMPT
  // =========================
  const handleCopy = async () => {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);

      await fetch(`${API_URL}/api/prompts/copy/${id}`, {
        method: "PATCH",
      });

      setPrompt((prev) => ({
        ...prev,
        copyCount: (prev.copyCount || 0) + 1,
      }));

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // BOOKMARK
  // =========================
  const handleBookmark = async () => {
    if (!session?.user?.email) return alert("Login required");

    try {
      setBookmarkLoading(true);

      const res = await fetch(`${API_URL}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptId: id,
          userEmail: session.user.email,
        }),
      });

      if (res.ok) setBookmarked(true);
    } catch (err) {
      console.error(err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  // =========================
  // SUBMIT REVIEW
  // =========================
  const handleSubmitReview = async () => {
    if (!session?.user?.email) return alert("Login required");

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptId: id,
          userEmail: session.user.email,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Review failed");

      const newReview = await res.json();
      setReviews([newReview, ...reviews]);

      setShowReviewModal(false);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // LOADING
  // =========================
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

      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

        {/* =========================
            THUMBNAIL
        ========================= */}
        {prompt.thumbnail && (
          <div className="relative w-full aspect-video">
            <Image
              src={prompt.thumbnail}
              alt={prompt.title || "prompt"}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-6">

          {/* =========================
              TITLE + BADGE
          ========================= */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">
              {prompt.title}
            </h1>

            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
              {prompt.difficulty}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400">
            {prompt.description}
          </p>

          {/* =========================
              FULL DETAILS GRID
          ========================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

            <Info label="Category" value={prompt.category} />
            <Info label="AI Tool" value={prompt.aiTool} />
            <Info label="Visibility" value={prompt.visibility} />
            <Info label="Copies" value={prompt.copyCount || 0} />
            <Info label="Creator" value={prompt.userEmail} />
            <Info label="Role" value={prompt.role} />

          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags?.map((t, i) => (
              <span key={i} className="bg-purple-600/40 px-3 py-1 rounded-full text-xs">
                {t}
              </span>
            ))}
          </div>

          {/* PROMPT CONTENT */}
          <div className="bg-black/40 p-4 rounded-xl whitespace-pre-wrap">
            {prompt.prompt}
          </div>

          {/* =========================
              ACTIONS
          ========================= */}
          <div className="grid sm:grid-cols-3 gap-3">

            <button
              onClick={handleCopy}
              className="bg-purple-600 py-2 rounded-xl"
            >
              {copied ? "Copied ✔" : "Copy"}
            </button>

            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className="bg-emerald-600 py-2 rounded-xl flex items-center justify-center gap-2"
            >
              {bookmarked ? (
                <BookmarkCheck />
              ) : (
                <Bookmark />
              )}
              Bookmark
            </button>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-yellow-600 py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <Star size={18} />
              Review
            </button>

          </div>

          {/* =========================
              REVIEWS LIST
          ========================= */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              Reviews
            </h3>

            {reviews.length === 0 ? (
              <p className="text-gray-400">
                No reviews yet
              </p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r._id}
                  className="border-b border-white/10 py-3"
                >
                  <div className="flex justify-between">
                    <span>{r.userEmail}</span>
                    <span>⭐ {r.rating}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {r.comment}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* =========================
          REVIEW MODAL
      ========================= */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-4">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Add Review</h2>
              <button onClick={() => setShowReviewModal(false)}>
                <X />
              </button>
            </div>

            {/* STARS */}
            <div className="flex gap-1">
              {[1,2,3,4,5].map((n) => (
                <Star
                  key={n}
                  onClick={() => setRating(n)}
                  className={`cursor-pointer ${
                    n <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* COMMENT */}
            <textarea
              className="w-full p-2 bg-black rounded"
              rows="4"
              placeholder="Write review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={handleSubmitReview}
              className="w-full bg-yellow-600 py-2 rounded-xl"
            >
              Submit Review
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   INFO COMPONENT
========================= */
function Info({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}