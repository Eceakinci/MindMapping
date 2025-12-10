"use client";
import React, { useState, useEffect } from "react";
import Slider from "./Slider";

interface DeleteComponentProps {
    data: { type: string; article: string; word: string; example: string }[];
    onDelete: (index: number) => void;
}

export default function DeleteComponent({ data, onDelete }: DeleteComponentProps) {
    const [index, setIndex] = useState(0);

    // Make sure index stays in bounds if data changes
    useEffect(() => {
        if (index >= data.length && data.length > 0) {
            setIndex(data.length - 1);
        }
    }, [data, index]);

    const handleConfirmDelete = () => {
        if (data.length === 0) return;
        onDelete(index);
    };

    return (
        <div className="relative w-fit mx-auto">
            <Slider
                items={data.map((item) => (
                    <div key={item.word + item.type}>
                        <p className="italic">{item.type}</p>
                        <div>
                            <strong>
                                <span className="text-red-600">{item.article}</span>{" "}
                                {item.word}
                            </strong>
                        </div>
                        <p className="text-green-600">{item.example}</p>
                    </div>
                ))}
                width={600}
                classes="px-16 pt-6"
                onIndexChange={setIndex} // Track current slider index
            />

            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
                    onClick={handleConfirmDelete}
                >
                    confirm delete
                </button>
            </div>
        </div>
    );
}
