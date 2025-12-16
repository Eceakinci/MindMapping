"use client";
import { useState, useEffect } from "react";
import data from "../data/data.json";
import Slider from "../src/components/Slider";
import InputComponent from "../src/components/InputComponent";
import DeleteComponent from "../src/components/DeleteComponent";
import UpdateComponent from "../src/components/UpdateComponent";

export default function Page() {
    const [jsonData, setJsonData] = useState(data.data);
    const [mode, setMode] = useState("study");
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect(() => {
    //     console.log("jsonData updated:", jsonData);
    // }, [jsonData]);

    const renderModeComponent = () => {
        switch (mode) {
            case "create":
                return (
                    <InputComponent
                        onSubmit={handleFormSubmit}
                        data={undefined}
                        onChange={undefined}
                    />
                );

            case "delete":
                return (
                    <DeleteComponent
                        data={jsonData}
                        onDelete={(index: number) => handleDelete(index)}
                    />
                );

            case "update":
                return (
                    <UpdateComponent
                        item={jsonData[currentIndex]}
                        index={currentIndex}
                        onUpdate={handleUpdate}
                        onCancelOrSave={() => setMode("study")}
                    />
                );

            case "study":
                return (
                    <Slider
                        width={600}
                        classes={"px-16 pt-6"}
                        onIndexChange={setCurrentIndex}
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
                );

            default:
                return null;
        }
    };

    const handleFormSubmit = (formData) => {
        updateJsonData(formData);
    };

    const handleDelete = (index: number) => {
        setJsonData((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    };

    const handleUpdate = (index, updatedItem) => {
        setJsonData((prev) =>
            prev.map((item, i) => (i === index ? updatedItem : item))
        );
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
            <div className="flex  justify-center gap-2 mb-4">
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded"
                    onClick={() => setMode("create")}
                >
                    Create
                </button>
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded"
                    onClick={() => setMode("delete")}
                >
                    Delete
                </button>
                 <button className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded"
                         onClick={() => setMode("update")}
                 >Update
                 </button>
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded"
                    onClick={() => setMode("study")}
                >
                    Study
                </button>
            </div>

            {renderModeComponent()}
            {/* <InputComponent
                onSubmit={handleFormSubmit}
                data={undefined}
                onChange={undefined}
            /> */}

            {/* <Slider
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
            /> */}
        </div>
    );
}
