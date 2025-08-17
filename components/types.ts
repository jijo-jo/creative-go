
import * as fabric from "fabric";

export type UndoState = string;

export type ChangeProps = Partial<{
  fill: string;
  fontSize: number;
  opacity: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
}>;

export interface SidePanelProps {
  selectedObject: fabric.Object | null;
  onChangeProp: (props: ChangeProps) => void;
}
