"use client";
import DevTools from "../src/components/DevTools";
import { useState } from "react";

export default function Page() {
    const DEV_TOOLS = true;
    const [device, setDevice] = useState("mobile");
    const [orientation, setOrientation] = useState("portrait");
    const overlayClass = `overlay-${device}-${orientation}`;

    return (
        <div className="center-content w-full h-full relative">
            <DevTools
                visible={DEV_TOOLS}
                device={device}
                orientation={orientation}
                setDevice={setDevice}
                setOrientation={setOrientation}
            />

            <div
                className={`center-content responsive-overlay ${overlayClass} w-full h-full relative flex-col gap-4`}
            >

                {/* download */}
                <div className="layout-box download-data">
                    v
                </div>

                {/* sequence functions: prev, next */}
                <div className="layout-box sequence-prev">
                    &lt;
                </div>

                <div className="layout-box sequence-next">
                    &gt;
                </div>

                {/* main region: card area */}
                <div className="layout-box main-region">
                    main region
                </div>

                {/* function row: creatae delete update retrieve */}
                <div className="layout-box-borderless crud-functions">
                    <div className="layout-box">create</div>
                    <div className="layout-box">delete</div>
                    <div className="layout-box">update</div>
                    <div className="layout-box">delete</div>
                </div>
            </div>
        </div>
    );
}
