import axios from 'axios';
import { error } from 'console';
export interface Question{
    qnId:number;
    qnInWords: string;
    qImage?: string;
    options: string[];
    answer: string;
}

export interface Participant{
    participantId?:number;
    name:string;
    score?:number;
    timeTaken?: number
}

export const getParticipantFromAPI = async () => {
    try {
        const response = await axios.get<Participant[]>(`${process.env.REACT_APP_API_URL}/api/participant`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuestionsFromAPI = async () => {
    try {
        const response = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/api/questions`);
        console.log("Response from API:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const postParicipantAPI = async (participant: Participant) => {
    try {
        const response = await axios.post<Participant>(`${process.env.REACT_APP_API_URL}/api/participant`, participant);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const putParticipantAPI = async (participant: Participant) => {
    if (!participant.participantId) throw new Error("id required");
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/participant/${participant.participantId}`, participant);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
