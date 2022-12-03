import { useState, memo } from "react";
import { SaveToPCProps } from "./interface";

export const SaveToPCComponent = memo(
  ({ handleExportCount }: SaveToPCProps): JSX.Element => {
    const [downloadUrl, setDownloadUrl] = useState("");
    const saveToJSOn = () => {
      const canvas = document.getElementById("canvass") as HTMLCanvasElement;
      const content = canvas?.toDataURL("image/webp", 0.5);
      const stringifiedContent = JSON.stringify(content);
      const file = new Blob([stringifiedContent], {
        type: "application/json",
      });
      const url = URL.createObjectURL(file);
      setDownloadUrl(url);
      handleExportCount();
    };

    return (
      <>
        {!downloadUrl ? (
          <button className="btns btns--left" onClick={saveToJSOn}>
            Export File
          </button>
        ) : (
          <a
            href={downloadUrl}
            download={`session-${new Date().toISOString()}.json`}
            target="_blank"
            rel="noopener noreferrer"
            className="btns btns--link"
          >
            Download File
          </a>
        )}
      </>
    );
  }
);
