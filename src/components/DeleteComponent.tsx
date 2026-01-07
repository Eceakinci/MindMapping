"use client";
import React, { useState, useEffect } from "react";
import Slider from "./Slider";

interface DeleteComponentProps {
  data: { type: string; article: string; word: string; example: string }[];
  onDelete: (index: number) => void;
  currentIndex?: number;
}

export default function DeleteComponent({ data, onDelete, currentIndex }: DeleteComponentProps) {
  const [index, setIndex] = useState(0);
  const settedIndex = currentIndex;

  useEffect(() => {
    if (index >= data.length && data.length > 0) {
      setIndex(data.length - 1);
    }
  }, [data, index]);


  const handleConfirmDelete = () => {
    if (data.length === 0) return;
    onDelete(index);
  };

  const buttonClass =
    "px-4 py-2 rounded-[2px] border border-gray-700 font-semibold hover:bg-gray-100 transition";

  return (
    <div className="relative w-[36vw] min-w-[300px] mx-auto shadow-md rounded-[2px] p-4">
      <Slider
          startIndex={settedIndex}
          items={data.map((item) => (
          <div key={item.word + item.type} className="space-y-2 px-4">
            <p className="italic text-gray-600">{item.type}</p>
            <div>
              <strong>
                <span
                  className={
                    item.article === "der"
                      ? "text-blue-300"
                      : item.article === "die"
                      ? "text-red-300"
                      : "text-green-300"
                  }
                >
                  {item.article}
                </span>{" "}
                <span className="opacity-80">{item.word}</span>
              </strong>
            </div>
            <p className="text-gray-800 opacity-70 italic">{item.example}</p>
          </div>
        ))}
        width={600}
        classes="px-16 pt-6"
        onIndexChange={setIndex}
      />

      <div className="flex justify-center mt-4">
        <button className={buttonClass} onClick={handleConfirmDelete}>
          Confirm Delete
        </button>
      </div>
    </div>
  );
}