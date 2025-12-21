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
                        onSubmit={handleCreate}
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

    const handleCreate = (formData) => {
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
        setCurrentIndex(jsonData.length -1);
        setMode("study");
        console.log(jsonData.length -1)
    };

    const handleDelete = (index: number) => {
        setJsonData((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
        setMode("study");
    };

    const handleUpdate = (index, updatedItem) => {
        setJsonData((prev) =>
            prev.map((item, i) => (i === index ? updatedItem : item))
        );
        setMode("study");
    };

    return (
        <div className="min-h-[90vh] flex flex-col max-w-[700px] mx-auto p-4">
            {/* Top buttons */}
            <div className="flex justify-center gap-2 mb-4">
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-[2px]"
                    onClick={() => setMode("create")}
                >
                    create
                </button>
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-[2px]"
                    onClick={() => setMode("delete")}
                >
                    delete
                </button>
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-[2px]"
                    onClick={() => setMode("update")}
                >
                    update
                </button>
                <button
                    className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-[2px]"
                    onClick={() => setMode("study")}
                >
                    study
                </button>
            </div>

            {/* Centered content */}
            <div className="flex-1 flex items-center justify-center">
                {renderModeComponent()}
            </div>
        </div>
    );
}
