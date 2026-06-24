"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllPromptsPage() {
const [prompts, setPrompts] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [difficulty, setDifficulty] = useState("All");

// ✅ FIX: fetch inside useEffect (no extra function -> no ESLint warning)
useEffect(() => {
const loadPrompts = async () => {
try {
setLoading(true);


    const res = await fetch(
      `${API_URL}/api/all-prompts`
    );

    const data = await res.json();

    setPrompts(data);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

loadPrompts();


}, []);

// ✅ FILTER optimized (no setState inside effect)
const filteredPrompts = useMemo(() => {
let result = [...prompts];


// Search filter
if (search) {
  result = result.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );
}

// Category filter
if (category !== "All") {
  result = result.filter(
    (item) => item.category === category
  );
}

// Difficulty filter
if (difficulty !== "All") {
  result = result.filter(
    (item) => item.difficulty === difficulty
  );
}

return result;

}, [search, category, difficulty, prompts]);

const categories = [
"All",
"Writing",
"Marketing",
"Coding",
"Business",
"Education",
];

return ( <div className="max-w-7xl mx-auto px-4 py-10 text-white"> <h1 className="text-4xl font-bold mb-8">
All Prompts </h1>


  {/* Filters */}
  <div className="grid md:grid-cols-3 gap-4 mb-8">
    <input
      type="text"
      placeholder="Search prompts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="p-3 rounded-xl bg-white/5 border border-white/10"
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-3 rounded-xl bg-white/5 border border-white/10"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="p-3 rounded-xl bg-white/5 border border-white/10"
    >
      <option value="All">All Difficulty</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Pro">Pro</option>
    </select>
  </div>

  {/* Loading */}
  {loading ? (
    <div className="text-center py-20">
      Loading prompts...
    </div>
  ) : filteredPrompts.length === 0 ? (
    <div className="text-center py-20 text-gray-400">
      No prompts found
    </div>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPrompts.map((prompt) => (
        <div
          key={prompt._id}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500 transition"
        >
          {/* Thumbnail */}
          {prompt.thumbnail && (
            <Image
              src={prompt.thumbnail}
              alt={prompt.title}
              width={600}
              height={300}
              className="w-full h-52 object-cover"
            />
          )}

          <div className="p-5">
            <h2 className="text-xl font-bold mb-2">
              {prompt.title}
            </h2>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {prompt.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-400 mb-5">
              <p>Category: {prompt.category}</p>
              <p>AI Tool: {prompt.aiTool}</p>
              <p>Difficulty: {prompt.difficulty}</p>
              <p>Copies: {prompt.copyCount || 0}</p>
            </div>

            <Link
              href={`/all-prompts/${prompt._id}`}
              className="block text-center py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


);
}
