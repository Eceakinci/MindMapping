"use client";
import React, { useState, useRef, useEffect } from "react";

type SwiperProps = {
    items: React.ReactNode[];
    width?: number;
    classes?: string;
    onIndexChange?: (index: number) => void; // optional callback for parent
    startIndex?: number;
    isStudy?: boolean
};

export default function Slider({
    items,
    width,
    classes,
    onIndexChange,
    startIndex,
    isStudy = false
}: SwiperProps) {
    const [index, setIndex] = useState(startIndex);
    const startX = useRef<number | null>(null);

    // Notify parent of initial index
    useEffect(() => {
        onIndexChange?.(index);
    }, [index]);

    const [isTransitioning, setIsTransitioning] = useState(true);

    const next = () =>
        setIndex((i) => {
            const newIndex = Math.min(i + 1, items.length - 1);
            onIndexChange?.(newIndex);
            return newIndex;
        });

    const prev = () =>
        setIndex((i) => {
            let newIndex = i - 1 < 0 ? items.length - 1 : i - 1;
            onIndexChange?.(newIndex);
            return newIndex;
        });

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX.current === null) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;

        if (diff > 50) next();
        else if (diff < -50) prev();

        startX.current = null;
    };

    // Svg icons for button
    function ArrowLeftIcon({iconClasses=""}) {
        return (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 text-black " + (iconClasses ?? "")}>
                <path
                    fill="currentColor"
                    d="M15.03 6.47a.75.75 0 0 1 0 1.06L10.56 12l4.47 4.47a.75.75 0 1 1-1.06 1.06l-5.53-5.53 5.53-5.53a.75.75 0 0 1 1.06 0Z"
                />
            </svg>
        );
    }

    function CloseIcon() {
        return (
            <svg viewBox="0 0 16 16" className="w-4 h-4">
                <path
                    fill="currentColor"
                    d="M3.47 3.39a.75.75 0 0 1 1.06 0L8 6.86l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 7.92l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 8.98l-3.47 3.47a.75.75 0 1 1-1.06-1.06l3.47-3.47-3.47-3.47a.75.75 0 0 1 0-1.06Z"
                />
            </svg>
        );
    }

    return (
        <div>
            <div className="overflow-hidden relative shadow-md h-full w-full bg-pink-100 transition-shadow duration-300
                            ease-[cubic-bezier(0.4,0,0.2,1)] border border-pink-200 rounded-xl"
                style={{ width }}
            >
                {/* Slides container */}
                <div
                    className="flex"
                    style={{
                        transition: isTransitioning ? "transform 0.3s ease" : "none",
                        transform: `translateX(-${index * 100}%)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            style={{ width }}
                            className={"shrink-0 " + (classes ?? "")}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Prev / Next buttons */}

                <button
                    onClick={() => {
                        setIndex((i) => {
                            i == 0
                                ? setIsTransitioning(false)
                                : setIsTransitioning(true);
                            return i == 0 ? items.length - 1 : i - 1;
                        });
                    }}
                    className={`opacity-60 absolute top-1/2 left-1 px-2 py-1 rounded
                                -translate-y-1/2 text-3xl cursor-pointer hover:opacity-90
                                ${isStudy ? "hidden" : ""}`}
                >
                    ‹
                </button>

                <button
                    onClick={() =>

                        setIndex((i) => {
                            i == items.length - 1
                                ? setIsTransitioning(false)
                                : setIsTransitioning(true);

                            return i == items.length - 1 ? 0 : i + 1;
                        })
                    }
                    className={`"opacity-60 absolute top-1/2 right-1 px-2 py-1 rounded -translate-y-1/2 text-3xl
                        cursor-pointer hover:opacity-90 ${isStudy ? "hidden" : ""}`}
                >
                    ›
                </button>

            </div>
            <div className={`absolute bottom-0 flex w-full max-w-[600px] justify-between gap-8 ${isStudy ? "" : "hidden"}`}>
                <button
                    onClick={() => {
                        setIndex((i) => {
                            i == 0
                                ? setIsTransitioning(false)
                                : setIsTransitioning(true);
                            return i == 0 ? items.length - 1 : i - 1;
                        });
                    }}
                    className="min-w-64 bg-orange-300/75 border border-orange-400/74 rounded-md w-full flex items-center
                    justify-center gap-3 text-white py-4 px-6 rounded-lg font-medium shadow-md transition
                    hover:bg-orange-400 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <div className="flex items-center justify-between gap-2 opacity-90 w-full">
                        <div className="w-6 h-6 border border-orange-400 rounded-md bg-stone-100  place-content-center">
                           <ArrowLeftIcon/>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() =>
                        setIndex((i) => {
                            i == items.length - 1
                                ? setIsTransitioning(false)
                                : setIsTransitioning(true);

                            return i == items.length - 1 ? 0 : i + 1;
                        })
                    }
                    className="min-w-64 bg-green-300/75 border border-green-400/74 rounded-md w-full flex items-center
                    justify-center gap-3 text-white py-4 px-6 rounded-lg font-medium shadow-md transition
                    hover:bg-green-400 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <div className="flex items-center justify-between gap-2 opacity-90 w-full justify-end">
                        <div className="w-6 h-6 border border-green-400 rounded-md bg-stone-100 place-content-center">
                            <ArrowLeftIcon iconClasses="rotate-180"/>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
