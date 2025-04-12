import { ChevronDown, ChevronRight, ChevronUp, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { trendingTopics } from "../../../../data/entertainment/trendingTopics";
import TopicCard from "./TrendingTopicsCard";

interface TopicFormData {
  topic: string;
  tags: string;
  image?: FileList;
}

export default function TrendingTopics() {
  // const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [agreeCount, setAgreeCount] = useState<number>(840);
  const [disagreeCount, setDisagreeCount] = useState<number>(418);
  const [userVote, setUserVote] = useState<"agree" | "disagree" | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TopicFormData>({
    defaultValues: {
      topic: "",
      tags: "",
    },
  });

  const onSubmit = (data: TopicFormData) => {
    console.log(data);
    navigate("?auth=login");

    // setFormSubmitted(true);

    reset();
    setImagePreview(null);
    setImageError(null);

    // setTimeout(() => {
    //   setFormSubmitted(false);
    // }, 3000);
  };

  const handleVote = (vote: "agree" | "disagree") => {
    if (userVote === vote) return;

    if (vote === "agree") {
      setAgreeCount((prev) => prev + 1);
      if (userVote === "disagree") setDisagreeCount((prev) => prev - 1);
    } else {
      setDisagreeCount((prev) => prev + 1);
      if (userVote === "agree") setAgreeCount((prev) => prev - 1);
    }

    setUserVote(vote);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size must be less than 5MB");
        setImagePreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
    setImageError(null);
  };

  const totalVotes = agreeCount + disagreeCount;
  const agreePercentage =
    totalVotes > 0 ? ((agreeCount / totalVotes) * 100).toFixed(0) : 0;
  const disagreePercentage =
    totalVotes > 0 ? ((disagreeCount / totalVotes) * 100).toFixed(0) : 0;

  const tabs = [
    { id: "all", name: "All Topics" },
    { id: "academic", name: "Academic" },
    { id: "campus", name: "Campus Life" },
    { id: "career", name: "Career" },
    { id: "social", name: "Social" },
  ];

  const filteredTopics =
    activeTab === "all"
      ? trendingTopics
      : trendingTopics.filter((topic) => topic.category === activeTab);

  const imageRegister = register("image");

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold">
            Trending Topics
          </h2>
          <p className="text-secondary text-lg mt-2">
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
        {filteredTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Weekly Hot Take
        </h3>
        <div className="px-4 py-6 md:p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white">
          <h4 className="text-2xl font-bold mb-4">
            "Online Classes Should Be an Option Post-Pandemic"
          </h4>
          <p className="mb-4">
            With 78% of students reporting better work-life balance with hybrid
            learning options, should our university make online attendance a
            permanent option for lecture-based courses?
          </p>
          <div className="flex max-md:flex-col md:items-center gap-3 md:gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-teal-500">
                  <ChevronUp size={16} />
                </div>
                <span className="font-bold">{agreePercentage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-teal-500">
                  <ChevronDown size={16} />
                </div>
                <span className="font-bold">{disagreePercentage}%</span>
              </div>
            </div>
            <div className="text-white/90">{totalVotes} votes</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleVote("agree")}
              disabled={userVote === "agree"}
              className={`px-4 py-2 rounded-lg transition-all font-medium shadow-md ${
                userVote === "agree"
                  ? "bg-teal-600 text-white translate-y-[2px] shadow-none opacity-80 cursor-not-allowed"
                  : "bg-white text-teal-600 hover:bg-teal-50 active:translate-y-[2px] active:shadow-none"
              }`}
            >
              I agree with this
            </button>

            <button
              onClick={() => handleVote("disagree")}
              disabled={userVote === "disagree"}
              className={`px-4 py-2 rounded-lg transition-all font-medium shadow-md ${
                userVote === "disagree"
                  ? "bg-teal-600 text-white translate-y-[2px] shadow-none opacity-80 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30 active:translate-y-[2px] active:shadow-none"
              }`}
            >
              I disagree with this
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Start a New Discussion
        </h3>
        {/* {formSubmitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
            Your discussion topic has been submitted successfully!
          </div>
        )} */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Topic Title <span className="text-red-500">*</span>
            </label>
            <input
              id="topic"
              className={`w-full px-4 py-2 border ${
                errors.topic
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
              placeholder="What would you like to discuss?"
              {...register("topic", {
                required: "Topic title is required",
              })}
            />
            {errors.topic && (
              <p className="text-red-500 text-sm mt-1">
                {errors.topic.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Image (optional)
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              name={imageRegister.name}
              onBlur={imageRegister.onBlur}
              onChange={(e) => {
                imageRegister.onChange(e);
                handleImageChange(e);
              }}
            />

            {!imagePreview ? (
              <div
                onClick={handleSelectImageClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-500 transition-colors"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload an image (5MB max)
                </p>
              </div>
            ) : (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              id="tags"
              className={`w-full px-4 py-2 border ${
                errors.tags
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
              placeholder="e.g. campus, dining, social"
              {...register("tags", {
                required: "Tags are required",
              })}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
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
        <Link
          to={"/entertainment/topics"}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
        >
          See all trending topics <ChevronRight size={18} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
