import React, { useEffect, useState } from 'react';
import Questions from './Components/Questions/Questions';
import { getQuestions, Question } from './api';
import Login from './Components/Login/Login';


const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [oneQuestions, setOneQuestions] = useState<Question>({
    qnId: 0,
    qnInWords: "",
    qImage: "",
    options: [],
    answer: ""
  });
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
        console.log(questions);
      } catch (error) {
        console.error('Błąd przy pobieraniu pytań:', error);
      }
      
    };
   
    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Login/>
      <h1>Quiz</h1>
      <Questions questions={questions} />
    </div>
  );
};

export default App;
