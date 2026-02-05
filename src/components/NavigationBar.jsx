import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../../data/profile.json";

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { firstName, lastInitial } = useMemo(() => {
        const [first, last] = profile.name.split(' ');
        return { firstName: first, lastInitial: last ? `${last.charAt(0).toUpperCase()}.` : '' };
    }, []);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) < 5) return;

        setShow(!(currentScrollY > lastScrollY && currentScrollY > 100));
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <motion.nav
            animate={{
                opacity: show ? 1 : 0,
                pointerEvents: show ? "auto" : "none"
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl bg-white/80 backdrop-blur-lg rounded-full px-4 md:px-8 py-2 md:py-3 shadow-lg border border-slate-100 z-50 transform-gpu"
        >
            <div className="w-full">
                <div className="flex justify-between items-center h-12 md:h-16">
                    <Link
                        className="text-lg md:text-2xl font-bold text-slate-900 group transition-colors duration-300 hover:text-blue-600 flex-shrink-0"
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="flex items-center gap-3 md:gap-[15px]">
                            <img
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                src={profile.profilePicture.icon}
                                alt={profile.profilePicture.alt}
                            />
                            <span className="text-base md:text-2xl">
                                {firstName} <span className="hidden sm:inline">{profile.name.split(' ')[1].charAt(0).toUpperCase()}.</span>
                            </span>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <NavLink to="/work">Projects</NavLink>
                        <NavLink to="/about">About Me</NavLink>
                        <a
                            href={profile.contact}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-base text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({to, children}) => (
    <Link
        to={to}
        onClick={() => window.scrollTo(0, 0)}
        className="text-sm md:text-base text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
    >
        {children}
    </Link>
);

export default Navbar;