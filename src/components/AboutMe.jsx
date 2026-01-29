import { HiAcademicCap } from "react-icons/hi2";

import TagGrid from "../components/TagGrid";

import profile from '../../data/profile.json';

// const AboutMe = () => {
//     return (
//         <div className="flex flex-col gap-10 px-4 w-full max-w-4xl mx-auto">
//             {/* Titre responsive : text-4xl sur mobile, text-5xl sur desktop */}
//             <h1 className="text-center text-4xl md:text-[50px] font-bold text-white">
//                 About Me
//             </h1>

//             <div className="flex flex-col gap-4 text-slate-200">
//                 <p className="text-lg">I am {profile.name}</p>

//                 {/* break-words permet de casser les lignes même sans espaces */}
//                 <p className="text-base md:text-lg leading-relaxed break-words overflow-hidden">
//                     bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
//                     bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
//                     bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
//                 </p>
//             </div>

//             <div className="flex flex-wrap items-center justify-center gap-4">
//                 <HiAcademicCap className="text-[1.5rem] text-blue-400 flex-shrink-0" />
//                 <TagGrid tags={profile.topSkills} maxChars={100} />
//             </div>
//         </div>
//     );
// };

const AboutMe = () => {
    return <div className="flex flex-col gap-10">
        <h1 className="text-center self-center text-[50px] font-bold">About Me</h1>
        <p>I am {profile.name}</p>
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