import { HiAcademicCap } from "react-icons/hi2";

import TagGrid from "../components/TagGrid";
import ScrollingText from "../components/ScrollingText";

import profile from '../../data/profile.json';

const AboutMe = () => {
    return (
        <div className="flex flex-col gap-10 w-full px-4 items-center">
            <div className="flex flex-col items-center gap-1 w-full">
                <h1 className="text-center text-3xl md:text-[50px] font-bold">
                    About Me
                </h1>
                <ScrollingText roles={profile.titles}/>
                <p className="md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-justify mt-2">
                    Currently serving as the <span className="text-blue-600">Delivery Tools Owner</span> at <span className="text-blue-600">Kering</span>, I specialize in optimizing production ecosystems and streamlining delivery workflows.
                    I transform complex operational challenges into automated solutions, ensuring that technology serves as a bridge—not a barrier—to team efficiency.
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-wider text-sm text-left uppercase">Top Skills</h3>
                <div className="flex items-center justify-center gap-[10px] w-full max-w-xl mx-auto">
                    <HiAcademicCap className="text-[1.1rem] flex-shrink-0 mt-[2px]"/>
                    <div className="flex justify-center flex-1">
                        <TagGrid tags={profile.topSkills} maxChars={100}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;