"use client";

import { useState } from "react";

export default function AddPromptPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promptContent: "",
    category: "",
    aiTool: "",
    tags: "",
    difficulty: "Beginner",
    visibility: "Public",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promptData = {
      ...formData,
      copyCount: 0,
      status: "pending",
      createdAt: new Date(),
    };

    console.log(promptData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add Prompt
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="input input-bordered w-full"
          placeholder="Prompt Title"
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Prompt Description"
        />

        <textarea
          className="textarea textarea-bordered w-full h-40"
          placeholder="Prompt Content"
        />

        <input
          className="input input-bordered w-full"
          placeholder="Category"
        />

        <input
          className="input input-bordered w-full"
          placeholder="AI Tool"
        />

        <input
          className="input input-bordered w-full"
          placeholder="Tags"
        />

        <select className="select select-bordered w-full">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Pro</option>
        </select>

        <input
          type="file"
          className="file-input file-input-bordered w-full"
        />

        <select className="select select-bordered w-full">
          <option>Public</option>
          <option>Private</option>
        </select>

        <button className="btn btn-primary">
          Submit Prompt
        </button>
      </form>
    </div>
  );
}