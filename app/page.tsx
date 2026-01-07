"use client";
import { useState, useEffect } from "react";
import data from "../data/data.json";
import Slider from "../src/components/Slider";
import { toProperCase } from "../src/utils/string";
import InputComponent from "../src/components/CreateComponent";
import DeleteComponent from "../src/components/DeleteComponent";
import UpdateComponent from "../src/components/UpdateComponent";

export default function Page() {
    const [jsonData, setJsonData] = useState(data.data);
    const [mode, setMode] = useState("study");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // console.log("currentindex updated:", currentIndex);
    }, [currentIndex]);

    const renderModeComponent = () => {
        switch (mode) {
            case "create":
                return (
                    <InputComponent
                        onSubmit={handleCreate}
                        data={jsonData}
                        onChange={undefined}
                    />
                );

            case "delete":
                return (
                    <DeleteComponent
                        data={jsonData}
                        onDelete={(currentIndex: number) =>
                            handleDelete(currentIndex)
                        }
                        currentIndex={currentIndex}
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
                        startIndex={currentIndex}
                        items={jsonData.map((item) => (
                            <div
                                key={item.word + item.type}
                                className="space-y-2 px-4"
                            >
                                <p className="italic text-gray-600">
                                    {item.type}
                                </p>
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
                                        <span className="opacity-80">
                                            {toProperCase(item.word)}
                                        </span>
                                    </strong>
                                </div>
                                <p className="text-gray-800 opacity-70 italic">
                                    {item.example}
                                </p>
                            </div>
                        ))}
                        width={600}
                        classes="px-16 pt-6"
                        onIndexChange={setCurrentIndex}
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
        setCurrentIndex(jsonData.length);
        setMode("study");
    };

    const handleDelete = (index: number) => {
        setJsonData((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
        setCurrentIndex(index - 1 != 0 ? index - 1 : 0);
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
