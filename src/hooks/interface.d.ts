export interface useDrawPointsProps {
  drawFn?: () => void;
  canvas: HTMLCanvasElement | null;
  handleShapesCount: (reset?: boolean) => void;
}

export interface useStatisticsState {
  exportCount?: number;
  pointsCount?: number;
  undoneSteps?: number;
  shapeCount?: number;
}

export interface statsFunc {
  value?: useStatisticsState;
  reset?: boolean;
}
