
import * as fabric from "fabric";

export const hasFill = (
  obj: fabric.Object
): obj is fabric.Object & { fill: string } => "fill" in obj;
