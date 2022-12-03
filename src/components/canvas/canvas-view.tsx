import { useState, useRef, useEffect } from "react";
import { ModalComponent } from "../modal/modal";
import { Points, CanvasProps } from "./interface";
import { useOptimizeCanvas } from "../../hooks/useOptimizeCanvas";
import { useDrawPoints } from "../../hooks/useDrawPointsHook";
import { saveToLocalStorage, POINTS_PIXELS, plotShapes } from "../utils/utils";

export const CanvasView = ({
  // imageData,
  handlePointsCount,
  handleShapesCount,
  handleUndoneStepsCount,
  resetStats,
}: CanvasProps): JSX.Element => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOptimizeCanvas(canvas.current);

  const { ctx, points, setPoints, setShapes, undoFunc } = useDrawPoints({
    canvas: canvas.current,
    handleShapesCount,
  });

  const clickForPoints = (event: { clientX: number; clientY: number }) => {
    if (canvas.current) {
      const rect = canvas.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isCloseToOriginX = Math.round(Math.abs(x - points[0]?.x)) <= 5;
      const isCloseToOriginY = Math.round(Math.abs(y - points[0]?.y)) <= 5;
      let newPoints: Points[];
      if (points.length > 1 && isCloseToOriginX && isCloseToOriginY) {
        setPoints((oldPoints) => {
          newPoints = oldPoints?.concat({ x: points[0].x, y: points[0].y });
          saveToLocalStorage({ paths: newPoints });
          return newPoints;
        });
        ctx?.fillRect(points[0].x, points[0].y, POINTS_PIXELS, POINTS_PIXELS);
      } else {
        setPoints((oldPoint) => {
          newPoints = oldPoint?.concat({ x, y });
          saveToLocalStorage({ paths: newPoints });
          return newPoints;
        });
        ctx?.fillRect(x, y, POINTS_PIXELS, POINTS_PIXELS);
      }
      handlePointsCount();
    }
  };

  const restoreSession = () => {
    const data = JSON.parse(localStorage.getItem("shapesAndPoints") || "");
    const drawnShapes: Points[][] = Object.values(data?.shapes || {});
    if (drawnShapes.length) {
      setShapes(data.shapes);
      plotShapes(drawnShapes, ctx);
    }

    if (data.points.length) setPoints(data.points);
    setIsOpen(false);
  };

  const startNewSession = () => {
    localStorage.removeItem("shapesAndPoints");
    setIsOpen(false);
    ctx.clearRect(
      0,
      0,
      canvas.current?.height || 400,
      canvas.current?.width || 400
    );
    resetStats();
  };

  useEffect(() => {
    // undo function (quite buggy)
    document.addEventListener("keydown", function (event) {
      if (event.code === "KeyZ" && (event.ctrlKey || event.metaKey)) {
        if (canvas.current) {
          undoFunc();
          handleUndoneStepsCount();
        }
      }
    });
  }, [handleUndoneStepsCount, undoFunc]);

  // upload from json not working
  // useEffect(() => {
  //   if (canvas.current) {
  //     const ctx = canvas.current.getContext("2d");
  //     const image = new Image(); // Create new img element
  //     image.addEventListener(
  //       "load",
  //       () => {
  //         // execute drawImage statements here
  //         ctx?.clearRect(
  //           0,
  //           0,
  //           canvas.current?.width || 100,
  //           canvas.current?.height || 100
  //         );
  //         ctx?.drawImage(image, 0, 0); // draw the new image to the screen
  //       },
  //       false
  //     );
  //     image.src = imageData;
  //   }
  // }, [imageData]);

  useEffect(() => {
    const { shapes: savedShapes = {}, points: savedPoints = {} } =
      JSON.parse(localStorage.getItem("shapesAndPoints") || "{}") || {};
    if (Object.keys(savedShapes)?.length || savedPoints?.length)
      setIsOpen(true);
  }, []);

  return (
    <div className="view-box">
      {isOpen && (
        <ModalComponent
          restoreFunc={restoreSession}
          newSessionFunc={startNewSession}
        />
      )}
      <div className="canvas-view">
        <canvas
          height={750}
          width={1200}
          style={{ border: "1px solid black" }}
          onClick={clickForPoints}
          ref={canvas}
          id="canvass"
        ></canvas>
      </div>
    </div>
  );
};
