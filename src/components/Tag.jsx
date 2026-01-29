import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const Tag = ({ tag, isSelected, isAvailable, onClick, showClose }) => {
    const isInteractive = Boolean(onClick);

    const baseStyle = "relative overflow-hidden px-3 py-1 rounded-md text-[0.8rem] font-bold border inline-flex items-center group whitespace-nowrap transition-all duration-300";

    const getStatusStyles = () => {
        if (!isAvailable && isInteractive) return "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-40";
        if (isSelected) return "bg-blue-600 text-white border-white/20 shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.6)] cursor-pointer";
        if (isAvailable && isInteractive) return "bg-[#f8f9fa] text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-600/5 cursor-pointer";
        return "bg-slate-100 text-slate-600 border-transparent shadow-none";
    };

    return (
        <motion.span
            onClick={isAvailable ? onClick : undefined}
            className={`${baseStyle} ${getStatusStyles()}`}
        >
            {isSelected && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            <span className="relative z-10">{tag}</span>
            <AnimatePresence initial={false}>
                {isSelected && showClose && (
                    <motion.span
                        key="close-icon"
                        initial={{ opacity: 0, width: 0, scale: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: "auto", scale: 1, marginLeft: 8 }}
                        exit={{ opacity: 0, width: 0, scale: 0, marginLeft: 0 }}
                        transition={{ duration: 0.25, ease: "circOut" }}
                        className="relative z-10 text-white/80 hover:text-white font-bold flex items-center overflow-hidden"
                    >
                        <MdClose/>
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.span>
    );
};

export default Tag;