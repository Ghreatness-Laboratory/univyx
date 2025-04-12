import { ArrowRight } from "phosphor-react";

export default function GamingHero() {
  return (
    <header
      data-testid="gaming-header"
      className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-purple-700 opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 rounded-full bg-indigo-600 opacity-20 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 md:w-48 md:h-48 rounded-full bg-fuchsia-600 opacity-15 blur-3xl"></div>

        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-700/40">
              <span className="text-xs md:text-sm font-medium text-purple-400">
                Level Up Your Game
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Unleash Your
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">
                Gaming Potential
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg">
              Compete in epic tournaments, form unbeatable squads, and rise
              through the ranks. The virtual battlefield awaits your skills and
              strategy!
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-default flex items-center gap-2">
                Start Your Journey
                <span className="ml-1">🎮</span>
              </button>
              <button className="flex gap-2 items-center px-6 py-3 border border-purple-500/50 bg-purple-900/20 text-purple-300 font-medium rounded-lg hover:bg-purple-800/30 transition-all duration-300 cursor-default">
                Browse Tournaments
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-2/5 lg:w-1/3 mt-8 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-50 transform -rotate-3"></div>

              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-purple-500/20 p-6 rounded-2xl shadow-xl transform rotate-3">
                <div className="text-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-pink-400 bg-pink-900/30 rounded-full">
                    TRENDING TOURNAMENT
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Cyber Legends Cup
                </h3>
                <div className="flex justify-between text-gray-300 text-sm mb-4">
                  <span>32 Teams</span>
                  <span>Prize: $10,000</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4"></div>
                </div>

                <div className="flex justify-between text-gray-400 text-xs mb-4">
                  <span>Registration</span>
                  <span className="text-pink-400 font-medium">75% Full</span>
                </div>

                <button className="w-full py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </header>
  );
}
