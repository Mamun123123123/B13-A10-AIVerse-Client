"use client";

import AddPromptForm from "@/components/AddPromptForm";
import { useParams } from "next/navigation";

export default function EditPromptPage() {
  const params = useParams();

  return (
    <div className="p-6">
      <AddPromptForm id={params.id} />
    </div>
  );
}