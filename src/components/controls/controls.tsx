import { SaveToPCComponent } from "./save-to-pc";
import { memo } from "react";
import { LoadFromPCComponent } from "./load-from-pc";
import { ControlProps } from "./interface";

export const ControlComponent = memo(
  ({ storeFileFunc, handleExportCount }: ControlProps): JSX.Element => {
    return (
      <div className="controllers">
        <div className="controllers__container">
          <div className="controllers__container__content">
            <SaveToPCComponent handleExportCount={handleExportCount} />
            <LoadFromPCComponent liftImageFunc={storeFileFunc} />
          </div>
        </div>
      </div>
    );
  }
);
