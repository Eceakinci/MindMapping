"use client";
import { useState, useEffect } from "react";
import { Smartphone, Tablet, Monitor, Sun, Moon, Brush } from "lucide-react";

type Props = {
    visible: boolean;
    device: string;
    orientation: string;
    setDevice: (d: string) => void;
    setOrientation: (o: string) => void;
};

const PortraitIcon = () => (
    <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            width="12"
            height="18"
            x="2"
            y="1"
            stroke="currentColor"
            strokeWidth="2"
            rx="2"
        />
    </svg>
);

const LandscapeIcon = () => (
    <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            width="18"
            height="12"
            x="1"
            y="2"
            stroke="currentColor"
            strokeWidth="2"
            rx="2"
        />
    </svg>
);

export default function DevTools({
    visible,
    device,
    orientation,
    setDevice,
    setOrientation,
}: Props) {
    if (!visible) return null;

    const [mode, setMode] = useState("light");

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .dev-tools-container {
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        border: 1px dashed;
        padding: 10px;
        border-radius: 2px;
        text-align: center;
        z-index: 1000;
        min-width: 160px;
        font-family: sans-serif;
      }

      .dev-tools-title {
        margin-bottom: 6px;
        text-transform: lowercase;
        font-style: italic; 
      }

.dev-tools-row {
    display: grid;
    grid-template-columns: 70px 1fr;
    align-items: center;           
    gap: 8px;                       
    margin-bottom: 6px;
}

.dev-tools-label {
    text-align: right;              
    font-size: 0.75rem;
    font-style: italic;
    white-space: nowrap;
}

.dev-tools-buttons {
    display: flex;
    gap: 4px;                       
}

.dev-tools-buttons button {
    width: 32px;                      
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.dev-tools-buttons button.active {
    background-color: #333;
    color: #fff;
}

.dev-tools-buttons button:hover {
    background-color: #ddd;
}
    `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const changeMode = (newMode: string) => {
        setMode(newMode);
        document.documentElement.setAttribute("data-theme", newMode);
    };

    return (
        <div className="dev-tools-container">
            <div className="dev-tools-title">dev tools</div>

            {/* Screen size row */}
            <div className="dev-tools-row">
                <div className="dev-tools-label">screen size</div>
                <div className="dev-tools-buttons">
                    <button
                        className={device === "mobile" ? "active" : ""}
                        onClick={() => setDevice("mobile")}
                    >
                        <Smartphone size={16} />
                    </button>
                    <button
                        className={device === "tablet" ? "active" : ""}
                        onClick={() => setDevice("tablet")}
                    >
                        <Tablet size={16} />
                    </button>
                    <button
                        className={device === "desktop" ? "active" : ""}
                        onClick={() => setDevice("desktop")}
                    >
                        <Monitor size={16} />
                    </button>
                </div>
            </div>

            {/* Orientation row */}
            <div className="dev-tools-row">
                <div className="dev-tools-label">orientation</div>
                <div className="dev-tools-buttons">
                    <button
                        className={orientation === "portrait" ? "active" : ""}
                        onClick={() => setOrientation("portrait")}
                    >
                        <PortraitIcon />
                    </button>
                    <button
                        className={orientation === "landscape" ? "active" : ""}
                        onClick={() => setOrientation("landscape")}
                    >
                        <LandscapeIcon />
                    </button>
                </div>
            </div>

            {/* Color mode row with icons */}
            <div className="dev-tools-row">
                <div className="dev-tools-label">color mode</div>
                <div className="dev-tools-buttons">
                    <button
                        className={mode === "light" ? "active" : ""}
                        onClick={() => changeMode("light")}
                    >
                        <Sun size={16} />
                    </button>
                    <button
                        className={mode === "dark" ? "active" : ""}
                        onClick={() => changeMode("dark")}
                    >
                        <Moon size={16} />
                    </button>
                    <button
                        className={mode === "sepia" ? "active" : ""}
                        onClick={() => changeMode("sepia")}
                    >
                        <Brush size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
