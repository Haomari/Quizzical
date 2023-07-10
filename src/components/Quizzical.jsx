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

            /* id: nanoid(),
									isCorecct: item.correct_answer,
									answear: false, */
            const newItem = {
              id: nanoid(),
              question: he.decode(item.question),
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
												className: "",
                      };
                    })
                  : ["True", "False"].map((text) => {
                      return {
                        id: nanoid(),
												className: "_boolean",
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
  }, []);

  const handleSubmit = (event, checked) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(event);
    console.log(checked);
  };

  /*   const handleChange = (id) => {
		console.log(id)
		console.log(quizzData)
    setQuizzData((prevQuizzData) =>
      prevQuizzData.map((item) => {
        return item.allAnswers.map((question) => {
					console.log(question)
          return { isSelect: id === question.id ? !question.isSelect : question.isSelect};
        });
      })
    );
  }; */

  /* const handleChange = (id) => {
    console.log(id);
    console.log(quizzData);
    setQuizzData((prevQuizzData) => {
      return [
        ...prevQuizzData,
        prevQuizzData.map((item) => {
          return {...item, allAnswers: item.allAnswers.map((question) => {
						console.log(question)
						return {...question, isSelect: id === question.id ? !question.isSelect : question.isSelect};
					})}
        }),
      ];
    });
  }; */

  const handleChange = (id) => {
    console.log(id);
    console.log(quizzData);
    setQuizzData((prevQuizzData) => {
      return prevQuizzData.map((item) => {
        return {
          ...item,
          allAnswers: item.allAnswers.map((question) => {
            console.log(question);
            return {
              ...question,
              isSelect: id === question.id ? !question.isSelect : false,
            };
          }),
        };
      });
    });
  };

  /*   const handleChange = (id) => {
    setQuizzData((prevQuizzData) => {
      prevQuizzData.map(item);
    });
  }; */

  console.log(quizzData);

  return (
    <form className="main__quizzical quizzical" onSubmit={handleSubmit}>
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
      <button className="quizzical__button" type="submit">
        Submit
      </button>
    </form>
  );
}
