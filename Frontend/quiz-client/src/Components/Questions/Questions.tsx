import React, { use, useState } from 'react';
import { Question } from '../../api';

interface Props {
  questions: Question[];
}

const Questions = ({ questions }: Props) => {
const [userAnswer, setUserAnswer] = useState<{[key:number]: string}>({});
const [score, setScore] = useState<number>(0);

const handleAnswer = (questionId: number, answer: string) => {
  setUserAnswer(prev=>({...prev,[questionId]: answer }))
}

const handleScore = () => {
  let correctCount = 0;
  questions.forEach((q)=>{
    const answer = userAnswer[q.qnId];
    const correctAnswer = q.answer;

    if(typeof answer === "string"&& 
      typeof correctAnswer === "string"&&
      answer===correctAnswer){
        correctCount++;
      }
  })
  setScore(correctCount);
};

  return (
    <div>
      {questions && questions.map((question)=>
        <li key={question.qnId}>
          <h2>{question.qnInWords}</h2>
          
            {question.options && question.options.map((o, i)=>
            <label>
              <li key={i}>
                <input type='radio' checked={userAnswer[question.qnId] === o}  value={o} onChange={()=>handleAnswer(question.qnId, o)}/>
                {o}
              </li>
            </label>
            )}
        </li>
      )}
      <button onClick={handleScore}>Check answers</button>
      {score != null&&<h3>{score}/10</h3>}
    </div>
  );
};

export default Questions;
