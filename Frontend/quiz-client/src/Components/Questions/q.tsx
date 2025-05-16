import React, { useState } from 'react';
import { Question } from '../../api';

interface Props {
  questions: Question[];
}

const Questions = ({ questions }: Props) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number>(0);

  // Funkcja do obsługi zmiany odpowiedzi
  const handleAnswer = (questionId: number, selectedOption: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption // Zapisuje odpowiedź użytkownika
    }));
  };

  // Funkcja do sprawdzania odpowiedzi
  const checkAnswers = () => {
    let correctCount = 0;
  
    questions.forEach(q => {
      const userAnswer = userAnswers[q.qnId];
      const correctAnswer = q.answer;
  
      console.log(`Pytanie: ${q.qnInWords}`);
      console.log(`Użytkownik wybrał: "${userAnswer}"`);
      console.log(`Poprawna odpowiedź: "${correctAnswer}"`);
  
      if (
        typeof userAnswer === 'string' &&
        typeof correctAnswer === 'string' &&
        userAnswer === correctAnswer
      ) {
        console.log('✅ Odpowiedź poprawna');
        correctCount++;
      } else {
        console.log('❌ Odpowiedź niepoprawna');
      }
  
      console.log('---');
    });
  
    setScore(correctCount);
  };
  

  return (
    <div>
      {questions.map((q) => (
        <li key={q.qnId}>
          <h2>{q.qnInWords}</h2>
          <p>{q.answer}</p>
          <ul>
            {q.options.map((o, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio"
                    value={o}
                    checked={userAnswers[q.qnId] === o} // Sprawdzamy, czy ta opcja jest zaznaczona
                    onChange={() => handleAnswer(q.qnId, o)} // Obsługuje zmianę odpowiedzi
                  />
                  {o}
                </label>
              </li>
            ))}
          </ul>
        </li>
      ))}

      <button onClick={checkAnswers}>Sprawdź odpowiedzi</button>

      {score !== null && (
        <h3>
          Twój wynik: {score} / {questions.length}
        </h3>
      )}
    </div>
  );
};

export default Questions;
