import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Sarah Connor",
    role: "Content Strategist",
    review:
      "AIverse completely changed how I interact with Claude. The prompts are highly refined.",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Software Engineer",
    review:
      "I found an incredible prompt that debugs React code and writes unit tests.",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Digital Artist",
    review:
      "The Midjourney prompts here are pure gold. Highly recommend.",
    image: "https://i.pravatar.cc/150?img=17",
  },
];

const Reviews = () => {
  return (
    <section className="py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4">

        <p className="text-center text-purple-500 uppercase">
          Testimonials
        </p>

        <h2 className="text-center text-5xl font-bold text-white mb-12">
          What Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#0B1120] border border-purple-500/20 rounded-2xl p-8"
            >
              <div className="text-yellow-400 text-xl mb-5">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-relaxed">
                {review.review}
              </p>

              <div className="border-t border-gray-700 my-6"></div>

              <div className="flex items-center gap-4">
                <Image
                  src={review.image}
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt={review.name}
                />

                <div>
                  <h4 className="text-white font-semibold">
                    {review.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;