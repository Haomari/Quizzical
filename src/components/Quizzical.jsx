import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quizzical() {
  const [quizzData, setQuizzData] = useState([]);
  const [amountOfCorrectAnswers, setAmountOfCorrectAnswers] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  console.log("run Q");
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
      .then((response) => {
        console.log(response.data.results);
        setQuizzData(
          response.data.results.map((item) => {
            // Function to shuffle the array using the Fisher-Yates algorithm
            function shuffleArray(array) {
              const newArray = [...array]; // Create a new array to avoid mutating the original array

              for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
              }

              return newArray;
            }

            console.log(item.type);

            const sortedAnswers = shuffleArray([
              item.correct_answer,
              ...Object.values(item.incorrect_answers),
            ]);

            const newItem = {
              id: nanoid(),
              question: he.decode(item.question),
              type: item.type,
              correctAnswer: he.decode(item.correct_answer),
              allAnswers:
                item.type !== "boolean"
                  ? sortedAnswers.map((answear) => {
                      return {
                        id: nanoid(),
                        text: he.decode(answear),
                        isCorecct:
                          answear === item.correct_answer ? true : false,
                        isSelect: false,
                        className: "",
                      };
                    })
                  : ["True", "False"].map((text) => {
                      console.log(text);
                      console.log(item.correct_answer);
                      return {
                        id: nanoid(),
                        className: "",
                        isCorecct: item.correct_answer === text,
                        text: he.decode(text),
                        isSelect: false,
                      };
                    }),
            };
            console.log(newItem);
            return newItem;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [triggerReload]);

  const handleSubmitOrReset = () => {
    console.log("i");
    if (isEnd) {
      setAmountOfCorrectAnswers(0);
      setTriggerReload((prevTriggerReload) => !prevTriggerReload);
      setIsEnd((prevIsEnd) => !prevIsEnd);
			setQuizzData([])
    } else {
      setIsEnd((prevIsEnd) => !prevIsEnd);
      setQuizzData((prevQuizzData) => {
        return prevQuizzData.map((item) => {
          return {
            ...item,
            allAnswers: item.allAnswers.map((question) => {
              if (question.isCorecct && question.isSelect) {
                setAmountOfCorrectAnswers(
                  (prevAmountOfCorrectAnswers) => prevAmountOfCorrectAnswers++
                );
              }
              return {
                ...question,
                className:
                  question.isCorecct && question.isSelect
                    ? "_corecct"
                    : question.isCorecct
                    ? "_corecct"
                    : question.isSelect
                    ? "_incorect"
                    : "",
                isSelect: false,
              };
            }),
          };
        });
      });
    }
  };

  const handleChange = (id, itemId) => {
    if (!isEnd) {
      setQuizzData((prevQuizzData) => {
        return prevQuizzData.map((item) => {
          return itemId === item.id
            ? {
                ...item,
                allAnswers: item.allAnswers.map((question) => {
                  console.log(question);
                  return {
                    ...question,
                    isSelect: id === question.id ? !question.isSelect : false,
                  };
                }),
              }
            : { ...item };
        });
      });
    }
  };

  console.log(quizzData);

  return (
    quizzData &&
    quizzData.length > 0 && (
      <div className="main__quizzical quizzical">
        {quizzData.map((item, index) => {
          return (
            <Question
              question={item.question}
              allAnswers={item.allAnswers}
              id={item.id}
              key={index}
              type={item.type}
              handleChange={handleChange}
            />
          );
        })}
        <button onClick={handleSubmitOrReset} className="quizzical__button">
          Check answers
        </button>
      </div>
    )
  );
}
