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

export default function UpdateComponent({
  item,
  index,
  onUpdate,
  onCancelOrSave,
}: UpdateComponentProps) {
  if (!item) return null;

  const [temp, setTemp] = useState(item);

  useEffect(() => {
    setTemp(item);
  }, [item]);

  const handleChange = (key, value) => {
    setTemp((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass =
    "px-3 py-2 rounded-[2px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";
  const selectClass = inputClass;
  const buttonClass =
    "px-4 py-2 rounded-[2px] border border-gray-700 font-semibold hover:bg-gray-100 transition";

  return (
    <div className="w-[36vw] min-w-[300px] mx-auto p-4 shadow-md rounded-[2px] space-y-4">
      {/* Object type row */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Select object type</label>
        <select
          value={temp.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className={selectClass}
        >
          <option value="verb">verb</option>
          <option value="noun">noun</option>
        </select>
      </div>

      {/* Article row */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Select article</label>
        <select
          value={temp.article}
          onChange={(e) => handleChange("article", e.target.value)}
          className={selectClass}
        >
          <option value="der">der</option>
          <option value="die">die</option>
          <option value="das">das</option>
        </select>
      </div>

      {/* Word row */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Enter your word</label>
        <input
          type="text"
          value={temp.word}
          onChange={(e) => handleChange("word", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Example sentence row */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Enter sample sentence</label>
        <input
          type="text"
          value={temp.example}
          onChange={(e) => handleChange("example", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Buttons row, right-aligned */}
      <div className="flex justify-end gap-2">
        <button
          className={buttonClass}
          onClick={() => {
            onUpdate(index, temp);
            onCancelOrSave();
          }}
        >
          Save
        </button>

        <button
          className={buttonClass}
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
