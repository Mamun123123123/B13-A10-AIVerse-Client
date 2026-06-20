import Image from "next/image";

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
    <section className="py-16 md:py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4">

        
        <p className="text-center text-purple-500 uppercase text-sm">
          Showcase
        </p>

        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Top Prompt Creators
        </h2>

        <p className="text-center text-gray-400 mb-10 md:mb-12 text-sm md:text-base">
          Engage with community leaders pioneering advanced prompt structures.
        </p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-[#0B1120] border border-purple-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:scale-[1.02] transition"
            >

              <div className="flex justify-center">
                <Image
                  src={creator.image}
                  alt={creator.name}
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-purple-500 object-cover"
                />
              </div>

              <h3 className="text-white text-lg md:text-xl font-bold mt-5">
                {creator.name}
              </h3>

              <p className="text-gray-400 text-sm md:text-base">
                {creator.role}
              </p>

              <div className="border-t border-gray-700 my-6"></div>

              <div className="flex justify-center gap-10">
                <div>
                  <h4 className="text-white font-bold text-xl md:text-2xl">
                    {creator.prompts}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm">PROMPTS</p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-xl md:text-2xl">
                    {creator.copies}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm">COPIES</p>
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