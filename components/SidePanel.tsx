
"use client";

import React, { FC } from "react";
import * as fabric from "fabric";
import TextControls from "./TextControls";
import { SidePanelProps } from "./types";
import { hasFill } from "./utils";

const SidePanel: FC<SidePanelProps> = ({ selectedObject, onChangeProp }) => {
  if (!selectedObject) {
    return (
      <div className="p-4 text-black bg-white rounded-lg shadow-sm h-[80vh] text-center">
        <h3 className="font-semibold">No selection</h3>
        <p className="text-sm text-gray-500 mt-8">
          Select an object to see properties.
        </p>
      </div>
    );
  }

  const isText =
    selectedObject.type === "i-text" || selectedObject.type === "textbox";

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-y-auto max-h-[80vh]">
      <h3 className="font-semibold mb-3">Properties</h3>
      {isText ? (
        <TextControls
          selectedObject={selectedObject as fabric.IText | fabric.Textbox}
          onChangeProp={onChangeProp}
        />
      ) : (
        <>
          <div>
            <label className="block text-xs font-semibold">Opacity</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              defaultValue={(selectedObject.opacity ?? 1).toString()}
              onChange={(e) =>
                onChangeProp({ opacity: parseFloat(e.target.value) })
              }
              className="w-full accent-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold">Fill / Color</label>
            <input
              type="color"
              defaultValue={
                hasFill(selectedObject)
                  ? selectedObject.fill ?? "#000000"
                  : "#000000"
              }
              onChange={(e) => onChangeProp({ fill: e.target.value })}
              className="w-full h-10 rounded cursor-pointer border border-gray-300"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SidePanel;
