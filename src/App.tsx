import { CanvasView } from "./components/canvas/canvas-view";
import { ControlComponent } from "./components/controls/controls";
import { StatsView } from "./components/stats/stats";
import { useState } from "react";
import "./index.scss";

function App() {
  const [imageData, setImageData] = useState("");
  const [shapeCount, setShapeCount] = useState(0);
  const [pointsCount, setPointsCount] = useState(0);
  const [undoneSteps, setUndoneSteps] = useState(0);
  const [exportCount, setExportCount] = useState(0);
  const [view, setView] = useState(1);

  const handleImageData = (data: string) => setImageData(data);
  const toggleView = () => setView((view) => (view !== 1 ? 1 : 2));
  const handleExportCount = (reset?: boolean) => {
    setExportCount((count) => (reset ? 0 : count + 1));
  };
  const handleUndoneStepsCount = (reset?: boolean) => {
    setUndoneSteps((step) => (reset ? 0 : step + 1));
  };
  const handleShapesCount = (reset?: boolean) => {
    setShapeCount((count) => (reset ? 0 : count + 1));
  };
  const handlePointsCount = (reset?: boolean) => {
    setPointsCount((count) => (reset ? 0 : count + 1));
  };
  const resetStats = () => {
    handleExportCount(true);
    handlePointsCount(true);
    handleShapesCount(true);
    handleUndoneStepsCount(true);
  };

  return (
    <div className="App">
      <div className="tabs-container">
        <button
          className="tabs-container__btn tabs-container__btn--left"
          onClick={toggleView}
          disabled={view === 1}
        >
          Create Shapes
        </button>
        <button
          className="tabs-container__btn tabs-container__btn--right"
          onClick={toggleView}
          disabled={view === 2}
        >
          View Stats
        </button>
      </div>
      {view === 1 ? (
        <>
          <CanvasView
            imageData={imageData}
            handlePointsCount={handlePointsCount}
            handleShapesCount={handleShapesCount}
            handleUndoneStepsCount={handleUndoneStepsCount}
            resetStats={resetStats}
          />
          <ControlComponent
            storeFileFunc={handleImageData}
            handleExportCount={handleExportCount}
          />
        </>
      ) : (
        <StatsView
          shapeCount={shapeCount}
          clickCount={pointsCount}
          undoneSteps={undoneSteps}
          exportCount={exportCount}
        />
      )}
    </div>
  );
}

export default App;
