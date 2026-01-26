import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";

import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-[50px] w-full py-20">
            <Hero/>
            <h1 className="text-center self-center text-[50px] font-bold">My Work</h1>
            <img className="profile-picture" src="https://media.licdn.com/dms/image/v2/D4E03AQH0H_JCBuAtXQ/profile-displayphoto-shrink_400_400/B4EZbz2qHSHAAo-/0/1747847914492?e=1770854400&v=beta&t=GNfo6Hknoc98AoFt6g5YAVb5wpfGom5BUeA6eP7sAkk" alt="Romain G. profile"/>
            <AboutMe/>
            <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-3
                        bg-slate-900 text-white font-semibold rounded-full"
            >
                Learn more
                <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform"/>
            </Link>
        </div>
    );
};

export default Home;