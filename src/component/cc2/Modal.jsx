import { useEffect } from "react";
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
  setColorBgBottom,
  setColorTextBottom,
  colorTextTop,
  colorBgTop,
  colorBgBottom,
  colorTextBottom,
  setFont,
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className="absolute w-screen bg-slate-700/70 flex flex-col justify-center place-items-center h-screen z-10 "
    >
      <form
        className="bg-transparent"
        onSubmit={(e) => {
          e.preventDefault();
          setModal(false);
        }}
      >
        <input
          autoFocus
          className="p-2 mb-3"
          type="text"
          placeholder={`Enter ${modal} text`}
          value={modal === "top" ? topText : bottomText}
          onChange={(e) =>
            modal === "top"
              ? setTopText(e.target.value)
              : setBottomText(e.target.value)
          }
        />
      </form>
      <MyButton text="Save Changes" onClick={() => setModal("closed")} />

      <div className="flex justify-center place-items-center bg-transparent pt-2.5">
        <span className="text-xl text-yellow-50 bg-transparent">
          Text color
        </span>
        <ColorPicker
          defaultColor={
            modal === "top" ? { rgb: colorTextTop } : { rgb: colorTextBottom }
          }
          setColorThings={
            modal === "top" ? setColorTextTop : setColorTextBottom
          }
        />
      </div>

      <div className="flex justify-center place-items-center bg-transparent pt-2.5">
        <span className="text-xl text-yellow-50 bg-transparent">
          Shadow color
        </span>
        <ColorPicker
          defaultColor={
            modal === "top" ? { rgb: colorBgTop } : { rgb: colorBgBottom }
          }
          setColorThings={modal === "top" ? setColorBgTop : setColorBgBottom}
        />
      </div>

      <div className="bg-transparent flex justify-center place-items-center pt-4">
        <span className="w-34 text-xl bg-transparent text-yellow-50 text-right pr-2">
          Select font:
        </span>
        <select
          onChange={(e) => {
            setFont(e.target.value);
          }}
          id="hs-select-label"
          className="bg-transparent text-yellow-50 text-xl border border-yellow-50"
        >
          <option
            selected
            className="text-yellow-50 bg-green-500/70 text-xl"
            style={{ fontFamily: "Arial" }}
          >
            Arial
          </option>
          <option
            className="text-yellow-50 bg-green-500/70"
            style={{ fontFamily: "Comic Sans" }}
          >
            Comic Sans
          </option>
          <option
            className="text-yellow-50 bg-green-500/70"
            style={{ fontFamily: "Pacifico" }}
          >
            Pacifico
          </option>
        </select>
      </div>
    </div>
  );
};

export default Modal;
