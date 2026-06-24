import AddPromptForm from "@/components/dashboard/AddPromptForm";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Add New Prompt
      </h1>

      <AddPromptForm />
    </div>
  );
}