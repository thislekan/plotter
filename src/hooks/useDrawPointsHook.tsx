import { useEffect, useState, useCallback } from "react";
import { useDrawPointsProps } from "./interface";
import { Points, shapeKeys } from "../components/canvas/interface";
import {
  saveToLocalStorage,
  plotPoints,
  plotShapes,
} from "../components/utils/utils";

const MINIMUM_PATHS_TO_FILL = 2;

export const useDrawPoints = ({
  canvas,
  handleShapesCount,
}: useDrawPointsProps) => {
  const [points, setPoints] = useState<Points[]>([]);
  const [shapes, setShapes] = useState<Record<shapeKeys, Points[]>>({});
  const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

  const drawFn = useCallback(() => {
    if (!ctx || !canvas) return;
    if (points.length < MINIMUM_PATHS_TO_FILL) return;

    ctx.beginPath();
    plotPoints(points, ctx);
    const closePathX = points[0].x === points[points.length - 1].x;
    const closePathY = points[0].y === points[points.length - 1].y;

    if (closePathX && closePathY) {
      ctx.closePath();
      const num = Object.keys(shapes).length;
      setShapes((oldShapes) => {
        const newShapes = { ...oldShapes, [`${num}`]: points };
        saveToLocalStorage({ shapes: newShapes });
        return newShapes;
      });
      handleShapesCount();
      setPoints([]);
      saveToLocalStorage({ paths: [] });
    }
  }, [canvas, ctx, handleShapesCount, points, shapes]);

  const undoPoints = () => {
    const oldPoints = [...points];
    oldPoints.pop();
    setPoints(oldPoints);
    ctx.clearRect(0, 0, canvas?.height || 100, canvas?.width || 100);
    ctx.beginPath();
    plotPoints(oldPoints, ctx);
  };

  const undoShapes = (override?: boolean) => {
    const localShapes = { ...shapes };
    const keysOfShapes = Object.keys(localShapes);
    const lastKeyOfLocalShapes = keysOfShapes.length - 1;
    const newPoint = localShapes[lastKeyOfLocalShapes] || [];
    newPoint?.length && newPoint.pop();
    delete localShapes[lastKeyOfLocalShapes];
    const arrayOfPointsAsShapes = Object.values(localShapes);
    ctx.clearRect(0, 0, canvas?.height || 100, canvas?.width || 100);
    ctx.beginPath();
    plotShapes(arrayOfPointsAsShapes, ctx);
    setShapes(localShapes);
    setPoints(newPoint);
  };

  const undoFunc = () => {
    if (points.length && !shapes.length) return undoPoints();
    if (shapes.length && !points.length) return undoShapes();
    undoShapes(true);
    undoPoints();
  };

  useEffect(() => {
    if (canvas) {
      ctx && points.length && drawFn();
    }
  }, [canvas, ctx, drawFn, points]);

  return { shapes, points, setShapes, setPoints, drawFn, undoFunc, ctx };
};
