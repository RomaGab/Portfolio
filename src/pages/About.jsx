import { FaLinkedinIn } from 'react-icons/fa';

import AboutMe from "../components/AboutMe";
import Timeline from "../components/Timeline";
import CustomButton from "../components/CustomButton";

import profile from '../../data/profile.json';

const About = () => {
    return (
        <div className="flex flex-col items-center gap-[50px] w-full py-20 mt-[100px]">
            <img className="profile-picture"
                src={profile.profilePicture.icon}
                alt={profile.profilePicture.alt}
            />
            <AboutMe/>
            <CustomButton title="Contact Me" to={profile.contact} external={true} icon={FaLinkedinIn}/>
            <Timeline title="Experience" data={profile.experience}/>
            <Timeline title="Education" data={profile.education}/>
        </div>
    );
};

export default About;