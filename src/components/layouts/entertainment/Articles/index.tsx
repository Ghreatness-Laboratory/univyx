import { ChevronRight, PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { studentArticles } from "../../../../data/entertainment/articles";
import ArticleCard from "./ArticlesCard";

const categoryOptions = [
  { value: "Student Life", label: "Student Life" },
  { value: "Campus Life", label: "Campus Life" },
  { value: "Travel", label: "Travel" },
  { value: "Advice", label: "Advice" },
  { value: "Opinion", label: "Opinion" },
];

interface ArticleFormData {
  title: string;
  category: { value: string; label: string } | null;
  excerpt: string;
}

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Student Life", "Campus Life", "Travel", "Advice"];
  const [searchTerm, setSearchTerm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: "",
      category: null,
      excerpt: "",
    },
  });

  const filteredArticles = studentArticles
    .filter(
      (article) =>
        activeCategory === "All" || article.category === activeCategory
    )
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const onSubmit = (data: ArticleFormData) => {
    console.log({
      title: data.title,
      category: data.category?.value,
      excerpt: data.excerpt,
    });

    setFormSubmitted(true);

    reset({
      title: "",
      category: null,
      excerpt: "",
    });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Student-Written Articles
          </h2>
          <p className="text-secondary  max-w-2xl">
            Authentic perspectives, experiences, and insights shared directly by
            fellow students
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
          <Select
            className="w-full sm:w-48"
            classNamePrefix="select"
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            placeholder="Filter by..."
            defaultValue={{ value: "All", label: "All" }}
            onChange={(option) => option && handleCategoryChange(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                border: "1px solid #D1D5DB",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #A78BFA",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#A78BFA"
                  : state.isFocused
                  ? "#EDE9FE"
                  : "white",
                color: state.isSelected ? "white" : "#1F2937",
              }),
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-2 py-16 text-center">
            <p className="text-gray-500 text-lg">
              No articles found matching your criteria.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Write Your Own Article
        </h3>
        <p className="text-secondary  mb-6 max-w-xl">
          Share your unique experiences, insights, and perspectives with the
          community. Every student has a story worth telling!
        </p>
        {formSubmitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
            Your article has been submitted successfully!
          </div>
        )}
        <div className="bg-purple-50 px-3 py-5 md:p-5 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                className={`w-full px-4 py-2 border ${
                  errors.title
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter a catchy title..."
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    inputId="category"
                    options={categoryOptions}
                    placeholder="Select a category"
                    {...field}
                    className={`w-full ${
                      errors.category ? "border-red-500" : ""
                    }`}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        border: errors.category
                          ? "1px solid #EF4444"
                          : "1px solid #D1D5DB",
                        padding: "0.2rem",
                        boxShadow: errors.category
                          ? "0 0 0 1px #EF4444"
                          : "none",
                        "&:hover": {
                          border: errors.category
                            ? "1px solid #EF4444"
                            : "1px solid #A78BFA",
                        },
                      }),
                    }}
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brief Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                rows={2}
                className={`w-full px-4 py-2 border ${
                  errors.excerpt
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Write a short summary of your article..."
                {...register("excerpt", {
                  required: "Excerpt is required",
                })}
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.excerpt.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
              >
                Get Started <PlusCircle size={16} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center">
        <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors inline-flex items-center">
          See all student articles <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </section>
  );
}
