
"use client";

import React, { FC } from "react";
import * as fabric from "fabric";
import { ChangeProps } from "./types"
import CustomDropdown from "./CustomDropDown";

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Roboto",
  "Poppins",
  "Inter",
];

const TextControls: FC<{
  selectedObject: fabric.IText | fabric.Textbox;
  onChangeProp: (props: ChangeProps) => void;
}> = ({ selectedObject, onChangeProp }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-gray-800">Text Settings</h3>

      <div>
        <CustomDropdown
          label="Font Family"
          options={fontFamilies.map((font) => ({
            value: font,
            label: <span style={{ fontFamily: font }}>{font}</span>,
          }))}
          defaultValue={selectedObject.fontFamily || "Arial"}
          onChange={(val) => onChangeProp({ fontFamily: val })}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">
          Font Size
        </label>
        <input
          type="number"
          defaultValue={selectedObject.fontSize ?? 24}
          min={6}
          onChange={(e) =>
            onChangeProp({ fontSize: parseInt(e.target.value || "24") })
          }
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>

      <div>
        <CustomDropdown
          label="Font Weight"
          options={[
            { value: "normal", label: "Normal" },
            { value: "bold", label: "Bold" },
          ]}
          defaultValue={String(selectedObject.fontWeight || "normal")}
          onChange={(val) => onChangeProp({ fontWeight: val })}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">
          Alignment
        </label>
        <div className="flex gap-2">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              onClick={() => onChangeProp({ textAlign: align })}
              className={`flex-1 p-2 rounded-lg border text-xs font-medium capitalize transition ${
                selectedObject.textAlign === align
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      <div className=" flex flex-row items-center justify-between">
        <label className="block text-xs font-semibold mb-1 text-gray-500">
          Text Color
        </label>
        <input
          type="color"
          defaultValue={(selectedObject.fill as string) ?? "#000000"}
          onChange={(e) => onChangeProp({ fill: e.target.value })}
          className="w-[40%] h-10 rounded-lg cursor-pointer border border-gray-300"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">
          Opacity
        </label>
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
    </div>
  );
};

export default TextControls;
