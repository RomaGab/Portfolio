import { useEffect } from 'react';

import Hero from "../components/Hero";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);
    return (
        <div className="flex flex-col items-center w-full">
            <Hero/>
        </div>
    );
};

export default Home;