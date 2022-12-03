export type shapeKeys = string;
export interface Points {
  x: number;
  y: number;
}

export interface PersistedData {
  shapes?: Record<shapeKeys, Points[]>;
  paths?: Points[] | [];
}

export interface CanvasProps {
  imageData: string;
  handlePointsCount: (reset?: boolean) => void;
  handleShapesCount: (reset?: boolean) => void;
  handleUndoneStepsCount: (reset?: boolean) => void;
  resetStats: () => void;
}
