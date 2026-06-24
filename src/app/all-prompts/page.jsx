"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/all-prompts?search=${search}&category=${category}&difficulty=${difficulty}&sort=${sort}`
        );

        const data = await res.json();
        setPrompts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 300);
    return () => clearTimeout(delay);
  }, [search, category, difficulty, sort]);

  return (
    <div className="min-h-screen bg-gray-700 from-black via-gray-950 to-black text-white px-4 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          All Prompts 🚀
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Discover powerful AI prompts from the community
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prompts..."
          className="p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-xl  border bg-black border-white/10"
        >
          <option>All</option>
          <option>Writing</option>
          <option>Marketing</option>
          <option>Coding</option>
          <option>Business</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-3 rounded-xl bg-black border border-white/10"
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Pro</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-3 rounded-xl bg-black border border-white/10"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="copied">Most Copied</option>
        </select>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading prompts...
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No prompts found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {prompts.map((p) => (
              <div
                key={p._id}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500 hover:scale-[1.02] transition duration-300 shadow-lg"
              >

                {/* IMAGE */}
                {p.thumbnail && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5">

                  <h2 className="text-lg font-bold mb-2 line-clamp-1">
                    {p.title}
                  </h2>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {p.description}
                  </p>

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <span className="px-2 py-1 rounded-full bg-purple-600/30 text-purple-300">
                      {p.category}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-blue-600/30 text-blue-300">
                      {p.aiTool}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-green-600/30 text-green-300">
                      🔥 {p.copyCount || 0}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/all-prompts/${p._id}`}
                    className="block text-center py-2 rounded-xl bg-purple-500 from-purple-600 to-pink-600 hover:opacity-90 transition font-medium"
                  >
                    View Details →
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}