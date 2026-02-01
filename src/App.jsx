import './App.css'

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Project from "./pages/Project";

import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <div className="flex flex-col items-center justify-center w-full">
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/work" element={<Work/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/project/:id" element={<Project/>}/>
                </Routes>
                <Footer/>
            </div>
        </HashRouter>
    );
}

export default App;