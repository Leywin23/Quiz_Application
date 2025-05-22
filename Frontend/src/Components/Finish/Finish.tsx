import React from "react";
import { Outlet, useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { Participant, Question } from "../../api";
import Leaderboard from "../Leaderboard/Leaderboard";

type ContextProps = {
  score: number;
  participant: Participant;
  participants: Participant[];
  questions: Question[];
  answers: { [key: number]: string };
  start: boolean;
  setStart:React.Dispatch<React.SetStateAction<boolean>>
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const Finish: React.FC = () => {
  const location = useLocation(); 
  const { score, participant, participants, questions, answers, start, setStart } = useOutletContext<ContextProps>();
  const navigate = useNavigate();

  const checkAnswers = () => {
    navigate("answerReview"); 
  };

  if (location.pathname.endsWith("answerReview")) {
    return <Outlet context={{ questions, answers }} />;
  }

  const backToTheBeginning = () =>{
    navigate('/');
    setStart(false);
  }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-12">
      <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 w-full max-w-3xl text-center space-y-6">
        
        <h1 className="text-3xl font-bold">🎉 Quiz Completed!</h1>
        
        {participant?.timeTaken != null && (
          <div>
            <h2 className="text-xl font-semibold">{participant.name}</h2>
            <p className="text-gray-600">Time: {formatTime(participant.timeTaken)}</p>
          </div>
        )}
        {score != null && (
          <h2 className="text-2xl font-semibold text-green-700">Score: {score} / 10</h2>
        )}
        <div className="pt-4">
          <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
          <Leaderboard participants={participants} />
        </div>
        <button
          onClick={checkAnswers}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
          >
          ✅ Check Answers
      </button>
      <div>
        <button
          onClick={backToTheBeginning}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 mt-4">
          Try again!
        </button>
      </div>
      </div>
    </div>
  );
};

export default Finish;
