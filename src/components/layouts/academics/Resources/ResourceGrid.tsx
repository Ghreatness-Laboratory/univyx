import { AnimatePresence, motion } from "framer-motion";
import { Resource } from "../../../../types/academics";
import NoteCard from "./NoteCard";
import PastQuestionCard from "./PastQuestionCard";
import TutorialCard from "./TutorialCard";

export default function ResourcesGrid({
  resources,
}: {
  resources: Resource[];
}) {
  const notes = resources.filter((resource) => resource.type === "note");
  const pastQuestions = resources.filter((resource) => resource.type === "pastQuestion");
  const tutorials = resources.filter((resource) => resource.type === "tutorial");

  return (
    <div className="space-y-12">
      {notes.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-semibold text-primary mb-6">Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {notes.map((resource) => (
                <NoteCard key={resource.id} resource={resource} />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {pastQuestions.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-semibold text-primary mb-6">
            Past Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {pastQuestions.map((resource) => (
                <PastQuestionCard key={resource.id} resource={resource} />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {tutorials.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-semibold text-primary mb-6">
            Tutorials
          </h2>
          <div className="space-y-8">
            <AnimatePresence>
              {tutorials.map((resource, index) => (
                <TutorialCard
                  key={resource.id}
                  resource={{ ...resource, isRowReverse: index % 2 !== 0 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </div>
  );
}
