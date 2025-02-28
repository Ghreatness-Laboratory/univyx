import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { universityNews } from "../../../../data/entertainment/news";
import NewsCard from "./NewsCard";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Environment",
    "Campus",
    "Sports",
    "Academics",
    "Research",
  ];

  const filteredNews =
    activeCategory === "All"
      ? universityNews
      : universityNews.filter((news) => news.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Curated University News
          </h2>
          <p className="text-gray-600 max-w-xl">
            Stay updated with the latest happening around campus, curated by our
            editorial team
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex flex-wrap items-end gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.slice(0, 3).map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      <div className=" p-4 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Trending Now</h3>

        <div className="flex space-x-6 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {filteredNews.map((news) => (
            <div key={news.id} className="min-w-[300px] max-w-[300px]">
              <NewsCard news={news} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors inline-flex items-center">
          See all university news <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </section>
  );
}
