"use client";
import { useState, useEffect } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

type Props = {
  visible: boolean;
};

// Simple SVG icons for orientation
const PortraitIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="18" x="2" y="1" stroke="currentColor" strokeWidth="2" rx="2" />
  </svg>
);

const LandscapeIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="12" x="1" y="2" stroke="currentColor" strokeWidth="2" rx="2" />
  </svg>
);

export default function DevTools({ visible }: Props) {
  const [device, setDevice] = useState("desktop");
  const [orientation, setOrientation] = useState("portrait");

  if (!visible) return null;

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
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
      }

      .dev-tools-label {
        font-size: 0.75rem;
        font-style: italic;
        margin-right: 4px;
        white-space: nowrap;
      }

      .dev-tools-buttons {
        display: flex;
      }

      .dev-tools-buttons button {
        flex: 1;
        padding: 4px 10px;
        border: 1px solid;
        background-color: #fff;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dev-tools-buttons button:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
      }

      .dev-tools-buttons button:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: none;
      }

      .dev-tools-buttons button:not(:first-child):not(:last-child) {
        border-left: none;
        border-right: none;
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
    </div>
  );
}