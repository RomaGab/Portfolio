import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const NavButton = memo(({ direction, onClick, fullScreen = false }) => {
    const isLeft = direction === 'left';
    const Icon = isLeft ? HiChevronLeft : HiChevronRight;
    const baseStyles = "rounded-full transition-colors cursor-pointer flex items-center justify-center z-[1001]";
    const modeStyles = fullScreen
        ? "p-4 bg-white/5 hover:bg-white/10 text-white border border-white/10"
        : "p-2 md:p-3 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10";

    return (
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={`${baseStyles} ${modeStyles}`}>
            <Icon className={fullScreen ? "w-8 h-8" : "w-5 h-5 md:w-6 md:h-6"}/>
        </button>
    );
});

const DotNav = memo(({ total, current, onClick, isFullScreen = false }) => (
    <div className="flex items-center gap-2 pointer-events-auto">
        {Array.from({ length: total }).map((_, index) => (
            <button
                key={index}
                onClick={(e) => { e.stopPropagation(); onClick(index); }}
                className={`transition-all duration-300 rounded-full ${
                    isFullScreen
                        ? (current === index ? "w-8 h-1 bg-white" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40")
                        : (current === index ? "w-6 h-1 bg-slate-800" : "w-1 h-1 bg-slate-300 hover:bg-slate-400")
                }`}
            />
        ))}
    </div>
));

const ImageSlider = ({ entries, currentIndex, isFullScreen, isFast }) => {
    const unit = isFullScreen ? 'vw' : '%';
    return (
        <div
            className={`flex h-full transition-transform ease-in-out ${isFast ? 'duration-0' : 'duration-700'}`}
            style={{
                transform: `translateX(-${currentIndex * 100}${unit})`,
                width: isFullScreen ? `${entries.length * 100}vw` : '100%'
            }}
        >
            {entries.map(([name, src], index) => (
                <div key={index} className={isFullScreen ? "w-[100vw] h-full flex items-center justify-center p-6 md:p-16" : "w-full h-full flex-shrink-0"}>
                    <img
                        src={src}
                        alt={name}
                        className={isFullScreen
                            ? "max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl select-none cursor-default"
                            : "w-full h-full object-cover select-none"}
                        onClick={isFullScreen ? (e) => e.stopPropagation() : undefined}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                </div>
            ))}
        </div>
    );
};

const Carousel = ({ images = {}, title = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isFast, setIsFast] = useState(false);

    const imageEntries = useMemo(() =>
        Object.entries(images).map(([name, src]) => [name.trim(), src]),
    [images]);
    const totalSlides = imageEntries.length;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    }, [totalSlides]);

    useEffect(() => {
        if (totalSlides <= 1 || isFullScreen || isPaused) return;
        const slideInterval = setInterval(() => {
            setIsFast(false);
            nextSlide();
        }, 4000);
        return () => clearInterval(slideInterval);
    }, [nextSlide, totalSlides, isFullScreen, isPaused]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                setIsFast(e.repeat);
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
            if (e.key === 'Escape' && isFullScreen) setIsFullScreen(false);
        };

        const handleKeyUp = () => setIsFast(false);

        if (isFullScreen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isFullScreen, nextSlide, prevSlide]);

    const currentName = imageEntries[currentIndex][0];

    return (
        <article className="flex flex-col w-full m-auto relative group gap-3">
            <h2 className="text-left font-bold text-slate-800 tracking-tight">{title}</h2>
            <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => { setIsFast(false); setIsFullScreen(true); }}
                className="w-full aspect-[16/10] md:aspect-video rounded-2xl overflow-hidden relative cursor-zoom-in bg-slate-100 border border-slate-200/50 shadow-sm"
            >
                <ImageSlider entries={imageEntries} currentIndex={currentIndex} isFullScreen={false} isFast={isFast}/>
                {totalSlides > 1 && (
                    <>
                        <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 left-4 z-10">
                            <NavButton direction="left" onClick={() => { setIsFast(false); prevSlide(); }}/>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-4 z-10">
                            <NavButton direction="right" onClick={() => { setIsFast(false); nextSlide(); }}/>
                        </div>
                    </>
                )}
            </div>
            <footer className="flex flex-row justify-between items-center px-1">
                <span className="text-slate-600 font-medium text-sm md:text-base truncate max-w-[70%]">{currentName}</span>
                {totalSlides > 1 && <DotNav total={totalSlides} current={currentIndex} onClick={(i) => { setIsFast(false); setCurrentIndex(i); }}/>}
            </footer>
            {isFullScreen && (
                <section className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center cursor-zoom-out group" onClick={() => setIsFullScreen(false)}>
                    <button className="absolute top-6 right-6 p-3 text-white/50 hover:text-white z-[1002] cursor-pointer">
                        <HiXMark className="w-8 h-8"/>
                    </button>
                    {totalSlides > 1 && (
                        <>
                            <div className="opacity-0 group-hover:opacity-100 absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[1002]">
                                <NavButton direction="left" onClick={() => { setIsFast(false); prevSlide(); }} fullScreen/>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[1002]">
                                <NavButton direction="right" onClick={() => { setIsFast(false); nextSlide(); }} fullScreen/>
                            </div>
                        </>
                    )}
                    <div className="w-full h-full overflow-hidden">
                        <ImageSlider entries={imageEntries} currentIndex={currentIndex} isFullScreen isFast={isFast}/>
                    </div>
                    <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-4 px-6 pointer-events-none">
                        <p className="text-white text-xl font-light tracking-wide pointer-events-auto">{currentName}</p>
                        {totalSlides > 1 && <DotNav total={totalSlides} current={currentIndex} onClick={(i) => { setIsFast(false); setCurrentIndex(i); }} isFullScreen/>}
                    </div>
                </section>
            )}
        </article>
    );
};

export default Carousel;