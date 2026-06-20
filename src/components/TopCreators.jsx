const creators = [
  {
    id: 1,
    name: "PromptMaster",
    role: "Senior Engineer",
    image: "https://i.pravatar.cc/150?img=11",
    prompts: 42,
    copies: 1240,
  },
  {
    id: 2,
    name: "CreativeAI",
    role: "Art Director",
    image: "https://i.pravatar.cc/150?img=12",
    prompts: 28,
    copies: 980,
  },
  {
    id: 3,
    name: "GeminiWiz",
    role: "Writer & Marketer",
    image: "https://i.pravatar.cc/150?img=13",
    prompts: 35,
    copies: 850,
  },
];

const TopCreators = () => {
  return (
    <section className="py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-purple-500 uppercase text-sm">
          Showcase
        </p>

        <h2 className="text-center text-5xl font-bold text-white mb-3">
          Top Prompt Creators
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Engage with community leaders pioneering advanced prompt structures.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-[#0B1120] border border-purple-500/20 rounded-3xl p-8 text-center"
            >
              <img
                src={creator.image}
                alt=""
                className="w-24 h-24 rounded-full mx-auto border-4 border-purple-500"
              />

              <h3 className="text-white text-xl font-bold mt-5">
                {creator.name}
              </h3>

              <p className="text-gray-400">{creator.role}</p>

              <div className="border-t border-gray-700 my-6"></div>

              <div className="flex justify-center gap-10">
                <div>
                  <h4 className="text-white font-bold text-2xl">
                    {creator.prompts}
                  </h4>
                  <p className="text-gray-400 text-sm">PROMPTS</p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-2xl">
                    {creator.copies}
                  </h4>
                  <p className="text-gray-400 text-sm">COPIES</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;