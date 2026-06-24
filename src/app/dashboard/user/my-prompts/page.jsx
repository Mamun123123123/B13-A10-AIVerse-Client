"use client";

const prompts = [
  {
    _id: 1,
    title: "Blog Generator",
    status: "pending",
    copyCount: 10,
  },
];

export default function MyPromptsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Prompts
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {prompts.map((prompt) => (
              <tr key={prompt._id}>
                <td>{prompt.title}</td>

                <td>{prompt.status}</td>

                <td>{prompt.copyCount}</td>

                <td className="space-x-2">
                  <button className="btn btn-sm">
                    Update
                  </button>

                  <button className="btn btn-sm btn-error">
                    Delete
                  </button>

                  <button className="btn btn-sm btn-info">
                    Analytics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}