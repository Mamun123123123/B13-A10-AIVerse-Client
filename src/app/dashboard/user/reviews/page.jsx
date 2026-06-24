"use client";

const reviews = [
  {
    _id: 1,
    prompt: "Blog Generator",
    rating: 5,
    comment: "Excellent prompt",
  },
];

export default function ReviewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Reviews
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.prompt}</td>
              <td>{review.rating}/5</td>
              <td>{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}