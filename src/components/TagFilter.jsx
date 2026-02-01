import Tag from './Tag';
import { motion, AnimatePresence } from "framer-motion";

const TagFilter = ({ allTags, selectedTags, availableTags, onToggle, onClear }) => {
    return (
        <motion.div layout className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl px-4">
                {allTags.map((tag) => (
                    <Tag
                        key={tag}
                        tag={tag}
                        isSelected={selectedTags.includes(tag)}
                        isAvailable={availableTags.has(tag)}
                        onClick={() => onToggle(tag)}
                        showClose
                    />
                ))}
            </div>
            <div className="h-6 flex items-center justify-center relative">
                <AnimatePresence initial={false}>
                    {selectedTags.length > 0 && (
                        <motion.button
                            key="clear-filters-btn"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ position: "relative" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            onClick={onClear}
                            className="text-sm text-red-500 hover:text-red-700 font-semibold underline underline-offset-4"
                        >
                            Clear all filters
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TagFilter;