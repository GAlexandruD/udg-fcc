import MyButton from "./cc1/MyButton";

const CodeChallengeSelection = ({ lesson, setLesson }) => {
  return (
    <>
      <div className="w-full flex justify-center place-items-center flex-col sm:flex-row">
        <MyButton onClick={() => setLesson("1")} text="Challenge 1" />
        <MyButton onClick={() => setLesson("2")} text="Challenge 2" />
        <MyButton onClick={() => setLesson("3")} text="Challenge 3" />
      </div>
      <div>
        <p className="text-center text-3xl pt-4">
          {lesson === "1"
            ? "CSV Processing"
            : lesson === "2"
            ? "Meme Generator"
            : "Pixel Art"}
        </p>
      </div>
    </>
  );
};

export default CodeChallengeSelection;
