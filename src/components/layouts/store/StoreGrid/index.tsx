"use client";

import { School } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { storeData } from "../../../../data/store/stores";
import { StoreData } from "../../../../types/store";
import Button from "../../../common/Button";
import Header from "../Header";
import StoreCard from "./StoreCard";

export default function StoreGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStores, setFilteredStores] = useState<StoreData[]>(storeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const storesPerPage = 6;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let result = storeData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.description.toLowerCase().includes(query) ||
          (store.tags &&
            store.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((store) => store.category === activeCategory);
    }

    setFilteredStores(result);
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredStores.length / storesPerPage);
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = filteredStores.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStoreClick = (store: StoreData) => {
    console.log("Store clicked:", store);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div data-testid="stores" ref={sectionRef}>
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h3 className="text-primary text-4xl md:text-5xl font-semibold">
              Browse through stores
            </h3>
            <p className="text-secondary text-lg mt-1">
              Explore specialty stores with collections of premium products
            </p>
          </div>
          <Button
            href="?auth=signup"
            className="flex items-center justify-center px-3 py-2.5 gap-1.5 min-w-40 my-6"
            isIconOnly={false}
            ariaLabel="Sign Up for Univyx"
          >
            <p className="text-base font-semibold">Register</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
                stroke="#FCFCFC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        {filteredStores.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <School size={48} className="mx-auto text-gray-400 mb-3" />
            <h4 className="text-2xl font-semibold text-primary mb-2">
              No stores found
            </h4>
            <p className="text-secondary max-w-md">
              We couldn't find any stores matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onClick={() => handleStoreClick(store)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary hover:text-primary/80"
                    }`}
                    aria-label="Previous page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <span className="text-primary font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary hover:text-primary/80"
                    }`}
                    aria-label="Next page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
