"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, BookmarkX } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SavedPromptsPage() {
  const { data: session, status } = useSession();

  const [bookmarks, setBookmarks] = useState([]);

  const isLoading = status === "loading";
  const email = session?.user?.email;

  useEffect(() => {
    if (isLoading) return;
    if (!email) return;

    const loadBookmarks = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/bookmarks?email=${email}`
        );

        const data = await res.json();
        setBookmarks(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadBookmarks();
  }, [isLoading, email]);

  const handleRemoveBookmark = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      setBookmarks((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        Login Required
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Saved Prompts</h1>

      {bookmarks.length === 0 ? (
        <div className="bg-white p-10 text-center shadow rounded-2xl">
          No Saved Prompts
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookmarks.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border shadow-md"
            >
              <div className="relative w-full h-48">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    No Thumbnail
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/all-prompts/${item.promptId}`}
                    className="px-3 py-2 bg-emerald-600 text-white rounded"
                  >
                    <Eye size={16} />
                  </Link>

                  <button
                    onClick={() =>
                      handleRemoveBookmark(item._id)
                    }
                    className="px-3 py-2 bg-red-600 text-white rounded"
                  >
                    <BookmarkX size={16} />
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