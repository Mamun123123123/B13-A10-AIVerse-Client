import PromptsTable from "@/components/dashboard/PromptsTable";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        My Prompts
      </h1>

      <PromptsTable />
    </div>
  );
}