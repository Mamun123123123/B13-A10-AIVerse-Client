"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, BookmarkX } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SavedPromptsPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const loadBookmarks = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/bookmarks?email=${session.user.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await res.json();

        setBookmarks(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [session, status]);

  const handleRemoveBookmark = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this bookmark?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API_URL}/api/bookmarks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to remove bookmark");
      }

      setBookmarks((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to remove bookmark");
    }
  };

 
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Not Logged In
  if (!session) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Login Required
        </h2>

        <p className="text-gray-500">
          Please login to view your saved prompts.
        </p>
      </div>
    );
  }

  // Page Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Saved Prompts
        </h1>

        <p className="text-gray-500 mt-1">
          Your bookmarked prompts for quick access.
        </p>
      </div>

      {/* Empty State */}
      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <h3 className="text-xl font-semibold mb-2">
            No Saved Prompts
          </h3>

          <p className="text-gray-500">
            Bookmark prompts to access them later.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookmarks.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Thumbnail */}
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Thumbnail
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mb-5">
                  {item.category || "Uncategorized"}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={`/all-prompts/${item.promptId}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    <Eye size={16} />
                    Details
                  </Link>

                  <button
                    onClick={() =>
                      handleRemoveBookmark(item._id)
                    }
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    <BookmarkX size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}