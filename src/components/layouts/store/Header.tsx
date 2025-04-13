"use client";

import { motion } from "framer-motion";
import { FlameIcon as Fire, Search, Tag, TrendingUp, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { storeCategories } from "../../../data/store/stores";

interface StoreHeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function Header({
  onSearch,
  onCategoryChange,
}: StoreHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-[#F9F9FB]">
      <div className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-semibold text-primary mb-4 "
          >
            Discover Great Deals for Students
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-secondary text-lg md:text-xl mb-6"
          >
            Find stores, browse products and reach out directly via WhatsApp and
            social media.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm border border-gray-200 shadow-sm">
              <Fire size={14} className="text-orange-500" />
              <span>Hot Deals</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm border border-gray-200 shadow-sm">
              <TrendingUp size={14} className="text-green-500" />
              <span>Trending Now</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm border border-gray-200 shadow-sm">
              <Tag size={14} className="text-blue-500" />
              <span>Exclusive</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm border border-gray-200 shadow-sm">
              <Zap size={14} className="text-yellow-500" />
              <span>New Arrivals</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <input
                type="text"
                placeholder="Find Your Campus Essentials"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-5 pr-12 rounded-full border border-primary/70 bg-white/80 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="flex items-center gap-2">
              {storeCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-white text-secondary border border-gray-200 hover:border-primary/30 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
