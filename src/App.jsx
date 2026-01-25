import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import './App.css'

import experienceData from '../data/experience.json';
import educationData from '../data/education.json';

function App() {
    return (
        <div className="bg-white min-h-screen">
            <div class="about-me">
                <img className="logo" src="https://media.licdn.com/dms/image/v2/D4E03AQH0H_JCBuAtXQ/profile-displayphoto-shrink_400_400/B4EZbz2qHSHAAo-/0/1747847914492?e=1770854400&v=beta&t=GNfo6Hknoc98AoFt6g5YAVb5wpfGom5BUeA6eP7sAkk"/>
                <p>About Me</p>
                <p>blablablabla</p>
                <p>Experience</p>
                <Timeline data={experienceData}/>
                <p>Education</p>
                <Timeline data={educationData}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;