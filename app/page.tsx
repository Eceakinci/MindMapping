"use client";
import { useState, useEffect } from "react";
import data from "../data/data.json";
import Slider from "../src/components/Slider";
import InputComponent from "../src/components/InputComponent";
import { Input } from "postcss";

export default function Page() {
    const [jsonData, setJsonData] = useState(data.data);

    // useEffect(() => {
    //     console.log("jsonData updated:", jsonData);
    // }, [jsonData]);

    const handleFormSubmit = (formData) => {
        updateJsonData(formData);
    };

    // Function to update JSON data
    const updateJsonData = (formData) => {
        // Example: add new entry to JSON array
        const newData = [
            ...jsonData,
            {
                type: formData.firstSelect,
                article: formData.secondSelect,
                word: formData.firstText,
                example: formData.secondText,
            },
        ];
        setJsonData(newData);
    };

    return (
        <div className="flex flex-col justify-center m-auto w-120 p-4">
            <InputComponent
                onSubmit={handleFormSubmit}
                data={undefined}
                onChange={undefined}
            />

            <Slider
                width={600}
                classes={"px-16 pt-6"}
                items={jsonData.map((item) => (
                    <div>
                        <p className="italic">{item.type}</p>
                        <div>
                            <strong>
                                <span className="text-red-600">
                                    {item.article}
                                </span>{" "}
                                {item.word}
                            </strong>
                        </div>
                        <p className="text-green-600">{item.example}</p>
                    </div>
                ))}
            />
        </div>
    );
}
