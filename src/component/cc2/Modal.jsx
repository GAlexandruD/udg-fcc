import MyButton from "../cc1/MyButton";
import ColorPicker from "./ColorPicker";

const Modal = ({
  modal,
  setModal,
  setTopText,
  setBottomText,
  topText,
  bottomText,
  setColorTextTop,
  setColorBgTop,
  setColorTextBottom,
}) => {
  return (
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
        value={modal === "top" ? topText : bottomText}
        onChange={(e) =>
          modal === "top"
            ? setTopText(e.target.value)
            : setBottomText(e.target.value)
        }
      />
      <MyButton text="Save Changes" onClick={() => setModal("closed")} />

      <div className="flex justify-center place-items-center bg-transparent">
        <span className="text-xl text-yellow-50 bg-transparent">
          Text color
        </span>
        <ColorPicker
          defaultColor={{ rgb: { r: "143", g: "206", b: "0", a: "1" } }}
          setColorThings={
            modal === "top" ? setColorTextTop : setColorTextBottom
          }
        />
      </div>

      <div className="flex justify-center place-items-center bg-transparent">
        <span className="text-xl text-yellow-50 bg-transparent">
          Background color
        </span>
        <ColorPicker
          defaultColor={{ rgb: { r: "25", g: "25", b: "25", a: "0.5" } }}
          setColorThings={setColorBgTop}
        />
      </div>

      <div>Font Select</div>
    </div>
  );
};

export default Modal;
