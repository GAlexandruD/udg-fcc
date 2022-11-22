import { useRef, useState } from "react";
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
  const [fileType, setFileType] = useState("png");

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
    <>
      <div className="p-4 flex flex-col items-center">
        <h2 className="mt-2">Add Image:</h2>
        <input
          className="w-64 file:rounded-lg p-2 file:bg-green-800 file:text-white file:border-none file:p-1 file:hover:bg-green-700 text-white bg-green-500 rounded-lg shadow-md shadow-green-800"
          type="file"
          accept="image/*"
          onChange={(event) => {
            setCropData(null);
            onChange(event);
          }}
        />
      </div>
      <div className="flex justify-center pb-4">
        <div className="flex flex-col sm:flex-row justify-center">
          {file && !cropData && <MyButton text="Crop" onClick={getCropData} />}
          {cropData && (
            <>
              <MyButton
                onClick={() => {
                  exportAsImage(exportRef.current, fileName, fileType);
                }}
                text="Download"
              />
              {/* FIXME: Looks like it only saves as jpeg when there are many colors in the image.
              <MyButton
                onClick={() => {
                  setFileType(fileType === "png" ? "jpeg" : "png");
                }}
                text={fileType === "png" ? "PNG" : "JPEG"}
              /> */}
              <MyButton text="Crop Again" onClick={() => setCropData(null)} />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center place-items-center Xmin-w-[800px]">
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
            font={font}
          />
        )}

        {file && !cropData && (
          <div className="p-1 mx-auto w-screen max-w-[800px]">
            <Cropper
              className="mx-auto w-auto  lg:w-[800px] lg:h-[600px]"
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
        )}

        {cropData && (
          <div className="w-screen overflow-auto">
            <div className="mx-auto w-[800px] h-[600px] overflow-auto">
              <div
                ref={exportRef}
                style={{
                  backgroundImage: `url(${cropData})`,
                }}
                className="bg-gray-700 md:mx-auto w-full h-full relative bg-contain bg-no-repeat bg-center grid content-between p-8 border-4 border-gray-700"
              >
                <span
                  style={{
                    opacity: 1,
                    color: `rgba(${colorTextTop.r}, ${colorTextTop.g}, ${colorTextTop.b}, ${colorTextTop.a})`,
                    textShadow: `0px 0px 10px rgba(${colorBgTop.r}, ${colorBgTop.g}, ${colorBgTop.b}, ${colorBgTop.a})`,
                    fontFamily: font,
                  }}
                  className="mx-auto h-16 cursor-pointer bg-transparent text-5xl "
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
                  className="mx-auto h-16 cursor-pointer bg-transparent text-5xl "
                  onClick={() => setModal("bottom")}
                >
                  {bottomText ? bottomText : "Click to add bottom text"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CodeChallengeTwo;
