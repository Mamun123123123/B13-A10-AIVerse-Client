const tools = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Midjourney",
  "DeepSeek",
  "Copilot",
];

const AiTools = () => {
  return (
    <section className="py-16 md:py-24 bg-[#050816] relative">

      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative">

    
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
          Supported AI Tools
        </h2>

        <p className="text-center text-gray-400 mb-10 md:mb-14 text-sm md:text-base max-w-2xl mx-auto">
          Works seamlessly with the most powerful AI platforms in the world.
        </p>

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">

          {tools.map((tool) => (
            <div
              key={tool}
              className="group bg-[#0B1120] border border-purple-500/20 rounded-xl md:rounded-2xl p-5 md:p-8 text-center transition-all duration-300 hover:border-purple-500/60 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]"
            >
         
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm md:text-lg font-bold group-hover:scale-110 transition">
                AI
              </div>

           
              <h3 className="text-sm md:text-lg text-white font-semibold group-hover:text-purple-400 transition">
                {tool}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AiTools;