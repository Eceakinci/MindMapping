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
    const [helpMessage, setHelpMessage] = useState<string | null>(null);

    const showHelpMessage = (message: string, duration = 3000) => {
        setHelpMessage(message);
        setTimeout(() => setHelpMessage(null), duration);
    };

    useEffect(() => {
        // console.log("currentindex updated:", currentIndex);
    }, [currentIndex]);

    const downloadJSON = (data: unknown, filename = "data.json") => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    };

    const uploadJSON = async (file: File) => {
        try {
            const text = await file.text();
            const parsed = JSON.parse(text);

            if (!Array.isArray(parsed)) throw new Error();

            setJsonData(parsed);
            setCurrentIndex(0);
            setMode("study");

            showHelpMessage("You have uploaded your own data");
        } catch {
            showHelpMessage("Invalid JSON file");
        }
    };

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
                                                    ? "text-blue-600"
                                                    : item.article === "die"
                                                    ? "text-red-600"
                                                    : "text-green-600"
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
                        classes="px-16 py-10"
                        onIndexChange={setCurrentIndex}
                        isStudy={true}
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

            {/* import export buttons */}
            <div className="fixed top-4 right-4 flex gap-2">
                <label className="w-20 h-8 flex items-center justify-center rounded-md hover:bg-rose-400 cursor-pointer">
                    upload
                    <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadJSON(file);
                            e.target.value = ""; // allow re-uploading same file
                        }}
                    />
                </label>

                <label
                    className="w-20 h-8 flex items-center justify-center rounded-md hover:bg-rose-400 cursor-pointer"
                    onClick={() => downloadJSON(jsonData, "vocab.json")}
                >
                    download
                </label>
            </div>

            {/* overrideable help message */}
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {true && (
                    <div className="px-4 py-2 rounded-md text-sm">
                        {helpMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
