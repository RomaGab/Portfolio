import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { FaLinkedinIn } from 'react-icons/fa';

import SearchBar from "./SearchBar";

import profile from "../../data/profile.json"

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [firstName, lastName] = profile.name.split(' ');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShow(!(currentScrollY > lastScrollY && currentScrollY > 50));
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white/80 backdrop-blur-lg rounded-full px-8 py-3 shadow-lg border border-slate-100 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link className="text-2xl font-bold text-slate-900"
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        {firstName} {lastName.charAt(0).toUpperCase()}.
                    </Link>
                    <div className="flex items-center space-x-8">
                        <SearchBar/>
                        <NavLink to="/work">Work</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink
                            to="/contact"
                            className="group flex flex-row items-center gap-[5px] transition-all duration-300"
                        >
                            Contact
                            {/* <span className="opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center">
                                <FaLinkedinIn />
                            </span> */}
                        </NavLink>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({to, children, className}) => (
    <Link
        to={to}
        onClick={() => window.scrollTo(0, 0)}
        className={`text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 ${className}`}
    >
        {children}
    </Link>
);

export default Navbar;