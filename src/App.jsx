
import { useState } from "react";
import { Quiz } from "./components/Quiz";
import { Results } from "./components/Results";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => setQuizStarted(true);
  const completeQuiz = (finalScore) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  return (
    
    <div className="app">
      
      <h1>Genetics and Evolution Quiz</h1>
      {!quizStarted && <button onClick={startQuiz}>Start Quiz</button>}
      {quizStarted && !quizCompleted && <Quiz onComplete={completeQuiz} />}
      {quizCompleted && <Results score={score} />}
    </div>
  );
}

export default App;