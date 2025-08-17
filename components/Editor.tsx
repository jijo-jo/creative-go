import React from 'react';
import CanvasArea from './CanvasArea';

export default function ImageEditorPage() {
  return (
    <div id="editor" className="min-h-screen p-6 bg-gray-100 text-black w-full">
      <div className="max-w-[1600px] mx-auto">
        <CanvasArea />
      </div>
    </div>
  );
}
