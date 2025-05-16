// api.tsx
import axios from 'axios';

export type Question = {
  qnId: number;
  qnInWords: string;
  qImage?: string;
  options: string[];
  answer: string; // ← mała litera
};

const api = axios.create({
  baseURL: 'https://localhost:7260/api',
});

export const getQuestions = async () => {
  const response = await axios.get<Question[]>('https://localhost:7260/api/questions');
  return response.data;
}; 

