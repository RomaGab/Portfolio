import './App.css'

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col items-center justify-center w-full gap-[60px]">
                    <NavigationBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/work" element={<Work/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;