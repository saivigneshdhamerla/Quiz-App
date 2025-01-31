
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quizData } from "../data";

export const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  
  useEffect(() => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        onComplete(score);
      }
    }, 1000);
  };

  if (shuffledQuestions.length === 0) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="quiz"
    >
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
          }}
        ></div>
      </div>
      <h2>{shuffledQuestions[currentQuestion].question}</h2>
      <div className="options">
        {shuffledQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={selectedAnswer === option ? "selected" : ""}
          >
            {option}
          </button>
        ))}
      </div>
      <p>
        Question {currentQuestion + 1} of {shuffledQuestions.length}
      </p>
    </motion.div>
  );
};