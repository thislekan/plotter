import { BaseSyntheticEvent, useState, memo } from "react";
import { LoadFromPCProps } from "./interface";

export const LoadFromPCComponent = memo(
  ({ liftImageFunc }: LoadFromPCProps): JSX.Element => {
    const [shouldLoad, setShouldLoad] = useState(false);
    const toggleLoad = () => setShouldLoad(!shouldLoad);
    const fileReader = new FileReader();

    function readerFunc(e: BaseSyntheticEvent) {
      const files = [...e.target.files];
      if (files.length > 1) return alert("You can only upload one file");
      if (files[0].type !== "application/json") {
        return alert("You can only upload JSON files");
      }
      fileReader.readAsText(files[0]);
    }
    const formSubmit = async (e: BaseSyntheticEvent) => {
      e.preventDefault();
      const data = JSON.parse(JSON.stringify(fileReader.result));
      setShouldLoad(true);
      liftImageFunc(data);
    };
    return (
      <>
        {!shouldLoad ? (
          <button className="btns btns--right" onClick={toggleLoad}>
            Load Data
          </button>
        ) : (
          <div>
            <form action="" method="post" onSubmit={formSubmit}>
              <input type="file" name="file" id="file" onChange={readerFunc} />
              <button className="btns btns--submit">Upload</button>
            </form>
          </div>
        )}
      </>
    );
  }
);
