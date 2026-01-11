"use client";
import React, { useState, useRef, useEffect } from "react";

type SwiperProps = {
    items: React.ReactNode[];
    width?: number;
    classes?: string;
    onIndexChange?: (index: number) => void; // optional callback for parent
    startIndex?: number;
};

export default function Slider({
    items,
    width = 300,
    classes,
    onIndexChange,
    startIndex,
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
            console.log("potato");
            const newIndex = Math.min(i + 1, items.length - 1);
            onIndexChange?.(newIndex);
            return newIndex;
        });

    const prev = () =>
        setIndex((i) => {
            console.log("potato");

            let newIndex = i - 1 < 0 ? items.length - 1 : i - 1;
            console.log("potato:" + newIndex);
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

    return (
        <div
            className="overflow-hidden relative"
            style={{ width }}
        >
            {/* Slides container */}
            <div
                className="flex"
                style={{
                    transition: isTransitioning
                        ? "transform 0.3s ease"
                        : "none",
                    transform: `translateX(-${index * width}px)`,
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
                className="opacity-60 absolute top-1/2 left-1 px-2 py-1 rounded -translate-y-1/2 text-[2rem] cursor-pointer hover:opacity-90"
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
                className="opacity-60 absolute top-1/2 right-1 px-2 py-1 rounded -translate-y-1/2 text-[2rem] cursor-pointer hover:opacity-90"
            >
                ›
            </button>
        </div>
    );
}
