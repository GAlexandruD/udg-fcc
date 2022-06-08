import { useCallback, useEffect, useRef, useState } from "react";
import MyButton from "../cc1/MyButton";
import exportAsImage from "../utils/exportAsImage";

import { SketchPicker } from "react-color";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ColorPicker from "./ColorPicker";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const CodeChallengeTwo = () => {
  const [file, setFile] = useState(defaultSrc);
  const [modal, setModal] = useState("closed");
  const [topText, setTopText] = useState("");

  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();

  const [colorTextTop, setColorTextTop] = useState("#fff");
  const [colorBgTop, setColorBgTop] = useState("#050505");
  const [colorTextBottom, setColorTextBottom] = useState("#fff");
  const [colorBgBottom, setColorBgBottom] = useState("#050505");

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const exportRef = useRef();

  const [enableOverflow, setOverflow] = useState(true);

  useEffect(() => {
    console.log({ cropData });
  }, [cropData]);

  useEffect(() => {
    console.log({ modal });
  }, [modal]);

  return (
    <div className="text-center flex flex-col justify-center place-items-center">
      <h2 className="m-2">Add Image:</h2>
      <input
        className="m-4"
        type="file"
        accept="image/*"
        onChange={(event) => {
          setCropData(null);
          onChange(event);
        }}
      />

      {(modal === "top" || modal === "bottom") && (
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute w-screen bg-slate-700/70 flex flex-col justify-center place-items-center h-screen z-10 "
        >
          <input
            className="p-2"
            type="text"
            placeholder={`Enter ${modal} text`}
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <MyButton text="Save Changes" onClick={() => setModal("closed")} />

          <div className="flex justify-center place-items-center bg-transparent">
            <span className="text-xl text-yellow-50 bg-transparent">
              Text color
            </span>
            <ColorPicker defaultColor="#b4895e" />
          </div>

          <div className="flex justify-center place-items-center bg-transparent">
            <span className="text-xl text-yellow-50 bg-transparent">
              Background color
            </span>
            <ColorPicker defaultColor="#ad489e" />
          </div>
        </div>
      )}

      {file && !cropData && (
        <>
          <div className="w-[800px] h-[600px]">
            <Cropper
              className="h-full w-full"
              zoomTo={0.5}
              initialAspectRatio={4 / 3}
              preview=".img-preview"
              src={file}
              viewMode={1}
              minCropBoxHeight={400}
              minCropBoxWidth={300}
              background={true}
              responsive={true}
              autoCropArea={0.5}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={false}
              aspectRatio={4 / 3}
              dragMode="move"
            />
          </div>
          <MyButton text="Crop" onClick={getCropData} />
          <MyButton
            onClick={() => {
              exportAsImage(exportRef.current, "test");
            }}
            text="Download PNG"
          />
        </>
      )}

      {cropData && (
        <>
          <div
            ref={exportRef}
            style={{
              backgroundColor: "#000",
              backgroundImage: `url(${cropData})`,
            }}
            className="w-[800px] h-[600px] relative bg-contain bg-no-repeat bg-center border-2 border-green-500"
          >
            <div className="absolute top-0 w-[800px] h-[600px] bg-transparent flex flex-col place-content-between">
              <div
                style={{ backgroundColor: colorBgTop, opacity: 0.4 }}
                className="h-16 cursor-pointer flex justify-center place-items-center"
                onClick={() => setModal("top")}
              >
                <h1
                  className=" bg-transparent text-5xl"
                  style={{ backgroundColor: colorBgTop, color: colorTextTop }}
                >
                  {topText ? topText : "Click to add top text"}
                </h1>
              </div>
              <h1 className="bg-red-500/50">Click to add bottom text</h1>
            </div>
          </div>

          <MyButton
            onClick={() => {
              exportAsImage(exportRef.current, "test");
            }}
            text="Download PNG"
          />
          <MyButton text="Crop Again" onClick={() => setCropData(null)} />
        </>
      )}
    </div>
  );
};

export default CodeChallengeTwo;
