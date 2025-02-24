import { DocumentIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Resource } from "../../../../types/academics";
import Button from "../../../common/Button";

export default function PastQuestionCard({ resource }: { resource: Resource }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#F9F9FB] rounded-[20px] p-6 flex flex-col gap-4 justify-stretch"
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full">
          <DocumentIcon className="size-6 text-primary" />
        </div>
        <h3 className="text-primary text-2xl font-semibold">
          {resource.title}
        </h3>
      </div>
      <p className="text-secondary text-base">{resource.description}</p>
      <Button
        href={resource.url}
        target="_blank"
        className="mt-2 text-center py-2"
        ariaLabel="View Past Question"
      >
        <p>View Past Question</p>
      </Button>
    </motion.div>
  );
}
