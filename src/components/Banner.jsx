const Banner = () => {
  const tags = [
    "SEO Optimize",
    "React Component",
    "Copywriter",
    "Midjourney V6",
    "Gemini Helper",
    "Claude Architect",
  ];

  return (
    <section className="bg-[#050816] min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full text-center">

    
        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-6 text-sm md:text-base">
          ✨ The Ultimate Prompt Hub
        </div>

    
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Unlock the True Potential of
          <br />
          <span className="text-purple-500">Generative AI</span>
        </h1>

        <p className="text-gray-400 mt-6 text-base md:text-lg max-w-3xl mx-auto px-2">
          Discover, bookmark and run engineering-grade prompts for ChatGPT,
          Gemini, Claude and more. Boost your productivity and creativity.
        </p>

        <div className="mt-10 flex flex-col md:flex-row bg-[#10172A] rounded-2xl overflow-hidden border border-purple-500/20">
          <input
            type="text"
            placeholder="Search by title, tag or AI tool..."
            className="flex-1 px-5 py-4 md:py-5 bg-transparent text-white outline-none"
          />

          <button className="bg-purple-600 hover:bg-purple-700 px-6 md:px-8 py-4 md:py-5 text-white font-semibold">
            Explore
          </button>
        </div>

        
        <div className="mt-8">
          <p className="text-gray-400 mb-4 text-sm md:text-base">
            Trending:
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 md:px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-xs md:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold">
            Explore All Prompts →
          </button>

          <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-600 text-white">
            Become a Creator
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;