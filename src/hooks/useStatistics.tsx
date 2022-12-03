import { useState } from "react";
import { statsFunc, useStatisticsState } from "./interface";

const defaultState = {
  exportCount: 0,
  pointsCount: 0,
  undoneSteps: 0,
  shapeCount: 0,
};
export const useStatistics = () => {
  const [stats, setStats] = useState<useStatisticsState>(defaultState);
  const { exportCount, pointsCount, undoneSteps, shapeCount } = stats;

  const handleStatsChange = ({ value, reset = false }: statsFunc) => {
    if (reset) setStats(defaultState);
    setStats((oldStats) => ({ ...oldStats, ...value }));
  };

  return {
    exportCount,
    pointsCount,
    undoneSteps,
    shapeCount,
    handleStatsChange,
  };
};
