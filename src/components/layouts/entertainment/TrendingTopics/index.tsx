import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trendingTopics } from "../../../../data/entertainment/trendingTopics";
import TopicCard from "./TrendingTopicsCard";

interface TopicTitleProps {
  topic: string;
  description: string;
  tags: string;
}
export default function TrendingTopics() {
  const { register, handleSubmit, reset } = useForm<TopicTitleProps>();
  const [activeTab, setActiveTab] = useState<string>("all");

  const onSubmit = (data: TopicTitleProps) => {
    console.log(data);
    reset();
  };

  const tabs = [
    { id: "all", name: "All Topics" },
    { id: "academic", name: "Academic" },
    { id: "campus", name: "Campus Life" },
    { id: "career", name: "Career" },
    { id: "social", name: "Social" },
  ];

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Trending Topics
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Join the conversation on what's buzzing across campus right now
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-teal-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Weekly Hot Take
        </h3>
        <div className="p-4 md:p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white">
          <h4 className="text-2xl font-bold mb-4">
            "Online Classes Should Be an Option Post-Pandemic"
          </h4>
          <p className="mb-4 ">
            With 78% of students reporting better work-life balance with hybrid
            learning options, should our university make online attendance a
            permanent option for lecture-based courses?
          </p>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-teal-500">
                <ChevronUp size={16} />
              </div>
              <span className="font-bold">67%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-teal-500">
                <ChevronDown size={16} />
              </div>
              <span className="font-bold">33%</span>
            </div>
            <div className="text-white/80 text-sm">1,258 votes</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium">
              I agree with this
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium">
              I disagree with this
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Start a New Discussion
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Topic Title
            </label>
            <input
              id="topic"
              {...register("topic", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="What would you like to discuss?"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Add some context to your topic..."
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma separated)
            </label>
            <input
              id="tags"
              {...register("tags")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g. campus, dining, social"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
            >
              Post Discussion
            </button>
          </div>
        </form>
      </div>

      <div className="text-center">
        <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors inline-flex items-center">
          See all trending topics <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </section>
  );
}
