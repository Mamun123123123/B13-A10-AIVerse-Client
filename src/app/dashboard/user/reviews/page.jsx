"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function MyReviewsPage() {
  const { data: session, isPending } = useSession();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/reviews?email=${session.user.email}`
        );

        const data = await res.json();

        setReviews(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          My Reviews ⭐
        </h1>

        <p className="text-gray-400 mb-8">
          All reviews you submitted for prompts
        </p>

        {/* EMPTY STATE */}
        {reviews.length === 0 ? (
          <div className="text-center py-20 text-gray-400 bg-white/5 border border-white/10 rounded-2xl">
            You have not written any reviews yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500 transition"
              >
                {/* PROMPT TITLE */}
                <h2 className="text-lg font-bold mb-1">
                  {r.promptTitle || "Prompt Review"}
                </h2>

                {/* STARS */}
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((n) => (
                    <Star
                      key={n}
                      size={16}
                      className={
                        n <= r.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>

                {/* COMMENT */}
                <p className="text-gray-300 text-sm mb-3">
                  {r.comment}
                </p>

                {/* META */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{r.userEmail}</span>
                  <span>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}