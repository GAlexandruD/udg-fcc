import { useRef, useState } from "react";
import MyButton from "../cc1/MyButton";
import exportAsImage from "../utils/exportAsImage";

const CodeChallengeTwo = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log({ file });
  };

  const exportRef = useRef();

  const [enableOverflow, setOverflow] = useState(true);

  return (
    <div className="text-center flex flex-col justify-center place-items-center">
      <h2 className="m-2">Add Image:</h2>
      <input className="m-4" type="file" onChange={handleChange} />

      {file && (
        <>
          <div
            ref={exportRef}
            style={{
              backgroundColor: "#000",
              backgroundImage: `url(${file})`,
            }}
            className="w-[800px] h-[600px] relative bg-contain bg-no-repeat bg-center border-2 border-green-500"
          >
            <div className="absolute top-0 w-[800px] h-[600px] bg-transparent flex flex-col place-content-between">
              <h1 className="bg-red-500/10">
                Top Text Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Odit iste consequuntur at natus dolor mollitia accusamus
                distinctio quia, itaque eius vitae ut dolorem, voluptates
                quibusdam deleniti aspernatur tempore ab perspiciatis?
              </h1>
              <h1 className="bg-red-500/10">
                Bottom Text Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Odit iste consequuntur at natus dolor mollitia accusamus
                distinctio quia, itaque eius vitae ut dolorem, voluptates
                quibusdam deleniti aspernatur tempore ab perspiciatis?
              </h1>
            </div>
          </div>

          <MyButton
            onClick={() => {
              exportAsImage(exportRef.current, "test");
            }}
            text="Download PNG"
          />
        </>
      )}
    </div>
  );
};

export default CodeChallengeTwo;
