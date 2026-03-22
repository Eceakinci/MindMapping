"use client";
import { useState } from "react";
import DevTools from "../src/components/DevTools";

export default function Page() {
  const DEV_TOOLS = true;

  const [device, setDevice] = useState("mobile");
  const [orientation, setOrientation] = useState("portrait");

  const overlayClass = `overlay-${device}-${orientation}`;

  return (
    <div className="vertical-screen-center">
      <DevTools
        visible={DEV_TOOLS}
        device={device}
        orientation={orientation}
        setDevice={setDevice}
        setOrientation={setOrientation}
      />

      <div className={`responsive-overlay ${overlayClass}`}>
        <span>Overlay test page</span>
      </div>
    </div>
  );
}