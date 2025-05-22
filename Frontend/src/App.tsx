import './index.css';
import React, { useState } from 'react';
import './App.css';
import { getQuestionsFromAPI, Participant, Question } from './api';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number>();
  const [start, setStart] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [participant, setParticipant] = useState<Participant>({ name: '' });
  const [participants, setParticipants] = useState<Participant[]>([]);

  const navigate = useNavigate();

  const handleStartButton = async () => {
    try {
      const response = await getQuestionsFromAPI();
      if (Array.isArray(response)) {
        setQuestions(response);
        setStartTime(Date.now());
        navigate(`quiz/${response[0].qnId}`);
        setStart(true);
      } else {
        console.log('Bad response');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
    <Outlet
      context={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        score,
        setScore,
        participant,
        setParticipant,
        startTime,
        participants,
        setParticipants,
        start,
        handleStartButton,
        setStart
    }}
  />
  </div>
);
}

export default App;