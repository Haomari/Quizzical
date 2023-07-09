import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quizzical() {
  const [quizzData, setQuizzData] = useState([]);
  const [sortedQuizzData, setsortedQuizzData] = useState(() => []);

  console.log("run Q");
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
      .then((response) => {
				console.log(response.data.results)
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
						console.log([
							item.correct_answer,
							...Object.values(item.incorrect_answers),
						]);

            const sortedAnswers =
              item.type === "boolean"
                ? false
                : shuffleArray([
                    item.correct_answer,
                    ...Object.values(item.incorrect_answers),
                  ]);


						console.log(item.type === "boolean")
            const newItem = {
              id: nanoid(),
              question: item.question,
              type: item.type,
              correctAnswer: item.correct_answer,
              allAnswers:
                item.type !== "boolean"
                  ? sortedAnswers.map((answear) => {
                      return {
                        id: nanoid(),
                        text: answear,
                        isCorecct:
                          answear === item.correct_answer ? true : false,
                        isSelect: false,
                      };
                    })
                  : "",
            };
						console.log(newItem)
            return newItem;
          })
        );
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main__quizzical quizzical">
      {/* {quizzData.map((item, index) => {
        let qType =
          item.type === "boolean"
            ? false
            : [item.correct_answer, ...Object.values(item.incorrect_answers)];
        console.log(qType);

        // Function to shuffle the array using the Fisher-Yates algorithm
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        };
        qType && shuffleArray(qType);
        console.log(item.question);

        // he.decode(item.question) = Decode HTML entities within a string
        return (
          <Question
            question={he.decode(item.question)}
            key={index}
            type={qType}
          />
        );
      })} */}
      {JSON.stringify(quizzData)}
    </div>
  );
}
