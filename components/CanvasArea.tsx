"use client";
import { FC, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Toolbar from "./Toolbar";
import LayerSidebar from "./LayerItem";
import SidePanel from "./SidePanel";

type UndoState = string;

const CanvasArea: FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const undoStack = useRef<UndoState[]>([]);

  const pushHistory = () => {
    if (!canvasRef.current) return;
    undoStack.current.push(JSON.stringify(canvasRef.current.toJSON()));
    if (undoStack.current.length > 100) undoStack.current.shift();
  };

  useEffect(() => {
    const c = new fabric.Canvas("moodboard-canvas", {
      backgroundColor: "#f8fafc",
      preserveObjectStacking: true,
      selection: true,
      height: 600,
      width: 800,
    });

    canvasRef.current = c;

    c.on("selection:created", (e) =>
      setSelectedObject(e.selected?.[0] ?? null)
    );
    c.on("selection:updated", (e) =>
      setSelectedObject(e.selected?.[0] ?? null)
    );
    c.on("selection:cleared", () => setSelectedObject(null));
    c.on("object:modified", pushHistory);

    return () => {
      c.dispose();
    };
  }, []);

  const addImage = (input: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (!canvasRef.current || !containerRef.current) return;

          const { naturalWidth, naturalHeight } = img;

          const containerWidth = containerRef.current.clientWidth;
          const containerHeight =
            (containerWidth / naturalWidth) * naturalHeight;

          canvasRef.current.setWidth(containerWidth);
          canvasRef.current.setHeight(containerHeight);
          containerRef.current.style.height = `${containerHeight}px`;

          const fabricImage = new fabric.Image(img, {
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            hasControls: false,
          });

          fabricImage.scaleToWidth(canvasRef.current.getWidth());

          canvasRef.current.clear();
          canvasRef.current.add(fabricImage);
          canvasRef.current.renderAll();
          setIsImageLoaded(true);
          pushHistory();
          resolve();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(input);
    });
  };

  const addText = (text = "Your Text Here") => {
    const c = canvasRef.current;
    if (!c) return;

    const t = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      fontSize: 28,
      fill: "#000000",
      fontFamily: "Arial",
      textAlign: "left",
      lineHeight: 1.2,
      editable: true,
      width: 250,
    });
    c.add(t);
    c.setActiveObject(t);
    c.renderAll();
    pushHistory();
  };
  

  const resetCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;

   
    c.clear();

   
    c.setWidth(800);
    c.setHeight(600);


    setIsImageLoaded(false);
    setSelectedObject(null);
    pushHistory();
  };

  const exportPNG = () => {
    const c = canvasRef.current;
    if (!c || !isImageLoaded) return;
    const dataUrl = c.toDataURL({ format: "png", multiplier: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "edited-image.png";
    a.click();
  };

  const changeProps = (
    props: Partial<{
      fill: string;
      fontSize: number;
      opacity: number;
      fontFamily: string;
      fontWeight: string;
      textAlign: string;
    }>
  ) => {
    const c = canvasRef.current;
    if (!c) return;
    const obj = c.getActiveObject();
    if (!obj) return;

    obj.set(props);
    obj.setCoords();
    c.requestRenderAll();
  };

  return (
    <div className="h-full flex flex-col gap-4 text-black">
      <Toolbar
        onAddImage={addImage}
        onAddText={addText}
        onDelete={resetCanvas}
        onExport={exportPNG}
        isImageLoaded={isImageLoaded}
      />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/5 w-full">
          <LayerSidebar canvas={canvasRef.current} />
        </div>

        <div className="flex-1 bg-gray-50 rounded-xl p-3 shadow-inner relative overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center pointer-events-none">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl">
                <p>Upload a PNG image to get started.</p>
              </div>
            </div>
          )}
          <div
            ref={containerRef}
            className="w-full h-full rounded bg-white border border-dashed border-gray-200"
          >
            <canvas id="moodboard-canvas" className="max-w-full h-auto" />
          </div>
        </div>

        <div className="lg:w-1/4 w-full h-full">
          <SidePanel
            selectedObject={selectedObject}
            onChangeProp={changeProps}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;
