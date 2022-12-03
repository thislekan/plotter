import { useEffect } from "react";

export const useOptimizeCanvas = (canvas: HTMLCanvasElement | null) => {
  useEffect(() => {
    // optimizing canvas size
    if (canvas) {
      const ctx = canvas.getContext("2d");
      // Get the DPR and size of the canvas
      const dpr = window.devicePixelRatio;
      const rect = canvas.getBoundingClientRect();

      // Set the "actual" size of the canvas
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the context to ensure correct drawing operations
      ctx?.scale(dpr, dpr);

      // Set the "drawn" size of the canvas
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  }, [canvas]);
};
