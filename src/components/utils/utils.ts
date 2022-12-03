import { PersistedData, Points, shapeKeys } from "../canvas/interface";

export const POINTS_PIXELS = 4;
export const fetchFromLocalStorage = () => {
  const data =
    JSON.parse(localStorage.getItem("shapesAndPoints") || "{}") || {};
  return data;
};

export const saveToLocalStorage = ({ shapes, paths }: PersistedData): void => {
  const data = fetchFromLocalStorage();
  const toBePersisted = {
    shapes: shapes || data?.shapes,
    points: paths || data?.points,
  };
  localStorage.setItem("shapesAndPoints", JSON.stringify(toBePersisted));
};

export const plotPoints = (points: Points[], ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < points.length; i++) {
    const pos = points[i];
    if (i === 0) {
      ctx.moveTo(pos.x, pos.y);
    } else {
      ctx.lineTo(pos.x, pos.y);
    }
    ctx?.fillRect(pos.x, pos.y, POINTS_PIXELS, POINTS_PIXELS);
  }
  ctx.stroke();
};

export const plotShapes = (
  shapes: Points[][],
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i < shapes.length; i++) {
    const _shape: Points[] = shapes[i];
    plotPoints(_shape, ctx);
    ctx?.closePath();
  }
};
