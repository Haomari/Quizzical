
export default function Question(props) {
  return (
    <div id={props.id} className="quizzical__item">
      <div className="quizzical__question">
        <p>{props.question}</p>
      </div>
      <div className="quizzical__answears answears-quizzical">
        {/* {props.tupe !== "boolean" ? (
          props.allAnswers.map((answear) => {
            <Answears answear={answear} />;
          })
        ) : (
          <form>
            <label htmlFor={answear.id}>
              <input type="radio" name="answer" id={answear.id} />
              {props.text}
            </label>
            <label htmlFor={answear.id}>
              <input type="radio" name="answer" id={answear.id} />
              {props.text}
            </label>
          </form>0000{props.type === "boolean" && "_boolean"}
        )} */}
        {props.allAnswers.map((answear, index) => {
					console.log(answear)
          return (
            <label
              key={index}
              className={`${answear.className} ${answear.isSelect && "_select"} answears-quizzical__label`}
              htmlFor={answear.id}
            >
              <input
                checked={answear.isSelect}
                onChange={() => props.handleChange(answear.id, props.id)}
                className={`answears-quizzical__input`}
                type="radio"
                name="answer"
                id={answear.id}
              />
              {answear.text}
            </label>
          );
        })}
      </div>
    </div>
  );
}
