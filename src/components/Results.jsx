
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Results = ({ score }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
   
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ score, date: new Date().toLocaleString() });
    localStorage.setItem("quizScores", JSON.stringify(scores));
    setLeaderboard(scores);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="results"
    >
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} out of 10</p>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <span>Score: {entry.score}</span>
              <span>Date: {entry.date}</span>
            </div>
          ))
        ) : (
          <p>No scores yet!</p>
        )}
      </div>
    </motion.div>
  );
};