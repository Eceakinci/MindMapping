"use client";
import React, { useState, useRef, useEffect } from "react";

type SwiperProps = {
    items: React.ReactNode[];
    width?: number;
    classes?: string;
    onIndexChange?: (index: number) => void; // optional callback for parent
};

export default function Slider({
    items,
    width = 300,
    classes,
    onIndexChange,
}: SwiperProps) {
    const [index, setIndex] = useState(0);
    const startX = useRef<number | null>(null);

    // Notify parent of initial index
    useEffect(() => {
        onIndexChange?.(index);
    }, [index]);


    const next = () =>
        setIndex((i) => {
            const newIndex = Math.min(i + 1, items.length - 1);
            onIndexChange?.(newIndex);
            return newIndex;
        });

    const prev = () =>
        setIndex((i) => {
            const newIndex = Math.max(i - 1, 0);
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
        <div className="overflow-hidden relative" style={{ width }}>
            {/* Slides container */}
            <div
                className="flex"
                style={{
                    transition: "transform 0.3s ease",
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
                onClick={() => setIndex((i) => Math.min(i - 1, items.length - 1))}
                className="absolute top-1/2 left-1 px-2 py-1 bg-gray-200 rounded -translate-y-1/2"
                disabled={index === 0}
            >
                ◀
            </button>

            <button
                onClick={() => setIndex((i) => Math.min(i + 1, items.length - 1))}
                className="absolute top-1/2 right-1 px-2 py-1 bg-gray-200 rounded -translate-y-1/2"
                disabled={index === items.length - 1}
            >
                ▶
            </button>
        </div>
    );
}
