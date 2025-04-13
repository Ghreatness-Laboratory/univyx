"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StoreData } from "../../../../types/store";

interface StoreCardProps {
  store: StoreData;
  onClick: () => void;
}

export default function StoreCard({ store, onClick }: StoreCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="min-w-[280px] md:min-w-[320px] rounded-2xl overflow-hidden shadow-md bg-white border border-primary/10 transition-all relative"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="p-5 space-y-5 min-h-[168px] flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-primary">{store.name}</h3>
            <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
              {store.category}
            </span>
          </div>
          <p className="text-secondary leading-6 text-sm">
            {store.description}
          </p>
        </div>

        {store.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {store.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link to={store.link} target="_blank" className="w-fit mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-indigo-500 text-sm text-white rounded-full px-4 py-2.5 font-medium"
          >
            <span>Get in touch</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
