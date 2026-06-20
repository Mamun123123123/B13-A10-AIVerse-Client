import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#050816] border-t border-purple-500/20 overflow-hidden">

      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


          <div>
            <h2 className="text-3xl font-bold text-white">
              AI<span className="text-purple-500">verse</span>
            </h2>

            <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed">
              Discover prompts and build production-ready AI solutions with ease.
            </p>

            {/* Social */}
            <div className="flex gap-5 mt-6 text-xl">
              <FaGithub className="text-gray-400 hover:text-white hover:scale-110 transition cursor-pointer" />
              <FaLinkedin className="text-gray-400 hover:text-blue-400 hover:scale-110 transition cursor-pointer" />
              <FaTwitter className="text-gray-400 hover:text-sky-400 hover:scale-110 transition cursor-pointer" />
            </div>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Platform
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              {["All Prompts", "Trending Prompts", "Login", "Register"].map(
                (item) => (
                  <li
                    key={item}
                    className="relative w-fit cursor-pointer group"
                  >
                    <span className="group-hover:text-purple-400 transition">
                      {item}
                    </span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </li>
                )
              )}
            </ul>
          </div>

        
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              {["Firebase Auth", "Stripe", "UI Components"].map((item) => (
                <li
                  key={item}
                  className="relative w-fit cursor-pointer group"
                >
                  <span className="group-hover:text-purple-400 transition">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Stay Updated
            </h3>

            <p className="text-gray-400 text-sm md:text-base mb-4">
              Get latest AI prompts and updates.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-[#0B1120] border border-purple-500/20 text-white outline-none focus:border-purple-500 transition"
              />

              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-14 border-t border-purple-500/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AIverse. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-purple-400 cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Support
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;