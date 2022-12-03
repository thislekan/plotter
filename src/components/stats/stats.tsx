import { memo } from "react";
import { StatsViewProps } from "./interface";

export const StatsView = memo(
  ({
    shapeCount,
    clickCount,
    exportCount,
    undoneSteps,
  }: StatsViewProps): JSX.Element => {
    return (
      <div className="stats">
        <div className="stats__container">
          <div className="stats__container__content">
            <div className="cards">
              <p className="top">Shapes</p>
              <p className="bottom">{shapeCount}</p>
            </div>
            <div className="cards">
              <p className="top">Points</p>
              <p className="bottom">{clickCount}</p>
            </div>
            <div className="cards">
              <p className="top">Undone Steps</p>
              <p className="bottom">{undoneSteps}</p>
            </div>
            <div className="cards">
              <p className="top">File Exported</p>
              <p className="bottom">{exportCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
