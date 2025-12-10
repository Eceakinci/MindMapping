"use client";
import React, { useState } from "react";

export default function UpdateComponent({ item, onSave }) {
    // Handle for first render
    if(!item) return null;

    const [editing, setEditing] = useState(false);
    const [temp, setTemp] = useState(item);

    const handleChange = (key, value) => {
        setTemp({ ...temp, [key]: value });
    };


    return (
        <div className="p-4 border rounded-lg">
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
                        onSave(temp);
                        setEditing(false);
                    }}
                >
                    Save
                </button>

                <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => {
                        setEditing(false);
                        setTemp(item); // revert changes
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
