import AboutMe from "../components/AboutMe";
import Timeline from "../components/Timeline";

import experienceData from '../../data/experience.json';
import educationData from '../../data/education.json';

const About = () => {
    return (
        <div className="flex flex-col items-center gap-[50px] w-full py-20">
            <img className="profile-picture" src="https://media.licdn.com/dms/image/v2/D4E03AQH0H_JCBuAtXQ/profile-displayphoto-shrink_400_400/B4EZbz2qHSHAAo-/0/1747847914492?e=1770854400&v=beta&t=GNfo6Hknoc98AoFt6g5YAVb5wpfGom5BUeA6eP7sAkk" alt="Romain G. profile"/>
            <AboutMe/>
            <h1>Skills</h1>
            <Timeline title={"Experience"} data={experienceData}/>
            <Timeline title={"Education"} data={educationData}/>
        </div>
    );
};

export default About;