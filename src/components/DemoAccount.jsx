const accounts = [
  {
    role: "ADMIN USER",
    email: "admin@aiverse.com",
    password: "123456",
    color: "border-purple-500",
  },
  {
    role: "CREATOR USER",
    email: "creator@aiverse.com",
    password: "123456",
    color: "border-cyan-500",
  },
  {
    role: "STANDARD USER",
    email: "user@aiverse.com",
    password: "123456",
    color: "border-green-500",
  },
];

const DemoAccounts = () => {
  return (
    <section className="py-16 md:py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4">


        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Demo Accounts
        </h2>

        <p className="text-center text-gray-400 mb-10 md:mb-12 text-sm md:text-base">
          Explore AIverse from different user perspectives.
        </p>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {accounts.map((account, idx) => (
            <div
              key={idx}
              className={`bg-[#0B1120] rounded-2xl md:rounded-3xl border ${account.color} p-5 md:p-8 hover:scale-[1.02] transition-transform duration-300`}
            >

              <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-[10px] md:text-xs">
                {account.role}
              </span>

              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <input
                  readOnly
                  value={account.email}
                  className="w-full bg-[#111827] p-3 rounded-lg md:rounded-xl text-gray-300 text-sm md:text-base outline-none"
                />

                <input
                  readOnly
                  value={account.password}
                  className="w-full bg-[#111827] p-3 rounded-lg md:rounded-xl text-gray-300 text-sm md:text-base outline-none"
                />
              </div>

             
              <button className="w-full mt-5 md:mt-6 bg-gray-800 from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-3 rounded-lg md:rounded-xl text-white font-medium transition">
                Go To Login →
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default DemoAccounts;