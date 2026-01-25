import { HiAcademicCap } from "react-icons/hi2";
import TagGrid from "./TagGrid";

const Timeline = ({ data }) => {
    if (!data) return <p>N/A</p>;

    return (
        <div className="timeline-wrapper">
            {data.map((item, index) => (
                <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                        <div className="circle">
                            <img src={item.logo} className="timeline-logo"/>
                        </div>
                        {index !== data.length - 1 && <div className="line"></div>}
                    </div>
                    <div className="timeline-content">
                        <a className="title" href={item.link} target="_blank">{item.title}</a>
                        <p className="subtitle">
                            {item.subtitle}
                            {item.contract && ` • ${item.contract}`}
                        </p>
                        <p className="subtitle">{item.startDate} - {item.endDate}</p>
                        <p className="subtitle">{item.city}, {item.country}</p>
                        {item.skills && item.skills.length > 0 && (
                            <div className="skills-section">
                                <HiAcademicCap className="skill-icon"/>
                                <TagGrid tags={item.skills}/>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;