import Answears from "./Answears";

export default function Question(props) {
  return (
    <div className="quizzical__item">
      <div className="quizzical__question">
        <p>{props.question}</p>
      </div>
      <div className="quizzical__answears">
{/* 				{props.qType ? 
				props.qType.map(answear => {
					<Answears 
					answear={answear}
					/>
				})
				:
				<form action="">
					<input type="radio">
					<input type="radio">
				</form>
			} */}
				
      </div>
    </div>
  );
}
