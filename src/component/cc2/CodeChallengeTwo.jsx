import { useCallback, useEffect, useRef, useState } from "react";
import MyButton from "../cc1/MyButton";
import exportAsImage from "../utils/exportAsImage";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "./Modal";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const CodeChallengeTwo = () => {
  const [file, setFile] = useState(defaultSrc);
  const [fileName, setFileName] = useState("child.jpg");
  const [modal, setModal] = useState("closed");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [font, setFont] = useState("Arial");

  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();

  const [colorTextTop, setColorTextTop] = useState({
    r: "143",
    g: "206",
    b: "0",
    a: "1", // green
  });
  const [colorBgTop, setColorBgTop] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1", // black
  });
  const [colorTextBottom, setColorTextBottom] = useState({
    r: "143",
    g: "206",
    b: "0",
    a: "1", // green
  });
  const [colorBgBottom, setColorBgBottom] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1", // black
  });

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

    setFileName(e.target.files[0].name);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const exportRef = useRef();

  const [enableOverflow, setOverflow] = useState(true);

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
        <Modal
          modal={modal}
          setModal={setModal}
          setTopText={setTopText}
          topText={topText}
          setColorTextTop={setColorTextTop}
          setColorBgTop={setColorBgTop}
          setBottomText={setBottomText}
          bottomText={bottomText}
          setColorTextBottom={setColorTextBottom}
          setColorBgBottom={setColorBgBottom}
          colorTextTop={colorTextTop}
          colorBgTop={colorBgTop}
          colorBgBottom={colorBgBottom}
          colorTextBottom={colorTextBottom}
          setFont={setFont}
        />
      )}

      {file && !cropData && (
        <>
          <div className="w-11/12 h-screen overflow-scroll md: w-">
            <Cropper
              className="w-[800px] h-[600px]"
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
        </>
      )}

      {cropData && (
        <>
          <div className="w-screen h-screen overflow-scroll">
            <div
              ref={exportRef}
              style={{
                backgroundColor: "#000",
                backgroundImage: `url(${cropData})`,
              }}
              className="w-[800px] h-[600px] relative bg-contain bg-no-repeat bg-center grid content-between p-8 border-double border-2 border-green-600"
            >
              <span
                style={{
                  opacity: 1,
                  color: `rgba(${colorTextTop.r}, ${colorTextTop.g}, ${colorTextTop.b}, ${colorTextTop.a})`,
                  textShadow: `0px 0px 10px rgba(${colorBgTop.r}, ${colorBgTop.g}, ${colorBgTop.b}, ${colorBgTop.a})`,
                  fontFamily: font,
                }}
                className="h-16 cursor-pointer bg-transparent text-5xl "
                onClick={() => setModal("top")}
              >
                {topText ? topText : "Click to add top text"}
              </span>
              <span
                style={{
                  opacity: 1,
                  color: `rgba(${colorTextBottom.r}, ${colorTextBottom.g}, ${colorTextBottom.b}, ${colorTextBottom.a})`,
                  textShadow: `0px 0px 10px rgba(${colorBgBottom.r}, ${colorBgBottom.g}, ${colorBgBottom.b}, ${colorBgBottom.a})`,
                  fontFamily: font,
                }}
                className="h-16 cursor-pointer bg-transparent text-5xl "
                onClick={() => setModal("bottom")}
              >
                {bottomText ? bottomText : "Click to add bottom text"}
              </span>
            </div>
          </div>

          <MyButton
            onClick={() => {
              exportAsImage(exportRef.current, fileName);
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
