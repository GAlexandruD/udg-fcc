import Footer from "./component/Footer";
import ImpFileReactTable from "./component/cc1/CodeChallengeOne";
import { useEffect, useState } from "react";
import CodeChallengeSelection from "./component/CodeChallengeSelection";
import CodeChallengeTwo from "./component/cc2/CodeChallengeTwo";

import WebFont from "webfontloader";
import CodeChallengeThree from "./component/cc3/CodeChallengeThree";

const App = () => {
  const [lesson, setLesson] = useState("1");

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
        <CodeChallengeThree />
      )}
      <Footer />
    </>
  );
};

export default App;
