import { HiAcademicCap } from "react-icons/hi2";
import TagGrid from "./TagGrid";

const Timeline = ({title, data}) => {
    if (!data) return <p>N/A</p>;

    return (
        <div className="flex flex-col gap-10 items-start w-1/2">
            { title && <h1 className="title">{title}</h1>}
            <div className="flex flex-col text-left gap-[10px] mx-auto">
                {data.map((item, index) => (
                    <div key={index} className="flex gap-5 min-h-[125px]">
                        <div className="flex flex-col items-center relative">
                            <div className="w-[50px] h-[50px] bg-white z-[2] overflow-hidden flex items-center justify-center border border-gray-100">
                                <img src={item.logo} className="w-full h-full object-cover" alt={item.title}/>
                            </div>
                            {index !== data.length - 1 && (
                                <div className="absolute top-10 bottom-[-10px] z-[1]"></div>
                            )}
                        </div>
                        <div className="flex flex-col justify-start">
                            <a className="m-0 font-bold text-[1.1rem] text-[#333] hover:underline" href={item.link} target="_blank">
                                {item.title}
                            </a>
                            <p className="m-0 text-[#666] text-sm font-medium">
                                {item.subtitle}
                                {item.contract && ` • ${item.contract}`}
                            </p>
                            <p className="m-0 text-[#666] text-sm">{item.startDate} — {item.endDate}</p>
                            <p className="m-0 text-[#666] text-sm">{item.city}, {item.country}</p>
                            {item.skills && item.skills.length > 0 && (
                                <div className="flex items-start gap-[10px] mt-[10px] mb-[25px]">
                                    <HiAcademicCap className="text-[1.1rem] flex-shrink-0 mt-[5px]"/>
                                    <TagGrid tags={item.skills}/>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;