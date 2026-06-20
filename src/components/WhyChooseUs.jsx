const features = [
  {
    title: "Premium Prompts",
    desc: "Thousands of expert-crafted prompts.",
    icon: "💎",
  },
  {
    title: "AI Productivity",
    desc: "Save hours with ready solutions.",
    icon: "⚡",
  },
  {
    title: "Community Driven",
    desc: "Learn from top prompt engineers.",
    icon: "🤝",
  },
  {
    title: "Automation",
    desc: "Scale your workflow faster.",
    icon: "🚀",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-[#050816] relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
          Why Choose Us
        </h2>

        <p className="text-center text-gray-400 mb-10 md:mb-14 text-sm md:text-base max-w-2xl mx-auto">
          Everything you need to supercharge your AI workflow in one place.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

          {features.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#0B1120] p-6 md:p-8 rounded-xl md:rounded-2xl border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              
              {/* Icon */}
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-white text-lg md:text-xl font-bold mb-3">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>

              {/* Bottom Accent */}
              <div className="mt-5 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;