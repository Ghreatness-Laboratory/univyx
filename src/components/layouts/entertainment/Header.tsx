import { ArrowRight } from "phosphor-react";

export default function Header() {
  return (
    <header
      data-testid="entertainment-header"
      className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:pt-[100px] pb-20 px-6 lg:px-0 relative overflow-hidden"
    >
      <div className="absolute bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 opacity-10 z-0"></div>

      <div className="relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-500">
            Campus Entertainment Hub
          </h1>
          <p className="text-base md:text-xl text-secondary mb-8">
            Your one-stop destination for everything happening on and around
            campus. Stay in the loop with campus events, activities, and
            trending spots.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 md:px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              What's Happening Today?
            </button>
            <button className="flex gap-2 items-center px-4 md:px-6 py-3 border border-purple-400 text-purple-600 shadow-sm font-medium rounded-lg hover:bg-purple-50 transition-all duration-300">
              Explore now
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
