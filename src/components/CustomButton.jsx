import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "framer-motion";

const CustomButton = ({ title, to, icon: Icon = HiArrowRight, className, fullWidth = false, external = false }) => {
    const styles = `
        group relative flex items-center justify-center gap-3 px-10 py-4
        bg-slate-900 text-white font-bold rounded-2xl
        backdrop-blur-md border border-white/20
        shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)]
        hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.5)]
        hover:bg-blue-600 transition-all duration-300
        overflow-hidden
        ${fullWidth ? "w-full" : "w-fit"}
        transform-gpu backface-visibility-hidden
    `;

    const content = (
        <>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"/>
            <span className="relative z-10 tracking-tight">{title}</span>
            {Icon && (
                <div className="relative z-10 flex items-center justify-center shrink-0 translate-z-0">
                    <Icon 
                        className="w-5 h-5 antialiased transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110" 
                        style={{ transform: 'translateZ(0)' }} 
                    />
                </div>
            )}
        </>
    );

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${fullWidth ? "w-full" : "w-fit"} ${className} will-change-transform`}
        >
            {external ? (
                <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles}
                >
                    {content}
                </a>
            ) : (
                <Link
                    to={to}
                    onClick={() => window.scrollTo(0, 0)}
                    className={styles}
                >
                    {content}
                </Link>
            )}
        </motion.div>
    );
};

export default CustomButton;