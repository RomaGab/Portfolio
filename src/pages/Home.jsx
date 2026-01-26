import AboutMe from "../components/AboutMe";

const Home = () => {
    return (
        <div className="home-page">
            <img className="logo" src="https://media.licdn.com/dms/image/v2/D4E03AQH0H_JCBuAtXQ/profile-displayphoto-shrink_400_400/B4EZbz2qHSHAAo-/0/1747847914492?e=1770854400&v=beta&t=GNfo6Hknoc98AoFt6g5YAVb5wpfGom5BUeA6eP7sAkk" alt="logo"/>
            <AboutMe />
            <button>Learn more</button>
        </div>
    );
};

export default Home;