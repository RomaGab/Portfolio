import { HiAcademicCap } from "react-icons/hi2";
import TagGrid from "../components/TagGrid";
import profile from '../../data/profile.json';

const AboutMe = () => {
    return (
        <div className="flex flex-col gap-10 w-full px-4 items-center">
            <h1 className="text-center text-3xl md:text-[50px] font-bold">
                About Me
            </h1>
            <div className="flex flex-col gap-4 text-base md:text-lg w-full max-w-2xl text-center md:text-left">
                <p className="break-words text-center md:text-left">
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                </p>
            </div>
            <div className="flex items-center justify-center gap-[10px] w-full max-w-xl mx-auto">
                <HiAcademicCap className="text-[1.1rem] flex-shrink-0 mt-[2px]"/>
                <div className="flex justify-center flex-1">
                    <TagGrid tags={profile.topSkills} maxChars={100}/>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;