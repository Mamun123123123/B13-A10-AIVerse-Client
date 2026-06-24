"use client";

const bookmarks = [
  {
    _id: 1,
    title: "SEO Blog Generator",
    category: "Writing",
  },
];

export default function SavedPromptsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Saved Prompts
      </h1>

      <div className="grid md:grid-cols-2 gap-5">
        {bookmarks.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow"
          >
            <div className="card-body">
              <h2 className="card-title">
                {item.title}
              </h2>

              <p>{item.category}</p>

              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm">
                  View Details
                </button>

                <button className="btn btn-error btn-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}