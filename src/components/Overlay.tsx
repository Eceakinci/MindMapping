"use client";

type OverlayProps = {
    visible: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
};

export default function Overlay({ visible, onClose, onUpload }: OverlayProps) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="w-1/2 h-1/2 bg-white flex flex-col justify-center gap-8 px-20">
                <label
                    className="border border-dashed border-stone-500/75 p-10 flex items-center justify-center italic text-stone-800 cursor-pointer flex flex-col"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) onUpload(file);
                        onClose();
                    }}
                >
                    <span className="text-sm opacity-80">I want to work with my own data</span>
                    <span className="text-sm opacity-60">(drag & drop or click)</span>
                
                    <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUpload(file);
                            e.target.value = "";
                            onClose();
                        }}
                    />
                </label>

                <button
                    className="border border-gray-400 p-10 text-stone-800 cursor-pointer italic"
                    onClick={onClose}
                >
                    start with default data this time
                </button>
            </div>
        </div>
    );
}
