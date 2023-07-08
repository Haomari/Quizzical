import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Quizzical() {
  const [quizzData, setQuizzData] = useState(() => []);

  console.log("run Q");
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
      .then((response) => {
        setQuizzData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main__quizzical quizzical">

		</div>
  );
}
