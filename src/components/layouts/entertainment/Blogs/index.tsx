import { useState } from "react";
import blog1 from "../../../../assets/images/entertainment/blog1.png";
import blog2 from "../../../../assets/images/entertainment/blog2.png";
import blog3 from "../../../../assets/images/entertainment/blog3.png";
import blog4 from "../../../../assets/images/entertainment/blog4.png";
import BlogCard, { BlogsProps } from "./BlogCard";

const blogs: BlogsProps[] = [
  {
    category: "Technology",
    title: "Sustainable Growth through Economic Marketing",
    date: "August 17, 2023",
    author: "Harper Evans",
    blogPicture: blog1,
  },
  {
    category: "Marketing",
    title: "Sustainable Growth through Economic Marketing",
    date: "August 17, 2023",
    author: "Harper Evans",
    blogPicture: blog2,
  },
  {
    category: "Travelling",
    title: "Sustainable Growth through Economic Marketing",
    date: "August 17, 2023",
    author: "Harper Evans",
    blogPicture: blog3,
  },
  {
    category: "Science",
    title: "Sustainable Growth through Economic Marketing",
    date: "August 17, 2023",
    author: "Harper Evans",
    blogPicture: blog4,
  },
];

const categories = [
  "All",
  "Technology",
  "Healthy Food",
  "Marketing",
  "Travelling",
  "Science",
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="bg-[#F9F9FB]">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-6 md:gap-[50px] px-6 xl:px-0 py-12 md:py-[100px]">
        <div className="flex max-md:flex-col gap-8 md:items-center md:justify-between lg:pb-[50px] border-b">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
            Blogs
          </h1>
          <p className="text-secondary text-base font-normal max-w-[451px]">
            Hendrerit fames metus leo ut orci pretium. Sit vitae montes egestas
            montes mauris. Auctor vitae neque urna .
          </p>
        </div>

        <div className="flex max-xl:flex-col gap-8 justify-between">
          <div className="max-w-[135px] md:w-full max-md:self-center">
            <h3 className="font-medium text-2xl leading-8 mb-5">Categories</h3>
            <ul className="flex flex-col gap-4">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex gap-[14px] items-center text-base leading-6 font-medium"
                >
                  <input
                    id={`category-${index}`}
                    name="category"
                    type="radio"
                    className="w-4 h-4 appearance-none border border-black rounded-full checked:bg-black"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <label htmlFor={`category-${index}`}>{category}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:max-w-[855px] xl:grid grid-cols-2 gap-[30px] flex overflow-hidden overflow-x-auto hide-scrollbar">
            {filteredBlogs.map((blog, index) => (
              <div key={index}>
                <BlogCard
                  category={blog.category}
                  title={blog.title}
                  date={blog.date}
                  author={blog.author}
                  blogPicture={blog.blogPicture}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
