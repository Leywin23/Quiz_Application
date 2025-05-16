import React, { useEffect, useState } from "react";
import {
  getParticipantFromAPI,
  putParticipantAPI,
  Participant,
  Question,
} from "../../api";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

interface QuizContext {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  answers: { [key: number]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number | undefined>>;
  participant: Participant;
  setParticipant: React.Dispatch<React.SetStateAction<Participant>>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  startTime?: number;
}

const Quiz: React.FC = () => {
  const {
    questions,
    answers,
    setAnswers,
    score,
    setScore,
    participant,
    setParticipant,
    participants,
    setParticipants,
    startTime,
  } = useOutletContext<QuizContext>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = questions.findIndex((q) => q.qnId === Number(id));
  const currentQuestion = questions[currentIndex];
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number): string =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  const handleAnswers = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const countScore = (): number => {
    return questions.reduce((acc, q) => (q.answer === answers[q.qnId] ? acc + 1 : acc), 0);
  };

  const fetchParticipants = async () => {
    try {
      const data = await getParticipantFromAPI();
      if (Array.isArray(data)) {
        setParticipants(data);
      } else {
        console.warn("Expected participants array, got:", data);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      navigate(`/quiz/${questions[currentIndex + 1].qnId}`);
    } else {
      const finalScore = countScore();
      setScore(finalScore);

      const updated = { ...participant, score: finalScore, timeTaken: elapsedTime };
      setParticipant(updated);

      try {
        await putParticipantAPI(updated);
      } catch (err) {
        console.error("Error updating participant:", err);
      }

      await fetchParticipants();
      navigate("/finish");
    }
  };

  if (!currentQuestion) return <p className="text-white text-center mt-10">Loading question...</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-12">
      <div className="bg-white text-gray-800 rounded-xl shadow-lg w-full max-w-3xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Question {currentIndex + 1} of {questions.length}</h1>
          <span className="text-sm font-medium text-gray-600">⏱ {formatTime(elapsedTime)}</span>
        </div>

        <h2 className="text-2xl font-semibold">{currentQuestion.qnInWords}</h2>

        <ul className="space-y-4">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.qnId] === option;
            return (
              <li key={option}>
                <button
                  onClick={() => handleAnswers(currentQuestion.qnId, option)}
                  className={`w-full px-6 py-4 rounded-lg border transition-colors duration-200 text-lg font-medium 
                    ${
                      isSelected
                        ? "bg-green-600 text-white border-green-700"
                        : "bg-gray-50 text-gray-800 hover:bg-indigo-100 border-gray-300"
                    }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="text-right">
          <button
            onClick={handleNext}
            className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            {currentIndex + 1 < questions.length ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
