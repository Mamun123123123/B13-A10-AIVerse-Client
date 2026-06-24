"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PromptDetailsPage() {
const { id } = useParams();

const [prompt, setPrompt] = useState(null);
const [loading, setLoading] = useState(true);
const [copied, setCopied] = useState(false);

// ✅ FIX: fetch inside useEffect (no callback, no warning)
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
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

loadPrompt();


}, [id]);

const handleCopy = async () => {
try {
await navigator.clipboard.writeText(prompt.prompt);


  setCopied(true);

  await fetch(
    `${API_URL}/api/prompts/copy/${id}`,
    {
      method: "PATCH",
    }
  );

  setPrompt((prev) => ({
    ...prev,
    copyCount: (prev.copyCount || 0) + 1,
  }));

  setTimeout(() => setCopied(false), 2000);
} catch (error) {
  console.error(error);
}


};

if (loading) {
return ( <div className="text-center py-20 text-white">
Loading... </div>
);
}

if (!prompt) {
return ( <div className="text-center py-20 text-red-500">
Prompt not found </div>
);
}

return ( <div className="max-w-5xl mx-auto px-4 py-10 text-white"> <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">


    {/* Thumbnail */}
    {prompt.thumbnail && (
      <Image
        src={prompt.thumbnail}
        alt={prompt.title}
        width={1200}
        height={500}
        className="w-full h-87.5 object-cover"
      />
    )}

    <div className="p-8">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">
          {prompt.title}
        </h1>

        <span className="px-3 py-1 rounded-full bg-purple-600 text-sm">
          {prompt.difficulty}
        </span>
      </div>

      <p className="text-gray-400 mb-6">
        {prompt.description}
      </p>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-gray-400">Category</p>
          <p>{prompt.category}</p>
        </div>

        <div>
          <p className="text-gray-400">AI Tool</p>
          <p>{prompt.aiTool}</p>
        </div>

        <div>
          <p className="text-gray-400">Visibility</p>
          <p>{prompt.visibility}</p>
        </div>

        <div>
          <p className="text-gray-400">Copies</p>
          <p>{prompt.copyCount || 0}</p>
        </div>

        <div>
          <p className="text-gray-400">Creator</p>
          <p>{prompt.userEmail}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">
          Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {prompt.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-purple-600 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">
          Prompt Content
        </h3>

        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 whitespace-pre-wrap">
          {prompt.prompt}
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-full py-3 rounded-xl bg-gray-800 from-purple-600 to-pink-600 font-semibold hover:opacity-90 transition"
      >
        {copied
          ? "✅ Copied Successfully"
          : "📋 Copy Prompt"}
      </button>
    </div>
  </div>
</div>

);
}
