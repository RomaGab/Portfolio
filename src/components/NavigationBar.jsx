import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link className="text-2xl font-bold text-slate-900"
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Romain G.
                    </Link>
                    <div className="flex space-x-8">
                        <NavLink to="/work">Work</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        onClick={() => window.scrollTo(0, 0)}
        className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
    >
        {children}
    </Link>
);

export default Navbar;