"use client";
import React, { useState, useRef } from "react";

type SwiperProps = {
    items: React.ReactNode[];
    width?: number;
    classes?: string;
};

export default function Slider({ items, width = 300, classes }: SwiperProps) {
    const [index, setIndex] = useState(0);
    const startX = useRef<number | null>(null);

    const next = () => setIndex((i) => Math.min(i + 1, items.length - 1));
    const prev = () => setIndex((i) => Math.max(i - 1, 0));

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
        <div className='overflow-hidden relative' style={{ width }}>
            <div className='flex'
                style={{
                    transition: "transform 0.3s ease",
                    transform: `translateX(-${index * width}px)`
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}>
                {items.map((item, i) => (
                    <div key={i} style={{ width }} className={'shrink-0 ' + classes}>
                        {item}
                    </div>
                ))}
            </div>

            <button
                onClick={prev}
                className='absolute top-1/2 left-px'
                disabled={index === 0}>
                ◀
            </button>

            <button
                onClick={next}
                className='absolute top-1/2 right-px'
                disabled={index === items.length - 1}>
                ▶
            </button>
        </div>
    );
}
