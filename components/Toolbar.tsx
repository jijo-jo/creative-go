"use client";

import React, { FC, useRef } from "react";

const Toolbar: FC<{
  onAddImage: (file: File) => Promise<void>;
  onAddText: (text?: string) => void;
  onDelete: () => void;
  onExport: () => void;
  isImageLoaded: boolean;
}> = ({ onAddImage, onAddText, onDelete, onExport, isImageLoaded }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const input = e.currentTarget;
    await onAddImage(e.target.files[0]);
    input.value = "";
  };

  return (
    <div className="w-full flex flex-wrap gap-3 items-center text-black bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
      <button
        className="cursor-pointer bg-black text-white hover:text-black hover:bg-white border border-transparent hover:border-black px-5 py-2 rounded-lg text-sm font-medium transition"
        onClick={() => fileRef.current?.click()}
      >
        Upload Image
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      {isImageLoaded && (
        <>
          <button
            className="text-sm text-black hover:text-gray-500 px-5 py-2 rounded-lg transition"
            onClick={() => onAddText("Your Text Here")}
          >
            Add Text
          </button>
          <div className="flex-grow" />
          <button
            className="text-sm text-red-500 hover:text-red-700 px-5 py-2 rounded-lg transition"
            onClick={onDelete}
          >
            Clear All
          </button>
          <button
            className="cursor-pointer bg-blue-500 text-white hover:text-blue-500 hover:bg-white border border-transparent hover:border-blue-500 px-5 py-2 rounded-lg text-sm font-medium transition"
            onClick={onExport}
          >
            Export PNG
          </button>
        </>
      )}
    </div>
  );
};

export default Toolbar;
