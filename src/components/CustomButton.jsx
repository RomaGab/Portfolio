// import { Link } from "react-router-dom";
// import { HiArrowRight } from "react-icons/hi2";

// const CustomButton = ({title, to, icon: Icon = HiArrowRight, className}) => {
//     return (
//         <Link
//             to={to}
//             onClick={() => window.scrollTo(0, 0)}
//             className={`group inline-flex items-center justify-center gap-3 px-8 py-3
//                        bg-slate-900 text-white font-semibold rounded-full transition-all ${className}`}
//         >
//             {title}
//             <Icon className="text-xl group-hover:translate-x-1 transition-transform"/>
//         </Link>
//     );
// };

// export default CustomButton;

import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "framer-motion";

const CustomButton = ({ title, to, icon: Icon = HiArrowRight, className }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={className}
        >
            <Link
                to={to}
                onClick={() => window.scrollTo(0, 0)}
                className={`
                    group relative inline-flex items-center justify-center gap-3 px-10 py-4
                    bg-slate-900 text-white font-bold rounded-2xl
                    backdrop-blur-md border border-white/20
                    shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)]
                    hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.5)]
                    hover:bg-blue-600 transition-all duration-300
                    overflow-hidden
                `}
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 tracking-tight">{title}</span>
            </Link>
        </motion.div>
    );
};

export default CustomButton;