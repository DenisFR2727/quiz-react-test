import { useState } from "react";

import "./quiz.scss";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [circleColors, setCircleColors] = useState(questions.map(() => ""));

  const nextQuestionHandle = () => {
    const updatedCircleColors = [...circleColors];
    if (
      selectedAnswer !== null &&
      questions[currentQuestion].answers[selectedAnswer].isCorrect
    ) {
      updatedCircleColors[currentQuestion] = "green";
    } else {
      updatedCircleColors[currentQuestion] = "red";
    }

    setCircleColors(updatedCircleColors);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    }
  };

  const selectAnswer = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
    }
  };
  return (
    <div className="quiz">
      <div className="content-qustion">
        <div className="qustion-count">
          <span>Qustion {1 + currentQuestion}</span>
          <span> of {questions.length}</span>
        </div>
        <div className="line"></div>
        <h2 className="current-qustion">
          {questions[currentQuestion].question}
        </h2>
        <div className="answer-question">
          {questions[currentQuestion].answers.map((answer, index) => (
            <div
              key={index}
              onClick={() => selectAnswer(index)}
              className={
                selectedAnswer === index
                  ? answer.isCorrect
                    ? "correct"
                    : "wrong"
                  : ""
              }
            >
              {answer.text}
            </div>
          ))}
        </div>
        <button className="next-btn" onClick={nextQuestionHandle}>
          Next
        </button>
        <div className="correct-answer">
          {circleColors.map((color, index) => (
            <div
              key={index}
              className="answer-item"
              style={{ backgroundColor: color }}
            >
              {color === "green" && <span className="checkmark">&#10003;</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Quiz;
