import React, { useState, useEffect, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const Carousel = ({ images = {}, title = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const imageEntries = Object.entries(images);
    const totalSlides = imageEntries.length;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, [totalSlides]);

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const handleNextClick = (e) => {
        e.stopPropagation();
        nextSlide();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsFullScreen(false);
        };
        if (isFullScreen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen]);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [currentIndex, nextSlide]);

    if (totalSlides === 0) return null;

    const [currentName, currentSrc] = imageEntries[currentIndex];

    return (
        <div className="flex flex-col w-full m-auto relative group gap-3">
            <h2 className="text-left font-bold text-slate-800 tracking-tight">{title}</h2>
            <div
                onClick={() => setIsFullScreen(true)}
                className="w-full aspect-[16/10] md:aspect-video rounded-2xl overflow-hidden relative cursor-zoom-in bg-slate-100 border border-slate-200/50 shadow-sm"
            >
                <div
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        willChange: 'transform'
                    }}
                >
                    {imageEntries.map(([name, src], index) => (
                        <div key={index} className="w-full h-full flex-shrink-0">
                            <img
                                src={src}
                                alt={name}
                                className="w-full h-full object-cover select-none"
                            />
                        </div>
                    ))}
                </div>
                {totalSlides > 1 && (
                    <>
                        <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 left-4 z-10 transition-opacity duration-300">
                            <button onClick={prevSlide} className="p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors">
                                <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6"/>
                            </button>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-4 z-10 transition-opacity duration-300">
                            <button onClick={handleNextClick} className="p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors">
                                <HiChevronRight className="w-5 h-5 md:w-6 md:h-6"/>
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-row justify-between items-center px-1">
                <span className="text-slate-600 font-medium text-sm md:text-base truncate max-w-[70%]">
                    {currentName}
                </span>
                {totalSlides > 1 && (
                    <div className="flex items-center gap-2">
                        {imageEntries.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                                className={`transition-all duration-300 rounded-full ${
                                    currentIndex === index
                                        ? "w-6 h-1 bg-slate-800"
                                        : "w-1 h-1 bg-slate-300 hover:bg-slate-400"
                                }`}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    onClick={() => setIsFullScreen(false)}
                >
                    <button className="absolute top-6 right-6 p-3 text-white/50 hover:text-white transition-colors">
                        <HiXMark className="w-8 h-8" />
                    </button>
                    <img
                        src={currentSrc}
                        alt={currentName}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    />
                    <p className="mt-6 text-white text-lg font-medium tracking-wide">
                        {currentName}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Carousel;