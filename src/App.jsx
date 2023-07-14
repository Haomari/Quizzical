import React, { useState } from "react";
import Quizzical from "./components/Quizzical";
import Select from "react-select";
import InputNumber from "rc-input-number";

function App() {
  // State variables
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [difficultOfQuizzical, setDifficultOfQuizzical] = useState("");
  const [amountOfAnswers, setAmountOfAnswers] = useState(5);

  // Function to toggle the start screen
  const toggleIsStartScreen = () => {
    if (difficultOfQuizzical.length > 0 && amountOfAnswers) {
      setIsStartScreen((prevIsStartScreen) => !prevIsStartScreen);
    } else {
      alert("Please choose difficulty and enter the number of questions");
    }
  };

  // Options for the difficulty select
  const selectOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <main className="page">
      <section className="page__main main">
        {/* Yellow decoration */}
        <svg
          className="main__decoration main__decoration_yellow"
          xmlns="http://www.w3.org/2000/svg"
          width="158"
          height="141"
          viewBox="0 0 158 141"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.4095 81.3947C35.1213 50.8507 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.539 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z"
            fill="#FFFAD1"
          />
        </svg>

        {/* Blue decoration */}
        <svg
          className="main__decoration main__decoration_blue"
          xmlns="http://www.w3.org/2000/svg"
          width="148"
          height="118"
          viewBox="0 0 148 118"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
            fill="#DEEBF8"
          />
        </svg>

        <div className="main__container">
          {isStartScreen ? (
            // Start screen
            <>
              <h2 className="main__title">Quizzical</h2>
              <p className="main__description">Anime quiz</p>

              {/* Difficulty select */}
              <Select
                options={selectOptions}
                onChange={(e) => setDifficultOfQuizzical(e.value)}
                className="main__select select-main"
                placeholder="Select difficulty"
                classNamePrefix="select-main"
                isSearchable={false}
              />

              <h3 className="main__input-number_label">
                Enter the number of questions<span>(1 - 50)</span>
              </h3>

              {/* Number input for the amount of questions */}
              <InputNumber
                value={amountOfAnswers}
                type="number"
                prefixCls={"main__input-number"}
                defaultValue={5}
                min={1}
                max={50}
                required={true}
                onChange={(e) => setAmountOfAnswers(e)}
              />

              {/* Start quiz button */}
              <button
                onClick={toggleIsStartScreen}
                type="button"
                className="main__button"
              >
                Start quiz
              </button>
            </>
          ) : (
            // Quiz component
            <Quizzical
              difficultOfQuizzical={difficultOfQuizzical}
              amountOfAnswers={amountOfAnswers}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
