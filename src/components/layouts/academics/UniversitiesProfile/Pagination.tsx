import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4 my-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-full 
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }
        `}
      >
        <ChevronLeft size={20} />
      </motion.button>

      <span className="text-sm text-secondary">
        Page {currentPage} of {totalPages}
      </span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-full 
          ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }
        `}
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
