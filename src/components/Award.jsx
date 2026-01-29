import { motion } from 'framer-motion';

const Award = ({ awards }) => {
    if (!awards || awards.length === 0) return null;

    return (
        <div className="absolute bottom-4 right-4 flex gap-2 p-2 
                        bg-slate-900/40 backdrop-blur-md rounded-xl 
                        border border-white/10 shadow-2xl z-30">
            {awards.map((award, index) => (
                <motion.a 
                    key={index} 
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                        scale: 1.2,
                        rotate: 5,
                        filter: "brightness(1.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="relative cursor-pointer"
                    title={award.title}
                >
                    <img 
                        src={award.icon}
                        alt={award.title}
                        className="w-[32px] h-[32px] object-contain drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-white/20 blur-md opacity-0 hover:opacity-100 transition-opacity rounded-full" />
                </motion.a>
            ))}
        </div>
    );
};

export default Award;