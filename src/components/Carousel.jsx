import React, { useState, useEffect, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const Carousel = ({ images = [], title = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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

    if (images.length === 0) return null;

    return (
        <div className="flex flex-col w-full m-auto relative group gap-[15px]">
            <h2 className="mt-4 text-left font-medium">{title}</h2>
            <div
                onClick={() => setIsFullScreen(true)}
                className="w-full aspect-[16/10] md:aspect-video rounded-xl overflow-hidden relative cursor-zoom-in"
            >
                <div
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        willChange: 'transform'
                    }}
                >
                    {images.map((img, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0">
                            <img
                                src={img}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                {images.length > 1 && (
                    <>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 z-20 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10" onClick={(e) => e.stopPropagation()}>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`transition-all duration-500 rounded-full ${
                                        currentIndex === index
                                            ? "w-8 md:w-10 h-1 md:h-1.5 bg-white"
                                            : "w-1.5 md:w-2 h-1 md:h-1.5 bg-white/30"
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-4 z-10">
                            <button onClick={prevSlide} className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-colors">
                                <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6"/>
                            </button>
                        </div>
                        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-4 z-10">
                            <button onClick={handleNextClick} className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-colors">
                                <HiChevronRight className="w-5 h-5 md:w-6 md:h-6"/>
                            </button>
                        </div>
                    </>
                )}
            </div>
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    onClick={() => setIsFullScreen(false)}
                >
                    <button
                        className="absolute top-6 right-6 p-3 text-white/50 hover:text-white transition-colors z-[1000]"
                        onClick={() => setIsFullScreen(false)}
                    >
                        <HiXMark className="w-8 h-8" />
                    </button>
                    <img
                        src={images[currentIndex]}
                        alt="Full screen"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    />
                </div>
            )}
        </div>
    );
};

export default Carousel;