"use client";
import { FC, useEffect, useState } from "react";
import { Type, Image as ImageIcon, Trash2 } from "lucide-react";
import * as fabric from "fabric";

interface LayerSidebarProps {
  canvas: fabric.Canvas | null;
}

interface FabricObjectWithId extends fabric.Object {
  id?: string;
  type: "textbox" | "image" | string;
}

const LayerSidebar: FC<LayerSidebarProps> = ({ canvas }) => {
  const [layers, setLayers] = useState<FabricObjectWithId[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const refreshLayers = () => {
    if (!canvas) return;
    const objs = canvas.getObjects() as FabricObjectWithId[];

    objs.forEach((obj, index) => {
      if (!obj.id) {
        obj.id = `layer-${index}-${Date.now()}`;
      }
    });

    const filteredObjs = objs.filter(
      (obj) => obj.type === "textbox" || obj.type === "image"
    );

    setLayers([...filteredObjs].reverse());
  };

  useEffect(() => {
    if (!canvas) return;

    refreshLayers();
    const update = () => refreshLayers();

    canvas.on("object:added", update);
    canvas.on("object:removed", update);
    canvas.on("object:modified", update);
    canvas.on("selection:created", () => {
      const sel = canvas.getActiveObject() as FabricObjectWithId | null;
      if (sel?.id) setActiveId(sel.id);
    });
    canvas.on("selection:updated", () => {
      const sel = canvas.getActiveObject() as FabricObjectWithId | null;
      if (sel?.id) setActiveId(sel.id);
    });
    canvas.on("selection:cleared", () => setActiveId(null));

    return () => {
      canvas.off("object:added", update);
      canvas.off("object:removed", update);
      canvas.off("object:modified", update);
      canvas.off("selection:created");
      canvas.off("selection:updated");
      canvas.off("selection:cleared");
    };
  }, [canvas]);

  const selectLayer = (obj: FabricObjectWithId) => {
    if (!canvas) return;
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
    setActiveId(obj.id ?? null);
  };

  const deleteLayer = (obj: FabricObjectWithId) => {
    if (!canvas) return;
    canvas.remove(obj);
    setLayers((prev) => prev.filter((l) => l.id !== obj.id));
    canvas.requestRenderAll();
    if (activeId === obj.id) setActiveId(null);
  };

  const handleDragStart = (e: React.DragEvent, objId: string) => {
    setDraggingId(objId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!canvas || !draggingId || draggingId === targetId) {
      setDraggingId(null);
      return;
    }

    const objects = canvas.getObjects() as FabricObjectWithId[];
    const draggedObj = objects.find((o) => o.id === draggingId);
    const targetObj = objects.find((o) => o.id === targetId);

    if (draggedObj && targetObj) {
      const draggedIndex = objects.indexOf(draggedObj);
      const targetIndex = objects.indexOf(targetObj);

    
      objects.splice(draggedIndex, 1);


      objects.splice(targetIndex, 0, draggedObj);
      canvas.renderAll();
    }

    const oldIndex = layers.findIndex((l) => l.id === draggingId);
    const newIndex = layers.findIndex((l) => l.id === targetId);
    const newLayers = [...layers];
    const [draggedItem] = newLayers.splice(oldIndex, 1);
    newLayers.splice(newIndex, 0, draggedItem);
    setLayers(newLayers);

    canvas.requestRenderAll();
    setDraggingId(null);
  };

  return (
    <aside className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl w-72 flex flex-col h-full overflow-hidden">
      <h2 className="font-semibold text-lg p-4 text-gray-800 text-center">
        Layers
      </h2>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {layers.map((layer, idx) => {
          const id = layer.id ?? `layer-${idx}`;
          const label =
            (layer.type === "textbox" && "text" in layer
              ? (layer as fabric.Textbox).text
              : null) ||
            (layer.type === "image" ? "Image Layer" : "Layer") +
              ` ${layers.length - idx}`;

          const icon =
            layer.type === "textbox" ? (
              <Type size={16} />
            ) : layer.type === "image" ? (
              <ImageIcon size={16} />
            ) : null;

          return (
            <div
              key={id}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                activeId === id
                  ? "bg-blue-50 border-blue-400 shadow-md"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              } ${draggingId === id ? "opacity-50" : ""}`}
              draggable
              onClick={() => selectLayer(layer)}
              onDragStart={(e) => handleDragStart(e, id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id)}
            >
              <div className="flex items-center gap-2 truncate">
                {icon}
                <span className="truncate text-sm font-medium text-gray-700">
                  {label}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLayer(layer);
                }}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
        {layers.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-6">
            No text or image layers yet.
          </p>
        )}
      </div>
    </aside>
  );
};

export default LayerSidebar;
