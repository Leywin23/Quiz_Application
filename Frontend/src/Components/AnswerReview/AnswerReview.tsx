import React from "react";
import { Question } from "../../api";
import { useOutletContext, useNavigate } from "react-router-dom";

type Props = {
  questions: Question[];
  answers: { [key: number]: string };
};

const AnswerReview = () => {
  const { questions, answers } = useOutletContext<Props>();
  const navigate = useNavigate();

  const goBack = () => navigate("/finish");

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-12">
      <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Answer Review</h1>
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.qnId} className="border p-4 rounded-md">
              <p className="font-semibold">{q.qnInWords}</p>
              <p className="text-green-600">Correct answer: {q.answer}</p>
              <p
                className={
                  answers[q.qnId] === q.answer
                    ? "text-blue-600"
                    : "text-red-600"
                }
              >
                Your answer: {answers[q.qnId] || "—"}
              </p>
            </li>
          ))}
        </ul>

        <div className="text-center mt-6">
          <button
            onClick={goBack}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            ← Back to results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerReview;
