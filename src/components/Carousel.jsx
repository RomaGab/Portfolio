import React, { useState, useEffect, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Carousel = ({ images = [], title = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [currentIndex, nextSlide]);

    if (images.length === 0) return null;

    return (
        <div className="w-full m-auto relative group">
            <div className="w-full aspect-[16/10] md:aspect-video rounded-2xl overflow-hidden relative">
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 z-20 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`transition-all duration-500 rounded-full ${
                                currentIndex === index
                                    ? "w-8 md:w-10 h-1 md:h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                    : "w-1.5 md:w-2 h-1 md:h-1.5 bg-white/30 hover:bg-white/60"
                            }`}
                        />
                    ))}
                </div>
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-4 z-10">
                    <button onClick={prevSlide} className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white"/>
                    </button>
                </div>
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-4 z-10">
                    <button onClick={nextSlide} className="p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <HiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white"/>
                    </button>
                </div>
            </div>
            <h2 className="mt-4 text-center font-medium">{title}</h2>
        </div>
    );
};

export default Carousel;