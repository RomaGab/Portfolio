import { HiAcademicCap } from "react-icons/hi2";

import TagGrid from "../components/TagGrid";

import profile from '../../data/profile.json';

const AboutMe = () => {
    return <div className="flex flex-col gap-10">
        <h1 className="text-center self-center text-[50px] font-bold">About Me</h1>
        <p>I am Romain GABRILLARGUES</p>
        <p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb<br/>
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb<br/>
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb<br/>
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb<br/>
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb<br/>
        </p>
        <div className="flex items-center justify-center gap-[10px]">
            <HiAcademicCap className="text-[1.1rem] flex-shrink-0 mt-[5px]"/>
            <TagGrid tags={profile.topSkills} maxChars={100}/>
        </div>
    </div>;
};

export default AboutMe;