export default function Question(props) {
  return (
    <div className="quizzical__item">
      <div className="quizzical__question">
        <p>{props.question}</p>
      </div>
      <div className="quizzical__answears">
				<Answears />
      </div>
    </div>
  );
}
