"use client";
import React, { useState } from "react";

const InputComponent = ({ data, onChange, onSubmit }) => {
    const [firstSelect, setFirstSelect] = useState("noun");
    const [secondSelect, setSecondSelect] = useState("der");
    const [firstText, setFirstText] = useState("");
    const [secondText, setSecondText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedWord = firstText.trim().toLowerCase();

        // Check uniqueness
        const isDuplicate = data?.some(
            (item) => item.word.toLowerCase() === trimmedWord
        );

        if (!trimmedWord) return; // empty input
        if (isDuplicate) {
            alert("This word already exists, try using update function instead");
            return;
        }

        const formData = {
            firstSelect,
            secondSelect,
            firstText: trimmedWord,
            secondText: secondText.trim(),
        };

        onSubmit?.(formData);
    };

    const inputClass =
        "px-3 py-2 rounded-[2px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const selectClass =
        "px-3 py-2 rounded-[2px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[36vw] min-w-[300px] mx-auto p-4 shadow-md rounded-[2px] space-y-4"
        >
            {/* Object type */}
            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Select object type</label>
                <select
                    value={firstSelect}
                    onChange={(e) => setFirstSelect(e.target.value)}
                    className={selectClass}
                    required
                >
                    <option value="verb">verb</option>
                    <option value="noun">noun</option>
                </select>
            </div>

            {/* Article */}
            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Select article</label>
                <select
                    value={secondSelect}
                    onChange={(e) => setSecondSelect(e.target.value)}
                    className={selectClass}
                    required
                >
                    <option value="der">der</option>
                    <option value="die">die</option>
                    <option value="das">das</option>
                </select>
            </div>

            {/* Word input */}
            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Enter your word</label>
                <input
                    type="text"
                    value={firstText}
                    onChange={(e) => setFirstText(e.target.value.toLowerCase())}
                    className={inputClass}
                    required
                />
            </div>

            {/* Example Sentence */}
            <div className="flex flex-col">
                <label className="mb-1 font-semibold">
                    Enter sample sentence
                </label>
                <input
                    type="text"
                    value={secondText}
                    onChange={(e) => setSecondText(e.target.value)}
                    className={inputClass}
                    required
                />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="w-full rounded-[2px] border border-gray-700 font-semibold py-2 hover:bg-gray-100 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default InputComponent;
