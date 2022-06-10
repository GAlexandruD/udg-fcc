import Footer from "./component/Footer";
import ImpFileReactTable from "./component/cc1/CodeChallengeOne";
import { useEffect, useState } from "react";
import CodeChallengeSelection from "./component/CodeChallengeSelection";
import CodeChallengeTwo from "./component/cc2/CodeChallengeTwo";

import WebFont from "webfontloader";

const App = () => {
  const [lesson, setLesson] = useState("1");

  useEffect(() => {
    console.log({ lesson });
  }, [lesson]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Arial", "Comic Sans", "Pacifico"],
      },
    });
  }, []);

  return (
    <>
      <CodeChallengeSelection setLesson={setLesson} />
      {lesson === "1" ? (
        <ImpFileReactTable />
      ) : lesson === "2" ? (
        <CodeChallengeTwo />
      ) : (
        <div className="text-center">Lesson three</div>
      )}
      <Footer />
    </>
  );
};

export default App;
