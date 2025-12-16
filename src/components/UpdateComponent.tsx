"use client";
import React, { useState, useEffect } from "react";

interface UpdateComponentProps {
    item: {
        type: string;
        article: string;
        word: string;
        example: string;
    };
    index: number;
    onUpdate: (index: number, updatedItem: any) => void;
    onCancelOrSave: () => void;
}

export default function UpdateComponent({ item, index, onUpdate, onCancelOrSave }: UpdateComponentProps) {

    if(!item) return null;

    const [temp, setTemp] = useState(item);

    useEffect(() => {
        setTemp(item);
    }, [item]);

    const handleChange = (key, value) => {
        setTemp((prev) => ({ ...prev, [key]: value }));
    };


    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg">
            {/* Editable fields */}
            <select
                value={temp.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="verb">verb</option>
                <option value="noun">noun</option>
            </select>

            <select
                value={temp.article}
                onChange={(e) => handleChange("article", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
            </select>

            <input
                type="text"
                value={temp.word}
                onChange={(e) => handleChange("word", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={temp.example}
                onChange={(e) => handleChange("example", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
                <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => {
                    onUpdate(index, temp);
                    onCancelOrSave(); // study moda dön
                }}
                >
                    Save
                </button>

                <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => {
                        setTemp(item);
                        onCancelOrSave();
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
