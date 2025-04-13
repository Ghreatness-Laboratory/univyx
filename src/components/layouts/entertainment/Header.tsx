import { Play } from "phosphor-react";

export default function EntertainmentHero() {
  return (
    <header
      data-testid="entertainment-header"
      className="w-full relative py-16 lg:py-20 px-6 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-fuchsia-900 opacity-95 z-0"></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRNNiA0YzAtMi4yMDktMS43OTEtNC00LTRTLTIgMS43OTEtMiA0czEuNzkxIDQgNCA0IDQtMS43OTEgNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 z-0"></div>

      <div className="absolute top-0 right-0 w-full h-full bg-radial-gradient from-purple-400/10 via-transparent to-transparent opacity-70 z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                Campus Life Reimagined
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Entertainment <span className="text-pink-300">Redefined</span>
            </h1>

            <p className="text-lg text-purple-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover the pulse of campus - from live concerts to movie nights,
              art exhibits to comedy shows, all in one place.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300">
                Browse Events
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300">
                <Play weight="fill" className="size-4 text-pink-400" />
                Explore now
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 text-purple-200 text-sm">
              <span>Popular events:</span>
              <div className="flex flex-wrap gap-2">
                {["News", "Articles", "Events", "Topics"].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-5/12 relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative h-36 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <span className="px-2 py-1 bg-white/30 backdrop-blur-sm text-white text-xs rounded-full">
                    Featured
                  </span>
                  <h3 className="text-white text-xl font-bold mt-2">
                    Spring Music Festival
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1 text-purple-100">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Live Tonight
                  </span>
                  <span className="text-white text-sm">7:00 PM</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-purple-100 text-sm">
                    Campus Auditorium
                  </span>
                  <button className="px-3 py-1 bg-pink-500 text-white text-xs rounded-lg">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-44 h-28 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transform -rotate-6 shadow-lg z-0"></div>
            <div className="absolute -top-4 -right-4 w-44 h-28 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transform rotate-12 shadow-lg z-0"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
    </header>
  );
}
